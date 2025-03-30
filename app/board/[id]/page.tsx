"use client";

import { getBoardById } from "@/actions/actions-board";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import Header from "@/components/Header";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function BoardPage() {
	const params = useParams();
	const [boardModalHidden, setBoardModalHidden] = useState(true);
	const [taskModalHidden, setTaskModalHidden] = useState(true);

	const { data, error, isPending } = useQuery({
		queryKey: ["board", params.id],
		queryFn: async () => {
			const response = await getBoardById(params.id as string);
			if (!response.success) {
				if (response.status === 404) localStorage.removeItem("board");
				throw new Error(response.message);
			}

			return response.board;
		},
	});

	if (isPending) return <Loading message="" />;

	if (error) {
		return (
			<div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
				<p>{error.message}</p>
				<Link href="/">
					<Button name="Create New Board" className="bg-black" />
				</Link>
			</div>
		);
	}

	return (
		<>
			<div>
				<Header name={data.name} description={data.description} setHidden={setBoardModalHidden} />
			</div>

			<Modal hidden={boardModalHidden} setHidden={setBoardModalHidden}>
				Board
			</Modal>
			<Modal hidden={taskModalHidden} setHidden={setTaskModalHidden}>
				Task
			</Modal>
		</>
	);
}
