import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/Layout";
import { PhotoSlot } from "@/components/site/PhotoSlot";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — ARIMENE" },
      { name: "description", content: "L'histoire et les valeurs d'ARIMENE, maison tunisienne de mode pudique." },
      { property: "og:title", content: "À propos — ARIMENE" },
      { property: "og:description", content: "L'histoire de la maison ARIMENE." },
    ],
  }),
  component: About,
});

const VALUES = [
  ["Élégance", "Des lignes épurées et des proportions justes, pour une allure naturelle."],
  ["Pudeur", "Des coupes couvrantes et fluides, qui respectent et subliment."],
  ["Exigence", "Des matières choisies avec soin et des finitions maîtrisées."],
];

function About() {
  return (
    <>
      <PageIntro eyebrow="La maison" title="À propos">Une maison tunisienne de mode pudique, née d'une conviction : l'élégance se vit avec naturel.</PageIntro>
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pb-24 md:px-10 lg:grid-cols-2">
        <PhotoSlot ratio="4/5" label="Portrait de la fondatrice" />
        <div className="lg:pl-12">
          <h2 className="display text-5xl text-primary">Notre histoire</h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">ARIMENE est née du désir de proposer aux femmes une garde-robe pudique qui ne renonce jamais au raffinement. Chaque pièce est pensée pour accompagner le quotidien avec confort et assurance.</p>
          <div className="mt-14 space-y-8">
            {VALUES.map(([t, d], i) => (
              <div key={t} className="grid grid-cols-[3rem_1fr] border-t border-gold/40 pt-6">
                <span className="font-serif text-gold">0{i + 1}</span>
                <div><p className="font-serif text-2xl text-primary">{t}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
