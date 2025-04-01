"use server";

import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";

export async function addTask(task: Task) {
	try {
		const newTask = await prisma.task.create({
			data: {
				name: task.name,
				description: task.description,
				status: task.status,
				icon: task.icon,

				board: {
					connect: {
						id: task.boardId,
					},
				},
			},
		});

		return { success: true, newTask };
	} catch (error) {
		console.log("Create new task error:", error);
		return {
			error: true,
			message: "Could not create task.",
		};
	}
}

export async function updateTask(task: Task) {
	try {
		const updatedTask = await prisma.task.update({
			where: {
				id: task.id,
			},
			data: {
				name: task.name,
				description: task.description,
				status: task.status,
				icon: task.icon,
			},
		});
		return { success: true, updatedTask };
	} catch (error) {
		console.log("Update task error:", error);
		return {
			error: true,
			message: "Could not update task.",
		};
	}
}

export async function deleteTask(taskId: string) {
	try {
		const deletedTask = await prisma.task.delete({
			where: {
				id: taskId,
			},
		});
		return { success: true, deletedTask };
	} catch (error) {
		console.log("Delete task error:", error);
		return {
			error: true,
			message: "Could not delete task.",
		};
	}
}
