import { ButtonProps } from "@/lib/types";

export default function Button({ type = "button", disable = false, name, className = "", icon, onClick }: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disable}
			onClick={onClick}
			className={`flex items-center gap-2 text-sm text-white rounded-2xl px-5 py-1.5 cursor-pointer disabled:cursor-not-allowed ${
				disable ? "opacity-50" : "hover:opacity-80"
			} ${className}`}
		>
			<span>{name}</span>
			{icon}
		</button>
	);
}
