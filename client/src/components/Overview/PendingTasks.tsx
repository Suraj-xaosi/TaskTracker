import { Plus } from "lucide-react"
import { useTask } from "../../context/TaskContext"
import { Separator } from "../ui/separator"
import { TABS } from "../../constants/dashboard"

const PendingTasks = ({ setCurrentTab }) => {
  const { tasks } = useTask()

  const pendingTasks = tasks.filter((task) => task.status !== "completed")

  return (
    <div className='p-6 bg-card border border-border rounded-lg h-full'>
      <h2 className='text-sm font-semibold mb-2 text-foreground uppercase tracking-wide'>
        Today's Pending Tasks
      </h2>
      <Separator className='mb-2' />
      {tasks.length === 0 && (
        <>
          <div className='flex flex-col gap-2 text-sm my-3'>
            <p className='text-muted-foreground text-sm'>No tasks found</p>
          </div>
          <button
            className='flex gap-2 items-center my-5 px-4 py-1 bg-primary text-primary-foreground font-bold rounded-full uppercase tracking-wide text-xs'
            onClick={() => setCurrentTab(TABS.DAY)}
          >
            <Plus className='h-6 rounded-full p-1' />
            Start adding tasks
          </button>
        </>
      )}
      {pendingTasks.length === 0 && tasks.length > 0 && (
        <>
          <div className='flex flex-col gap-2 text-sm my-3'>
            <p className='text-muted-foreground text-sm'>No pending tasks</p>
          </div>
          <button
            className='flex gap-2 items-center my-5 px-4 py-1 bg-primary text-primary-foreground font-bold rounded-full uppercase tracking-wide text-xs'
            onClick={() => setCurrentTab(TABS.DAY)}
          >
            <Plus className='h-6 rounded-full p-1' />
            create more tasks
          </button>
        </>
      )}
      {pendingTasks.length > 0 && (
        <>
          <ul className='flex flex-col gap-2 text-sm my-3'>
            {pendingTasks.map((task, index) => (
              <li
                key={index}
                className='py-2 text-foreground bg-secondary px-2 rounded-md'
              >
                {task.title}
              </li>
            ))}
          </ul>
          <button className='mt-2 bg-primary rounded-full px-3 uppercase tracking-wide text-xs py-1 text-primary-foreground font-bold'>
            View all
          </button>
        </>
      )}
    </div>
  )
}

export default PendingTasks