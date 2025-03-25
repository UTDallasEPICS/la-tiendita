import Image from "next/image";

export default function Quick_Links(props: { image: string }) {
  return (
    <a href="#" className="m-10 block">
      <Image src={props.image} width={100} height={100} alt="survey image" />
    </a>
  );
}

