import { Board, Task } from "@prisma/client";

export type Icons = "⏰" | "🚀" | "❌" | "📚" | "💥" | "☕️";
export type Status = "In Progress" | "Completed" | "Won't Do" | "To Do";

export type BoardWithTasks = Board & { tasks: Task[] };

export type TaskProps = Partial<Task> & {
	handleShow: (taskId: string) => void;
};

export type BoardDetailsProps = {
	board: BoardWithTasks;
	setHidden: (value: boolean) => void;
	updateBoard: (updatedBoard: BoardWithTasks) => void;
};

export type HeaderProps = {
	name?: string;
	description?: string;
	setHidden: (value: boolean) => void;
};

export type ShowDetailsProps = {
	children: React.ReactNode;
	setHidden: (value: boolean) => void;
	hidden: boolean;
};

export type ButtonProps = {
	type?: "button" | "submit" | "reset";
	disable?: boolean;
	name: string;
	className?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
};
