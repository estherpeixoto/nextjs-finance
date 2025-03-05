'use client'

import { Button, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import netflixLogo from '../../assets/icons/Netflix.svg'
import Modal from '../components/modal'

const weekday = [
  { number: 1, name: 'Sunday' },
  { number: 2, name: 'Monday' },
  { number: 3, name: 'Tuesday' },
  { number: 4, name: 'Wednesday' },
  { number: 5, name: 'Thursday' },
  { number: 6, name: 'Friday' },
  { number: 7, name: 'Saturday' },
]

export function Calendar({ date }: { date: Date }) {
  const [open, setOpen] = useState(false)

  const openModal = (day: number) => {
    date.setDate(day)
    // date.toISOString().substring(0, 10) pra fazer o fetch
    setOpen(true)
  }

  const firstWeekdayOfMonth = new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-01`
  )

  const monthStartAt = firstWeekdayOfMonth.getDay()

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()

  const monthDays: Array<{
    number: number
    today: boolean
  }> = []

  for (let i = 0; i < daysInMonth; i++) {
    monthDays.push({
      number: i + 1,
      today: date.getDay() === i,
    })
  }

  return (
    <>
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekday.map(day => {
            return (
              <div
                className="uppercase text-xs px-4 py-2 bg-zinc-700 text-zinc-200 rounded sm:rounded-full flex items-center justify-center"
                key={day.number}
              >
                {day.name.substring(0, 3)}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: monthStartAt }, (_, index) => {
            const key = `space-${index}`
            return <div key={key} />
          })}

          {monthDays.map(day => {
            return (
              <Button
                key={day.number}
                onClick={() => openModal(day.number)}
                type="button"
                className="relative uppercase min-h-20 bg-zinc-800 text-zinc-50 rounded sm:rounded-xl flex items-center justify-center cursor-pointer"
              >
                <Image
                  src={netflixLogo}
                  width={24}
                  height={24}
                  alt="Netflix"
                  className="-mt-4"
                />

                <span className="absolute bottom-2 text-sm">{day.number}</span>
                <span className="absolute top-2 right-2 rounded-full size-2 bg-zinc-700" />
              </Button>
            )
          })}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <DialogTitle
          as="h3"
          className="text-center font-semibold text-zinc-50 mb-8"
        >
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </DialogTitle>

        <div className="flex flex-col gap-2 mb-8">
          <Button
            onClick={() => {}}
            className="flex items-center rounded-xl p-3 bg-zinc-900/60 hover:bg-zinc-950/50 transition-colors cursor-pointer"
          >
            <Image src={netflixLogo} width={24} height={24} alt="Logo" />

            <span className="text-zinc-200 ms-2">Netflix</span>

            <span className="text-zinc-400 text-sm ms-auto">R$ 39,90</span>
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-500">Total: R$ 100,00</p>
      </Modal>
    </>
  )
}
