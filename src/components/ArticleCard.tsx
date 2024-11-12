import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSummaryClick: (article: Article) => void;
  categoryColor: string;
}

export default function ArticleCard({ article, onSummaryClick, categoryColor }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute bottom-0 left-0 ${categoryColor} text-white px-3 py-1 rounded-tr-lg`}>
          {article.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {format(new Date(article.pubDate), 'MMM dd, yyyy')}
        </p>
        <p className="text-gray-700 line-clamp-2 mb-4">{article.description}</p>

        <div className="flex justify-between gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Read More
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSummaryClick(article)}
            className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Summary
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}