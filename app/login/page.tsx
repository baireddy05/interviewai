'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import { CheckCircle2 } from 'lucide-react'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState('')

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false)

  async function signIn() {

    setLoading(true)

    setErrorMessage('')

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      })

    if (error) {

      setErrorMessage(error.message)

      setLoading(false)

      return

    }

    setShowSuccessPopup(true)

    setLoading(false)

    setTimeout(() => {

      window.location.href = '/interview'

    }, 1800)

  }

  return (

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl" />

      {/* Success Popup */}
      {/* Success Popup */}
<AnimatePresence>

  {showSuccessPopup && (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      className="fixed inset-0 z-50 overflow-hidden"
    >

      {/* Background Blur */}
      <motion.div

        initial={{
          opacity: 0,
          backdropFilter: 'blur(0px)',
        }}

        animate={{
          opacity: 1,
          backdropFilter: 'blur(14px)',
        }}

        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}

        className="absolute inset-0 bg-black/75"
      />

      {/* Glow */}
      <motion.div

        initial={{
          scale: 0.6,
          opacity: 0,
        }}

        animate={{
          scale: 1.4,
          opacity: 1,
        }}

        transition={{
          duration: 1,
          ease: 'easeOut',
        }}

        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-3xl"
      />

      {/* Card */}
      <div className="relative flex min-h-screen items-center justify-center px-6">

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.75,
            y: 60,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}

          className="relative overflow-hidden rounded-[32px] border border-green-500/20 bg-zinc-900/90 p-12 shadow-[0_0_80px_rgba(34,197,94,0.15)] backdrop-blur-2xl"
        >

          {/* Animated Border Glow */}
          <motion.div

            animate={{
              rotate: 360,
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}

            className="absolute inset-[-2px] rounded-[34px] bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0"
          />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Icon */}
            <motion.div

              initial={{
                scale: 0,
                rotate: -90,
              }}

              animate={{
                scale: 1,
                rotate: 0,
              }}

              transition={{
                delay: 0.25,
                type: 'spring',
                stiffness: 180,
                damping: 14,
              }}

              className="flex h-28 w-28 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 shadow-[0_0_40px_rgba(34,197,94,0.25)]"
            >

              <CheckCircle2
                size={60}
                className="text-green-400"
              />

            </motion.div>

            {/* Heading */}
            <motion.h2

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.35,
              }}

              className="mt-8 text-5xl font-extrabold tracking-tight text-white"
            >

              Welcome Back

            </motion.h2>

            {/* Text */}
            <motion.p

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.5,
              }}

              className="mt-4 max-w-md text-lg leading-8 text-zinc-400"
            >

              Authentication successful.

              Preparing your AI interview dashboard...

            </motion.p>

            {/* Progress Bar */}
            <motion.div

              initial={{
                width: 0,
              }}

              animate={{
                width: '100%',
              }}

              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}

              className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800"
            >

              <div className="h-full w-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />

            </motion.div>

          </div>

        </motion.div>

      </div>

    </motion.div>

  )}

</AnimatePresence>

      {/* Login Card */}
      {!showSuccessPopup && (

        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-2xl"
        >

          <div className="inline-block rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm text-zinc-400">
            InterviewAI
          </div>

          <h1 className="mt-6 text-5xl font-extrabold">
            Login
          </h1>

          <p className="mt-4 text-zinc-400 leading-8">
            Continue your AI interview preparation.
          </p>

          {/* Error */}
          <AnimatePresence>

            {errorMessage && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: -10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                }}

                className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
              >

                {errorMessage}

              </motion.div>

            )}

          </AnimatePresence>

          {/* Form */}
          <form
            autoComplete="off"
            className="mt-8"
          >

            <input
              type="text"
              className="hidden"
            />

            <input
              type="password"
              className="hidden"
            />

            {/* Email */}
            <div>

              <label className="mb-3 block text-sm text-zinc-400">
                Email Address
              </label>

              <input

                type="email"

                autoComplete="off"

                placeholder="Enter your email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Password */}
            <div className="mt-5">

              <label className="mb-3 block text-sm text-zinc-400">
                Password
              </label>

              <input

                type="password"

                autoComplete="new-password"

                placeholder="Enter your password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 outline-none transition focus:border-purple-500"
              />

            </div>

          </form>

          {/* Button */}
          <button

            onClick={signIn}

            disabled={loading}

            className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02]"
          >

            {loading
              ? 'Please wait...'
              : 'Login'}

          </button>

          {/* Link */}
          <p className="mt-6 text-center text-zinc-400">

            Don&apos;t have an account?{' '}

            <Link
              href="/signup"
              className="text-blue-400"
            >
              Sign Up
            </Link>

          </p>

        </motion.div>

      )}

    </main>

  )

}