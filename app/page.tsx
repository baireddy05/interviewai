'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
export default function HomePage() {
  return (
    <motion.main  initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
  transition={{ duration: 0.7 }} className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

        {/* Badge */}
        <div className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400 backdrop-blur-xl">
          AI Powered Interview Preparation Platform
        </div>

        {/* Heading */}
        <h1 className="mt-8 max-w-6xl text-7xl font-extrabold leading-tight tracking-tight">

          Crack Technical Interviews

          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}With AI
          </span>

        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-400">
          Practice technical interviews with AI-generated questions,
          receive instant feedback, track interview history,
          and improve your confidence for real-world interviews.
        </p>

        {/* Main Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

          {/* Interview Button */}
          <Link href="/interview">

            <button className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">

              <span className="relative z-10">
                Start Interview
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

            </button>

          </Link>

          {/* History Button */}
          <Link href="/history">

            <button className="rounded-2xl border border-zinc-700 bg-zinc-900/40 px-8 py-4 font-medium text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-105">

              Interview History

            </button>

          </Link>

        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">

            <h2 className="text-5xl font-extrabold text-blue-400">
              AI
            </h2>

            <p className="mt-4 text-lg text-zinc-300">
              AI-Powered Questions
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">

            <h2 className="text-5xl font-extrabold text-purple-400">
              24/7
            </h2>

            <p className="mt-4 text-lg text-zinc-300">
              Interview Practice
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">

            <h2 className="text-5xl font-extrabold text-green-400">
              Smart
            </h2>

            <p className="mt-4 text-lg text-zinc-300">
              AI Feedback Analysis
            </p>

          </div>

        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">

          {/* Card 1 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-500/40">

            <div className="text-5xl">🤖</div>

            <h3 className="mt-5 text-2xl font-bold">
              AI Interviews
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Generate realistic interview questions powered by
              modern AI models and prepare for real company interviews.
            </p>

          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-500/40">

            <div className="text-5xl">📊</div>

            <h3 className="mt-5 text-2xl font-bold">
              Smart Feedback
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Receive AI-powered answer analysis, improvement
              suggestions, and interview performance insights.
            </p>

          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-green-500/40">

            <div className="text-5xl">📝</div>

            <h3 className="mt-5 text-2xl font-bold">
              Interview History
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Track previous interview sessions, review answers,
              and monitor your progress over time.
            </p>

          </div>

        </div>

      </div>

    </motion.main>
  )
}