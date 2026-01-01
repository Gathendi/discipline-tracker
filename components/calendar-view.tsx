"use client"

import { useState, useEffect } from "react"
import { useDisciplineStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isToday,
  isFuture,
} from "date-fns"

export function CalendarView() {
  const [mounted, setMounted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)) // Start at January 2026
  const { getRecord } = useDisciplineStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading calendar...</div>
      </Card>
    )
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getDayStatus = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const record = getRecord(dateStr)

    if (isFuture(date)) return "future"
    if (!isSameMonth(date, currentMonth)) return "other-month"

    const allComplete = record.discipline && record.order && record.consistency
    const someComplete = record.discipline || record.order || record.consistency

    if (allComplete) return "complete"
    if (someComplete) return "partial"
    return "incomplete"
  }

  return (
    <Card className="p-6 border-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            const status = getDayStatus(day)
            const isCurrentDay = isToday(day)

            return (
              <div
                key={index}
                className={`
                  aspect-square p-2 rounded-lg border-2 flex items-center justify-center text-sm font-medium
                  ${status === "complete" ? "bg-green-500 text-white border-green-600" : ""}
                  ${status === "partial" ? "bg-yellow-500 text-white border-yellow-600" : ""}
                  ${status === "incomplete" ? "bg-red-500 text-white border-red-600" : ""}
                  ${status === "future" ? "bg-muted text-muted-foreground border-border" : ""}
                  ${status === "other-month" ? "bg-background text-muted-foreground border-border opacity-30" : ""}
                  ${isCurrentDay ? "ring-2 ring-[#0866FF] ring-offset-2" : ""}
                `}
              >
                {format(day, "d")}
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500 border-2 border-green-600"></div>
            <span>Perfect Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500 border-2 border-yellow-600"></div>
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500 border-2 border-red-600"></div>
            <span>Incomplete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted border-2 border-border"></div>
            <span>Future</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
