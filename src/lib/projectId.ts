/**
 * SwiftLift Project ID utilities
 * Format: SWL-XXXXXX (6-digit random number)
 * 
 * NOTE: This is a frontend-only placeholder implementation.
 * Future backend integration will generate and persist Project IDs server-side.
 */

const STORAGE_KEY = "swiftlift_project_id";

export function generateProjectId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SWL-${num}`;
}

/**
 * Get or create a Project ID for the current session.
 * Persists in sessionStorage so it stays consistent within a single browser session.
 */
export function getOrCreateProjectId(): string {
  const existing = sessionStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const id = generateProjectId();
  sessionStorage.setItem(STORAGE_KEY, id);
  return id;
}
