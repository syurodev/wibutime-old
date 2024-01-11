import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'


const ErrorCard = () => {
  return (
    <Card className='w-[400px] flex flex-col justify-center items-center'>
      <CardHeader>
        Oops! Something went wrong!
      </CardHeader>
      <CardFooter>
        <Link
          href={"/auth/login"}
          className={buttonVariants({ variant: "outline" })}
        >
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard