import { PostBack } from "@/components/posts";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <PostBack />
            {children}
        </div>
    );
}
