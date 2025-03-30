"use client";

import { createBoard } from "@/actions/actions-board";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const { error, isLoading, refetch } = useQuery({
		queryKey: ["board"],
		queryFn: async () => {
			const savedBoardId = localStorage.getItem("board");
			if (savedBoardId) {
				router.push(`/board/${savedBoardId}`);
				return { success: true };
			}

			const response = await createBoard();
			if (!response.success) {
				throw new Error(response.message);
			} else {
				localStorage.setItem("board", response.board.id);
				router.push(`/board/${response.board.id}`);
			}
			return response;
		},
	});

	if (isLoading) return <Loading message="Creating your board" />;

	return (
		<>
			{error && (
				<div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
					<p>{error.message}</p>
					<Button name="Try Again" onClick={() => refetch()} className="bg-black" />
				</div>
			)}
		</>
	);
}
