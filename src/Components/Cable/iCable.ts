interface iCable{
    id:string
    name: string;
    image:string
}

export const cable: iCable[] = [
    {
        name: "DSTV Subscription",
        id: "dstv",
        image:"/assets/images/dstv.jpg"
    },
    {
        name: "GoTv Subscription",
        id: "gotv",
        image:"/assets/images/gotv.jpg"
    },
    {
        name: "Startimes Subscription",
        id: "startimes",
        image:"/assets/images/startimes.jpg"
    },
    {
        name: "ShowMax Subscription",
        id: "showmax",
        image:"/assets/images/showmax.jpg"
    },
]