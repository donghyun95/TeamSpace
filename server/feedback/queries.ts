import { prisma } from '@/lib/prisma';
import { FeedbackCategory } from '@prisma/client';

type GetFeedbackListParams = {
  page: number;
  pageSize: number;
  category?: FeedbackCategory;
};

export async function getFeedbackList({
  page,
  pageSize,
  category,
}: GetFeedbackListParams) {
  const skip = (page - 1) * pageSize;
  const where = category ? { category } : undefined;

  const [items, total] = await prisma.$transaction([
    prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
      select: {
        id: true,
        category: true,
        title: true,
        message: true,
        email: true,
        mood: true,
        pageUrl: true,
        userAgent: true,
        createdAt: true,
      },
    }),
    prisma.feedback.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
