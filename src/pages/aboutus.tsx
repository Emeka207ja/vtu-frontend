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
import { HomePage } from '@/Components/Home/HomePage'
import { FrontPage } from '@/Components/Landing-Page-Folder/Home'
import NotAuthHeader from '@/Components/Dashboard/NotAuthDassboard'
import Footer from '@/Components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function aboutus() {
  return (
    <>
      <Head>
        <title>allpoint vtu</title>
        <meta name="description" content="purchase your airtime and subscriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="airtime, data, dstv, startimes, gotv, smile, spectranet"/>
        <link rel="icon" href="/assets/images/new_logo.jpg" />
      </Head>
      <NotAuthHeader>
        <Hero />
        <Featured />
        <About />
        <Services />
        <Features />
        <Footer/>
      </NotAuthHeader>
     
    </>
  )
}
