import React from 'react'
import { Box } from '@chakra-ui/react'
import Footer from '../Footer/Footer'
import Nav from '../Navbar/Navbar'
import { ReactNode } from "react";


interface Props{
    children?:ReactNode
}
export const Layout = ({children}:Props) => {
  return (
		<Box minHeight={"100vh"} display={"flex"} flexDirection={"column"}>
			<Box>
				<Nav />
			</Box>
			{children}
			<Box marginTop={"auto"}>
				<Footer />
			</Box>
		</Box>
	);
}


