export interface iwaec{
    type: string;
    name: string;
    desc: string;
    img: string;
}

export const waecTypeData: iwaec[] = [
    {
        type: "general",
        name: "Waec Result Checker Pin",
        desc: "WAEC Result Checking PIN / Scratch Card",
        img:"/assets/images/generalwaec.jpg"
    },
    {
        type: "private",
        name: "WAEC Registration PIN",
        desc: "WASSCE Registration Token (PIN) For Private Candidates - Second Series (2023)",
        img:"/assets/images/privatewaec.jpg"
    },
]