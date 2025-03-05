import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-900/70 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full sm:w-sm rounded-xl bg-zinc-800 p-8 shadow-lg shadow-zinc-900 transform overflow-hidden transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
