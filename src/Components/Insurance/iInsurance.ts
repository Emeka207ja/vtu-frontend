
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


export interface icarInsureData{
    Plate_Number: string;
    varCode: string;
   
    phone: string;
    Insured_Name: string;
    Engine_Number: string;
    Chasis_Number: string;
    Vehicle_Make: string;
    Vehicle_Color: string;
    Vehicle_Model: string;
    Year_of_Make: string;
    Contact_Address:string
}

export const carInsuranceBioData: icarInsureData = {
    "Plate_Number": "",
    "varCode": "1",
    "phone": "",
    "Insured_Name" : "",
    "Engine_Number": "",
    "Chasis_Number": "",
    "Vehicle_Make": "",
    "Vehicle_Color": "",
    "Vehicle_Model": "",
    "Year_of_Make": "",
    "Contact_Address":""
}