import {
    Container,
    Image,
    Center,
    Heading,
    Text,
    Button
} from "@chakra-ui/react";
import  NextLink from "next/link"

export const FrontPage: React.FC = () => {
    return (
        <Container mb="2rem">
            <Center mt={"5rem"}>
                <Image src="/assets/images/new_logo.jpg" boxSize='50px' borderRadius='full' objectFit='cover'/>
            </Center>
            <Center>
                <Heading fontSize={"1rem"} mt={"1rem"}>Welcome to Allpoint</Heading>
            </Center>
            <Center mt={"1rem"}>
                <Text align={"center"} fontSize={"0.8rem"}>
                   Join allpoint subscribers today and easily pay your bills, subscriptions and betting payment. To get started, please sign in to your account or create a new one
                </Text>
            </Center>
            <Center display="block">
                <Button as={"a"} href="/signup" w={"full"} colorScheme="blue" mt="2rem">create account</Button>
                <Button as={"a"} href="/login" w={"full"} colorScheme="blue" mt="1rem" variant="outline">sign in</Button>
            </Center>

            <Center mt={"2rem"}>
                <Text align={"center"} fontSize={"0.8rem"}>
                    by tapping <NextLink href="/signup" passHref>create account</NextLink> or <NextLink href="/login" passHref>sign in</NextLink> you agree to our terms and conditions
                </Text>
            </Center>

            <Center textAlign={"center"} fontSize={"0.8rem"}>
                <NextLink href="/tc" passHref  >
                    Learn more how we process your data, in our privacy and cookie policy
                </NextLink>
            </Center>
        </Container>
    )
}