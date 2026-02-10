"use client";

import { TECH_SPECS } from "@/config/tech-specs";

export function TechSpecs() {
  return (
    <section id="tech-specs" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Szczegóły techniczne{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            pakietu
          </span>
        </h2>
        <p className="mx-auto max-w-xl text-zinc-400">
          Zobacz co dokładnie otrzymujesz w ramach subskrypcji Gemini Pro.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TECH_SPECS.map((spec, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-zinc-900"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-violet-500/20 p-3">
              <spec.icon className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              {spec.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {spec.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
