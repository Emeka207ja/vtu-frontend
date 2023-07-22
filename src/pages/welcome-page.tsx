import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box, Button, Link,Center } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function welcomePage() {
    return (
        <SidebarWithHeader>
            <Center >
                 <Box position={"absolute"} top={"40%"}>
                   
                    <Link href='/dashboard' isExternal marginLeft={"0.6rem"}>
                       click to navigate to Dashboard <ExternalLinkIcon mx='2px' />
                    </Link>
            </Box>
           </Center>
        </SidebarWithHeader>
    )
}