import Image from "next/image";

interface TestProps {
  image: string;
  link: string;
  assessment: string;
  description: string;
}

export default function Tests(props: TestProps) {
  return (
    <a
      href={props.link}
      className="flex items-center space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 transition duration-300 transform hover:-translate-y-1 max-h-[250px] overflow-hidden hover:bg-blue-100"
    >
      <Image
        src={props.image}
        alt="company logo"
        width={100}
        height={100}
        className="w-32 h-32 object-cover rounded-lg"
      />

      <div className="flex flex-col space-y-2">
        <h1 className="text-xl font-semibold text-customGray">
          {props.assessment}
        </h1>
        <h2 className="text-lg text-black">{props.description}</h2>
      </div>
    </a>
  );
}
