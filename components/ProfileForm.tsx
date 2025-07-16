"use client";

import { UserWithExtras } from "@/lib/definitions";
import { UpdateUser } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileAvatar from "./ProfileAvatar";
import UserAvatar from "./UserAvatar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateProfile } from "@/lib/actions";
import { toast } from "sonner";
import Error from "./Error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

function ProfileForm({ profile }: { profile: UserWithExtras }) {
    const form = useForm<z.infer<typeof UpdateUser>>({
        resolver: zodResolver(UpdateUser),
        defaultValues: {
            id: profile.id,
            image: profile.image || "",
            name: profile.name || "",
            username: profile.username || "",
            bio: profile.bio || "",
            gender: profile.gender || "",
            website: profile.website || "",
        },
    });

    const { isDirty, isValid, isSubmitting } = form.formState;

    return (
        <div className="space-y-8 py-8 lg:py-10">
            <div
                className="flex items-center justify-between bg-neutral-500 
                dark:bg-neutral-800 px-4 py-3 rounded-xl"
            >
                <div className="flex items-center gap-x-3 md:gap-x-5">
                    <ProfileAvatar user={profile}>
                        <UserAvatar user={profile} className="w-12 h-12 cursor-pointer" />
                    </ProfileAvatar>
                    <div className="hidden sm:flex sm:flex-col gap-x-2">
                        <p className="font-semibold">{profile.username}</p>
                        <p className="text-sm font-medium">{profile.name}</p>
                    </div>
                </div>
                <ProfileAvatar user={profile}>
                    <Button
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-600/80 text-white rounded-lg"
                    >
                        Change photo
                    </Button>
                </ProfileAvatar>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async (values) => {
                        const response = await updateProfile(values);
                        if (response.status === "200") {
                            toast.success(response.message);
                            form.reset(values);
                        } else {
                            toast.error(<Error response={response} />);
                        }
                    })}
                    className="space-y-8"
                >
                    <FormField
                        disabled
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Website
                                    </FormLabel>
                                    <FormControl aria-disabled className="px-3 py-4">
                                        <Input
                                            disabled
                                            placeholder="Website"
                                            className="h-11 rounded-xl disabled:bg-neutral-600 placeholder:text-white"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    Editing your links is only available on mobile. Visit the
                                    Instagram app and edit your profile to change the websites in
                                    your bio.
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Name
                                    </FormLabel>
                                    <FormControl aria-disabled className="px-3 py-4">
                                        <Input
                                            placeholder="Your name"
                                            className="h-11 rounded-xl"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    {field.value?.length} / 30
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Bio
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none rounded-xl whitespace-pre-wrap break-words overflow-wrap-anywhere"
                                            placeholder="Tell your story..."
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    {field.value?.length} / 150
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Gender
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-14 rounded-xl">
                                                <SelectValue placeholder="Prefer not to say" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="prefer-not-to-say">
                                                Prefer not to say
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    This won’t be part of your public profile.
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="md:ml-24"
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
export default ProfileForm;
