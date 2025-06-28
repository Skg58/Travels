import Link from 'next/link'
import React from 'react'

const footer = () => {
  return (<>
    <footer className='bg-[#222833] relative bottom-0 w-[102vw] md:w-full'>
      <div className='flex flex-col md:flex-row text-white px-6 md:px-20 py-10  ml-5 md:gap-5 justify-center items-start w-[96vw]  '>

        <div className='w-full md:w-1/4 px-10 mb-8 md:mb-0'>
          <h2 className='text-2xl font-semibold mb-4'>About Us</h2>
          <p className='text-sm'>
            We are passionate travel enthusiasts . From hidden gems to iconic landmarks, we provide insider tips, curated guides, and up-to-date information to help you experience this destination like a local.
          </p>
        </div>

        <div className='w-full md:w-1/4 px-10 mb-8 md:mb-0'>
          <h2 className='text-2xl font-semibold mb-4'>Useful Links</h2>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="Packages"  className="hover:underline">Services</Link>
            </li>
            <li>
              <Link href="/"  className="hover:underline">Blog</Link>
            </li>
            <li>
              <Link href="/"  className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>

        <div className='w-full md:w-1/4 px-10'>
          <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
          <p className='text-sm mb-2'>789 Tech Park Road, Sector 5, HSR Layout, Bengaluru, Karnataka 560102</p>
          <p className='text-sm mb-2'>Email: contact@Travels.in</p>
          <p className='text-sm'>Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className='bg-white container mx-[14vw] h-[1px] w-[73vw] '></div>
      <div className='text-white pt-3 text-center'>&copy;Copyright 2025 Travels. All Rights Reserved.</div>
      <div className='text-white pb-2 text-center'> Made with ❤️ by <Link href={"https://github.com/skg58"} target='_blank'> <span className='hover:text-gray-400 hover:underline'>skg58</span></Link> </div>
    </footer>
  </>
  )
}

export default footer