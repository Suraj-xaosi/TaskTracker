import { useEffect, useState } from "react"
import { useCycle } from "../../context/CycleContext"
import { Separator } from "@/components/ui/separator"
import { getWeeklyTrend } from "../../services/dailyScoreService"

const WeeklyExecutionTrend = () => {
  const { currentCycle } = useCycle()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentCycle) {
      const fetchTrend = async (cycleId) => {
        try {
          setLoading(true)
          const weeklyData = await getWeeklyTrend(cycleId)
          setData(weeklyData) // server already returns array of numbers
        } catch (error) {
          console.error("Failed to fetch weekly trend:", error)
          setData([])
        } finally {
          setLoading(false)
        }
      }
      fetchTrend(currentCycle._id)
    }
  }, [currentCycle])

  return (
    <div className='p-6 bg-card border border-border rounded-lg h-full w-full flex flex-col gap-2'>
      <h2 className='text-sm text-foreground uppercase font-semibold tracking-wide'>
        Weekly Execution Trend
      </h2>
      <span className='text-xs text-muted-foreground'>
        A summary of how you've spent the past weeks of this cycle
      </span>
      <Separator />
      <div
        className='grid grid-cols-12 h-[70%] justify-between gap-1 mt-3 p-2 rounded-md bg-muted/30'
      >
        {loading ? (
          <div className='col-span-12 h-full flex items-center justify-center'>
            <span className='text-muted-foreground text-sm'>Loading...</span>
          </div>
        ) : data.length > 0 ? (
          data.map((value, index) => (
            <div className='h-full text-center self-end' key={index}>
              <div
                style={{ height: `${value}%` }}
                className='bg-gradient-to-t from-primary to-primary/30 rounded-sm'
              ></div>
              <span className='text-foreground text-xs text-center'>
                {Math.round(value)}
              </span>
            </div>
          ))
        ) : (
          <div className='col-span-12 h-full flex items-center justify-center'>
            <span className='text-muted-foreground text-sm'>No data yet</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeeklyExecutionTrend