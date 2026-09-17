interface JsonLdProps {
  type: string;
  data: Record<string, unknown>;
}

const JsonLd = ({ type, data }: JsonLdProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default JsonLd; 