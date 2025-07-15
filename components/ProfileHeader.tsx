import { ChevronDown, Settings, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

function ProfileHeader({ username }: { username: string | null }) {
    return (
        <header
            className="fixed md:hidden top-0 left-0 bg-white dark:bg-neutral-950 flex items-center 
            justify-between w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-1 sm:-ml-2"
        >
            <Button size={"icon"} variant={"ghost"}>
                <Settings className="!h-6 !w-6" />
            </Button>

            <div className="flex items-center gap-x-2 cursor-pointer">
                <p className="font-semibold">{username}</p>
                <ChevronDown />
            </div>

            <Button size={"icon"} variant={"ghost"}>
                <UserPlus className="!h-6 !w-6" />
            </Button>
        </header>
    );
}
export default ProfileHeader;
