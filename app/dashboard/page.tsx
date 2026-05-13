export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Track your interview preparation progress.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">Total Interviews</p>
          <h2 className="mt-3 text-5xl font-bold">12</h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">Average Score</p>
          <h2 className="mt-3 text-5xl font-bold">84%</h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">Current Streak</p>
          <h2 className="mt-3 text-5xl font-bold">7 Days</h2>
        </div>

      </div>
    </main>
  )
}