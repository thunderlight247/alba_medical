import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

/** Build a CDN image URL for a Sanity image field. */
export function urlFor(source: any) {
  return builder.image(source);
}
