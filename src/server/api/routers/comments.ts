import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const commentsRouter = createTRPCRouter({
	get: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.comments.findMany({
				where: {
					pointId: input.id,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: 20,
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				content: z.string().nonempty({
					message: 'Нельзя отправить пустой комметарий',
				}),
				pointId: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.comments.create({
				data: {
					content: input.content,
					pointId: input.pointId,
				},
			});
		}),
});
