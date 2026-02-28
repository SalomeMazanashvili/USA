// Matches NewsItem type in src/lib/queries.ts
export const newsSchema = {
  name: "news",
  title: "ახალი ამბები",
  type: "document",
  fields: [
    {
      name: "title",
      title: "სათაური",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featured",
      title: "მთავარი სტატია?",
      type: "boolean",
      description: "მოათავსე მთავარ ადგილზე",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "გამოქვეყნების თარიღი",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "კატეგორია",
      type: "string",
      description: "მაგ: იმიგრაცია, ფინანსები, საზოგადოება",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "მთავარი სურათი",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt ტექსტი", type: "string" }],
    },
    {
      name: "excerpt",
      title: "მოკლე აღწერა",
      type: "text",
      rows: 3,
      description: "მოკლე შინაარსი სიაში გამოსაჩენად",
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: "body",
      title: "სტატიის ტექსტი",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "ნორმალური", value: "normal" },
            { title: "სათაური 2", value: "h2" },
            { title: "სათაური 3", value: "h3" },
            { title: "ციტატა", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt ტექსტი", type: "string" }],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", featured: "featured", date: "publishedAt" },
    prepare({ title, media, featured, date }) {
      const d = date ? new Date(date).toLocaleDateString("ka-GE") : "";
      return { title, media, subtitle: `${featured ? "⭐ მთავარი · " : ""}${d}` };
    },
  },
};
