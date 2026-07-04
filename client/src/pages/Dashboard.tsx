import { useState } from "react"
import Cycle from "../components/Cycle/Cycle"
import AppSidebar from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"
import Overview from "../components/Overview/Overview"
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCycle } from "../context/CycleContext"
import { TABS } from "../constants/dashboard"
import Loader from "@/components/Loader/Loader"
import { Plus } from "lucide-react"
import CreateCycleModal from "@/components/Cycle/CreateCycleModal.tsx"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

const Dashboard = () => {
  const { cycles, loading } = useCycle()

  const [currentTab, setCurrentTab] = useState(TABS.OVERVIEW)
  const [open, setOpen] = useState(false)

  if (loading) {
    return (
      <div className='bg-background text-foreground w-screen h-screen flex justify-center items-center'>
        <Loader size='large' />
      </div>
    )
  }

  return (
    <div className='h-screen flex'>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <main className='w-full h-full flex flex-col bg-background p-2'>
          <SidebarTrigger className='text-foreground mt-2' />
          {cycles.length > 0 ? (
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className='w-full h-full flex flex-col'
            >
              <TabsList className='p-3 mb-2 py-5 w-full gap-3 bg-card border border-border'>
                <TabsTrigger value={TABS.OVERVIEW}>Overview</TabsTrigger>
                <TabsTrigger value={TABS.DAY}>Today</TabsTrigger>
                <TabsTrigger value={TABS.WEEK}>This Week</TabsTrigger>
                <TabsTrigger value={TABS.CYCLE}>This Cycle</TabsTrigger>
              </TabsList>
              <TabsContent className='h-full' value={TABS.CYCLE}>
                <Cycle />
              </TabsContent>
              <TabsContent className='h-full' value={TABS.DAY}>
                <Day setCurrentTab={setCurrentTab}></Day>
              </TabsContent>
              <TabsContent className='h-full' value={TABS.OVERVIEW}>
                <Overview setCurrentTab={setCurrentTab} />
              </TabsContent>
              <TabsContent value={TABS.WEEK}>
                <div>To be implemented</div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className='w-full h-72 p-6 bg-secondary border border-border rounded-lg flex flex-col gap-5 justify-center items-center'>
              <span className='text-muted-foreground text-sm'>
                No cycles found. Create one to get started!
              </span>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setOpen(true)}
                    className='px-4 py-1 bg-primary text-primary-foreground uppercase font-bold flex items-center gap-2 hover:bg-primary/90 transition-all rounded-full'
                  >
                    <span className='rounded-full text-primary bg-foreground p-2'>
                      <Plus size={15} />
                    </span>
                    <span className="text-xs">Create New Cycle</span>
                  </button>
                </DialogTrigger>
                <CreateCycleModal setOpen={setOpen}></CreateCycleModal>
              </Dialog>
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard