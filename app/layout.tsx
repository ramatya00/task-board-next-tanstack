import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Outfit({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Task Board",
	description: "Manage your tasks with ease",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.className} font-normal text-black bg-white antialiased`}>
				<QueryProvider>
					<div className="mx-auto max-w-[500px] px-4">{children}</div>
				</QueryProvider>
			</body>
		</html>
	);
}
