
export interface iInsure{
    type:string
    name: string;
    desc: string;
    image: string;
    insurer:string
}

export const insuranceData: iInsure[] = [
    {
        type: "car",
        name: "Third Party Motor Insurance-Universal Insurance",
        desc: "third party motor insurance,universal insurance",
        image: "/assets/images/motor.jpg",
        insurer:""
    },
    {
        type: "personal",
        name: "Personal Accident Insurance",
        desc: "This policy pays compensation in the event of injuries, disability or death caused solely by external and visible events to the         policyholder.",
        image: "/assets/images/personal.jpg",
        insurer:"FBN General Insurance"
    },
    {
        type: "home",
        name: "Home Cover Insurance",
        desc: "This policy compensates in the event of loss or damage to property of the insured as a result of fire & allied perils, theft and burglary.",
        image: "/assets/images/home.jpg",
        insurer:"FBN General Insurance"
    },
]