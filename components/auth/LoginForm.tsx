"use client";

import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/common";

export default function LoginForm() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-disabled={pending}
            disabled={pending}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <GoogleIcon className="w-5 h-5" />
                    Continue with Google
                </div>
            )}
        </Button>
    );
}
