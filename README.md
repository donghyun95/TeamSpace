# TeamSpace

> 실시간 협업 편집 + 워크스페이스 권한/초대 시스템을 구현한 협업 SaaS 프로젝트

## 1) 프로젝트 소개

**TeamSpace**는 개인/팀 워크스페이스에서 문서를 계층형으로 관리하고,  
여러 사용자가 동시에 같은 문서를 편집할 수 있는 **실시간 협업 문서 플랫폼**입니다.

단순 CRUD를 넘어서 아래를 실제 제품 흐름으로 구현했습니다.

- 워크스페이스 기반 멤버십/권한(OWNER/MEMBER/VIEWER)
- 문서 트리(부모-자식) 구조 및 페이지 생성/탐색
- Liveblocks + BlockNote 기반 실시간 멀티 커서/공동 편집
- 페이지 공개 토글 및 토큰 기반 읽기 전용 공유 링크
- 초대/수락/거절 플로우
- 인증(NextAuth + Credentials/Google) 및 회원가입

---

## 2) 핵심 기능

### 인증 & 사용자

- NextAuth 기반 로그인 (Credentials + Google)
- 회원가입 시 개인 워크스페이스 자동 생성
- 비밀번호 해시 저장 (bcrypt)
- Cloudflare Turnstile 기반 봇 검증

### 워크스페이스

- `PERSONAL`, `TEAM` 타입 지원
- 워크스페이스 생성/이름 변경
- 멤버 역할 관리 (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`)
- 사이드바에 개인/팀 스페이스 분리 렌더링

### 페이지(문서) 시스템

- 페이지 트리 구조 (`parentId` 기반)
- 루트/하위 페이지 생성
- 제목/아이콘 수정
- 공개 여부 토글 (`ispublished`) + `publictoken` 공유

### 실시간 협업

- Liveblocks Room 단위로 페이지별 실시간 세션
- BlockNote 에디터와 연동해 동시 편집
- VIEWER는 읽기 전용, 그 외 FULL_ACCESS
- 비로그인 유저는 공개 페이지에 한해 게스트 읽기 권한

### 초대 시스템

- 이메일 prefix 기반 사용자 검색
- 워크스페이스 초대 생성
- 초대 수락 시 멤버십 자동 반영
- 거절/중복/자기초대 방지 처리

---

## 3) 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide
- **State/Data**: TanStack Query, Zustand
- **Auth**: NextAuth v5(beta), Prisma Adapter
- **DB/ORM**: PostgreSQL, Prisma
- **Realtime**: Liveblocks, BlockNote
- **Validation**: Zod, React Hook Form

---

## 4) 아키텍처 요약

```text
app/
  ├─ (protected)/dashboard/...        # 인증 사용자 영역
  ├─ share/[token]/...                # 공개 공유 문서(읽기 전용)
  ├─ api/...                          # Route Handlers(API)
server/
  ├─ users/queries.ts                 # 사용자/사이드바/접근 관련 DB 쿼리
  ├─ create/queries.ts                # 페이지/워크스페이스 생성 및 수정
  ├─ invite/queries.ts                # 초대 플로우
  ├─ page/queries.ts                  # 페이지 공개 토글/토큰 조회
lib/
  ├─ auth.ts                          # NextAuth 설정
  ├─ prisma.ts                        # Prisma 클라이언트
  ├─ api/*                            # 클라이언트 fetch 래퍼
prisma/
  ├─ schema.prisma                    # 데이터 모델
```

## 5) 이슈 및 트러블슈팅

<details>
  <summary>페이지 전환시 2200ms => 334ms 개선 </summary>

## 협업 에디터 성능 개선 사례

## 1. 프로젝트 개요

- 각 문서는 `pageId`를 기준으로 하나의 Liveblocks room에 매핑
- 사용자가 문서를 전환할 때마다 새로운 room에 접속하여 협업 상태 동기화

또한, **CursorLayer**컴포넌트로 여러 사용자가 동일한 문서를 편집할 경우  
다른 사용자의 마우스 위치를 실시간으로 표시하는 기능을 제공합니다.

---

## 2. 문제 상황

협업 에디터 구현 이후, 문서 전환 시 다음과 같은 문제가 발생했습니다.

- 문서를 클릭해도 본문이 즉시 표시되지 않음
- 사용자 입장에서 “문서가 느리게 열린다”는 체감 발생
- 단순 렌더링 문제인지, 협업 동기화 문제인지 원인 파악이 어려움

---

## 3. 원인 분석 과정

### 가설 1. roomId 이중 초기화 문제

문서 전환 시 `roomId`가 두 번 변경되면서  
Liveblocks room이 불필요하게 재초기화될 가능성을 의심했습니다.

특히, URL 파라미터가 즉시 반영되지 않는 경우  
`Zustand 초기값 → 실제 pageId` 순으로 변경되면서  
room 연결이 두 번 발생할 수 있다고 판단했습니다.

#### 검증 결과

- roomId는 한 번만 정상적으로 변경됨
- 이중 초기화는 발생하지 않음

---

### 가설 2. BlockNote editor 재생성 문제

렌더링 과정에서 editor 인스턴스가 반복 생성되는지 확인했습니다.

#### 검증 결과

- `useCreateBlockNote`는 `useMemo` 기반으로 동작
- dependency 변경 시에만 editor 재생성
- 단순 리렌더는 문제 아님

---

## 4. 1차 해결 시도: 구조 분리

초기 분석 단계에서는 명확한 원인을 특정하기 어려웠기 때문에,  
우선 초기 렌더링 성능 개선에 집중했습니다.

### 핵심 전략

> “문서 표시”와 “협업 기능”을 분리한다.

- **Viewer**: 빠른 초기 표시 담당
- **Editor**: 협업이 필요한 시점에만 활성화

### 설계 방식

- DB에 문서 snapshot 저장
- 페이지 진입 시 snapshot 기반 Viewer 먼저 렌더링
- 편집 시점에만 Liveblocks + Editor 마운트
- 협업 중 변경사항은 debounce 후 snapshot 저장

이 구조를 구현하던 도중,  
기존에 인지하지 못했던 추가적인 성능 병목을 발견하게 되었습니다.

---

## 5. 추가 병목 발견: CursorLayer

그러나 1차 해결 시도 과정에서:

- CursorLayer를 잠시 비활성화했을 때
- room 진입 속도가 눈에 띄게 개선됨

---

## 6. CursorLayer 성능 문제 분석

### 문제 증상

- 문서 최초 진입 시 로딩 속도 저하
- Liveblocks room 연결 지연
- 에디터 내용 표시까지 체감 지연 증가

---

### 1) 초기 로딩 시 비용 집중

문서 진입 직후 다음 작업이 동시에 수행되었습니다.

- room 연결
- storage sync
- editor 초기화
- presence 상태 동기화 (커서 포함)
- layout 계산

→ 초기 로딩 시점에 모든 비용이 집중됨

---

### 2) 실행 타이밍 문제

- provider 연결 이전에 `useOthers()` 호출
- 다른 사용자 정보가 없는 상태에서 접근 시도
- 일부 상황에서 null 관련 에러 발생

→ CursorLayer가 **너무 이른 시점에 실행**되고 있었음

---

## 7. 해결 전략

### 1) CursorLayer 지연 활성화

초기 진입 시 CursorLayer를 비활성화하고,  
일정 시간 이후 활성화하도록 변경했습니다.

성능 측정을 위해 Liveblocks의 `ClientSideSuspense`를 기준으로  
초기 로딩 시간을 계측한 결과:

</details>
