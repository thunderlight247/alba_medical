import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required().max(110) }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The last part of the article URL. Keep it short and descriptive.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the Articles page and in search results.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
    }),
    defineField({ name: "publishedAt", title: "Published on", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({ name: "body", title: "Body", type: "blockContent", validation: (Rule) => Rule.required() }),
  ],
  orderings: [
    { name: "publishedDesc", title: "Newest first", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
