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
});
