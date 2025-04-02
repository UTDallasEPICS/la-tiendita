import Module from "./Module";

export default function Survey() {
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6">
        <Module question="Do androids dream of electric sheep?" type="scale"></Module>
        <Module question="Do androids dream of electric sheep?" type="multi"></Module>
        <Module question="Do androids dream of electric sheep?" type="free"></Module>
      </div>
    </section>
  );
}