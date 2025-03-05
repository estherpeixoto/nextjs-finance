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
    <nav className="px-2 md:max-w-[767px] md:mx-auto sm:px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl text-zinc-50">Calendar</h1>

      <Button
        onClick={() => setOpen(true)}
        className="rounded-full bg-zinc-700 text-zinc-50 p-2 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <PlusIcon width={24} height={24} />
      </Button>

      <Modal open={open} setOpen={setOpen}>
        <DialogTitle
          as="h3"
          className="text-center font-semibold text-zinc-50 mb-8"
        >
          Add subscription
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 mb-8"
        >
          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Description
            </Label>

            <Description className="text-sm/6 text-white/50">
              Enter the subscription name (e.g., Spotify)
            </Description>

            <Input
              {...register('description')}
              className="mt-3 block w-full rounded-lg border-none bg-zinc-700/50 py-1.5 px-3 text-sm/6 text-white focus:outline-2 focus:outline-offset-2 focus:outline-white/25"
            />

            <p className="text-xs text-red-400 mt-2">
              {errors.description?.message}
            </p>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Plan</Label>

            <Description className="text-sm/6 text-white/50">
              Enter the subscription plan (e.g., Standard)
            </Description>

            <Input
              {...register('plan')}
              className="mt-3 block w-full rounded-lg border-none bg-zinc-700/50 py-1.5 px-3 text-sm/6 text-white focus:outline-2 focus:outline-offset-2 focus:outline-white/25"
            />

            <p className="text-xs text-red-400 mt-2">{errors.plan?.message}</p>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Price</Label>

            <Input
              {...register('price')}
              placeholder="$"
              className="mt-3 block w-full rounded-lg border-none bg-zinc-700/50 py-1.5 px-3 text-sm/6 text-white focus:outline-2 focus:outline-offset-2 focus:outline-white/25"
            />

            <p className="text-xs text-red-400 mt-2">{errors.price?.message}</p>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Credit card
            </Label>

            <Description className="text-sm/6 text-white/50">
              Enter the last 4 digits of the credit card used
            </Description>

            <div className="mt-3 flex divide-x divide-zinc-700">
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
                    <ListboxButton className="relative block w-[80px] rounded-l-lg bg-zinc-700/50 p-3">
                      <PaymentIcon
                        type={watch('flag') as PaymentType}
                        width={24}
                        height={24}
                      />

                      <ChevronDownIcon
                        className="size-4 fill-zinc-50 absolute top-2.5 right-2.5"
                        aria-hidden="true"
                      />
                    </ListboxButton>

                    <ListboxOptions
                      anchor="bottom"
                      transition
                      className="z-20 w-40 rounded-lg bg-zinc-700 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 mt-2 ms-11"
                    >
                      {paymentMethods.map(subscription => (
                        <ListboxOption
                          key={subscription.name}
                          value={subscription.icon}
                          className="flex items-center gap-2 cursor-default rounded-lg p-1.5 select-none focus:bg-zinc-900/50 hover:bg-zinc-900/50"
                        >
                          <PaymentIcon
                            type={subscription.icon as PaymentType}
                            width={24}
                            height={24}
                          />

                          <span className="text-sm text-zinc-200">
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
                className="block w-full rounded-r-lg border-none bg-zinc-700/50 py-1.5 px-3 text-sm/6 text-white focus:outline-2 outline-offset-2 focus:outline-white/25 data-[invalid=true]:outline-2 data-[invalid=true]:outline-red-400"
                data-invalid={errors.lastFourDigits ? 'true' : 'false'}
              />
            </div>

            <p className="text-xs text-red-400 mt-2">{errors.flag?.message}</p>

            <p className="text-xs text-red-400 mt-2">
              {errors.lastFourDigits?.message}
            </p>
          </Field>

          <Button
            type="submit"
            className="w-full text-center rounded-md transition-colors py-1.5 px-3 text-sm/6 font-semibold text-zinc-50 focus:outline-none bg-zinc-900/60 hover:bg-zinc-950/50 data-[open]:bg-zinc-700 focus:outline-1 focus:outline-white"
          >
            Save
          </Button>
        </form>
      </Modal>
    </nav>
  )
}
