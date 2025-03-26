import Tests from "./Tests";

export default function Assessment() {
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6">
        <Tests 
          link="#" 
          image="/logo.png" 
          assessment="Test 1" 
          description="Developing a website and survey system for the non-profit La Tiendita as a Full Stack Developer in an EPICS project. Helping Hispanic children in underserved neighborhoods identify career paths based on their personalities, skills, and characteristics. Using React for front-end development, Next.js for the back end, and SQLite for the database."
        />
        <Tests 
          link="#" 
          image="/logo.png" 
          assessment="Test 2" 
          description="Developing a website and survey system for the non-profit La Tiendita as a Full Stack Developer in an EPICS project. Helping Hispanic children in underserved neighborhoods identify career paths based on their personalities, skills, and characteristics. Using React for front-end development, Next.js for the back end, and SQLite for the database."
        />
        <Tests 
          link="#" 
          image="/logo.png" 
          assessment="Test 3" 
          description="Developing a website and survey system for the non-profit La Tiendita as a Full Stack Developer in an EPICS project. Helping Hispanic children in underserved neighborhoods identify career paths based on their personalities, skills, and characteristics. Using React for front-end development, Next.js for the back end, and SQLite for the database."
        />
        <Tests 
          link="#" 
          image="/logo.png" 
          assessment="Test 4" 
          description="Developing a website and survey system for the non-profit La Tiendita as a Full Stack Developer in an EPICS project. Helping Hispanic children in underserved neighborhoods identify career paths based on their personalities, skills, and characteristics. Using React for front-end development, Next.js for the back end, and SQLite for the database."
        />
      </div>
    </section>
  );
}
