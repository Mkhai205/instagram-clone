import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Instagram } from "lucide-react";
import { InstagramIcon } from "./Icon";

function Logo() {
    return (
        <Link
            href="/dashboard"
            className={buttonVariants({
                className: "hidden md:flex navLink !mb-10 hover:!bg-transparent lg:!p-0",
                variant: "ghost",
                size: "lg",
            })}
        >
            <span
                className="lg:hidden transition-all 
                duration-300 ease-in-out transform hover:scale-110"
            >
                <Instagram className="!w-8 !h-8 shrink-0" />
            </span>
            <span
                className={`pl-2 hidden lg:block transition-all 
                duration-300 ease-in-out transform hover:scale-105`}
            >
                <InstagramIcon className="!w-[103px] !h-[29px]" />
            </span>
        </Link>
    );
}

export default Logo;
