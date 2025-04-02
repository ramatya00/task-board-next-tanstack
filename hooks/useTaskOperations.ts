import { addTask, updateTask, deleteTask } from "@/actions/actions-task";
import { Task } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTaskOperations(boardId: string, task: Task | undefined, onSuccess: (() => void) | undefined) {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: async (data: Task) => {
			const response = task ? await updateTask({ ...data, id: task.id }) : await addTask({ ...data, boardId });

			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["board", boardId] });
			onSuccess?.();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (taskId: string) => {
			const response = await deleteTask(taskId);
			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["board", boardId] });
			onSuccess?.();
		},
	});

	return { updateMutation, deleteMutation };
}
