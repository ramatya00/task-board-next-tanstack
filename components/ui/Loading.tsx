export default function Loading({ message }: { message: string }) {
	return (
		<div className="absolute inset-0 flex items-center justify-center text-black bg-white">
			<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" />
			&nbsp;&nbsp;&nbsp;&nbsp;{message}
		</div>
	);
}
