// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Version Support Timeline Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface VersionTimeline {
  version: string;
  releaseDate: string;
  maintenanceEnd: string;
  securityEnd: string;
}

export const versionTimelines: VersionTimeline[] = [
  {
    version: "1.0",
    releaseDate: "2026-08-01",
    maintenanceEnd: "2027-02-01",
    securityEnd: "2027-08-01",
  },
  {
    version: "1.1",
    releaseDate: "2026-11-01",
    maintenanceEnd: "2027-05-01",
    securityEnd: "2027-11-01",
  },
  {
    version: "1.2",
    releaseDate: "2027-02-01",
    maintenanceEnd: "2027-08-01",
    securityEnd: "2028-02-01",
  },
  {
    version: "2.0",
    releaseDate: "2027-05-01",
    maintenanceEnd: "2027-11-01",
    securityEnd: "2028-05-01",
  },
];
