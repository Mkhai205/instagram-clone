import { SideNav } from "@/components/navigation";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
            <div className="w-20 flex-none lg:w-64 md:border-r">
                <SideNav />
            </div>
            <div className="flex-grow mt-8 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-4 md:p-8 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}
