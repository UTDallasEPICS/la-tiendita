import Tests from "./Tests";

export default function Assessment() {
  return (
    <section className="mt-16 p-5 max-w-5xl mx-auto">
      <h1 className="text-text text-2xl font-bold text-center">
        Our Assessments
      </h1>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        {[0, 1, 2, 3, 4].map((id) => (
          <Tests
            key={id}
            link={`/survey/${id}`}
            image="/logo3.jpeg"
            assessment={`Test ${id + 1}`}
            description="Developing a website and survey system for the non-profit La Tiendita as a Full Stack Developer in an EPICS project. Helping Hispanic children in underserved neighborhoods identify career paths based on their personalities, skills, and characteristics. Using React for front-end development, Next.js for the back end, and SQLite for the database."
          />
        ))}
      </div>
    </section>
  );
}
