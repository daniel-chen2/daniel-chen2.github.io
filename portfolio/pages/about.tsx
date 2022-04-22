import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../partials/header'

const About: NextPage = () => {
  return (
    <div>
      <Header></Header>
      
      <div>
        <h1 className='text-3xl font-bold underline bg-blue-500'>Hello</h1>
      </div>
    </div>
  )
}

export default About
