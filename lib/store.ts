import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface DayRecord {
  date: string // YYYY-MM-DD format
  discipline: boolean
  order: boolean
  consistency: boolean
}

interface DisciplineStore {
  records: Record<string, DayRecord>
  togglePillar: (date: string, pillar: "discipline" | "order" | "consistency") => void
  getRecord: (date: string) => DayRecord
  getCurrentStreak: () => number
  getTotalDays: () => number
  getSuccessRate: () => number
}

export const useDisciplineStore = create<DisciplineStore>()(
  persist(
    (set, get) => ({
      records: {},

      togglePillar: (date, pillar) => {
        set((state) => {
          const currentRecord = state.records[date] || {
            date,
            discipline: false,
            order: false,
            consistency: false,
          }

          return {
            records: {
              ...state.records,
              [date]: {
                ...currentRecord,
                [pillar]: !currentRecord[pillar],
              },
            },
          }
        })
      },

      getRecord: (date) => {
        const state = get()
        return (
          state.records[date] || {
            date,
            discipline: false,
            order: false,
            consistency: false,
          }
        )
      },

      getCurrentStreak: () => {
        const state = get()
        const records = state.records
        let streak = 0
        const today = new Date()

        for (let i = 0; i < 365; i++) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split("T")[0]
          const record = records[dateStr]

          if (record && record.discipline && record.order && record.consistency) {
            streak++
          } else if (i > 0) {
            // Only break streak if it's not today
            break
          }
        }

        return streak
      },

      getTotalDays: () => {
        const state = get()
        const records = state.records
        return Object.values(records).filter((r) => r.discipline && r.order && r.consistency).length
      },

      getSuccessRate: () => {
        const state = get()
        const records = state.records
        const totalDays = Object.keys(records).length
        if (totalDays === 0) return 0

        const completeDays = Object.values(records).filter((r) => r.discipline && r.order && r.consistency).length

        return Math.round((completeDays / totalDays) * 100)
      },
    }),
    {
      name: "rod-discipline-tracker",
    },
  ),
)
