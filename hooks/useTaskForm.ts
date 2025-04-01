import { Task } from "@prisma/client";
import { useForm } from "react-hook-form";

export function useTaskForm(task: Task | undefined | null) {
	return useForm({
		defaultValues: task || {
			name: "",
			description: "",
			status: "To Do",
			icon: "",
		},
	});
}
