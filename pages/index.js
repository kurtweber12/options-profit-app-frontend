import Image from "next/image";
import { Inter } from "next/font/google";
import { PlusIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Overview from "@/components/index/Overview";
import Link from "next/link";
import { useState } from "react";
import useFilter from "@/hooks/useFilter";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [formValues, setFormValues] = useState({
		ticker: "",
		year: "",
	});
	const { filter, handleFilterChange } = useFilter();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleFilterSubmit = () => {
		handleFilterChange(formValues);
	};

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
					<div className="border-b border-gray-800" />
					<button
						className="flex flex-row items-center bg-blue-300/30 
						hover:bg-blue-300/50 p-2 rounded-full px-4"
						onClick={handleFilterSubmit}
					>
						<ListBulletIcon className="h-8 w-8 mr-2" />
						Filter Contracts
					</button>
					<div>
						<form>
							<label>Ticker</label>
							<input
								type="text"
								name="ticker"
								placeholder="Ticker"
								value={formValues.ticker}
								onChange={handleInputChange}
								className="input-field-text-boxes"
							/>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
