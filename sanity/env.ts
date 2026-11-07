/**
 * Sanity project settings.
 *
 * Create a project at https://sanity.io/manage, then copy the project ID into
 * NEXT_PUBLIC_SANITY_PROJECT_ID (see .env.example). Nothing on the site breaks
 * while the ID is missing: the articles page simply shows an empty state.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";

export const isSanityConfigured = projectId.length > 0;

/** Where the embedded Studio lives. */
export const studioPath = "/studio";
