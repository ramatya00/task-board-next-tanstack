import { Board, Task } from "@prisma/client";

export type BoardWithTasks = Board & { tasks: Task[] };

export type TaskProps = Partial<Task>;

export type BoardDetailsProps = {
	board: BoardWithTasks;
	setHidden: (value: boolean) => void;
	onBoard: boolean;
};

export type TaskFormProps = {
	boardId: string;
	task?: Task;
	onTask: boolean;
	onSuccess?: () => void;
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
