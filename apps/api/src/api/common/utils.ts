/**
 * Converts a string into a URL-friendly slug.
 * @example
 * slugify("Café au lait") // "cafe-au-lait"
 * slugify("  Leading and trailing spaces  ") // "leading-and-trailing-spaces"
 * slugify("Multiple   spaces") // "multiple-spaces"
 * slugify("Special characters !@#$%^&*()") // "special-characters"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD') // Normalize accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-alphanumeric
    .replace(/--+/g, '-') // Collapse multiple hyphens
    .replace(/^-+/, '') // Trim leading hyphens
    .replace(/-+$/, ''); // Trim trailing hyphens
}
