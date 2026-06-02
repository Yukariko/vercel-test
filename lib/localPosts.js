const KEY = "blog-local-posts";

export function makeSlug(input) {
  const base = (input || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `post-${Date.now()}`;
}

export function getLocalPosts() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function getLocalPost(slug) {
  return getLocalPosts().find((p) => p.slug === slug) || null;
}

export function saveLocalPost(post) {
  const posts = getLocalPosts().filter((p) => p.slug !== post.slug);
  posts.push(post);
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function deleteLocalPost(slug) {
  const posts = getLocalPosts().filter((p) => p.slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(posts));
}
