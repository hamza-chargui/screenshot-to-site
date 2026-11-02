import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

export const Route = createFileRoute("/ensembles")({
  head: () => ({
    meta: [
      { title: "Ensembles coordonnés — ARIMENE" },
      { name: "description", content: "Ensembles coordonnés ARIMENE : hauts et pantalons larges assortis." },
      { property: "og:title", content: "Ensembles coordonnés — ARIMENE" },
      { property: "og:description", content: "Ensembles coordonnés ARIMENE." },
    ],
  }),
  component: () => <CatalogPage initialCategory="ensembles" eyebrow="Pièces assorties" title="Ensembles" intro="Hauts et pantalons larges coordonnés, aux détails rayés délicats, en marine et bordeaux." />,
});
