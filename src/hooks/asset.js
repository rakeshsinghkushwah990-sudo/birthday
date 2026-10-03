// Turns '/images/x.jpg' into a path that also works when the site is hosted
// in a sub-folder (e.g. GitHub Pages: https://name.github.io/birthday/).
export function asset(path) {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
