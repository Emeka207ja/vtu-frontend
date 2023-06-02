import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Layout } from "../Components/Layout/Layout"
import { Hero } from '@/Components/Landing-Page-Folder/Hero'
import { Featured } from '@/Components/Landing-Page-Folder/Featured/Featured'
import { About } from "@/Components/Landing-Page-Folder/About"
import { Services } from '@/Components/Landing-Page-Folder/Services'
import { Features } from '@/Components/Landing-Page-Folder/Features'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Buy</title>
        <meta name="description" content="purchase your airtime and subscriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <Layout>
        <Hero />
        <Featured />
        <About />
        <Services />
        <Features/>
      </Layout>
     
    </>
  )
}
