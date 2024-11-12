import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNews, fetchSummary } from '../services/api';
import NewsGrid from '../components/NewsGrid';
import SummaryModal from '../components/SummaryModal';
import { Article } from '../types';
import { AlertCircle, Loader2 } from 'lucide-react';

const validCategories = [
  'top',
  'general',
  'business',
  'entertainment',
  'health',
  'sports',
  'technology',
];

export default function NewsPage() {
  const { category = 'top' } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!validCategories.includes(category)) {
      navigate('/top', { replace: true });
      return;
    }

    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(category);
        if (data.length === 0) {
          setError('No articles found for this category. Please try again later.');
          return;
        }
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, navigate]);

  const handleSummaryClick = async (article: Article) => {
    try {
      setSelectedArticle(article);
      setSummaryLoading(true);
      setSummary('Generating summary...');
      const articleSummary = await fetchSummary(article.link);
      setSummary(articleSummary);
    } catch (err) {
      setSummary(err instanceof Error ? err.message : 'Failed to generate summary. Please try again later.');
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <NewsGrid
        articles={articles}
        category={category}
        onSummaryClick={handleSummaryClick}
      />
      <SummaryModal
        isOpen={!!selectedArticle}
        onClose={() => {
          setSelectedArticle(null);
          setSummary('');
        }}
        title={selectedArticle?.title || ''}
        summary={summary}
      />
    </div>
  );
}