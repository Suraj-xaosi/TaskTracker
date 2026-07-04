import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Image, Plus, Star } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useCycle } from "../../context/CycleContext"
import { DialogClose } from "../ui/dialog"
import { TABS } from "../../constants/dashboard"
import { Separator } from "../ui/separator"

const VisionBoard = ({ setCurrentTab }) => {
  const { currentCycle, updateCycle } = useCycle()
  const [image, setImage] = useState(currentCycle?.visionBoardImage || "")

  useEffect(() => {
    setImage(currentCycle?.visionBoardImage || "")
  }, [currentCycle])

  const handleAddVisionBoard = () => {
    if (!image) {
      alert("Please enter a vision board URL")
      return
    }
    updateCycle({ ...currentCycle, visionBoardImage: image })
  }

  // Use slice not splice — splice mutates the original goals array in state
  const topGoals = currentCycle?.goals?.slice(0, 3) || []

  const dialog = (
    <Dialog>
      <DialogTrigger className='h-full w-full cursor-pointer text-muted-foreground hover:text-primary flex flex-col gap-3 justify-center items-center'>
        <div className='bg-accent text-primary p-5 rounded-full'>
          <Image />
        </div>
        <span className='text-sm font-bold flex items-center'>
          <Plus className='h-4' /> Add your vision board
        </span>
      </DialogTrigger>
      <DialogContent className='bg-card border border-border text-card-foreground rounded-lg p-6'>
        <DialogHeader className='text-lg text-foreground uppercase font-serif tracking-wide'>
          <DialogTitle>Create Vision Board</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div>
          <Label htmlFor='title' className='text-xs text-muted-foreground'>
            Enter the URL to your vision board image:
          </Label>
          <Input
            type='url'
            placeholder='https://'
            className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <div className='flex justify-end gap-2'>
            <DialogClose onClick={handleAddVisionBoard}>
              <button className='text-sm px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold tracking-wide rounded-lg transition-colors'>Save</button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className='p-6 bg-card border border-border rounded-lg h-full w-full flex flex-col'>
      <h2 className='text-sm font-semibold mb-2 text-foreground uppercase tracking-wide'>
        Vision Board
      </h2>
      <Separator />
      <div className='h-full flex items-center w-full justify-between my-3'>
        {image ? (
          <div className='w-full grid grid-cols-2 gap-10 items-center'>
            <div className='relative cursor-pointer w-80 h-80 rounded-lg flex gap-3 justify-start items-center'>
              <img className='rounded-lg w-full h-full' src={image} alt="Vision board" />
              <div className='absolute z-10 top-0 left-0 rounded-lg bg-black opacity-0 hover:opacity-80 w-80 h-80 transition-all'>
                {dialog}
              </div>
            </div>
            <div className='h-full bg-secondary rounded-md p-6'>
              <h4 className='text-sm flex items-center gap-2 font-semibold mb-2 text-foreground uppercase tracking-wide'>
                <Star className='text-primary' /> Your Top Goals
              </h4>
              {topGoals.length > 0 ? (
                topGoals.map((goal) => (
                  <div
                    key={goal._id}
                    className='my-2 bg-card border border-border rounded-full px-4 py-2'
                  >
                    <span className='font-bold text-sm text-foreground'>
                      {goal.title}
                    </span>
                  </div>
                ))
              ) : (
                <div>
                  <span className='text-sm text-muted-foreground'>
                    No goals added yet!
                  </span>
                  <button
                    className='flex gap-2 items-center my-5 px-4 py-1 bg-primary text-primary-foreground font-bold rounded-full uppercase tracking-wide text-xs'
                    onClick={() => setCurrentTab(TABS.CYCLE)}
                  >
                    <Plus className='h-6 rounded-full p-1' />
                    Start adding goals
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='relative cursor-pointer w-full h-full rounded-lg border border-dashed border-border bg-muted/40 flex gap-3 flex-col justify-center items-center'>
            {dialog}
          </div>
        )}
      </div>
    </div>
  )
}

export default VisionBoard