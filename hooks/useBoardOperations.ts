import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard, updateBoard } from "@/actions/actions-board";
import { useRouter } from "next/navigation";

export function useBoardOperations(boardId: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const updateMutation = useMutation({
		mutationFn: async (data: { name: string; description: string }) => {
			const response = await updateBoard(boardId, data);
			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["board", boardId] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async () => {
			const response = await deleteBoard(boardId);
			if (!response.success) throw new Error(response.message);
			return response;
		},
		onSuccess: () => {
			localStorage.removeItem("board");
			router.push("/");
		},
	});

	return { updateMutation, deleteMutation };
}
