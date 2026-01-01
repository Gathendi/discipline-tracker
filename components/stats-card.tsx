"use client"

import { useState, useEffect } from "react"
import { useDisciplineStore } from "@/lib/store"
import { Card } from "@/components/ui/card"

export function StatsCard() {
  const [mounted, setMounted] = useState(false)
  const { getCurrentStreak, getTotalDays, getSuccessRate } = useDisciplineStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold">-</div>
            <div className="text-sm text-muted-foreground mt-2">Loading...</div>
          </div>
        </Card>
      </div>
    )
  }

  const streak = getCurrentStreak()
  const totalDays = getTotalDays()
  const successRate = getSuccessRate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 border-2 hover:border-[#0866FF] transition-colors">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#0866FF]">{streak}</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">Day Streak</div>
          <div className="text-xs text-muted-foreground mt-1">Consecutive perfect days</div>
        </div>
      </Card>

      <Card className="p-6 border-2 hover:border-[#0866FF] transition-colors">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#0866FF]">{totalDays}</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">Total Perfect Days</div>
          <div className="text-xs text-muted-foreground mt-1">All three pillars complete</div>
        </div>
      </Card>

      <Card className="p-6 border-2 hover:border-[#0866FF] transition-colors">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#0866FF]">{successRate}%</div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">Success Rate</div>
          <div className="text-xs text-muted-foreground mt-1">Perfect days vs total days</div>
        </div>
      </Card>
    </div>
  )
}
