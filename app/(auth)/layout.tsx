function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
                {/* Instagram-inspired animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-purple-800 dark:via-pink-800 dark:to-red-800"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400 via-orange-500 to-pink-500 opacity-70 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-50 dark:opacity-30 mix-blend-color-dodge animate-pulse"></div>

                {/* Floating gradient orbs for depth */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply opacity-70 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply opacity-60 animate-float-delayed"></div>
                <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply opacity-50 animate-float-slow"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}
export default AuthLayout;
