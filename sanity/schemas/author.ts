import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role at Alba Medical", type: "string", description: "e.g. Chief Medical Laboratory Scientist" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
