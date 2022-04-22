// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import Link from 'next/link'

const Links = () => {
  return (
    <div>
      <li>
        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <span><Link href="/">Home</Link></span>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <span><Link href="/">About</Link></span>
        </a>
      </li>
    </div>
  )
}

const Header: NextPage = () => {
  return (
    <aside className="w-48 h-screen bg-gray-50" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800">
        <a href="https://flowbite.com" className="flex items-center pl-2.5 mb-5">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Daniel Chen</span>
        </a>
        <ul className="space-y-2">
          <Links></Links>
        </ul>
      </div>
    </aside>
  )
}


export default Header
