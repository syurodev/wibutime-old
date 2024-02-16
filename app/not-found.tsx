"use client"

import { useRouter } from "next/navigation"
import { IoArrowBackOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className='w-full h-dvh flex justify-center items-center bg-background'>
      <div className='flex flex-col gap-4 items-center'>
        <h2>404</h2>
        <p>Không thể tìm thấy tài nguyên được yêu cầu</p>
        <Button
          onClick={() => router.back()}
        >
          <IoArrowBackOutline className="mr-2" />
          Trở lại
        </Button>
        {/* <Link className={buttonVariants({ variant: "default" })} href="/">Về trang chủ</Link> */}
      </div>
    </div>
  )
}