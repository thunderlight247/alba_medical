export type BlogImage = { _type: "image"; alt?: string; asset?: { _ref: string } };

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: BlogImage;
  categories?: string[];
};

export type Post = PostSummary & {
  body?: unknown[];
  author?: { name?: string; image?: BlogImage };
};
