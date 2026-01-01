import { DailyTracker } from "@/components/daily-tracker"
import { StatsCard } from "@/components/stats-card"
import { CalendarView } from "@/components/calendar-view"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#0866FF] to-[#0866FF]/60 bg-clip-text text-transparent">
              ROD 2026
            </h1>
            <p className="text-xl text-muted-foreground font-medium">Discipline • Order • Consistency</p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Hold yourself accountable every single day. Check off all three pillars to maintain your streak.
            </p>
          </div>

          {/* Stats */}
          <StatsCard />

          {/* Daily Tracker */}
          <DailyTracker />

          {/* Calendar */}
          <CalendarView />
        </div>
      </div>
    </main>
  )
}
