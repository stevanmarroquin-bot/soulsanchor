'use client'
import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || '0'
            setTimeout(() => el.classList.add('visible'), parseInt(delay))
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )
    // Let browser paint the initial hidden state before observing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach((el) => observer.observe(el))
      })
    })
    return () => observer.disconnect()
  }, [])
}
