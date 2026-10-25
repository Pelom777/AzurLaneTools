import type { Directive } from 'vue'

type Handler = () => void

const handlers = new WeakMap<Element, Handler>()
const observed = new WeakSet<Element>()

let observer: IntersectionObserver | null = null

const getObserver = () => {
  if (observer) return observer

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const target = entry.target
      handlers.get(target)?.()
      handlers.delete(target)
      observed.delete(target)
      observer!.unobserve(target)
    }
  }, { rootMargin: '200px 0px' })

  return observer
}

const track = (el: Element, handler: Handler) => {
  handlers.set(el, handler)
  if (observed.has(el)) return
  observed.add(el)
  getObserver().observe(el)
}

const untrack = (el: Element) => {
  if (!observed.has(el)) return
  observed.delete(el)
  handlers.delete(el)
  observer?.unobserve(el)
}

export const vVisible: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    track(el, binding.value)
  },
  unmounted(el) {
    untrack(el)
  },
}