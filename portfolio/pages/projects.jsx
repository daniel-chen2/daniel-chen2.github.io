import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Projects() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>about</h1>
    </div>
  )
}