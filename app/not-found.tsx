import Button from "@/components/ui/Button";
import Link from "next/link";

export default function notFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="flex flex-col gap-5 items-center">
				<h1 className="text-4xl">Page Not Found.</h1>
				<Link href="/">
					<Button name="Go to Homepage" className="bg-black" />
				</Link>
			</div>
		</div>
	);
}
