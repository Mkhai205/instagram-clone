"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Activity,
    Bookmark,
    ChevronLeft,
    LogOut,
    Menu,
    MessageSquareWarning,
    Moon,
    Settings,
    Sun,
    SunMoon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

function MoreDropdown() {
    const [open, setOpen] = useState(false);
    const [showModeToggle, setShowModeToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Close the dropdown when the user clicks outside
        function handleClickOutside(event: MouseEvent) {
            if (!event.target || !(event.target instanceof Node)) return;
            if (ref.current && !ref.current.contains(event.target)) {
                setShowModeToggle(false);
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
                <Button
                    size={"lg"}
                    variant={"ghost"}
                    onClick={() => setOpen(!open)}
                    className="md:w-full lg:!justify-start gap-x-2 !px-3"
                >
                    <Menu className="!w-6 !h-6" />
                    <div className="hidden lg:block">More</div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                ref={ref}
                align="end"
                alignOffset={-30}
                className={cn("dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity", {
                    "opacity-0": !open,
                })}
            >
                {!showModeToggle && (
                    <>
                        <DropdownMenuItem className="menuItem">
                            <span>
                                <Settings size={20} />
                            </span>
                            <p>Settings</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem">
                            <span>
                                <Activity size={20} />
                            </span>
                            <p>Your activity</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem">
                            <span>
                                <Bookmark size={20} />
                            </span>
                            <p>Saved</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="menuItem"
                            onClick={() => setShowModeToggle(true)}
                        >
                            <span>
                                <SunMoon size={20} />
                            </span>
                            <p>Switch appearance</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem">
                            <span>
                                <MessageSquareWarning size={20} />
                            </span>
                            <p>Report a problem</p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-neutral-700 py-0.5 my-1" />
                        <DropdownMenuItem className="menuItem">
                            <p>Switch account</p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-neutral-700 my-1" />
                        <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
                            <span>
                                <LogOut size={20} />
                            </span>
                            <p>Log out</p>
                        </DropdownMenuItem>
                    </>
                )}

                {showModeToggle && (
                    <>
                        <div
                            className="flex items-center border-b border-gray-200 
                            dark:border-neutral-700 py-3.5 px-2.5"
                        >
                            <span className="p-2 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-[#3C3C3C] cursor-pointer rounded-lg">
                                <ChevronLeft size={20} onClick={() => setShowModeToggle(false)} />
                            </span>
                            <p className="font-bold ml-2">Switch appearance</p>
                            {theme === "dark" ? (
                                <span className="ml-auto">
                                    <Moon size={20} />
                                </span>
                            ) : (
                                <span className="ml-auto">
                                    {" "}
                                    <Sun size={20} />
                                </span>
                            )}
                        </div>

                        <DropdownMenuItem className="menuItem">
                            <Label
                                htmlFor="dark-mode"
                                className="flex items-center justify-between w-full cursor-pointer"
                            >
                                Dark Mode
                                <Switch
                                    id="dark-mode"
                                    checked={theme === "dark"}
                                    onCheckedChange={(checked) => {
                                        setTheme(checked ? "dark" : "light");
                                    }}
                                />
                            </Label>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default MoreDropdown;
