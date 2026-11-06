"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type Props = { src?: string; alt?: string; Icon: LucideIcon };

/**
 * Uniform 16:9 frame. Pass a photo and it is shown; pass no photo (or let it fail to load)
 * and the frame becomes a designed panel with the service icon, never a blank box.
 */
export default function ImageBlock({ src, alt = "", Icon }: Props) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 via-sky-50 to-emerald-100">
      {showPhoto && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      {!showPhoto && (
        <>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="#0d9488" strokeOpacity=".12" />
              </pattern>
            </defs>
            <rect width="320" height="180" fill="url(#g)" />
            <circle cx="260" cy="30" r="70" fill="#14b8a6" fillOpacity=".18" />
            <circle cx="40" cy="160" r="60" fill="#38bdf8" fillOpacity=".18" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <Icon className="h-12 w-12 text-teal-700/70" strokeWidth={1.4} />
          </div>
        </>
      )}
    </div>
  );
}
