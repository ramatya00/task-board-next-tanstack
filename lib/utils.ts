export function formatDate(date: Date | string): string {
	return new Date(date)
		.toLocaleString("id", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		})
		.replace(",", " -");
}
export const icons = ["⏰", "🚀", "❌", "📚", "💥", "☕️"];
export const status = ["In Progress", "Completed", "Won't Do"];

export function getStatusPriority(status: string): number {
	const priorities = {
		"In Progress": 1,
		"To Do": 2,
		Completed: 3,
		"Won't Do": 4,
	};

	return priorities[status as keyof typeof priorities] || 999;
}

// Normalize input by trimming and reducing multiple spaces to single spaces
export const normalizedName = (input: string) => input.trim().replace(/\s+/g, " ");
export const normalizedDescription = (input: string) => input.trim().replace(/\s+/g, " ") || "";
