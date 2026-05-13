'use client'
import { supabase } from '@/lib/supabase'

import { useAuth } from '@/components/AuthProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const TOTAL_QUESTIONS = 5

const roleTopics: Record<string, string[]> = {

  'Frontend Developer': [
    'React',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'CSS',
  ],

  'Backend Developer': [
    'Node.js',
    'REST APIs',
    'MongoDB',
    'SQL',
    'Authentication',
  ],

  'Full Stack Developer': [
    'React',
    'Node.js',
    'System Design',
    'Next.js',
  ],

  'Software Engineer': [
    'DSA',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
  ],

  'Data Scientist': [
    'Python',
    'Machine Learning',
    'Deep Learning',
    'Statistics',
  ],

}

export default function InterviewPage() {

  const { user } = useAuth()

const router = useRouter()

useEffect(() => {

  if (user === undefined) return

  if (user === null) {

    router.push('/login')

  }

}, [user])

  const [question, setQuestion] =
    useState('')

  const [answer, setAnswer] =
    useState('')

  const [feedback, setFeedback] =
    useState('')

  const [sessionQuestions, setSessionQuestions] =
  useState<any[]>([])

  const [score, setScore] =
    useState<number | null>(null)

  const [questionNumber, setQuestionNumber] =
    useState(1)

  const [interviewCompleted, setInterviewCompleted] =
    useState(false)

  const [allScores, setAllScores] =
    useState<number[]>([])

  const [sessionId, setSessionId] =
  useState<string | null>(null)

const [loadingNextQuestion, setLoadingNextQuestion] =
  useState(false)

  const [previousQuestions, setPreviousQuestions] =
    useState<string[]>([])

  const [role, setRole] =
    useState('Frontend Developer')

  const [topic, setTopic] =
    useState(roleTopics['Frontend Developer'][0])

  const [difficulty, setDifficulty] =
    useState('Medium')

  const [loadingQuestion, setLoadingQuestion] =
    useState(false)

  const [loadingFeedback, setLoadingFeedback] =
    useState(false)

  const [interviewStarted, setInterviewStarted] =
    useState(false)

  const availableTopics =
    roleTopics[role] || []

  

  async function generateQuestion() {

    setLoadingQuestion(true)
 
    try {

      const response = await fetch(
        '/api/interview/generate',
        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            role,
            topic,
            difficulty,
            previousQuestions,
          }),

        }
      )

      const data = await response.json()

      setQuestion(data.question)

      setPreviousQuestions((prev) => [
        ...prev,
        data.question,
      ])

      setInterviewStarted(true)

      setAnswer('')
      setFeedback('')
      setScore(null)

    } catch (error) {

      console.log(error)

    }

    setLoadingQuestion(false)
  }

  async function analyzeAnswer() {

    if (!answer) return

    setLoadingFeedback(true)

    try {

      const response = await fetch(
        '/api/interview/analyze',
        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            question,
            answer,
          }),

        }
      )

      const data = await response.json()

      setFeedback(data.feedback)

      // Extract score
      const scoreMatch =
        data.feedback.match(/Score:\s*(\d+)/i)

      if (scoreMatch) {

        const extractedScore =
          Number(scoreMatch[1])

        setScore(extractedScore)

        setAllScores((prev) => [
          ...prev,
          extractedScore,
        ])

      }

    } catch (error) {

      console.log(error)

    }

    setLoadingFeedback(false)
  }

  async function nextQuestion() {

  setLoadingNextQuestion(true)

  // SAVE QUESTION
  if (user && sessionId) {

    await supabase
      .from('interviews')
      .insert({

        session_id: sessionId,

        user_id: user.id,

        role,
        topic,
        difficulty,

        question,
        answer,

        feedback,

        score: score || 0,

      })

  }

  // LAST QUESTION
  if (questionNumber >= TOTAL_QUESTIONS) {

    const average =
      allScores.reduce((a, b) => a + b, 0) /
      allScores.length

    // UPDATE SESSION
    await supabase
      .from('interview_sessions')
      .update({

        average_score: average,

      })

      .eq('id', sessionId)

    setTimeout(() => {

      setInterviewCompleted(true)

      setLoadingNextQuestion(false)

    }, 1800)

    return

  }

  // LOADING EFFECT
  setTimeout(async () => {

    setQuestionNumber((prev) => prev + 1)

    await generateQuestion()

    setLoadingNextQuestion(false)

  }, 1800)

}

  function restartInterview() {

    setQuestion('')
    setAnswer('')
    setFeedback('')
    setScore(null)

    setQuestionNumber(1)

    setInterviewCompleted(false)

    setAllScores([])

    setPreviousQuestions([])

    setInterviewStarted(false)
  }

  const averageScore =
    allScores.length > 0
      ? (
          allScores.reduce((a, b) => a + b, 0) /
          allScores.length
        ).toFixed(1)
      : 0

  return (

    <motion.main

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="min-h-screen bg-[#050505] text-white"
    >

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">

        {/* LEFT PANEL */}
        <motion.div

          animate={{
            width: interviewStarted ? 340 : '100%',
          }}

          transition={{
            duration: 0.6,
          }}

          className={`border-r border-zinc-800 bg-black/40 backdrop-blur-2xl ${
            interviewStarted
              ? 'min-h-screen'
              : 'flex min-h-screen items-center justify-center'
          }`}
        >

          <div className={`w-full ${
            interviewStarted
              ? 'p-8'
              : 'mx-auto max-w-3xl p-12'
          }`}>

            {/* Badge */}
            <div className="inline-block rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
              AI Interview Setup
            </div>

            {/* Heading */}
            <h1 className={`font-extrabold leading-tight tracking-tight ${
              interviewStarted
                ? 'mt-6 text-5xl'
                : 'mt-8 text-7xl'
            }`}>

              AI Interview

              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Session
              </span>

            </h1>

            {/* Description */}
            <p className={`text-zinc-400 leading-8 ${
              interviewStarted
                ? 'mt-5 text-lg'
                : 'mt-6 max-w-2xl text-xl'
            }`}>

              Practice AI-powered technical interviews
              with real-time evaluation and scoring.

            </p>

            {/* FORM */}
            {!interviewStarted && (

              <div className="mt-12 space-y-8">

                {/* Role */}
                <div>

                  <label className="mb-3 block text-lg font-semibold text-zinc-300">
                    Choose Job Role
                  </label>

                  <select

                    value={role}

                    onChange={(e) => {

                      const selectedRole =
                        e.target.value

                      setRole(selectedRole)

                      setTopic(
                        roleTopics[selectedRole][0]
                      )

                    }}

                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 p-5 text-lg text-white outline-none transition focus:border-blue-500"
                  >

                    {Object.keys(roleTopics).map((item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Topic */}
                <div>

                  <label className="mb-3 block text-lg font-semibold text-zinc-300">
                    Choose Interview Topic
                  </label>

                  <select

                    value={topic}

                    onChange={(e) =>
                      setTopic(e.target.value)
                    }

                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 p-5 text-lg text-white outline-none transition focus:border-blue-500"
                  >

                    {availableTopics.map((item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Difficulty */}
                <div>

                  <label className="mb-3 block text-lg font-semibold text-zinc-300">
                    Choose Difficulty
                  </label>

                  <select

                    value={difficulty}

                    onChange={(e) =>
                      setDifficulty(e.target.value)
                    }

                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 p-5 text-lg text-white outline-none transition focus:border-purple-500"
                  >

                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>

                  </select>

                </div>

                {/* Start */}
                <button

                  onClick={generateQuestion}

                  className="w-full rounded-2xl bg-white px-8 py-5 text-lg font-semibold text-black transition hover:scale-[1.02]"
                >

                  {loadingQuestion
                    ? 'Starting Interview...'
                    : 'Start Interview'}

                </button>

              </div>

            )}

            {/* Interview Info */}
            {interviewStarted && !interviewCompleted && (

              <div className="mt-10 space-y-5">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

                  <p className="text-sm text-zinc-500">
                    Question Progress
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {questionNumber} / {TOTAL_QUESTIONS}
                  </h3>

                  {/* Progress */}
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width: `${
                          (questionNumber /
                            TOTAL_QUESTIONS) *
                          100
                        }%`,
                      }}

                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />

                  </div>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

                  <p className="text-sm text-zinc-500">
                    Role
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {role}
                  </h3>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

                  <p className="text-sm text-zinc-500">
                    Topic
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {topic}
                  </h3>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

                  <p className="text-sm text-zinc-500">
                    Difficulty
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {difficulty}
                  </h3>

                </div>

              </div>

            )}

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <div className="flex-1 overflow-y-auto p-10">

{/* Next Question Loader */}
<AnimatePresence>

  {loadingNextQuestion && (

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

      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
    >

      <div className="flex flex-col items-center">

        {/* Animated Circle */}
        <motion.div

          animate={{
            rotate: 360,
          }}

          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}

          className="h-24 w-24 rounded-full border-4 border-zinc-700 border-t-blue-500"
        />

        {/* Text */}
        <motion.h2

          initial={{
            opacity: 0,
            y: 10,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="mt-10 text-4xl font-bold"
        >

          Preparing Next Question

        </motion.h2>

        <p className="mt-4 text-zinc-400">
          AI is generating your next challenge...
        </p>

      </div>

    </motion.div>

  )}

</AnimatePresence>
          {/* Question */}
          {question && !interviewCompleted && (

            <motion.div

              key={question}

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              className="mx-auto max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-xl"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-4xl font-bold">
                  Interview Question
                </h2>

                <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                  Question {questionNumber}
                </div>

              </div>

              {/* Question */}
              <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">

                <p className="text-2xl leading-10 text-zinc-200">
                  {question}
                </p>

              </div>

              {/* Answer */}
              <div className="mt-10">

                <h3 className="mb-4 text-2xl font-bold">
                  Your Answer
                </h3>

                <textarea

                  value={answer}

                  onChange={(e) =>
                    setAnswer(e.target.value)
                  }

                  placeholder="Write your answer here..."

                  className="min-h-[240px] w-full rounded-2xl border border-zinc-700 bg-black/40 p-5 text-lg text-zinc-200 outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Analyze */}
              {!feedback && (

                <button

                  onClick={analyzeAnswer}

                  className="mt-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg font-semibold transition hover:scale-105"
                >

                  {loadingFeedback
                    ? 'Analyzing...'
                    : 'Submit Answer'}

                </button>

              )}

              {/* Feedback */}
              {feedback && (

                <motion.div

                  initial={{
                    opacity: 0,
                  }}

                  animate={{
                    opacity: 1,
                  }}

                  className="mt-10"
                >

                  {/* Score */}
                  {score && (

                    <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">

                      <p className="text-sm text-green-300">
                        Interview Score
                      </p>

                      <h3 className="mt-2 text-4xl font-bold text-green-400">
                        {score}/10
                      </h3>

                    </div>

                  )}

                  {/* Feedback */}
                  <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6 whitespace-pre-wrap text-lg leading-9 text-zinc-300">
                    {feedback}
                  </div>

                  {/* Next */}
                  <button

                    onClick={nextQuestion}

                    className="mt-8 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
                  >

                    {questionNumber >= TOTAL_QUESTIONS
                      ? 'Finish Interview'
                      : 'Next Question'}

                  </button>

                </motion.div>

              )}

            </motion.div>

          )}

          {/* FINAL REPORT */}
          {interviewCompleted && (

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              className="mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 shadow-2xl backdrop-blur-xl"
            >

              <h1 className="text-center text-6xl font-extrabold">
                Interview Complete
              </h1>

              {/* Score */}
              <div className="mt-12 text-center">

                <p className="text-zinc-400">
                  Average Interview Score
                </p>

                <h2 className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-8xl font-extrabold text-transparent">
                  {averageScore}/10
                </h2>

              </div>

              {/* Analytics */}
              <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 text-center">

                  <h3 className="text-4xl font-bold">
                    {TOTAL_QUESTIONS}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Questions
                  </p>

                </div>

                <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 text-center">

                  <h3 className="text-4xl font-bold">
                    {role}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Role
                  </p>

                </div>

                <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 text-center">

                  <h3 className="text-4xl font-bold">
                    {difficulty}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Difficulty
                  </p>

                </div>

              </div>

              {/* Restart */}
              <div className="mt-14 flex justify-center">

                <button

                  onClick={restartInterview}

                  className="rounded-2xl bg-white px-10 py-5 text-lg font-semibold text-black transition hover:scale-105"
                >

                  Restart Interview

                </button>

              </div>

            </motion.div>

          )}

        </div>

      </div>

    </motion.main>
  )
}