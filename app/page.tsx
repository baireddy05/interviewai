'use client'

import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'

import {
  useAuth,
} from '@/components/AuthProvider'

export default function HomePage() {

  const router = useRouter()

  const { user } = useAuth()

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background Glow */}
      <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="absolute bottom-[-200px] left-[200px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col justify-center px-10 md:px-24">

        {/* Badge */}
        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.4,
          }}

          className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2 text-sm text-zinc-400 backdrop-blur-md"
        >

          AI-Powered Mock Interviews

        </motion.div>

        {/* Heading */}
        <motion.h1

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
            delay: 0.1,
          }}

          className="max-w-5xl text-6xl font-black leading-tight md:text-8xl"
        >

          Crack Your Next{' '}

          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">

            AI Interview

          </span>

        </motion.h1>

        {/* Subtitle */}
        <motion.p

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
            delay: 0.2,
          }}

          className="mt-8 max-w-2xl text-xl leading-9 text-zinc-400"
        >

          Practice role-based AI interviews with
          real-time feedback, scoring, analytics,
          and personalized interview sessions.

        </motion.p>

        {/* CTA */}
        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
            delay: 0.3,
          }}

          className="mt-12 flex flex-wrap gap-5"
        >

          {/* Start Button */}
          <button

            onClick={() => {

              if (user) {

                router.push('/interview')

              } else {

                router.push('/login')

              }

            }}

            className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-5 text-lg font-semibold text-white transition hover:translate-y-[-2px]"
          >

            {user
              ? 'Start Interview'
              : 'Login to Start'}

          </button>

          {/* History Button */}
          {user && (

            <button

              onClick={() =>
                router.push('/history')
              }

              className="rounded-2xl border border-zinc-700 bg-zinc-900/60 px-8 py-5 text-lg font-semibold text-white transition hover:bg-zinc-800"
            >

              View History

            </button>

          )}

        </motion.div>

        {/* Logged In Indicator */}
        {user && (

          <motion.div

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.4,
            }}

            className="mt-10 inline-flex w-fit items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4"
          >

            <div className="h-3 w-3 rounded-full bg-green-400" />

            <span className="text-green-300">

              Logged in as{' '}

              <strong>
                {user.email?.split('@')[0]}
              </strong>

            </span>

          </motion.div>

        )}

      </section>

    </main>

  )

}