import Image from "next/image"

export default function Quick_Links(props : {image: string}){
    return (
        <Image src={props.image} alt="survey image" />
    );
}

