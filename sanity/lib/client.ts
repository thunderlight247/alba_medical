import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read-only client for published content. The placeholder project ID keeps the
 * module importable before the project is connected; never query it in that state
 * (guard with isSanityConfigured).
 */
export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
