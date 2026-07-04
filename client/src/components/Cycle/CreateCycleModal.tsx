import { useState } from "react"
import useAuthToken from "../../hooks/useAuthToken"
import { useNavigate } from "react-router-dom"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCycle } from "@/context/CycleContext"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { addDays, format } from "date-fns"
import { CalendarIcon, Loader } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {}

const CreateCycleModal: React.FC<Props> = ({ setOpen }) => {
  const [newCycle, setNewCycle] = useState({
    title: "",
    description: "",
    visionBoardImage: "",
  })

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 84),
  })

  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const { token, logout } = useAuthToken()
  const { addCycle } = useCycle()

  const navigate = useNavigate()
  const { toast } = useToast()

  const handleCreateCycle = async (e: MouseEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (!token) {
        logout()
        navigate("/")
      }

      await addCycle({
        ...newCycle,
        startDate: date.from,
        endDate: date.to,
      })

      toast({
        title: "Successfully created a new cycle!",
      })

      setNewCycle({
        title: "",
        description: "",
        visionBoardImage: "",
      })

      setDate({
        from: new Date(),
        to: addDays(new Date(), 84),
      })
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create cycle")
    } finally {
      setOpen(false)
      setSaving(false)
    }
  }

  return (
    <DialogContent className='bg-card border border-border text-card-foreground rounded-lg p-6'>
      <DialogHeader>
        <DialogTitle className='text-lg text-foreground uppercase font-serif tracking-wide'>
          Add new cycle
        </DialogTitle>
        <Separator className='my-3' />
      </DialogHeader>
      <form
        onSubmit={handleCreateCycle}
        className='flex flex-col gap-5'
      >
        <div>
          <Label className='text-xs text-muted-foreground'>Title</Label>
          <Input
            placeholder='Cycle 1'
            className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
            type='text'
            value={newCycle.title}
            onChange={(e) =>
              setNewCycle({ ...newCycle, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label className='text-xs text-muted-foreground'>Description</Label>
          <Textarea
            className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
            placeholder='Description (Optional)'
            value={newCycle.description}
            onChange={(e) =>
              setNewCycle({ ...newCycle, description: e.target.value })
            }
          />
        </div>
        <div>
          <Label className='text-xs text-muted-foreground'>Cycle Duration</Label>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                id='date'
                variant={"outline"}
                className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
              >
                <CalendarIcon />
                {date?.from ? (
                  date?.to ? (
                    <>
                      {format(date?.from, "LLL dd, y")} -{" "}
                      {format(date?.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date?.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className='text-xs text-muted-foreground'>Vision Board</Label>
          <Input
            placeholder='Enter the URL to your image: https//example.com/image.jpg'
            className='bg-background mt-3 border-input text-foreground rounded-lg p-2 w-full'
            type='text'
            value={newCycle.visionBoardImage}
            onChange={(e) =>
              setNewCycle({
                ...newCycle,
                visionBoardImage: e.target.value,
              })
            }
            required
          />
        </div>
        <DialogFooter>
          <div className='flex justify-end'>
            <button
              type='submit'
              className={`text-sm px-4 py-2 ${
                saving ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
              } uppercase font-bold tracking-wide rounded-lg transition-colors`}
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <Loader
                    size={15}
                    className='animate-[spin_2s_linear_infinite]'
                  />
                  <span>Saving</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
            {error && <p className="text-destructive">{error}</p>}
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default CreateCycleModal