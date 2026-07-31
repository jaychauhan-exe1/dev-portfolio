import projectsData from '@/content/projects.json';

export interface Project {
  title: string;
  description: string;
  tags?: string[];
  tag?: string;
  images: string[];
  role?: string;
  client?: string;
  year?: string;
  challenge_title?: string;
  challenge?: string;
}

/**
 * Converts a string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
}

/**
 * Finds a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  const allProjects = projectsData.projects as Project[];
  return allProjects.find(p => slugify(p.title) === slug);
}

/**
 * Gets the next project in the sorted featured projects list (with wrap-around).
 */
export function getNextProject(currentTitle: string): Project {
  const featuredTitles = projectsData.featured;
  const allProjects = projectsData.projects as Project[];
  
  // Find all active featured projects in sorted order
  const featuredCandidates = allProjects.filter(p => featuredTitles.includes(p.title));
  const activeFeatured = featuredCandidates.slice(-8);
  const sortedProjects = [...activeFeatured].reverse();

  // Find index of current project
  const currentIndex = sortedProjects.findIndex(p => p.title === currentTitle);
  
  if (currentIndex === -1 || sortedProjects.length === 0) {
    // If not found or list is empty, default to the first sorted project
    return sortedProjects[0] || allProjects[0];
  }

  // Get next index (wrap around)
  const nextIndex = (currentIndex + 1) % sortedProjects.length;
  return sortedProjects[nextIndex];
}
