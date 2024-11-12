import React from 'react';
import { Article } from '../types';
import { ExternalLink, FileText } from 'lucide-react';

interface NewsCardProps {
  article: Article;
  onSummaryClick: (article: Article) => void;
}

export default function NewsCard({ article, onSummaryClick }: NewsCardProps) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <span className="absolute bottom-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-sm">
          {article.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{formattedDate}</p>
        <p className="text-gray-700 line-clamp-2 mb-4">{article.description}</p>
        
        <div className="flex justify-between gap-4">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Read More</span>
          </a>
          <button
            onClick={() => onSummaryClick(article)}
            className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
}