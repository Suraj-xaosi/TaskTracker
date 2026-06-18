import { useEffect, useState } from "react"
import CreateCycleModal from "../Cycle/CreateCycleModal.tsx"
import { LogOut, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { getUser } from "../../services/userService.js"
import { useCycle } from "../../context/CycleContext.jsx"
import { getDailyScore } from "../../services/dailyScoreService.js"
import useAuthToken from "@/hooks/useAuthToken.jsx"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

export default function AppSidebar() {
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [dailyScore, setDailyScore] = useState(0)
  const { cycles, loading, currentCycle, setCurrentCycle } = useCycle()

  const { logout } = useAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const data = await getUser()
        setUser(data.user)
      }
      fetchUser()
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    try {
      const fetchDailyScore = async () => {
        const today = new Date()
        const data = await getDailyScore(today.toISOString().split("T")[0])
        setDailyScore(data.executionScore)
      }
      fetchDailyScore()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const today = new Date()
  const activeCycles = cycles.filter((c) => new Date(c.endDate) >= today)
  const pastCycles = cycles.filter((c) => new Date(c.endDate) < today)

  if (loading) {
    return <div>Loading cycles...</div>
  }

  return (
    <Sidebar variant='floating' className='bg-neutral-950'>
      <SidebarHeader>
        <div className='flex p-3 gap-2 w-full justify-between items-center'>
          <div
            className='w-14 h-14 rounded-full bg-lime-400 bg-cover'
            style={{ backgroundImage: `url('${user?.profilePicture}')` }}
          ></div>
          <div className='w-9/12 flex flex-col justify-between'>
            <span className='font-bold lexend-giga-700 text-xs'>
              {user?.username || user?.email}
            </span>
            <div className=''>
              <span className='text-xs font-bold text-neutral-400'>
                Today's Execution Score
              </span>
              <Progress className='mt-1' value={dailyScore} />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Active Cycles */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className='p-1 uppercase font-bold text-neutral-100 lexend-giga-700'>
              Current Cycles
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className='p-3'>
                {activeCycles.length > 0 ? (
                  <div className='flex flex-col gap-3'>
                    {activeCycles.map((cycle) => (
                      <div
                        key={cycle._id}
                        onClick={() => setCurrentCycle(cycle)}
                        className={`cursor-pointer bg-gradient-to-br from-neutral-800 to-neutral-900 border rounded-md px-5 py-3 transition-all
                          ${currentCycle?._id === cycle._id
                            ? "border-lime-400 text-lime-400"
                            : "border-neutral-800 text-neutral-100 hover:border-neutral-600"
                          }`}
                      >
                        <span className="text-sm font-semibold">{cycle.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-neutral-400 text-sm'>
                    No active cycles. Create one to get started!
                  </p>
                )}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setOpen(true)}
                      className='mt-5 px-4 py-1 bg-lime-400 text-neutral-900 uppercase lexend-giga-700 flex items-center gap-2 hover:drop-shadow-lg transition-all font-bold rounded-full'
                    >
                      <span className='rounded-full text-lime-400 bg-neutral-900 p-2'>
                        <Plus />
                      </span>
                      Create New Cycle
                    </button>
                  </DialogTrigger>
                  <CreateCycleModal setOpen={setOpen}></CreateCycleModal>
                </Dialog>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Past Cycles */}
        {pastCycles.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>
              <span className='p-1 uppercase font-bold text-neutral-100 lexend-giga-700'>
                Past Cycles
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className='p-3'>
                  <div className='flex flex-col gap-3'>
                    {pastCycles.map((cycle) => (
                      <div
                        key={cycle._id}
                        onClick={() => setCurrentCycle(cycle)}
                        className={`cursor-pointer bg-gradient-to-br from-neutral-800 to-neutral-900 border rounded-md px-5 py-3 transition-all opacity-60
                          ${currentCycle?._id === cycle._id
                            ? "border-lime-400 text-lime-400 opacity-100"
                            : "border-neutral-800 text-neutral-400 hover:border-neutral-600"
                          }`}
                      >
                        <span className="text-sm font-semibold">{cycle.title}</span>
                        <p className="text-xs text-neutral-500 mt-1">
                          Ended {new Date(cycle.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <Separator />
        <SidebarFooter>
          <button
            className='flex gap-3 text-sm items-center px-4 py-2 text-neutral-400 hover:text-lime-400 font-bold'
            onClick={handleLogout}
          >
            Sign out <LogOut size={15} />
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}