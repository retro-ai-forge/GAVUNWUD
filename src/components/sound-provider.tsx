"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

type SoundContextValue = {
  muted: boolean
  toggleMuted: () => void
}

const SoundContext = createContext<SoundContextValue>({ muted: true, toggleMuted: () => {} })

const AMBIENT_TRACK_SRC = "/audio/ambient-cabin.mp3"

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
  // Sound always starts off, glow inviting the click - every reload is a
  // fresh invitation rather than remembering last session's choice.
  const [muted, setMuted] = useState(true)
  const ambientRef = useRef<HTMLAudioElement>(null)

  // Best-effort only: priming playback while still muted means the moment the
  // visitor opts in, the track is already rolling rather than starting cold.
  // Some browsers (iOS Safari) reject even a muted `play()` on <audio>, which
  // is fine - toggleMuted() below retries play() from inside the click itself.
  useEffect(() => {
    ambientRef.current?.play().catch(() => {})
  }, [])

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      // Done synchronously inside the click handler (not a later effect) so
      // it stays inside the browser's user-gesture window for `play()`.
      const el = ambientRef.current
      if (el) {
        el.muted = next
        if (!next && el.paused) el.play().catch(() => {})
      }
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

  return (
    <SoundContext.Provider value={{ muted, toggleMuted }}>
      <audio ref={ambientRef} src={AMBIENT_TRACK_SRC} loop preload="auto" muted playsInline />
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  return useContext(SoundContext)
}
