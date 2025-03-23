import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'

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
    <Dialog open={open} onClose={setOpen} className="z-10 relative">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/30 data-closed:opacity-0 transition-opacity data-enter:duration-300 data-leave:duration-200 data-leave:ease-in data-enter:ease-out"
      />

      <div className="z-10 fixed inset-0 w-screen overflow-y-auto">
        <div className="flex justify-center items-center sm:items-center p-4 min-h-full">
          <DialogPanel
            transition
            className="relative bg-gray-50 data-closed:opacity-0 shadow-lg p-8 rounded-md w-full sm:w-sm overflow-hidden data-closed:sm:scale-95 transition-all data-closed:sm:translate-y-0 data-closed:translate-y-4 data-enter:duration-300 data-leave:duration-200 data-leave:ease-in data-enter:ease-out transform"
          >
            <Button
              className="top-8.5 right-8 fixed text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="size-5" />
            </Button>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
