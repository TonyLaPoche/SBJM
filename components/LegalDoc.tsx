export function LegalDoc({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="page-shell py-12 sm:py-16 md:py-24">
      <p className="eyebrow">{label}</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,9vw,4.5rem)]">
        {title}
      </h1>
      <div className="prose-legal mt-10 max-w-3xl space-y-8 text-base leading-relaxed text-ink-soft sm:mt-12 sm:text-lg">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm tracking-[0.16em] uppercase text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
