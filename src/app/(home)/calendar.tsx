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
      <div>
        <div className="grid grid-cols-7 border-gray-200 border-t divide-x divide-y divide-gray-200">
          {weekday.map(day => {
            return (
              <div
                className="flex justify-center items-center bg-white px-4 py-2 text-gray-900 text-xs uppercase"
                key={day.number}
              >
                {day.name.substring(0, 3)}
              </div>
            )
          })}

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
                className="relative flex justify-center items-center bg-white min-h-20 text-gray-900 uppercase cursor-pointer"
              >
                <Image
                  src={netflixLogo}
                  width={24}
                  height={24}
                  alt="Netflix"
                  className="-mt-4"
                />

                <span className="bottom-2 absolute text-sm">{day.number}</span>
                <span className="top-2 right-2 absolute bg-gray-300 rounded-full size-2" />
              </Button>
            )
          })}

          {Array.from({ length: monthStartAt }, (_, index) => {
            const key = `space-${index}`
            return <div key={key} />
          })}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <DialogTitle as="h3" className="mb-8 text-gray-900 text-center">
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </DialogTitle>

        <div className="flex flex-col gap-2 mb-8">
          <Button className="flex items-center bg-white p-3 rounded-xl outline outline-gray-300 hover:outline-2 hover:outline-blue-600 transition-colors cursor-pointer">
            <Image src={netflixLogo} width={24} height={24} alt="Logo" />

            <span className="ms-2 text-gray-900">Netflix</span>

            <span className="ms-auto text-gray-500 text-sm">R$ 39,90</span>
          </Button>
        </div>

        <p className="text-gray-500 text-sm text-center">Total: R$ 100,00</p>
      </Modal>
    </>
  )
}
