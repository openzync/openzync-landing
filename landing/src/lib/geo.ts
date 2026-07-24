/**
 * Geo-location utilities for GDPR-compliant analytics consent.
 *
 * Netlify sets the `x-country` header automatically on all requests.
 * We use it to determine whether a visitor needs a consent banner.
 */

/** ISO 3166-1 alpha-2 codes for EU/EEA countries + UK (PECR-equivalent). */
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA
  "IS", "LI", "NO",
  // Switzerland (equivalent privacy laws)
  "CH",
  // UK (PECR is functionally equivalent to GDPR for e-privacy)
  "GB",
]);

/**
 * Returns true if the given country code is in the EU/EEA/UK.
 * Defaults to `true` (strict) when the header is missing — safest for dev/test.
 */
export function isEUCountry(countryCode: string | null | undefined): boolean {
  if (!countryCode || countryCode === "XX" || countryCode === "") return true;
  return EU_COUNTRIES.has(countryCode);
}
