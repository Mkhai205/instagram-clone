import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getUserId = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    return userId;
};
