'use client'

import {
  useEffect,
  useState,
} from 'react'

import CountUp from 'react-countup'

import {
  motion,
} from 'framer-motion'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts'

import { supabase } from '@/lib/supabase'

import {
  useAuth,
} from '@/components/AuthProvider'

export default function DashboardPage() {

  const { user } = useAuth()

  const [loading, setLoading] =
    useState(true)

  const [sessions, setSessions] =
    useState<any[]>([])

  const [stats, setStats] =
    useState({

      totalInterviews: 0,

      averageScore: 0,

      totalQuestions: 0,

      bestTopic: '',

    })

  useEffect(() => {

    if (user) {

      fetchAnalytics()

    }

  }, [user])

  async function fetchAnalytics() {

    // Sessions
    const {
      data: sessionData,
    } = await supabase

      .from('interview_sessions')

      .select('*')

      .eq('user_id', user.id)

      .order('created_at', {
        ascending: true,
      })

    // Questions
    const {
      data: interviewData,
    } = await supabase

      .from('interviews')

      .select('*')

      .eq('user_id', user.id)

    const sessions =
      sessionData || []

    const interviews =
      interviewData || []

    // Average Score
    const avg =
      sessions.reduce(
        (acc, item) =>
          acc +
          Number(
            item.average_score || 0
          ),
        0
      ) / (sessions.length || 1)

    // Topic Scores
    const topicMap: any = {}

    interviews.forEach((item) => {

      if (!topicMap[item.topic]) {

        topicMap[item.topic] = []

      }

      topicMap[item.topic].push(
        item.score
      )

    })

    let bestTopic = ''

    let bestAvg = 0

    Object.keys(topicMap).forEach(
      (topic) => {

        const avg =
          topicMap[topic].reduce(
            (a: number, b: number) =>
              a + b,
            0
          ) / topicMap[topic].length

        if (avg > bestAvg) {

          bestAvg = avg

          bestTopic = topic

        }

      }
    )

    setStats({

      totalInterviews:
        sessions.length,

      averageScore: avg,

      totalQuestions:
        interviews.length,

      bestTopic,

    })

    setSessions(sessions)

    setLoading(false)

  }

  // Chart Data
  const chartData = sessions.map(
    (session, index) => ({

      name: `#${index + 1}`,

      score:
        Number(
          session.average_score
        ) || 0,

    })
  )

  return (

    <main className="min-h-screen bg-[#050505] p-10 text-white">

      {/* Heading */}
      <div>

        <div className="inline-flex rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2 text-sm text-zinc-400">

          AI Analytics Dashboard

        </div>

        <h1 className="mt-6 text-6xl font-black">
          Performance Analytics
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Track your interview growth and
          performance trends.
        </p>

      </div>

      {/* Loading */}
      {loading && (

        <div className="mt-20 text-zinc-400">
          Loading analytics...
        </div>

      )}

      {!loading && (

        <>

          {/* Stats */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Total Interviews */}
            <motion.div

              whileHover={{
                y: -4,
              }}

              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
            >

              <p className="text-zinc-500">
                Total Interviews
              </p>

              <h2 className="mt-4 text-5xl font-black">

                <CountUp
                  end={
                    stats.totalInterviews
                  }
                  duration={1.2}
                />

              </h2>

            </motion.div>

            {/* Average Score */}
            <motion.div

              whileHover={{
                y: -4,
              }}

              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
            >

              <p className="text-zinc-500">
                Average Score
              </p>

              <h2 className="mt-4 text-5xl font-black">

                <CountUp
                  end={
                    stats.averageScore
                  }
                  decimals={1}
                  duration={1.2}
                />

                /10

              </h2>

            </motion.div>

            {/* Questions */}
            <motion.div

              whileHover={{
                y: -4,
              }}

              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
            >

              <p className="text-zinc-500">
                Questions Answered
              </p>

              <h2 className="mt-4 text-5xl font-black">

                <CountUp
                  end={
                    stats.totalQuestions
                  }
                  duration={1.2}
                />

              </h2>

            </motion.div>

            {/* Best Topic */}
            <motion.div

              whileHover={{
                y: -4,
              }}

              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
            >

              <p className="text-zinc-500">
                Best Topic
              </p>

              <h2 className="mt-4 text-3xl font-black">
                {stats.bestTopic || '-'}
              </h2>

            </motion.div>

          </div>

          {/* Charts */}
          <div className="mt-14 grid gap-8 xl:grid-cols-2">

            {/* Line Chart */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">

              <h2 className="text-3xl font-bold">
                Score Progress
              </h2>

              <div className="mt-10 h-[350px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={chartData}
                  >

                    <CartesianGrid
                      stroke="#27272a"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#71717a"
                    />

                    <YAxis
                      stroke="#71717a"
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* Bar Chart */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">

              <h2 className="text-3xl font-bold">
                Session Scores
              </h2>

              <div className="mt-10 h-[350px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={chartData}
                  >

                    <CartesianGrid
                      stroke="#27272a"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#71717a"
                    />

                    <YAxis
                      stroke="#71717a"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="score"
                      fill="#8b5cf6"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* AI Insights */}
          <div className="mt-14 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-10">

            <h2 className="text-4xl font-black">
              AI Insights
            </h2>

            <div className="mt-8 space-y-5 text-lg text-zinc-300">

              <p>
                Your strongest topic is{' '}
                <strong>
                  {stats.bestTopic}
                </strong>
                .
              </p>

              <p>
                You completed{' '}
                <strong>
                  {
                    stats.totalInterviews
                  }
                </strong>{' '}
                interview sessions.
              </p>

              <p>
                Your current average score is{' '}
                <strong>
                  {
                    stats.averageScore.toFixed(
                      1
                    )
                  }
                  /10
                </strong>
                .
              </p>

              <p>
                Keep practicing consistently to
                improve your confidence and
                technical depth.
              </p>

            </div>

          </div>

        </>

      )}

    </main>

  )

}