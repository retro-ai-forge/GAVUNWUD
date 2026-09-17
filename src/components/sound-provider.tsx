"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

type SoundContextValue = {
  muted: boolean
  toggleMuted: () => void
}

const SoundContext = createContext<SoundContextValue>({ muted: false, toggleMuted: () => {} })

const STORAGE_KEY = "wud-sound-muted"

// Only unmute elements this provider muted, so media that is deliberately
// silent (autoplaying clips, which browsers require to be muted) stays silent.
function applyToElement(muted: boolean, el: HTMLMediaElement) {
  if (muted) {
    if (!el.muted) {
      el.muted = true
      el.dataset.wudSoundMuted = "1"
    }
  } else if (el.dataset.wudSoundMuted) {
    el.muted = false
    delete el.dataset.wudSoundMuted
  }
}

function applyToTree(muted: boolean, root: Element | Document) {
  if (root instanceof HTMLMediaElement) applyToElement(muted, root)
  root.querySelectorAll<HTMLMediaElement>("video, audio").forEach((el) => applyToElement(muted, el))
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    try {
      setMuted(localStorage.getItem(STORAGE_KEY) === "true")
    } catch {}
  }, [])

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {}
      return next
    })
  }, [])

  useEffect(() => {
    applyToTree(muted, document)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) applyToTree(muted, node)
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [muted])

  return <SoundContext.Provider value={{ muted, toggleMuted }}>{children}</SoundContext.Provider>
}

export function useSound() {
  return useContext(SoundContext)
}
