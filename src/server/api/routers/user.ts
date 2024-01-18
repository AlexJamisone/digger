import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		const user = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		});
		if (!user)
			return await ctx.prisma.user.create({
				data: {
					id: ctx.userId,
				},
			});
		return user.role;
	}),
	getRole: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		const user = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		});
		if (!user)
			return new TRPCError({
				code: 'NOT_FOUND',
				cause: 'NOT_FOUND',
				message: 'Пользовательская роль неопределена',
			});
		return user.role;
	}),
});
