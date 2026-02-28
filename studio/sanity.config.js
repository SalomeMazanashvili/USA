import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index.js";

export default defineConfig({
  name: "georgia-usa",
  title: "GeorgiaUSA CMS",
  projectId: "2v0skw6k",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("კონტენტი")
          .items([
            S.listItem()
              .title("ახალი ამბები")
              .schemaType("news")
              .child(S.documentTypeList("news").title("ყველა სტატია")),
            S.listItem()
              .title("ვაკანსიები")
              .schemaType("vacancy")
              .child(S.documentTypeList("vacancy").title("ყველა ვაკანსია")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
