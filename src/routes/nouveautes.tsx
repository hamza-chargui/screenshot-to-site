import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

export const Route = createFileRoute("/nouveautes")({
  head: () => ({
    meta: [
      { title: "Nouveautés — ARIMENE" },
      { name: "description", content: "Les dernières pièces ARIMENE, fraîchement arrivées." },
      { property: "og:title", content: "Nouveautés — ARIMENE" },
      { property: "og:description", content: "Les dernières pièces ARIMENE." },
    ],
  }),
  component: () => <CatalogPage onlyNew eyebrow="Fraîchement arrivées" title="Nouveautés" intro="Les dernières créations de la maison, à découvrir en avant-première." />,
});
