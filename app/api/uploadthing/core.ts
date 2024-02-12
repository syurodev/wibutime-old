import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getServerSession } from "@/lib/getServerSession";

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession()
  return session
}

export const ourFileRouter = {
  smallImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
  coverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
  animeVideo: f({ video: { maxFileSize: "2GB" } })
    .middleware(async ({ req }) => {
      const user = await auth();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;