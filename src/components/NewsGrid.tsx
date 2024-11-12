import React from 'react';
import { Article } from '../types';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: Article[];
  category: string;
  onSummaryClick: (article: Article) => void;
}

export default function NewsGrid({ articles, category, onSummaryClick }: NewsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 capitalize">
        {category} News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.link}-${index}`}
            article={article}
            onSummaryClick={onSummaryClick}
          />
        ))}
      </div>
    </div>
  );
}