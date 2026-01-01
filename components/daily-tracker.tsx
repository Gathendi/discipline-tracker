"use client"

import { useState, useEffect } from "react"
import { useDisciplineStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"

export function DailyTracker() {
  const [mounted, setMounted] = useState(false)
  const today = format(new Date(), "yyyy-MM-dd")
  const { getRecord, togglePillar } = useDisciplineStore()
  const record = getRecord(today)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="p-8 border-2">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Loading...</h2>
          </div>
        </div>
      </Card>
    )
  }

  const allComplete = record.discipline && record.order && record.consistency

  return (
    <Card
      className={`p-8 border-2 transition-colors ${allComplete ? "border-green-500 bg-green-50" : "border-border"}`}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Today's Check-In</h2>
          <p className="text-muted-foreground">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
        </div>

        <div className="space-y-4">
          <div
            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
              record.discipline ? "border-[#0866FF] bg-[#0866FF]/5" : "border-border"
            }`}
            onClick={() => togglePillar(today, "discipline")}
          >
            <Checkbox
              checked={record.discipline}
              onCheckedChange={() => togglePillar(today, "discipline")}
              className="h-6 w-6 data-[state=checked]:bg-[#0866FF] data-[state=checked]:border-[#0866FF]"
            />
            <div>
              <h3 className="text-xl font-semibold">Discipline</h3>
              <p className="text-sm text-muted-foreground">Did I stay focused and committed today?</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
              record.order ? "border-[#0866FF] bg-[#0866FF]/5" : "border-border"
            }`}
            onClick={() => togglePillar(today, "order")}
          >
            <Checkbox
              checked={record.order}
              onCheckedChange={() => togglePillar(today, "order")}
              className="h-6 w-6 data-[state=checked]:bg-[#0866FF] data-[state=checked]:border-[#0866FF]"
            />
            <div>
              <h3 className="text-xl font-semibold">Order</h3>
              <p className="text-sm text-muted-foreground">Did I maintain structure and organization?</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
              record.consistency ? "border-[#0866FF] bg-[#0866FF]/5" : "border-border"
            }`}
            onClick={() => togglePillar(today, "consistency")}
          >
            <Checkbox
              checked={record.consistency}
              onCheckedChange={() => togglePillar(today, "consistency")}
              className="h-6 w-6 data-[state=checked]:bg-[#0866FF] data-[state=checked]:border-[#0866FF]"
            />
            <div>
              <h3 className="text-xl font-semibold">Consistency</h3>
              <p className="text-sm text-muted-foreground">Did I follow through on my commitments?</p>
            </div>
          </div>
        </div>

        {allComplete && (
          <div className="text-center p-4 bg-green-500 text-white rounded-lg font-semibold">
            🎯 Perfect Day! All three pillars complete.
          </div>
        )}
      </div>
    </Card>
  )
}
