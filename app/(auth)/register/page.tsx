import { InstagramIcon } from "@/components/Icon";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

function RegisterPage() {
    return (
        <div className="space-y-6">
            {/* Main Register Card */}
            <Card
                className="border border-white/20 dark:border-gray-600/30 shadow-2xl bg-white/95 
                dark:bg-slate-900/85 backdrop-blur-xl backdrop-saturate-150"
            >
                <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                        <div
                            className="p-4 rounded-3xl bg-gradient-to-r from-purple-500 
                            via-pink-500 to-orange-500 shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <InstagramIcon className="!w-24 !h-7 text-white drop-shadow-lg" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
                        Join Instagram{" "}
                    </h1>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                        Sign up to see photos and videos from your friends
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <LoginForm />

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            By signing up, you agree to our Terms, Data Policy and Cookies Policy
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Sign In Card */}
            <Card
                className="border border-white/20 dark:border-gray-600/30 shadow-xl bg-white/95 
            dark:bg-slate-900/85 backdrop-blur-xl backdrop-saturate-150"
            >
                <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                            dark:hover:text-blue-300 font-semibold transition-colors"
                        >
                            Log in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
export default RegisterPage;
