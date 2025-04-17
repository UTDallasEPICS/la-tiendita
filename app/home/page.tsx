import Image from "next/image";
import student from "../../public/student.jpeg";

export default function Intro() {
  return (
    <main className="flex justify-center items-center mt-16 pt-12 px-8">
      <div className="w-1/2 p-5">
        <h1 className="text-4xl font-extrabold text-text">
          La Tiendita Career Aptitude Survey
        </h1>
        <div>
          <p className="text-2xl font-semibold text-text mt-4">
            Empowering Diverse Talent for a Better Tomorrow
          </p>
          <p className="text-2xl text-text mt-4">
            Our job aptitude test is designed to celebrate the unique
            experiences and strengths of the La Tiendita community, helping you
            unlock your full potential in the workplace.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="text-2xl font-semibold bg-accent rounded-xl px-4 py-1 my-1">
            Try our surveys!
          </button>
        </div>
      </div>
      <div className="flex justify-end p-5">
        <Image
          src={student}
          width={550}
          height={550}
          alt="Home Image"
          className="rounded-full object-cover"
        />
      </div>
    </main>
  );
}
