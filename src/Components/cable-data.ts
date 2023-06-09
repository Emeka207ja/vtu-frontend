export interface iCable{
    id: number;
    service: string;
    desc:string
}

export const Dstv: iCable[] = [
    {
        id: 1,
        service: "dstv-padi",
        desc:"DStv Padi"
    },
    {
        id: 2,
        service: "dstv-yanga",
        desc:"DStv Yanga"
    },
    {
        id: 3,
        service: "dstv-confam",
        desc:"DStv Confam"
    },
    {
        id: 4,
        service: "dstv6",
        desc:"DStv Asia"
    },
    {
        id: 5,
        service: "dstv79",
        desc:"DStv Compact"
    },
    {
        id: 6,
        service: "dstv7",
        desc:"DStv Compact Plus"
    },
    {
        id: 7,
        service: "dstv3",
        desc:"DStv Premium"
    },
    {
        id: 8,
        service: "dstv10",
        desc:"DStv Premium Asia"
    },
    {
        id: 9,
        service: "dstv9",
        desc:"DStv Premium-French"
    },
]

export const Gotv: iCable[] = [
    {
        id: 1,
        service: "gotv-smallie",
        desc:"GOtv Smallie"
    },
    {
        id: 2,
        service: "gotv-jinja",
        desc:"GOtv Jinja"
    },
    {
        id: 3,
        service: "gotv-jolli",
        desc:"GOtv Jolli"
    },
    {
        id: 4,
        service: "gotv-max",
        desc:"GOtv Max"
    },
    {
        id: 5,
        service: "gotv-supa",
        desc:"GOtv Supa"
    },
]


export const Startimes: iCable[] = [
     {
        id: 1,
        service: "nova",
        desc:"Startimes Nova"
    },
     {
        id: 2,
        service: "basic",
        desc:"Startimes Basic"
    },
     {
        id: 3,
        service: "smart",
        desc:"Startimes Smart"
    },
     {
        id: 4,
        service: "classic",
        desc:"Startimes Classic"
    },
     {
        id: 5,
        service: "super ",
        desc:"Startimes Super"
    },
]