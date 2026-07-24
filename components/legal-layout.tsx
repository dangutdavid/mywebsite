import { CompactHero } from "@/components/compact-layout";
import { Container } from "@/components/section";

export function LegalNotice({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <>
      <CompactHero eyebrow="Legal" title={title} copy={description} tone="brand" />
      <section className="border-b border-line bg-white">
        <Container className="py-8">
          <div className="mx-auto max-w-3xl">
            <ul className="divide-y divide-line border-y border-line text-base leading-7 text-slate">
              {items.map((item) => (
                <li key={item} className="py-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
