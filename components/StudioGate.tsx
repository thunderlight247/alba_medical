"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioGate() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-bold text-slate-900">Connect the article editor</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The Studio is ready but it needs a Sanity project ID. Create a project at sanity.io/manage, then set
          <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">NEXT_PUBLIC_SANITY_PROJECT_ID</code>
          and redeploy. The public articles page keeps working in the meantime.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
