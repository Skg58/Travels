"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from "sonner"
import { useEffect } from 'react'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "authenticated"&& session) {
      toast("Signed in!", {
        action: {
          label: "Undo",
        },
      })
    }
  }, [status, session]);

  return (<>
    <nav className='h-20  flex justify-around items-center px-4 '>

     <Link href={"/"}> <div className='text-3xl flex flex-col gap-5 ' >
        <div className='h-2'> <img src="/umb.png" className="size-9 invert-100 " alt="umb" /> </div>
        <div>Travels</div>
      </div></Link>

      <div className=' mt-[40px]  text-lg hidden md:block '>
        <ul className='flex gap-10 '>
          <li><Link href="/" className='hover:underline'>Home</Link></li>
          <li><Link href="/Packages" className='hover:underline'>Packages</Link></li>
          <li><Link href="/Booking" className='hover:underline'>Book Now</Link></li>
        </ul>
      </div>


      {session ? (
        <div className='mt-[30px] min-w-[6.3vw]   text-white opacity-[0.8] hover:opacity-[1] cursor-pointer rounded-full flex items-center justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger><div className=' p-1 rounded-full mr-1 bg-black '><Image src={session.user.image ? session.user.image : session.user.picture} width={35} height={35} className='rounded-full cursor-pointer ' alt="img" /></div></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel><Link href={"/My-Bookings"} className='cursor-pointer '><div className='w-full text-center hover:underline underline-offset-4'> My Booking</div></Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel><button onClick={() => signOut()} className='  px-0.5 py-0.5 my-0.5 rounded cursor-pointer w-full text-center hover:text-red-600'>Sign Out</button></DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='mt-[30px] bg-[#000000]  text-white opacity-[0.8] hover:opacity-[1] cursor-pointer px-4  py-2 rounded-full shadow-[0_1px_15px_rgba(0,0,0,0.30)]  ' >
          <button onClick={() => signIn()} className=' px-2 py-0.5 my-0.5 rounded cursor-pointer '>Sign In</button>
        </div>
      )}

    </nav>

  </>
  )
}

export default Navbar