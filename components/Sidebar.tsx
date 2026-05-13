'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import {
  motion,
} from 'framer-motion'

import {
  LayoutDashboard,
  History,
  LogOut,
  Sparkles,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

const links = [

  {
    href: '/interview',
    label: 'Interview',
    icon: LayoutDashboard,
  },

  {
    href: '/history',
    label: 'History',
    icon: History,
  },

]

export default function Sidebar() {

  const pathname = usePathname()

  async function logout() {

    await supabase.auth.signOut()

    localStorage.clear()

    sessionStorage.clear()

    window.location.href = '/login'

  }

  return (

    <motion.aside

      initial={{
        x: -80,
        opacity: 0,
      }}

      animate={{
        x: 0,
        opacity: 1,
      }}

      transition={{
  type: 'spring',
  stiffness: 260,
  damping: 24,
}}

      className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-2xl"
    >

      {/* Logo */}
      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          delay: 0.2,
        }}

        className="flex items-center gap-4"
      >

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">

          <Sparkles />

        </div>

        <div>

          <h1 className="text-2xl font-bold">
            InterviewAI
          </h1>

          <p className="text-sm text-zinc-500">
            AI Interview Platform
          </p>

        </div>

      </motion.div>

      {/* Nav */}
      <nav className="mt-14 flex flex-1 flex-col gap-3">

        {links.map((link, index) => {

          const active =
            pathname === link.href

          const Icon = link.icon

          return (

            <motion.div

              key={link.href}

              initial={{
                opacity: 0,
                x: -20,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                delay: 0.15 * index,
              }}
            >

              <Link
                href={link.href}
              >

                <motion.div

                  whileHover={{
                    scale: 1.03,
                    x: 6,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >

                  {/* Glow */}
                  {active && (

                    <motion.div

                      layoutId="sidebarGlow"

                      className="absolute inset-0 rounded-2xl border border-blue-500/20 bg-blue-500/10"
                    />

                  )}

                  <Icon
                    size={24}
                    className="relative z-10"
                  />

                  <span className="relative z-10 text-lg font-medium">
                    {link.label}
                  </span>

                </motion.div>

              </Link>

            </motion.div>

          )

        })}

      </nav>

      {/* Logout */}
      <motion.button

        whileHover={{
          scale: 1.02,
        }}

        whileTap={{
          scale: 0.98,
        }}

        onClick={logout}

        className="flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300 transition hover:bg-red-500/20"
      >

        <LogOut size={20} />

        Logout

      </motion.button>

    </motion.aside>

  )

}