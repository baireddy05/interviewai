'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

import {
  useAuth,
} from '@/components/AuthProvider'

export default function HistoryPage() {

  const { user } = useAuth()

  const router = useRouter()

  const [sessions, setSessions] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [openSession, setOpenSession] =
    useState<string | null>(null)

  const [openQuestions, setOpenQuestions] =
    useState<Record<string, boolean>>({})

  useEffect(() => {

    if (user === undefined) return

    if (user === null) {

      router.push('/login')

      return

    }

    fetchHistory()

  }, [user])

  async function fetchHistory() {

    const {
      data: sessionData,
    } = await supabase

      .from('interview_sessions')

      .select('*')

      .eq('user_id', user.id)

      .order('created_at', {
        ascending: false,
      })

    if (!sessionData) {

      setLoading(false)

      return

    }

    const formattedSessions =
      await Promise.all(

        sessionData.map(
          async (session) => {

            const {
              data: questions,
            } = await supabase

              .from('interviews')

              .select('*')

              .eq(
                'session_id',
                session.id
              )

            return {

              ...session,

              questions:
                questions || [],

            }

          }
        )
      )

    setSessions(formattedSessions)

    setLoading(false)

  }

  function toggleQuestion(id: string) {

    setOpenQuestions((prev) => ({

      ...prev,

      [id]: !prev[id],

    }))

  }

  return (

    <main className="min-h-screen bg-[#050505] p-10 text-white">

      {/* Heading */}
      <div>

        <div className="inline-block rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm text-zinc-400">
          Interview History
        </div>

        <h1 className="mt-6 text-6xl font-extrabold">
          Previous Sessions
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Review your AI interview sessions.
        </p>

      </div>

      {/* Loading */}
      {loading && (

        <div className="mt-20 text-zinc-400">
          Loading sessions...
        </div>

      )}

      {/* Empty */}
      {!loading &&
        sessions.length === 0 && (

          <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">

            <h2 className="text-3xl font-bold">
              No Sessions Yet
            </h2>

            <p className="mt-4 text-zinc-400">
              Complete an interview session to
              see your history here.
            </p>

          </div>

        )}

      {/* Sessions */}
      <div className="mt-14 space-y-6">

        {sessions.map((session) => {

          const isOpen =
            openSession === session.id

          return (

            <motion.div
              key={session.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl"
            >

              {/* Session Header */}
              <button

                onClick={() =>
                  setOpenSession(
                    isOpen
                      ? null
                      : session.id
                  )
                }

                className="flex w-full items-center justify-between p-8 text-left transition hover:bg-white/5"
              >

                <div>

                  <h2 className="text-4xl font-bold">
                    {session.role}
                  </h2>

                  <p className="mt-3 text-zinc-400">
  {session.topic} • {session.difficulty}
</p>

<div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-500">

  {/* Date */}
  <div className="rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-2">

    {new Date(
      session.created_at
    ).toLocaleDateString('en-US', {

      weekday: 'long',

      year: 'numeric',

      month: 'long',

      day: 'numeric',

    })}

  </div>

  {/* Time */}
  <div className="rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-2">

    {new Date(
      session.created_at
    ).toLocaleTimeString('en-US', {

      hour: 'numeric',

      minute: '2-digit',

    })}

  </div>

</div>

                </div>

                <div className="flex items-center gap-6">

                  {/* Score */}
                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-4">

                    <p className="text-sm text-green-300">
                      Avg Score
                    </p>

                    <h3 className="mt-1 text-3xl font-bold text-green-400">
                      {session.average_score
                        ? Number(
                            session.average_score
                          ).toFixed(1)
                        : 0}
                      /10
                    </h3>

                  </div>

                  {/* Icon */}
                  <div>

                    {isOpen ? (

                      <ChevronUp
                        size={30}
                        className="text-zinc-400"
                      />

                    ) : (

                      <ChevronDown
                        size={30}
                        className="text-zinc-400"
                      />

                    )}

                  </div>

                </div>

              </button>

              {/* Questions */}
              <AnimatePresence>

                {isOpen && (

                  <motion.div

                    initial={{
                      opacity: 0,
                      height: 0,
                    }}

                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}

                    exit={{
                      opacity: 0,
                      height: 0,
                    }}

                    transition={{
                      duration: 0.4,
                    }}

                    className="border-t border-zinc-800"
                  >

                    <div className="space-y-6 p-8">

                      {session.questions.map(
                        (
                          question: any,
                          index: number
                        ) => {

                          const questionId =
                            question.id

                          const isQuestionOpen =
                            openQuestions[
                              questionId
                            ]

                          return (

                            <motion.div
                              key={question.id}
                              className="overflow-hidden rounded-3xl border border-zinc-800 bg-black/30"
                            >

                              {/* Question Header */}
                              <button

                                onClick={() =>
                                  toggleQuestion(
                                    questionId
                                  )
                                }

                                className="flex w-full items-center justify-between p-6 text-left transition hover:bg-white/5"
                              >

                                <div>

                                  <div className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

                                    Question{' '}
                                    {index + 1}

                                  </div>

                                  <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-300">
                                    {
                                      question.question
                                    }
                                  </p>

                                </div>

                                <div className="flex items-center gap-6">

                                  {/* Score */}
                                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">

                                    <h3 className="text-2xl font-bold text-green-400">
                                      {
                                        question.score
                                      }
                                      /10
                                    </h3>

                                  </div>

                                  {/* Arrow */}
                                  {isQuestionOpen ? (

                                    <ChevronUp
                                      size={24}
                                      className="text-zinc-400"
                                    />

                                  ) : (

                                    <ChevronDown
                                      size={24}
                                      className="text-zinc-400"
                                    />

                                  )}

                                </div>

                              </button>

                              {/* Question Content */}
                              <AnimatePresence>

                                {isQuestionOpen && (

                                  <motion.div

                                    initial={{
                                      opacity: 0,
                                      height: 0,
                                    }}

                                    animate={{
                                      opacity: 1,
                                      height: 'auto',
                                    }}

                                    exit={{
                                      opacity: 0,
                                      height: 0,
                                    }}

                                    transition={{
                                      duration: 0.35,
                                    }}

                                    className="border-t border-zinc-800"
                                  >

                                    <div className="space-y-8 p-6">

                                      {/* Answer */}
                                      <div>

                                        <h3 className="text-2xl font-bold">
                                          Your Answer
                                        </h3>

                                        <p className="mt-4 whitespace-pre-wrap leading-8 text-zinc-400">
                                          {
                                            question.answer
                                          }
                                        </p>

                                      </div>

                                      {/* Feedback */}
                                      <div>

                                        <h3 className="text-2xl font-bold">
                                          AI Feedback
                                        </h3>

                                        <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 leading-8 text-zinc-300">
                                          {
                                            question.feedback
                                          }
                                        </div>

                                      </div>

                                    </div>

                                  </motion.div>

                                )}

                              </AnimatePresence>

                            </motion.div>

                          )

                        }
                      )}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          )

        })}

      </div>

    </main>

  )

}