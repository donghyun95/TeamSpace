'use client';

import Link from 'next/link';
import { Lock, ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccessDeniedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[280px] w-[280px] rounded-full bg-neutral-100 blur-3xl" />
        <div className="absolute right-[-100px] top-[120px] h-[240px] w-[240px] rounded-full bg-neutral-100 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-neutral-200/60 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left copy */}
          <section className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Private space
            </div>

            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              이 페이지에는
              <br />
              접근할 수 없어요
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-2xl px-6">
                <Link href="/login">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로 가기
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-neutral-400">
              <div>
                <p className="font-medium text-neutral-700">Possible reasons</p>
                <p className="mt-1">비공개 상태 / 잘못된 링크 / 권한 없음</p>
              </div>
            </div>
          </section>

          {/* right visual card */}
          <section className="relative flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              {/* floating cards */}
              <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-3xl border border-neutral-200 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur md:block" />
              <div className="absolute -right-4 bottom-8 hidden h-20 w-20 rounded-[28px] border border-neutral-200 bg-neutral-50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:block" />

              <div className="rounded-[36px] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-8">
                <div className="rounded-[28px] bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 sm:p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-3 w-20 rounded-full bg-neutral-300" />
                      <div className="h-3 w-32 rounded-full bg-neutral-200" />
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
                      <Lock className="h-5 w-5 text-neutral-700" />
                    </div>
                  </div>

                  {/* center lock illustration */}
                  <div className="relative mx-auto flex h-[280px] w-full max-w-[320px] items-center justify-center">
                    <div className="absolute h-48 w-48 rounded-full bg-white shadow-inner" />
                    <div className="absolute h-36 w-36 rounded-full border border-neutral-200 bg-neutral-50" />
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] bg-neutral-900 shadow-xl">
                      <Lock className="h-10 w-10 text-white" />
                    </div>

                    <div className="absolute left-6 top-10 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-500 shadow-sm">
                      Private
                    </div>
                    <div className="absolute bottom-12 right-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-500 shadow-sm">
                      Access blocked
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-white/70 bg-white/80 p-5 backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          접근 권한이 필요합니다
                        </p>
                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                          이 콘텐츠는 현재 공개되어 있지 않거나 권한이 있는
                          사용자만 볼 수 있어요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
