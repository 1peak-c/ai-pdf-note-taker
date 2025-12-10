import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addFile = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string()
  },
  handler: async (ctx, args) => {
    const { fileId, storageId, fileName, fileUrl, createdBy } = args;
    return await ctx.db.insert('pdfFiles', {
      fileId,
      storageId,
      fileName,
      fileUrl,
      createdBy
    });
  }
})

export const getFileUrl = mutation({
  args: {
    storageId: v.string()
  },
  handler: async (ctx, args) => {
    const { storageId } = args;
    return await ctx.storage.getUrl(storageId) || '';
  }
})