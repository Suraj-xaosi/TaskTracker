import { useState } from "react"
import CreateGoalModal from "./CreateGoalModal"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

export default function Goal({ goal, deleteGoal, cycle, updateCycle }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className='bg-card border border-border text-card-foreground text-sm rounded-lg p-4 my-3'
      key={goal._id}
    >
      <h4 className='font-bold text-foreground mb-3'>{goal.title}</h4>
      <p className='text-muted-foreground'>{goal.description}</p>
      <div className='flex justify-between'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className='text-primary hover:text-primary/80 text-xs font-medium'
            >
              Edit
            </button>
          </DialogTrigger>
          <CreateGoalModal
            cycle={cycle}
            currentGoal={goal}
            updateCycle={updateCycle}
            setOpen={setOpen}
          ></CreateGoalModal>
        </Dialog>
        <button
          onClick={() => deleteGoal(goal._id)}
          className='text-destructive text-xs font-medium'
        >
          Delete
        </button>
      </div>
    </div>
  )
}