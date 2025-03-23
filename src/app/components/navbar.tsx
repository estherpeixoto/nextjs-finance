'use client'

import {
  Button,
  Description,
  DialogTitle,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import currencyToFloat from 'currency-to-float'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  PaymentIcon,
  type PaymentType,
} from 'react-svg-credit-card-payment-icons'
import { z } from 'zod'
import Modal from './modal'

const schema = z
  .object({
    description: z.string().min(1),
    icon: z.string(),
    plan: z.string(),
    price: z
      .string()
      .transform(val => currencyToFloat(val))
      .refine(val => val > 0, {
        message: 'Price need be more than 0 (zero)',
      }),
    startDate: z.date(),
    period: z.string(),
    paymentMethodName: z.string(),
    flag: z.string(),
    lastFourDigits: z.string().min(4).max(4),
  })
  .required()

type FormData = z.infer<typeof schema>

export function Navbar() {
  const paymentMethods = [
    { id: 1, name: 'Mastercard', icon: 'mastercard' },
    { id: 2, name: 'Visa', icon: 'visa' },
    { id: 3, name: 'Elo', icon: 'elo' },
  ]

  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      flag: paymentMethods[0].icon,
    },
  })

  const onSubmit = (data: FormData) => console.log(data)

  return (
    <nav className="flex justify-between items-center bg-gray-50 px-6 py-4">
      <h1 className="text-gray-900">
        {`${(new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
      </h1>

      <Button
        onClick={() => setOpen(true)}
        className="bg-white shadow p-2 border border-gray-300 rounded-md text-gray-400 hover:text-gray-500 cursor-pointer"
      >
        <PlusIcon width={20} height={20} />
      </Button>

      <Modal open={open} setOpen={setOpen}>
        <DialogTitle as="h3" className="mb-8 text-gray-900 text-center">
          Add subscription
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 mb-8"
        >
          <Field>
            <Label passive={true} className="block mb-1 text-gray-900 text-sm">
              Description
            </Label>

            <Description className="text-gray-500 text-xs">
              Enter the subscription name (e.g., Spotify)
            </Description>

            <div className="flex items-center bg-white mt-2 pl-3 rounded-md outline-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-blue-600 -outline-offset-1 has-[input:focus-within]:-outline-offset-2">
              <Input
                {...register('description')}
                className="block py-1.5 pr-3 pl-1 focus:outline-none min-w-0 text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base grow"
              />
            </div>

            <p className="mt-2 text-red-500 text-xs">
              {errors.description?.message}
            </p>
          </Field>

          <Field>
            <Label passive={true} className="block mb-1 text-gray-900 text-sm">
              Plan
            </Label>

            <Description className="text-gray-500 text-xs">
              Enter the subscription plan (e.g., Standard)
            </Description>

            <div className="flex items-center bg-white mt-2 pl-3 rounded-md outline-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-blue-600 -outline-offset-1 has-[input:focus-within]:-outline-offset-2">
              <Input
                {...register('plan')}
                className="block py-1.5 pr-3 pl-1 focus:outline-none min-w-0 text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base grow"
              />
            </div>

            <p className="mt-2 text-red-500 text-xs">{errors.plan?.message}</p>
          </Field>

          <Field>
            <Label passive={true} className="block text-gray-900 text-sm">
              Price
            </Label>

            <div className="flex items-center bg-white mt-2 pl-3 rounded-md outline-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-blue-600 -outline-offset-1 has-[input:focus-within]:-outline-offset-2">
              <Input
                {...register('price')}
                placeholder="$"
                className="block py-1.5 pr-3 pl-1 focus:outline-none min-w-0 text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base grow"
              />
            </div>

            <p className="mt-2 text-red-500 text-xs">{errors.price?.message}</p>
          </Field>

          <Field>
            <Label passive={true} className="block mb-1 text-gray-900 text-sm">
              Credit card
            </Label>

            <Description className="text-gray-500 text-xs">
              Enter the last 4 digits of the credit card used
            </Description>

            <div className="flex items-center bg-white mt-2 rounded-md outline-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-blue-600 -outline-offset-1 has-[input:focus-within]:-outline-offset-2">
              <Controller
                control={control}
                name="flag"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Listbox
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    as="div"
                  >
                    <ListboxButton className="block relative p-3 rounded-l-md outline-gray-300 data-[active]:outline-2 data-[active]:outline-blue-600 -outline-offset-1 data-[active]:-outline-offset-2 w-[80px]">
                      <PaymentIcon
                        type={watch('flag') as PaymentType}
                        width={24}
                        height={24}
                      />

                      <ChevronDownIcon
                        className="top-2.5 right-2.5 absolute fill-gray-500 size-4"
                        aria-hidden="true"
                      />
                    </ListboxButton>

                    <ListboxOptions
                      anchor="bottom"
                      transition
                      className="z-20 bg-white data-[leave]:data-[closed]:opacity-0 ms-11 mt-2 p-1 border border-gray-300 rounded-md focus:outline-none w-40 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)]"
                    >
                      {paymentMethods.map(subscription => (
                        <ListboxOption
                          key={subscription.name}
                          value={subscription.icon}
                          className="flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50 p-1.5 rounded-md cursor-default select-none"
                        >
                          <PaymentIcon
                            type={subscription.icon as PaymentType}
                            width={24}
                            height={24}
                          />

                          <span className="text-gray-900 text-sm">
                            {subscription.name}
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                )}
              />

              <Input
                {...register('lastFourDigits')}
                placeholder="****"
                type="number"
                maxLength={4}
                className="block py-1.5 pr-3 pl-1 focus:outline-none min-w-0 text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base grow"
                data-invalid={errors.lastFourDigits ? 'true' : 'false'}
              />
            </div>

            <p className="mt-2 text-red-500 text-xs">{errors.flag?.message}</p>

            <p className="mt-2 text-red-500 text-xs">
              {errors.lastFourDigits?.message}
            </p>
          </Field>

          <Button
            type="submit"
            className="bg-blue-600 data-[open]:bg-blue-700 hover:bg-blue-700 px-3 py-1.5 rounded-md focus:outline-1 focus:outline-none focus:outline-white w-full text-gray-50 text-sm/6 text-center transition-colors"
          >
            Save
          </Button>
        </form>
      </Modal>
    </nav>
  )
}
