import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const pointsRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.point.findMany();
	}),
	create: adminProcedure
		.input(
			z.object({
				images: z.array(z.string()),
				name: z.string().nonempty(),
				description: z.string(),
				latitude: z.number(),
				longitude: z.number(),
				linkToVideo: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const images = input.images.map((url) => ({ url }));
			return await ctx.prisma.point.create({
				data: {
					name: input.name,
					description: input.description,
					latitude: input.latitude,
					longitude: input.longitude,
					linkToVideo: input.linkToVideo,
					images: {
						createMany: {
							data: images,
						},
					},
				},
			});
		}),
});
