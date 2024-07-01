import abi from "./Transactions.json";

export const CONTRACT_ADDRESS = "0x04b17Ea11789acdfE73D5Ea87d6777F04fc0DbCE";
// export const CONTRACT_ADDRESS = "0x08bB18a13909Cc48C4AF6468051FAaa185ab01b2";

export const CONTRACT_ABI = abi.abi;

export const NAVBAR_LINKS = [
    {
        name: "Market",
        link: "market",
    },
    {
        name: "Exchange",
        link: "exchange",
    },
    {
        name: "Tutorials",
        link: "tutorials",
    }, {
        name: "Wallets",
        link: "wallets",
    },
]
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

export const SERVICES = [
    {
        color: "bg-[#2952E3]",
        title: "Security guarantee",
        Icon: BsShieldFillCheck,
        iconColor: "text-white",
        iconSize: 21,
        subtitle: "Security is guaranteed. We always maintain privacy and maintain the quality of our products."
    },
    {
        color: "bg-[#8945F8]",
        title: "Best exchange rates",
        Icon: BiSearchAlt,
        iconColor: "text-white",
        iconSize: 21,
        subtitle: "Security is guaranteed. We always maintain privacy and maintain the quality of our products."
    },
    {
        color: "bg-[#F84550]",
        title: "Fastest transactions",
        Icon: RiHeart2Fill,
        iconColor: "text-white",
        iconSize: 21,
        subtitle: "Security is guaranteed. We always maintain privacy and maintain the quality of our products."
    }
];
