import { utapi } from 'uploadthing/server';
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
				isTourist: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.point.create({
				data: {
					name: input.name,
					description: input.description,
					latitude: input.latitude,
					longitude: input.longitude,
					linkToVideo: input.linkToVideo,
					images: input.images,
					IsTourist: input.isTourist,
				},
			});
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
				images: z.array(z.string()),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await utapi.deleteFiles(input.images);
			return await ctx.prisma.point.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				images: z.array(z.string()),
				name: z.string().nonempty(),
				description: z.string(),
				latitude: z.number(),
				longitude: z.number(),
				linkToVideo: z.string(),
				isTourist: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.point.update({
				where: {
					id: input.id,
				},
				data: {
					description: input.description,
					images: input.images,
					latitude: input.latitude,
					linkToVideo: input.linkToVideo,
					longitude: input.longitude,
					name: input.name,
					IsTourist: input.isTourist,
				},
			});
		}),
});
