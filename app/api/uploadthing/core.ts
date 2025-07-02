import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    fileUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async () => {
            // This code runs on your server before upload
            const session = await auth();
            const user = session?.user;

            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("🚀 Upload complete for userId:", metadata.userId);

            console.log("🚀 File url", file.ufsUrl);

            // !!! Whatever is returned here is sent to the client side `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
