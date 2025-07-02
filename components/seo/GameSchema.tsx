import Script from 'next/script';

interface GameSchemaProps {
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  publishDate: string;
  publisher: string;
  genre: string[];
  platform: string[];
  rating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export default function GameSchema({
  name,
  description,
  imageUrl,
  url,
  publishDate,
  publisher,
  genre,
  platform,
  rating,
}: GameSchemaProps) {
  // 构建游戏的Schema.org结构化数据
  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name,
    description,
    image: imageUrl,
    url,
    datePublished: publishDate,
    publisher: {
      '@type': 'Organization',
      name: publisher,
    },
    gamePlatform: platform,
    genre,
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.ratingValue,
        ratingCount: rating.ratingCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };

  return (
    <Script
      id="schema-game"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
    />
  );
} 