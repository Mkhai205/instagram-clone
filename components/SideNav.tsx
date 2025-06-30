import { auth } from "@/auth";
import Logo from "./Logo";
import NavLink from "./NavLink";
import MoreDropdown from "./MoreDropdown";
import ProfileLink from "./ProfileLink";

async function SideNav() {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="flex flex-col h-full px-3 py-4 md:px-2">
            <div
                className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 
                justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 
                md:border-none flex flex-row md:justify-between gap-x-2 md:flex-col 
                md:gap-x-0 md:gap-y-2 p-2"
            >
                <Logo />
                <NavLink />
                {user && <ProfileLink user={user} />}

                <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
                    <MoreDropdown />
                </div>
            </div>
        </div>
    );
}

export default SideNav;
