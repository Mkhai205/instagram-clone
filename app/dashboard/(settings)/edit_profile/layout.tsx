import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
    ArrowDownToLine,
    Ban,
    Bell,
    CircleOff,
    CircleUserRound,
    Languages,
    LaptopMinimalCheck,
    LifeBuoy,
    Lock,
    PersonStanding,
    ShieldQuestionMark,
    Star,
    UserRound,
} from "lucide-react";
import Link from "next/link";

const SETTING_TABS = [
    {
        heading: "How you use Instagram",
        content: [
            { title: "Edit profile", value: "edit_profile", Icon: CircleUserRound },
            { title: "Notifications", value: "notifications", Icon: Bell },
        ],
    },
    {
        heading: "Who can see your content",
        content: [
            { title: "Account privacy", value: "account_privacy", Icon: Lock },
            { title: "Close Friends", value: "close_friends", Icon: Star },
            { title: "Blocked", value: "blocked", Icon: Ban },
            { title: "Hide story and live", value: "hide_story_and_live", Icon: CircleOff },
        ],
    },

    {
        heading: "Your app and media",
        content: [
            {
                title: "Archiving and downloading",
                value: "archiving_and_downloading",
                Icon: ArrowDownToLine,
            },
            { title: "Accessibility", value: "accessibility", Icon: PersonStanding },
            { title: "Language", value: "language", Icon: Languages },
            {
                title: "Website permissions",
                value: "website_permissions",
                Icon: LaptopMinimalCheck,
            },
        ],
    },

    {
        heading: "More info and support",
        content: [
            { title: "Help", value: "help", Icon: LifeBuoy },
            { title: "Privacy Center", value: "privacy_center", Icon: ShieldQuestionMark },
            { title: "Account Status", value: "Account Status", Icon: UserRound },
        ],
    },
];

function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <ScrollArea className="w-[240px] md:w-[260px] !fixed top-0 left-0 h-full md:ml-20 lg:ml-64">
                <Tabs
                    orientation="vertical"
                    defaultValue="edit_profile"
                    className="space-y-8 px-3 py-8 h-full flex flex-col lg:border-r"
                >
                    <h4 className="font-bold text-2xl text-white ml-3">Settings</h4>

                    <TabsList className="flex flex-col items-start justify-start h-full bg-transparent space-y-2">
                        {SETTING_TABS.map((tabs, groupIndex) => (
                            <div key={groupIndex} className="w-full">
                                <h5 className="text-xs p-3 text-neutral-400 font-medium">
                                    {tabs.heading}
                                </h5>
                                {tabs.content.map((tab) => (
                                    <Link
                                        key={tab.value}
                                        href={`/dashboard/${tab.value}`}
                                        className="flex items-center gap-x-2"
                                    >
                                        <TabsTrigger
                                            value={tab.value}
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                    size: "lg",
                                                }),
                                                `text-white font-normal data-[state=active]:bg-zinc-100 w-full justify-start !px-3
                                            dark:data-[state=active]:bg-neutral-800 dark:hover:bg-neutral-900`
                                            )}
                                        >
                                            <span className="hidden md:inline">
                                                <tab.Icon className="!h-6 !w-6" />
                                            </span>
                                            {tab.title}
                                        </TabsTrigger>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </TabsList>
                </Tabs>
            </ScrollArea>

            <div className="flex-1 ml-[240px] md:ml-[260px] min-h-screen bg-white dark:bg-neutral-950">
                {children}
            </div>
        </div>
    );
}
export default SettingsLayout;
