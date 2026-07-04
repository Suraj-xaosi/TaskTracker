import { useState } from "react"
import CreateTaskModal from "./CreateTaskModal"
import { Plus } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useDrag } from "react-dnd"

export default function Task({ cycleId, task, deleteTask, goals, updateTask }) {
  const [open, setOpen] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      className='bg-card border border-border text-card-foreground text-sm rounded-lg p-2 my-2'
      key={task._id}
    >
      <h4 className='font-bold text-foreground'>{task.title}</h4>
      <div className='flex justify-between'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className='text-primary hover:text-primary/80 text-sm font-medium'
            >
              Edit
            </button>
          </DialogTrigger>
          <CreateTaskModal
            currentTask={task}
            goals={goals}
            cycleId={cycleId}
            updateTask={updateTask}
            hideModal={() => setOpen(false)}
          ></CreateTaskModal>
        </Dialog>
        <button
          onClick={() => deleteTask(task._id)}
          className='text-destructive text-sm font-medium'
        >
          Delete
        </button>
      </div>
    </div>
  )
}