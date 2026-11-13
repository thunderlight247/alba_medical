import { defineArrayMember, defineField, defineType } from "sanity";

/** Article body: headings, lists, quotes, links and captioned images. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Article body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({ name: "href", title: "URL", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }) }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      name: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.warning("Alternative text helps visually impaired readers and SEO."),
        }),
      ],
    }),
  ],
});
