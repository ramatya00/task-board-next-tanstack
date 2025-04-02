import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard, updateBoard } from "@/actions/actions-board";

export function useBoardOperations(boardId: string) {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: async (data: { name: string; description: string }) => {
			const response = await updateBoard(boardId, data);
			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["board", boardId] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async () => {
			const response = await deleteBoard(boardId);
			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["board", boardId] });
			localStorage.removeItem("board");
		},
	});

	return { updateMutation, deleteMutation };
}
