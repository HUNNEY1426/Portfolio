/**
 * Structured data (schema.org JSON-LD) for search engines and AI answer
 * engines. `<` is escaped so the JSON can never close the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
