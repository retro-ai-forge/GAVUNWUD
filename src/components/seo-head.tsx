import Head from "next/head";

interface SeoHeadProps {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImage?: string;
  pageKeywords?: string;
}

const SeoHead = ({
  pageTitle,
  pageDescription,
  pagePath = "",
  pageImage = "/images/gavun-wud-logo.webp",
  pageKeywords = "",
}: SeoHeadProps) => {
  // Default values
  const defaultTitle = "WUD Memecoin | No. 1 Memecoin on Polkadot";
  const defaultDescription = "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot.";
  const defaultKeywords = "WUD, memecoin, cryptocurrency, Polkadot, Web3, DeFi, blockchain, tokens, Gavin Wood";
  
  const title = pageTitle ? `${pageTitle} | WUD Memecoin` : defaultTitle;
  const description = pageDescription || defaultDescription;
  const keywords = pageKeywords ? `${defaultKeywords}, ${pageKeywords}` : defaultKeywords;
  const canonical = `https://gavunwud.xyz${pagePath}`;
  const ogImage = `https://gavunwud.xyz${pageImage}`;

  return (
    <Head>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WUD Memecoin" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default SeoHead; 