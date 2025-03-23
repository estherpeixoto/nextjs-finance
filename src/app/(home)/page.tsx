import { Calendar } from './calendar'

const date = new Date()

export default function Home() {
  return (
    <div className="space-y-12">
      <Calendar date={date} />
    </div>
  )
}
