// Matches Vacancy type in src/lib/queries.ts
export const vacancySchema = {
  name: "vacancy",
  title: "ვაკანსიები",
  type: "document",
  fields: [
    {
      name: "title",
      title: "პოზიციის სახელი",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "კატეგორია",
      type: "string",
      options: {
        list: [
          { title: "ძიძა", value: "nanny" },
          { title: "მომვლელი", value: "caregiver" },
          { title: "დალაგება", value: "cleaning" },
          { title: "დროებითი სამუშაოები", value: "temporary" },
          { title: "CDL მძღოლი", value: "cdl-driver" },
          { title: "დისპეჩერი", value: "dispatcher" },
          { title: "ავტორემონტი", value: "auto" },
          { title: "დაცვა", value: "security" },
          { title: "მშენებლობა", value: "construction" },
          { title: "განათლება / სპორტი", value: "education" },
          { title: "ქარხნები", value: "factory" },
          { title: "ფინანსები", value: "finance" },
          { title: "სტილისტი, სპა", value: "beauty" },
          { title: "ოფისი", value: "office" },
          { title: "მიმტანი / ბარმენი", value: "waiter" },
          { title: "სხვადასხვა", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "ლოკაცია",
      type: "string",
      description: "მაგ: ნიუ იორკი, NY",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "სამუშაოს ტიპი",
      type: "string",
      options: {
        list: [
          { title: "სრული განაკვეთი", value: "სრული განაკვეთი" },
          { title: "ნახევარი განაკვეთი", value: "ნახევარი განაკვეთი" },
          { title: "დროებითი", value: "დროებითი" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "გამოქვეყნების თარიღი",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "salary",
      title: "ანაზღაურება",
      type: "string",
      description: "მაგ: $20-25/საათი ან $1,200-1,800/კვირა",
    },
    {
      name: "description",
      title: "მოკლე აღწერა",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "requirements",
      title: "მოთხოვნები",
      type: "array",
      of: [{ type: "string" }],
      description: "დაამატეთ ყოველი მოთხოვნა ცალ-ცალკე",
    },
    {
      name: "benefits",
      title: "რას გთავაზობთ",
      type: "array",
      of: [{ type: "string" }],
      description: "დაამატეთ ყოველი შეღავათი ცალ-ცალკე",
    },
  ],
  preview: {
    select: { title: "title", category: "category", location: "location", salary: "salary" },
    prepare({ title, category, location, salary }) {
      return {
        title,
        subtitle: [location, salary].filter(Boolean).join(" · "),
      };
    },
  },
};
