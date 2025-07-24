import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/common";

function Header() {
    return (
        <header
            className="fixed md:hidden bg-white top-0 flex items-center justify-between
            dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-zinc-700
            px-3 py-2 sm:-ml-4"
        >
            <Link href="/dashboard">
                <InstagramIcon className="!w-[103px] !h-[29px]" />
            </Link>

            <div className="flex items-center gap-x-3">
                <div
                    className="flex items-center text-neutral-600 dark:text-neutral-400
                    bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5"
                >
                    <Search className="h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-neutral-950 dark:text-white placeholder:text-neutral-600 
                        dark:placeholder:text-neutral-400 flex-1 outline-none"
                    />
                </div>

                <Button size={"icon"} variant={"ghost"} className="relative hover:bg-transparent">
                    <Heart className="!w-6 !h-6" />
                    <span className="absolute top-1.5 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
            </div>
        </header>
    );
}
export default Header;
