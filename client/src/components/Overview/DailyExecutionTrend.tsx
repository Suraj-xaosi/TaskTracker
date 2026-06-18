import { useEffect, useState } from "react"
import { useCycle } from "../../context/CycleContext"
import { getDailyTrend } from "../../services/dailyScoreService"
import { Separator } from "../ui/separator"

const colors = [
  "bg-blue-50",
  "bg-blue-100",
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
  "bg-blue-700",
  "bg-blue-800",
  "bg-blue-900",
  "bg-blue-950",
]

const TOTAL_CELLS = 12 * 7 // 84 cells

const mapScoreToColor = (score) => {
  const level = Math.min(Math.ceil(score / 10), colors.length - 1)
  return colors[level]
}

// Build the base empty grid once — outside component to avoid re-creation
const buildEmptyGrid = () =>
  Array.from({ length: TOTAL_CELLS }, (_, i) => ({
    score: null,
    color: "bg-neutral-700",
  }))

const DailyExecutionTrend = () => {
  const { currentCycle } = useCycle()
  const [data, setData] = useState(buildEmptyGrid)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!currentCycle) return

    const fetchTrend = async (cycleId) => {
      try {
        setLoading(true)
        const res = await getDailyTrend(cycleId)

        // Start from a fresh empty grid on every fetch
        const grid = buildEmptyGrid()

        // res is array of DailyScore objects: { executionScore, date, ... }
        for (let i = 0; i < res.length && i < TOTAL_CELLS; i++) {
          const score = res[i].executionScore
          grid[i] = { score, color: mapScoreToColor(score) }
        }

        setData(grid)
      } catch (error) {
        console.error("Failed to fetch daily trend:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrend(currentCycle._id)
  }, [currentCycle])

  return (
    <div className='p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full w-full flex flex-col gap-2'>
      <h2 className='text-sm text-neutral-100 font-bold mb-2 uppercase lexend-giga-700'>
        Daily Execution Trend
      </h2>
      <span className='text-xs text-neutral-400'>
        A summary of how you've spent every day of this cycle
      </span>
      <Separator />
      <div
        className='w-full h-full grid grid-cols-12 gap-1 p-4 mt-3'
        style={{ backgroundImage: "radial-gradient(#262626, #171717)" }}
      >
        {loading ? (
          <div className='col-span-12 flex items-center justify-center'>
            <span className='text-neutral-400 text-sm'>Loading...</span>
          </div>
        ) : (
          data.map((d, i) => (
            <div
              key={i}
              title={d.score !== null ? `Score: ${Math.round(d.score)}` : "No data"}
              className={`w-4 h-4 rounded-full ${d.color} drop-shadow-xl`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default DailyExecutionTrend