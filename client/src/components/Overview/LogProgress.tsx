import { NotebookPen } from "lucide-react"
import { TABS } from "../../constants/dashboard"

const LogProgress = ({ setCurrentTab }) => {
  return (
    <div
      onClick={() => setCurrentTab(TABS.DAY)}
      className='p-6 bg-card border border-border transition-all hover:border-primary cursor-pointer w-full h-full rounded-lg flex justify-center gap-4 items-center'
    >
      <span className='bg-accent text-primary p-4 rounded-full'>
        <NotebookPen className='h-5' />
      </span>
      <span className='uppercase font-bold tracking-wide text-foreground'>
        Log Progress
      </span>
    </div>
  )
}

export default LogProgress