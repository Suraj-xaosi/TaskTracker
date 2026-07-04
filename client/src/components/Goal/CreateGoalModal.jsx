import { useState } from "react"
import { createGoal, updateGoal } from "../../services/goalService"
import { STATUS } from "../../constants/dashboard"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CreateGoalModal({
  currentGoal,
  cycle,
  updateCycle,
  setOpen,
}) {
  const [goal, setGoal] = useState(
    currentGoal || {
      title: "",
      description: "",
      tactics: [],
      status: "todo",
      cycleId: cycle._id,
    }
  )
  const [goalError, setGoalError] = useState("")

  const { toast } = useToast()

  const updateCurrentGoal = async (e) => {
    e.preventDefault()
    try {
      const data = await updateGoal(goal)
      toast({
        title: "Successfully created a new goal!",
      })
      updateCycle({
        ...cycle,
        goals: cycle.goals.map((g) => {
          if (g._id === data.goal._id) {
            return data.goal
          }
          return g
        }),
      })
      setGoal({
        title: "",
        description: "",
        tactics: [],
        status: "todo",
        cycleId: cycle._id,
      })
      toast({
        title: "Goal was successfully updated!",
      })
    } catch (err) {
      setGoalError(err)
    } finally {
      setOpen(false)
    }
  }

  const createNewGoal = async (e) => {
    e.preventDefault()
    try {
      const data = await createGoal(goal)
      updateCycle({ ...cycle, goals: [...cycle.goals, data.goal] })
      setGoal({
        title: "",
        description: "",
        tactics: [],
        status: "todo",
        cycleId: cycle._id,
      })
      toast({
        title: "Goal was successfully created!",
      })
    } catch (err) {
      setGoalError(err)
    } finally {
      setOpen(false)
    }
  }

  const addTactic = () => {
    const updatedGoal = {
      ...goal,
      tactics: [...(goal.tactics || []), { title: "", description: "" }],
    }
    setGoal(updatedGoal)
  }

  return (
    <DialogContent className='bg-card border border-border text-card-foreground rounded-lg p-6'>
      <DialogHeader>
        <DialogTitle className='text-lg text-foreground uppercase font-serif tracking-wide'>
          Add new goal
        </DialogTitle>
        <Separator className='my-3' />
      </DialogHeader>
      <div className='bp-10 rounded-lg w-full'>
        <form
          onSubmit={currentGoal ? updateCurrentGoal : createNewGoal}
          className='flex flex-col gap-5'
        >
          <div>
            <Label htmlFor='title' className='text-xs text-muted-foreground'>
              Title
            </Label>
            <Input
              placeholder='For ex: Read 12 books...'
              id='title'
              type='text'
              className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
              value={goal.title}
              onChange={(e) => setGoal({ ...goal, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor='description' className='text-xs text-muted-foreground'>
              Description
            </Label>
            <Textarea
              cols={20}
              id='description'
              placeholder='Add more information about the goal here...'
              className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
              value={goal.description}
              onChange={(e) =>
                setGoal({ ...goal, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label className='text-xs text-muted-foreground'>Status</Label>
            <Select>
              <SelectTrigger className='mt-3 bg-background border-input rounded-lg p-2 w-full'>
                <SelectValue
                  value={goal.status}
                  onChange={(e) => setGoal({ ...goal, status: e.target.value })}
                  placeholder='Select an option...'
                  className='text-foreground'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Label className='text-xs text-muted-foreground'>Tactics</Label>
          {goal.tactics?.map((tactic, index) => (
            <div key={index}>
              <Input
                placeholder='Tactic Title'
                type='text'
                className='bg-background border-input text-foreground rounded-lg p-2 w-full'
                value={tactic.title}
                onChange={(e) => {
                  const newTactics = [...goal.tactics]
                  newTactics[index].title = e.target.value
                  setGoal({ ...goal, tactics: newTactics })
                }}
                required
              />
              <Textarea
                cols={20}
                placeholder='Tactic Description'
                className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
                value={tactic.description}
                onChange={(e) => {
                  const newTactics = [...(goal.tactics || [])]
                  newTactics[index].description = e.target.value
                  setGoal({ ...goal, tactics: newTactics })
                }}
              />
            </div>
          ))}
          <button
            className='w-fit font-bold text-xs text-primary uppercase'
            onClick={addTactic}
          >
            + Add Tactic
          </button>
          <DialogFooter>
            <div className='flex justify-between'>
              <button
                type='submit'
                className='text-sm px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold tracking-wide rounded-lg transition-colors'
              >
                Save
              </button>
              {goalError && <p className="text-destructive">{goalError}</p>}
            </div>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  )
}