"use client";
import { FaClipboardCheck, FaUserGraduate, FaChartLine } from "react-icons/fa";
import { ReactElement } from "react";
import { useUser } from "../context/UserContext";

export default function About() {
  const { user } = useUser();
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">
          Discover Your Career Fit
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Take job aptitude tests, explore career paths, and unlock your full
          potential with La Tiendita
        </p>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<FaClipboardCheck className="text-4xl text-primary" />}
          title="Take Aptitude Tests"
          description="Assess your skills and strengths with professionally designed job aptitude tests."
        />
        <FeatureCard
          icon={<FaUserGraduate className="text-4xl text-primary" />}
          title="Get Career Insights"
          description="Receive tailored career suggestions based on your unique test results."
        />
        <FeatureCard
          icon={<FaChartLine className="text-4xl text-primary" />}
          title="Track Your Progress"
          description="Monitor your development and compare results over time to measure growth."
        />
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-black mb-4">
          Start Your Journey Today
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Join La Tiendita and take the first step toward discovering the career
          that's right for you.
        </p>
        <a
          href={user != null ? "/assessments" : "/login"}
          className="bg-primary text-white px-6 py-2 rounded-md text-base hover:bg-primary/90 transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}

type FeatureCardProps = {
  icon: ReactElement;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  );
};
