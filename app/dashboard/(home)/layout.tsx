import { Header } from "@/components/navigation";

function HomePageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
export default HomePageLayout;
