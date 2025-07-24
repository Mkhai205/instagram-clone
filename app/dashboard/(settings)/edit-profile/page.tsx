import { auth } from "@/auth";
import { ProfileForm } from "@/components/profile";
import { fetchProfileByUsername } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit Profile",
    description: "Edit your profile settings",
};

async function EditProfilePage() {
    const session = await auth();
    const profile = await fetchProfileByUsername(session!.user.username!);

    if (!profile) {
        notFound();
    }

    return (
        <div className="max-w-xl mx-auto pl-2 pr-6">
            <h1 className="text-2xl font-medium">Edit profile</h1>
            <ProfileForm profile={profile} />
        </div>
    );
}
export default EditProfilePage;
