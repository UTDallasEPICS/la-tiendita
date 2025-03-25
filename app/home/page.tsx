import Image from "next/image";
import home_pic from "../pictures/home_pic.jpg";

export default function Landing() {
    return (
        <main className="flex justify-between mt-20 pt-10 px-8">

            <div className="w-1/2 p-5">
                <h1 className="text-6xl font-extrabold text-customGray">Goatiendas</h1>
                <p className="text-customGray mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

            <div className="flex justify-end p-5">
                <Image 
                    src={home_pic} 
                    width={500} 
                    height={500}
                    alt="Home Image" 
                    className="rounded-full object-cover"
                />
            </div>
        </main>
    );
}
