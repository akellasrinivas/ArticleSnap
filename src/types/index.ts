export interface Article {
  title: string;
  image_url: string;
  category: string;
  description: string;
  link: string;
  pubDate: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: {
    title?: string;
    link?: string;
    image_url?: string;
    category?: string[];
    description?: string;
    pubDate?: string;
    content?: string;
  }[];
}

export interface SummaryApiResponse {
  summary: string;
  status: string;
}