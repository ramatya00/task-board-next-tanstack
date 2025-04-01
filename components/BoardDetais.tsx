import { BoardDetailsProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Image from "next/image";
import { useBoardOperations } from "@/hooks/useBoardOperations";
import { useBoardForm } from "@/hooks/useBoardForm";
import { useUrlHandling } from "@/hooks/useUrlHandling";

export default function BoardDetails({ board, setHidden, onBoard }: BoardDetailsProps) {
	const { tasks, updatedAt, id, name, description } = board;
	const origin = typeof window !== "undefined" ? window.location.origin : "";
	const boardUrl = `${origin}/board/${id}`;
	const lastUpdated = formatDate(updatedAt);
	const [error, setError] = useState<string | null>(null);

	// Custom hooks
	const { updateMutation, deleteMutation } = useBoardOperations(id);
	const { register, handleSubmit } = useBoardForm({ name, description });
	const { tooltip, handleCopyUrl } = useUrlHandling(boardUrl);

	const onSubmit = handleSubmit((data) => {
		setError(null);

		if (data.name.length > 50) {
			setError("Board name should not exceed 50 characters");
			return;
		}

		const updatedData = {
			name: data.name,
			description: data.description,
		};

		if (updatedData.name === name && updatedData.description === description) {
			setHidden(true);
			return;
		}

		try {
			updateMutation.mutate(updatedData);
			setHidden(true);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	});

	const handleDelete = () => {
		setError(null);
		if (!confirm("Are you sure you want to delete this board?")) return;
		try {
			deleteMutation.mutate();
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	useEffect(() => {
		if (onBoard) setError(null);
	}, [onBoard]);

	return (
		<div className="h-full flex flex-col">
			<h1 className="text-xl font-medium">Board Details</h1>

			<div className="text-sm text-gray-3 mt-2 mb-7">
				<div className="space-x-2">
					<span>Last Updated:</span>
					<span>{lastUpdated}</span>
				</div>
				<div className="space-x-2">
					<span>Total Task:</span>
					<span>{tasks.length}</span>
				</div>
			</div>

			<div className="space-y-1 relative">
				<label className="block text-xs text-gray-3 font-semibold ml-0.5" htmlFor="url">
					Board URL
				</label>
				<input
					className="w-full bg-gray-1 py-2.5 pl-4 pr-12 text-gray-3 rounded-lg focus:outline-blue"
					type="text"
					id="url"
					defaultValue={boardUrl}
					readOnly
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20px"
					height="20px"
					viewBox="0 0 24 24"
					fill="none"
					className="text-gray-3 absolute right-3 top-8 cursor-pointer"
					onClick={handleCopyUrl}
				>
					<path
						d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				{tooltip && <p className="absolute top-0 right-0 text-blue text-sm">Copied!</p>}
			</div>

			<form onSubmit={onSubmit} className="mt-7 grow flex flex-col justify-between">
				<div className="space-y-7">
					<div className="space-y-1">
						<label htmlFor="name" className="block text-xs text-gray-3 font-semibold ml-0.5">
							Title
						</label>
						<input
							id="name"
							{...register("name")}
							className="w-full py-2.5 pl-4 pr-12 rounded-lg border-2 border-gray-1 focus:outline-blue"
							placeholder="Enter board title"
						/>
					</div>
					<div className="space-y-1">
						<label htmlFor="description" className="block text-xs text-gray-3 font-semibold ml-0.5">
							Description
						</label>
						<textarea
							id="description"
							{...register("description")}
							rows={3}
							placeholder="Enter board description"
							className="w-full py-2.5 pl-4 pr-12 rounded-lg border-2 border-gray-1 focus:outline-blue"
						/>
					</div>
				</div>

				<div className={`flex items-center ${error ? "justify-between" : "justify-end "}`}>
					{error && <p className="text-red-2 text-xs md:text-sm">{error}</p>}

					<div className="flex gap-4 items-center">
						<Button
							type="button"
							disable={updateMutation.isPending || deleteMutation.isPending}
							name={deleteMutation.isPending ? "Deleting..." : "Delete"}
							className="bg-gray-3"
							icon={<Image src="/Trash.svg" alt="trash" width={18} height={18} />}
							onClick={handleDelete}
						/>
						<Button
							type="submit"
							disable={updateMutation.isPending || deleteMutation.isPending}
							name={updateMutation.isPending ? "Updating..." : "Update"}
							className="bg-blue"
							icon={<Image src="/Done_round.svg" alt="done" width={18} height={18} />}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
