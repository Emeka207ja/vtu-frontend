import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
	Button
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	label?: string;
	href?: string;
}



const SocialButton = ({ children, label, href }:Props) => {
	return (
		<Button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{
				children
		}
		</Button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				{/* <Logo /> */}
				<Text>© Easy Buy. All rights reserved</Text>
				<Box>
					<Text>Contact us</Text>
					<Text>+2348137663855</Text>
					<Text>allpointvtu@gmail.com</Text>
					<Text>20,ungwan waje street</Text>
					<Text>Lafia</Text>
					<Text>Nasarawa state</Text>
					<Text>Nigeria</Text>
				</Box>
				<Stack direction={"row"} spacing={6}>
					<SocialButton label={"Twitter"} href={"https://twitter.com/AllpointAFRICA"}>
						<FaTwitter />
					</SocialButton>
					<SocialButton label={"YouTube"} href={"#"}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={"Instagram"} href={"#"}>
						<FaInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
