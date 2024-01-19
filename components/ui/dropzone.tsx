import { ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import * as React from "react"

export interface DropzoneProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(
  ({ className, type, disabled, value, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border border-dashed rounded-lg cursor-pointer bg-background hover:bg-gray-100 dark:hover:bg-black transition-all duration-300 ease-in-out relative">
          <div className={`flex flex-col items-center justify-center rounded-lg p-5 z-20  ${value ? "bg-background/60 backdrop-blur-lg" : ""}`}>
            {
              disabled ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Nhấn để tải lên</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                </>
              )
            }

          </div>

          {
            value && <Image
              src={value.toString()}
              alt=""
              fill
              priority
              className="object-cover rounded-lg opacity-85"
            />
          }
          <input
            className="hidden"
            type={type}
            disabled={disabled}
            ref={ref}
            {...props}
          />
        </label>
      </div>
    )
  }
)
Dropzone.displayName = "Dropzone"

export { Dropzone }
