"use client";

import { TaskFormProps } from "@/lib/types";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import { useEffect, useState } from "react";
import { icons, status } from "@/lib/utils";
import Image from "next/image";
import Button from "./ui/Button";

export default function TaskForm({ boardId, task, onSuccess }: TaskFormProps) {
	const [selectedIcon, setSelectedIcon] = useState(task?.icon);
	const [selectedStatus, setSelectedStatus] = useState(task?.status || null);
	const [error, setError] = useState<string | null>(null);
	const { register, handleSubmit, setValue, reset } = useTaskForm(task);
	const { updateMutation, deleteMutation } = useTaskOperations(boardId, task, onSuccess);

	const onSubmit = handleSubmit((data) => {
		if (data.name.trim().length === 0) {
			setError("Task name is required");
			return;
		}

		if (data.name.length > 50) {
			setError("Task name should not exceed 50 characters");
			return;
		}
		try {
			updateMutation.mutateAsync(data);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	});
	const handleDelete = (taskId: string) => {
		try {
			deleteMutation.mutateAsync(taskId);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	useEffect(() => {
		if (task) {
			setValue("name", task.name);
			setValue("description", task.description);
			setSelectedIcon(task.icon);
			setSelectedStatus(task.status);
			setValue("icon", task.icon);
			setValue("status", task.status);
		} else {
			reset();
			setSelectedIcon(null);
			setSelectedStatus(null);
		}
	}, [task, reset, setValue]);

	return (
		<div className="h-full flex flex-col">
			<h1 className="text-xl font-medium">{task ? "Edit Task" : "Add Task"}</h1>

			<form onSubmit={onSubmit} className="mt-7 grow flex flex-col justify-between">
				<div className="space-y-7">
					{/* Name */}
					<div className="space-y-1">
						<label htmlFor="name" className="block text-xs text-gray-3 font-semibold ml-0.5">
							Task name
						</label>
						<input
							id="name"
							{...register("name")}
							className="w-full py-2.5 pl-4 pr-12 rounded-lg border-2 border-gray-1 focus:outline-blue"
							placeholder="Enter task name"
						/>
					</div>

					{/* Description */}
					<div className="space-y-1">
						<label htmlFor="description" className="block text-xs text-gray-3 font-semibold ml-0.5">
							Description
						</label>
						<textarea
							id="description"
							{...register("description")}
							rows={3}
							placeholder="Enter a short description"
							className="w-full py-2.5 pl-4 pr-12 rounded-lg border-2 border-gray-1 focus:outline-blue"
						/>
					</div>

					{/* Icons */}
					<div className="space-y-1">
						<label className="block text-xs text-gray-3 font-semibold ml-0.5">Icon</label>
						<div className="flex gap-2 overflow-x-scroll px-0.5 py-2">
							{icons.map((icon) => (
								<div
									key={icon}
									className={`w-12 h-12 bg-gray-1 rounded-xl flex items-center justify-center cursor-pointer shrink-0 ${
										selectedIcon === icon ? "ring-2 ring-blue bg-orange-1" : ""
									}`}
									onClick={() => {
										setSelectedIcon(icon);
										setValue("icon", icon);
									}}
								>
									<p className="text-xl">{icon}</p>
								</div>
							))}
						</div>
					</div>

					{/* Status */}
					<div className="space-y-1">
						<label className="block text-xs text-gray-3 font-semibold ml-0.5">Status</label>
						<div className="grid md:grid-cols-2 gap-2">
							{status.map((status) => (
								<div
									key={status}
									className={`flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer border-2 border-gray-1 ${
										selectedStatus === status ? "ring-2 ring-blue" : ""
									}`}
									onClick={() => {
										setSelectedStatus(status);
										setValue("status", status);
									}}
								>
									{status === "In Progress" && (
										<div className="bg-orange-3 w-8 h-8 flex items-center justify-center rounded-xl">
											<Image src="/Time_atack_duotone.svg" height={20} width={20} alt="in progress" />
										</div>
									)}
									{status === "Completed" && (
										<div className="bg-green-2 w-8 h-8 flex items-center justify-center rounded-xl">
											<Image src="/Done_round_duotone.svg" height={20} width={20} alt="completed" />
										</div>
									)}
									{status === "Won't Do" && (
										<div className="bg-red-2 w-8 h-8 flex items-center justify-center rounded-xl">
											<Image src="/close_ring_duotone.svg" height={20} width={20} alt="won't do" />
										</div>
									)}
									<span className="font-medium text-sm">{status}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Button */}
				<div className={`flex items-center ${error ? "justify-between" : "justify-end "}`}>
					{error && <p className="text-red-2 text-xs">{error}</p>}

					<div className="flex gap-4 items-center">
						{task && (
							<Button
								type="button"
								disable={updateMutation.isPending || deleteMutation.isPending}
								name={deleteMutation.isPending ? "Deleting.." : "Delete"}
								className="bg-gray-3"
								icon={<Image src="/Trash.svg" alt="trash" width={18} height={18} />}
								onClick={() => handleDelete(task.id)}
							/>
						)}
						<Button
							type="submit"
							disable={updateMutation.isPending || deleteMutation.isPending}
							name={updateMutation.isPending ? (task ? "Updating..." : "Saving...") : task ? "Update" : "Save"}
							className="bg-blue"
							icon={<Image src="/Done_round.svg" alt="done" width={18} height={18} />}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
