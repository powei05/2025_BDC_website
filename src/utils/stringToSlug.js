export function stringToSlug(string) {
    let slug = String(string).toLowerCase();
    slug = slug.replace(/[^a-z0-9-]/g, "-");
    slug = slug.replace(/-+/g, "-");
  
    // Remove leading and trailing dashes
    const start = slug.search(/[^-]/);
    const end = slug.search(/-+$/);
    return slug.substring(start, end === -1 ? undefined : end);
  }
  