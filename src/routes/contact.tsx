import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ARIMENE" },
      { name: "description", content: "Contactez le service client ARIMENE." },
      { property: "og:title", content: "Contact — ARIMENE" },
      { property: "og:description", content: "Contactez le service client ARIMENE." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageIntro eyebrow="Service client" title="Contact">Une question sur une pièce, une taille ou une commande ? Nous vous répondons avec plaisir.</PageIntro>
      <section className="mx-auto grid max-w-5xl gap-16 px-6 pb-24 md:grid-cols-[1fr_1.4fr] md:px-10">
        <div className="space-y-8 text-sm">
          {[["Téléphone", "+216 00 000 000"], ["E-mail", "contact@arimene.tn"], ["Adresse", "Adresse à confirmer, Tunisie"], ["Horaires", "Horaires à confirmer"]].map(([k, v]) => (
            <div key={k}><p className="eyebrow mb-2 text-[0.6rem] text-gold">{k}</p><p className="font-serif text-xl text-primary">{v}</p></div>
          ))}
        </div>
        {sent ? (
          <p className="font-serif text-3xl italic text-primary">Merci, votre message a bien été envoyé.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
            <input required placeholder="Nom complet" className="field" />
            <input required type="email" placeholder="E-mail" className="field" />
            <textarea required rows={5} placeholder="Votre message" className="field resize-none" />
            <button className="btn-primary">Envoyer</button>
          </form>
        )}
      </section>
    </>
  );
}
