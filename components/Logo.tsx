import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Instagram } from "lucide-react";

function Logo() {
    return (
        <Link
            href="/dashboard"
            className={buttonVariants({
                className:
                    "hidden md:flex navLink !mb-10 lg:hover:!bg-transparent lg:!p-0",
                variant: "ghost",
                size: "lg",
            })}
        >
            <Instagram className="!w-8 !h-8 shrink-0 lg:hidden" />
            <p className={`font-semibold text-xl pl-2 hidden lg:block`}>
                Instagram
            </p>
        </Link>
    );
}

export default Logo;
