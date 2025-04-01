"use client";

import Image from "next/image";
import { TaskProps } from "@/lib/types";

export default function Task(task: TaskProps) {
	return (
		<div
			className={`${
				task.status === "In Progress"
					? "bg-orange-2"
					: task.status === "Completed"
					? "bg-green-1"
					: task.status === "Won't Do"
					? "bg-red-1"
					: "bg-gray-1"
			} flex justify-between items-center px-4.5 py-3.5 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200`}
		>
			<div className="w-full">
				<div className="flex justify-between">
					<div className="flex gap-6 items-center">
						<div className="bg-white rounded-xl flex items-center justify-center w-12 h-12 shrink-0">
							<p className="text-xl">{task.icon}</p>
						</div>
						<h2 className="text-xl font-semibold">{task.name}</h2>
					</div>
					{task.status !== "To Do" && (
						<div
							className={`${
								task.status === "In Progress"
									? "bg-orange-3"
									: task.status === "Completed"
									? "bg-green-2"
									: "bg-red-2"
							}
								w-12 h-12 flex items-center justify-center rounded-xl shrink-0`}
						>
							<Image
								src={
									task.status === "In Progress"
										? "/Time_atack_duotone.svg"
										: task.status === "Completed"
										? "/Done_round_duotone.svg"
										: task.status === "Won't Do"
										? "/close_ring_duotone.svg"
										: ""
								}
								height={24}
								width={24}
								alt={task.status || "status"}
							/>
						</div>
					)}
				</div>
				{task.description && <p className="ml-1 md:mx-[75px] font-light my-2">{task.description}</p>}
			</div>
		</div>
	);
}
