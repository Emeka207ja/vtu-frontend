import { ReactNode } from "react";
import {
	Box,
	Flex,
	Avatar,
	Link,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
    Center,
    HStack,
	IconButton,
	Image,
	Text
	
 
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
	{
		id: "Home",
		url: "#home",
	},
	
	{
		id: "About Us",
		url: "#about",
	},
	{
		id: "Our Services",
		url: "#service",
	},
	{
		id: "Our Features",
		url: "#features",
	},
	{
		id: "FAQ",
		url: "/?query=faq",
	},
	{
		id: "Signup",
		url: "/signup",
	},
	{
		id: "Login",
		url: "/login",
	},
	
];
interface Props {
    children?: ReactNode,
	url?: string,
	
}

const NavLink = ({ children,url}:Props) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		fontSize={13}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.200", "gray.700"),
		}}
		href={url?url:"#"}
	>
		{children}
	</Link>
);

export default function Nav() {;
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<Box bg={"whiteAlpha.200"} px={4} py={2} borderRadius={"md"}>
						<Text fontSize={15} fontStyle={"italic"}>Allpoint Vtu</Text>
					</Box>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							</Button>
						</Stack>
					</Flex>
					<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
						{Links.map((link) => (
							<Box key={link.id}>
								<NavLink url={link.url}>{link.id}</NavLink>
							</Box>
						))}
					</HStack>
				</Flex>
				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link) => (
								<Box key={link.id}>
									<NavLink url={link.url}>{link.id}</NavLink>
								</Box>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
