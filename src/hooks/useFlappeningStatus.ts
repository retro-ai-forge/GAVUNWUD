"use client"

import { useState, useEffect, useCallback } from 'react'

export interface FlappeningStatus {
  isPlanned: boolean
  isActive: boolean
  isUpcoming: boolean
  name?: string
  startTime?: Date
  endTime?: Date
  multiplier?: number
  timeUntilStart?: string
  timeUntilEnd?: string
}

function calculateTimeUntil(targetTime: Date): string {
  const now = new Date()
  const diff = targetTime.getTime() - now.getTime()

  if (diff <= 0) return '00:00:00'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (days > 0) {
    return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Calculate reward multiplier from surge level
 * Based on player count thresholds:
 * - Level 0 (base): 1x
 * - Level 1 (25+ players): 2x
 * - Level 2 (50+ players): 4x
 * - Level 3 (75+ players): 8x
 * - Level 4 (100+ players): 16x
 * - Level 5 (125+ players): 32x
 */
function getMultiplierFromSurgeLevel(surgeLevel: number): number {
  const multipliers: Record<number, number> = {
    0: 1,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32
  }
  return multipliers[surgeLevel] ?? 1
}

export function useFlappeningStatus(): FlappeningStatus {
  const [status, setStatus] = useState<FlappeningStatus>({
    isPlanned: false,
    isActive: false,
    isUpcoming: false
  })
  const [surgeLevel, setSurgeLevel] = useState<number>(0)

  // Fetch surge level from API
  const fetchSurgeLevel = useCallback(async () => {
    try {
      const response = await fetch('/api/flappywud-stats')
      if (response.ok) {
        const data = await response.json()
        setSurgeLevel(data.surgeLevel || 0)
      }
    } catch (error) {
      console.error('Failed to fetch surge level:', error)
    }
  }, [])

  useEffect(() => {
    const announcementTime = new Date('2026-01-01T17:00:00Z')
    const startTime = new Date('2026-01-04T17:00:00Z')
    const endTime = new Date('2026-01-06T17:00:00Z')
    const now = new Date()

    const isActive = now >= startTime && now <= endTime

    // Fetch surge level initially and set up interval when active
    if (isActive) {
      fetchSurgeLevel()
      const fetchInterval = setInterval(fetchSurgeLevel, 30000) // Refresh every 30 seconds
      return () => clearInterval(fetchInterval)
    }
  }, [fetchSurgeLevel])

  useEffect(() => {
    const updateStatus = () => {
      const announcementTime = new Date('2026-01-01T17:00:00Z')
      const startTime = new Date('2026-01-04T17:00:00Z')
      const endTime = new Date('2026-01-06T17:00:00Z')
      const now = new Date()

      if (now >= announcementTime && now < startTime) {
        setStatus({
          isPlanned: true,
          isActive: false,
          isUpcoming: false,
          name: "New Year 2026 Flappening",
          startTime,
          endTime,
          multiplier: 5, // Default base multiplier for planned event
          timeUntilStart: calculateTimeUntil(startTime)
        })
      } else if (now >= startTime && now <= endTime) {
        // Calculate the total multiplier: base 5x from event + surge bonus
        const surgeMultiplier = getMultiplierFromSurgeLevel(surgeLevel)
        setStatus({
          isPlanned: false,
          isActive: true,
          isUpcoming: false,
          name: "New Year 2026 Flappening",
          startTime,
          endTime,
          multiplier: surgeMultiplier,
          timeUntilEnd: calculateTimeUntil(endTime)
        })
      } else {
        setStatus({
          isPlanned: false,
          isActive: false,
          isUpcoming: false
        })
      }
    }

    updateStatus()
    const interval = setInterval(updateStatus, 1000)

    return () => clearInterval(interval)
  }, [surgeLevel])

  return status
}