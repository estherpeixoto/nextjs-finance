import { Calendar } from './calendar'

const date = new Date()

export default function Home() {
  return (
    <div className="space-y-12 p-2 sm:p-4 md:max-w-[767px] md:mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl capitalize text-zinc-50">
          {`${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
        </h2>

        <span className="text-zinc-500">
          Monthly expense: <span className="text-zinc-50">$ 150.00</span>
        </span>
      </div>

      <Calendar date={date} />
    </div>
  )
}
