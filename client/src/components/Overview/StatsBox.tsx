import { Sparkle } from "lucide-react"

type StatsBoxProps = {
  value: string
  label: string
}

const StatsBox: React.FC<StatsBoxProps> = ({ value, label }) => {
  return (
    <div className='p-6 bg-card border border-border rounded-lg text-center w-full h-full flex flex-col gap-4 justify-center items-center'>
      <span className='bg-accent text-primary p-3 rounded-full'>
        <Sparkle className='h-5 w-5' />
      </span>
      <div className='text-foreground font-bold text-4xl'>
        <span>{value}</span>
      </div>
      <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
        {label}
      </span>
    </div>
  )
}

export default StatsBox