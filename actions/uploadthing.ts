"use server"

const UT_SECRET = process.env.UPLOADTHING_SECRET;

export const generateUploadThingURL = (path: `/${string}`) => {
  const host = process.env.CUSTOM_INFRA_URL ?? "https://uploadthing.com";
  return `${host}${path}`;
};

export const deleteFiles = async (fileKeys: string[] | string) => {
  if (!Array.isArray(fileKeys)) fileKeys = [fileKeys];
  if (!UT_SECRET) throw new Error("Missing UPLOADTHING_SECRET env variable.");

  const res = await fetch(generateUploadThingURL("/api/deleteFile"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-uploadthing-api-key": UT_SECRET,
      "x-uploadthing-version": "6.1.1",
    },
    body: JSON.stringify({ fileKeys }),
  });
  if (!res.ok) {
    throw new Error("Failed to delete files");
  }
  return res.json() as Promise<{ success: boolean }>;
};