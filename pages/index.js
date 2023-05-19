import Image from "next/image";
import { Inter } from "next/font/google";
import { PlusIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Overview from "@/components/index/Overview";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
		>
			<h1 className="text-3xl font-thin tracking-wider">
				Options Profit Tracker
			</h1>
			<div className="flex flex-row w-full mt-8 justify-between border-gray-800 border p-4">
				<Overview />

				<div className="flex flex-col space-y-4 border-l pl-2 border-gray-800">
					<Link href="/add-contract">
						<button className="flex flex-row items-center bg-green-300/30 hover:bg-green-300/50 p-2 px-4 rounded-full">
							<PlusIcon className="h-8 w-8 mr-2" />
							Add New Contract
						</button>
					</Link>
					<button className="flex flex-row items-center bg-blue-300/30 hover:bg-blue-300/50 p-2 rounded-full px-4">
						<ListBulletIcon className="h-8 w-8 mr-2" />
						View All Contracts
					</button>
				</div>
			</div>
		</main>
	);
}
