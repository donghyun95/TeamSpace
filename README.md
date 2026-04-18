# TeamSpace (notionlive)

> Notion 스타일의 문서 트리 + 실시간 협업 편집 + 워크스페이스 권한/초대 시스템을 구현한 협업 SaaS 프로젝트

## 1) 프로젝트 소개

**TeamSpace**는 개인/팀 워크스페이스에서 문서를 계층형으로 관리하고,  
여러 사용자가 동시에 같은 문서를 편집할 수 있는 **실시간 협업 문서 플랫폼**입니다.

단순 CRUD를 넘어서 아래를 실제 제품 흐름으로 구현했습니다.

- 워크스페이스 기반 멤버십/권한(OWNER/ADMIN/MEMBER/VIEWER)
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
