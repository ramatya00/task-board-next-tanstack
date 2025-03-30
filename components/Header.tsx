import { HeaderProps } from "@/lib/types";
import Image from "next/image";

export default function Header({ name, description, setHidden }: HeaderProps) {
	return (
		<header className="">
			<header className="flex items-start gap-3 px-2">
				<Image src="/Logo.svg" alt="logo svg" width={"40"} height={"40"} />
				<div className="space-y-2">
					<div className="flex items-center gap-5">
						<h1 className="text-4xl">{name}</h1>
						<button className="cursor-pointer w-fit shrink-0" onClick={() => setHidden(false)}>
							<Image src="/Edit_duotone.svg" alt="edit svg" width={"24"} height={"24"} />
						</button>
					</div>
					<p>{description}</p>
				</div>
			</header>
		</header>
	);
}
