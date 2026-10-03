/**
 * Smoothly scrolls only the screen's own scroll area so `el` is visible.
 * (Element.scrollIntoView would also nudge the clipped outer layers.)
 */
export function scrollToEl(el, block = 'center') {
  if (!el) return
  const box = el.closest('.screen-scroll')
  if (!box) return
  const r = el.getBoundingClientRect()
  const b = box.getBoundingClientRect()
  let top = box.scrollTop + (r.top - b.top)
  if (block === 'center') top -= (b.height - r.height) / 2
  else top -= 90 // leave room for the progress bar
  box.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
