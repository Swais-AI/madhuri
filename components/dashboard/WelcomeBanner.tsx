export default function WelcomeBanner() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950 p-8">
      <p className="text-violet-400 uppercase tracking-[0.25em] text-sm font-semibold">
        Manufacturing AI
      </p>

      <h1 className="mt-3 text-4xl font-bold text-white">
        Manufacturing AI Control Center
      </h1>

      <p className="mt-4 max-w-3xl text-slate-400">
        Monitor machine performance, tool wear, predictive maintenance,
        sensor health, and AI-powered manufacturing insights from a single
        dashboard.
      </p>
    </div>
  );
}