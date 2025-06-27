import SideNav from "@/components/SideNav";

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
            <div className="flex-grow flex-1 w-full max-w-7xl mx-auto mt-12 md:mt-0 sm:p-6 md:p-12 md:overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
