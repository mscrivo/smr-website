/**
 * Central site configuration — business details, services, and contact info.
 * Edit values here to update the whole site.
 */

export const site = {
  name: 'SMR Computer Services',
  shortName: 'SMR',
  tagline: 'Technology solutions for homes & small businesses',
  description:
    'SMR Computer Services provides custom PC builds, network installations, surveillance setup, remote support, and custom software for clients across the Greater Toronto Area.',
  region: 'Greater Toronto Area',
  url: 'https://smrcomputers.ca',
  email: 'info@smrcomputers.ca',
  owner: 'Michael Scrivo',
} as const;

export interface Service {
  title: string;
  description: string;
  /** Inline SVG path data drawn on a 24x24 grid (stroke-based icon). */
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Custom PC Builds',
    description:
      'Purpose-built desktops spec’d to your workload and budget — from quiet home offices to high-performance workstations — assembled, tested, and tuned.',
    icon: 'M4 5h16v11H4z M9 20h6 M12 16v4 M8 9h.01 M11 9h.01',
  },
  {
    title: 'Network Installations & Upgrades',
    description:
      'Reliable wired and wireless networks: routers, switches, access points, and cabling designed for solid coverage and speed throughout your space.',
    icon: 'M5 12a7 7 0 0 1 14 0 M8 14.5a4 4 0 0 1 8 0 M12 18h.01',
  },
  {
    title: 'Home & Business Surveillance',
    description:
      'IP camera systems with remote viewing and recording, professionally placed and configured to keep an eye on what matters most.',
    icon: 'M3 7h13v8H3z M16 10l5-3v10l-5-3 M7 11h.01',
  },
  {
    title: 'Remote Support',
    description:
      'Fast, secure remote help for everyday computer problems — troubleshooting, cleanup, software fixes, and tune-ups without leaving your home.',
    icon: 'M12 3a4 4 0 0 1 4 4v3 M8 10V7a4 4 0 0 1 4-4 M5 10h14v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z M12 14v3',
  },
  {
    title: 'Website Creation & Maintenance',
    description:
      'Fast, modern websites built and maintained for small businesses — from a simple online presence to ongoing updates and hosting support.',
    icon: 'M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01 M7 13l3 2-3 2 M14 17h4',
  },
  {
    title: 'Custom Small Business Software',
    description:
      'Tailored tools and integrations that automate the busywork — software shaped around how your business actually runs.',
    icon: 'M8 6l-4 6 4 6 M16 6l4 6-4 6 M13 4l-2 16',
  },
];
