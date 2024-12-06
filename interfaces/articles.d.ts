interface ArticleInput {
  title: string;
  message: string;
  image: string;
  type: ArticleType | undefined;
  author: string;
}
type ArticleType = 'cover' | 'article' | 'breve' | 'news' | 'sports';

interface Metadata {
  createdAt: string;
  updatedAt?: string;
  likes?: string[];
  views?: string[];
}

interface Article {
  id: string;
  posted: boolean;
  articleInput: ArticleInput;
  metadata: Metadata;
}
