"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Create a new board
export async function createBoard() {
	try {
		const board = await prisma.board.create({
			data: {
				tasks: {
					create: [
						{ name: "Task In Progress", status: "In Progress", icon: "⏰" },
						{ name: "Task Completed", status: "Completed", icon: "🚀" },
						{ name: "Task Won't Do", status: "Won't Do", icon: "❌" },
						{
							name: "Task To Do",
							status: "To Do",
							icon: "📚",
							description: "Learn Tanstack query with Next.js server action.",
						},
					],
				},
			},
		});

		return { success: true, board };
	} catch (error) {
		console.log("Board creation error:", error);
		return {
			error: true,
			message: "Could not create board.",
		};
	}
}

// Get a board by ID
export async function getBoardById(boardId: string) {
	try {
		const board = await prisma.board.findUnique({
			where: {
				id: boardId,
			},
			include: {
				tasks: true,
			},
		});

		if (!board) {
			return {
				status: 404,
				message: "Board has been Deleted / Incorrect Board ID",
			};
		}

		return { success: true, board };
	} catch (error) {
		console.log("Board retrieval error:", error);
		return {
			error: true,
			message: "Could not retrieve board.",
		};
	}
}
