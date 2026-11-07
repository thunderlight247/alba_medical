import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->title
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  body,
  "author": author->{ name, image },
  "categories": categories[]->title
}`;

export const postSitemapQuery = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  publishedAt
}`;
