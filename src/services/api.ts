import axios, { AxiosError } from 'axios';
import { Article, NewsApiResponse, SummaryApiResponse } from '../types';

const NEWS_API_KEY = 'pub_58315163a0f80458adcdd8bde549fe5787a31';
const SUMMARY_API_KEY = 'a9a14cb550msh27af0f1b1dea71cp17124djsnbec4dcfe553e';

const newsApi = axios.create({
  baseURL: 'https://newsdata.io/api/1',
  params: {
    apikey: NEWS_API_KEY,
    language: 'en',
    country: 'us',
  },
});

const summaryApi = axios.create({
  baseURL: 'https://article-extractor-and-summarizer.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': SUMMARY_API_KEY,
    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
  },
});

export const fetchNews = async (category: string): Promise<Article[]> => {
  try {
    const { data } = await newsApi.get<NewsApiResponse>('/news', {
      params: {
        category: category === 'top' ? undefined : category,
      },
    });

    if (!data || !Array.isArray(data.results)) {
      throw new Error('Invalid response format from news API');
    }

    return data.results
      .filter(article => article.title && article.link)
      .map(article => ({
        title: article.title,
        image_url: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop',
        category: article.category?.[0] || category,
        description: article.description || 'No description available',
        link: article.link,
        pubDate: article.pubDate || new Date().toISOString(),
        content: article.content || '',
      }));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach the news service');
      }
    }
    throw new Error('Failed to fetch news: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

export const fetchSummary = async (url: string): Promise<string> => {
  try {
    const { data } = await summaryApi.get<SummaryApiResponse>('/summarize', {
      params: { url, length: 3 },
    });

    if (!data || typeof data.summary !== 'string') {
      throw new Error('Invalid summary response format');
    }

    return data.summary;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(`Summary API Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach the summary service');
      }
    }
    throw new Error('Failed to generate summary: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};