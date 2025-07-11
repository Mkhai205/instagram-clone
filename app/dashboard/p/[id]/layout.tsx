import PostBack from "@/components/PostBack";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative">
            <PostBack />
            {children}
        </div>
    );
}
