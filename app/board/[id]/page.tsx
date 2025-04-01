"use client";

import { getBoardById } from "@/actions/actions-board";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import Header from "@/components/Header";
import Task from "@/components/Task";
import BoardDetails from "@/components/BoardDetais";
import { Task as TaskType } from "@prisma/client";
import TaskForm from "@/components/TaskForm";
import { getStatusPriority } from "@/lib/utils";

export default function BoardPage() {
	const params = useParams();
	const [boardModalHidden, setBoardModalHidden] = useState(true);
	const [taskModalHidden, setTaskModalHidden] = useState(true);
	const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

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

	// Sort tasks by status priority
	const sortedTasks =
		data?.tasks.slice().sort((a, b) => getStatusPriority(a.status) - getStatusPriority(b.status)) || [];

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
			<div className="my-10">
				<Header name={data.name} description={data.description} setHidden={setBoardModalHidden} />

				<div className="space-y-5 max-h-[500px] overflow-y-scroll px-2 py-4 mt-3 mb-5">
					{sortedTasks.map((task) => (
						<div
							key={task.id}
							onClick={() => {
								setTaskModalHidden(false);
								setSelectedTask(task);
							}}
						>
							<Task {...task} />
						</div>
					))}
				</div>

				<button
					className="flex items-center px-4.5 py-3.5 rounded-xl cursor-pointer bg-orange-1 w-[calc(100%-16px)] mx-2 shadow-md hover:shadow-lg transition-shadow duration-200"
					onClick={() => {
						setTaskModalHidden(false);
						setSelectedTask(null);
					}}
				>
					<div className="flex gap-6 items-center">
						<div className="bg-orange-3 rounded-xl flex items-center justify-center p-3.5">
							<Image src="/Add_round_duotone.svg" alt="add task" height={24} width={24} />
						</div>
						<h2 className="text-md font-semibold">Add new task</h2>
					</div>
				</button>
			</div>

			{/* Board */}
			<Modal hidden={boardModalHidden} setHidden={setBoardModalHidden}>
				<BoardDetails board={data} setHidden={setBoardModalHidden} />
			</Modal>
			{/* Task */}
			<Modal
				hidden={taskModalHidden}
				setHidden={() => {
					setTaskModalHidden(true);
					setSelectedTask(null);
				}}
			>
				<TaskForm
					boardId={data.id}
					task={selectedTask || undefined}
					onSuccess={() => {
						setTaskModalHidden(true);
						setSelectedTask(null);
					}}
				/>
			</Modal>
		</>
	);
}
