import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import NotAuthHeader from '@/Components/Dashboard/NotAuthDassboard'
import {TC} from "@/Components/Landing-Page-Folder/TC"
export default function Home() {
  return (
    <>
      <Head>
        <title>privacy and policy</title>
        <meta name="description" content="purchase your airtime and subscriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="airtime, data, dstv, startimes, gotv, smile, spectranet"/>
        <link rel="icon" href="/assets/images/new_logo.jpg" />
      </Head>
      <NotAuthHeader>
       <TC/>
      </NotAuthHeader>
     
    </>
  )
}
