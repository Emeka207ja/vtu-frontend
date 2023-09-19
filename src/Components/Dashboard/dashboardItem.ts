
import { IconType } from "react-icons"
import {FaWallet,FaUserFriends} from "react-icons/fa"
import {ImConnection} from "react-icons/im"
import {BiPhoneCall} from "react-icons/bi"
import {BsLightbulb} from "react-icons/bs"
import { FiMonitor } from "react-icons/fi"
import {SiGooglescholar} from "react-icons/si"
import {AiTwotoneInsurance} from "react-icons/ai"
export interface idashboardItem{
    name: string,
    icon: IconType,
    url:string
}

export const dashboardItem: idashboardItem[] = [
    {
        name: "Airtime",
        icon: BiPhoneCall,
        url:"/airtime"
    },
    {
        name: "Data",
        icon: ImConnection,
        url:"/data"
    },
    {
        name: "Cheap Data",
        icon: ImConnection,
        url:"/datatwo"
    },
    {
        name: "Wallet",
        icon: FaWallet,
        url:"/wallet"
    },
    {
        name: "Electricity",
        icon: BsLightbulb,
        url:"/electricity"
    },
    {
        name: "Tv sub",
        icon: FiMonitor,
        url:"/cable"
    },
    {
        name: "P2P",
        icon: FaUserFriends,
        url:"/peer"
    },
    {
        name: "Smile",
        icon: BiPhoneCall,
        url:"/smile"
    },
    {
        name: "Spectranet",
        icon: BiPhoneCall,
        url:"/spectranet"
    },
    {
        name: "Insurance",
        icon: AiTwotoneInsurance,
        url:"/insurance"
    },
    {
        name: "Int.Airtime",
        icon: BiPhoneCall,
        url:"/internationalairtime"
    },
    {
        name: "waec pins",
        icon: SiGooglescholar,
        url:"/waec"
    },
]