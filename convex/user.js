import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string()
  },
  handler: async (ctx, args) => {
    const { userName, email, imageUrl } = args;
    // 检查用户是否已存在
    const existingUser = await ctx.db.query('users')
      .filter((q) => q.eq(q.field('email'), email))
      .collect();

    if (existingUser.length === 0) {
      // 创建新用户
      await ctx.db.insert('users', {
        userName,
        email,
        imageUrl
      });
      return "新建新用户成功"
    }

  }
})