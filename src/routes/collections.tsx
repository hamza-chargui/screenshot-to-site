import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — ARIMENE" },
      { name: "description", content: "Toute la collection ARIMENE : ensembles, pantalons larges et hauts élégants." },
      { property: "og:title", content: "Collections — ARIMENE" },
      { property: "og:description", content: "Toute la collection ARIMENE." },
    ],
  }),
  component: () => (
    <CatalogPage eyebrow="Collection Femme" title="Collections" intro="Des silhouettes pudiques et intemporelles, pensées pour s'accorder entre elles et sublimer chaque moment." />
  ),
});
