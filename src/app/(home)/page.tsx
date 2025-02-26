// Month: 0 represents January
// Day..: 0 represents Sunday

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import googleOneLogo from '../../assets/icons/Google One.svg'
import netflixLogo from '../../assets/icons/Netflix.svg'

const date = new Date()

const daysInMonth = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDate()

const firstWeekdayOfMonth = new Date(
  `${date.getFullYear()}-${date.getMonth() + 1}-01`
)

const monthStartAt = firstWeekdayOfMonth.getDay()

interface Day {
  number: number
  today: boolean
}

const monthDays: Array<Day> = []

for (let i = 0; i < daysInMonth; i++) {
  monthDays.push({
    number: i + 1,
    today: date.getDay() === i,
  })
}

const weekday = [
  { number: 1, name: 'Sunday' },
  { number: 2, name: 'Monday' },
  { number: 3, name: 'Tuesday' },
  { number: 4, name: 'Wednesday' },
  { number: 5, name: 'Thursday' },
  { number: 6, name: 'Friday' },
  { number: 7, name: 'Saturday' },
]

// @TODO Show subscriptions logo using this array as data source
const subscriptions = [
  { service: 'Netflix', logo: netflixLogo, day: 10 },
  { service: 'Google One', logo: googleOneLogo, day: 15 },
]

export default function Home() {
  return (
    <div className="min-w-[40rem] space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl capitalize">
          {`${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)}, ${date.getFullYear()}`}
        </h2>

        <span className="text-base">Monthly expense: $ 150.00</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-2">
          {weekday.map(day => {
            return (
              <div
                className="uppercase text-xs px-4 py-2 bg-white rounded-full flex items-center justify-center"
                key={day.number}
              >
                {day.name.substring(0, 3)}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: monthStartAt }, (_, index) => {
            return <div key={index} />
          })}

          {monthDays.map(day => {
            return (
              <div
                className="relative uppercase min-h-20 bg-white rounded-xl flex items-center justify-center"
                key={day.number}
              >
                <Image
                  src={netflixLogo}
                  width={30}
                  height={30}
                  alt="Netflix"
                  className="-mt-4"
                />

                <span className="absolute bottom-2 text-sm">{day.number}</span>
                <span className="absolute top-2 right-2 rounded-full size-2 bg-gray-800" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
