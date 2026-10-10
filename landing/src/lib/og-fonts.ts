import fs from "node:fs";
import path from "node:path";

/* ImageResponse renders in a sandbox without the app's next/font pipeline —
   the site's three families are vendored under public/fonts/ and registered
   here so OG type matches the dashboard and the blog OG (Fraunces display /
   Plex Sans UI / Plex Mono data). No fallback and no network: a missing font
   file fails the build/render loudly instead of silently degrading. */

/* next/og's FontOptions.weight is the numeric literal union (400|500|…). */
type OgFontWeight = 400 | 500 | 600;

export interface OgFont {
  name: string;
  data: Buffer;
  weight: OgFontWeight;
  style: "normal";
}

/* Static TTF instances at the exact weights the site uses — same binaries the
   Google Fonts css2 API served before vendoring (all three families are
   OFL-licensed; see the font families' upstream licenses). */
const OG_FONTS: ReadonlyArray<{
  file: string;
  name: string;
  weight: OgFontWeight;
}> = [
  { file: "fraunces-500.ttf", name: "Fraunces", weight: 500 },
  { file: "ibm-plex-sans-400.ttf", name: "IBM Plex Sans", weight: 400 },
  { file: "ibm-plex-sans-600.ttf", name: "IBM Plex Sans", weight: 600 },
  { file: "ibm-plex-mono-400.ttf", name: "IBM Plex Mono", weight: 400 },
];

export async function loadOgFonts(): Promise<OgFont[]> {
  return Promise.all(
    OG_FONTS.map(({ file, name, weight }) => {
      // No try/catch — a missing file must fail loudly, not degrade silently.
      const data = fs.readFileSync(path.join(process.cwd(), "public", "fonts", file));
      return { name, data, weight, style: "normal" as const };
    }),
  );
}
