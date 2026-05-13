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
  Home,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

import {
  useAuth,
} from '@/components/AuthProvider'

const links = [

  {
    href: '/',
    label: 'Home',
    icon: Home,
  },

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

  const { user } = useAuth()

  async function logout() {

    await supabase.auth.signOut()

    localStorage.clear()

    sessionStorage.clear()

    window.location.href = '/login'

  }

  return (

    <motion.aside

      initial={{
        x: -40,
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

      className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-md"
    >

      {/* Logo */}
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">

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

      </div>

      {/* User */}
      {user && (

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">

          <p className="text-sm text-zinc-500">
            Welcome back
          </p>

          <h3 className="mt-1 text-lg font-semibold">

            {user.email?.split('@')[0]}

          </h3>

        </div>

      )}

      {/* Nav */}
      <nav className="mt-10 flex flex-1 flex-col gap-3">

        {links.map((link, index) => {

          const active =
            pathname === link.href

          const Icon = link.icon

          return (

            <motion.div

              key={link.href}

              initial={{
                opacity: 0,
                x: -10,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                delay: index * 0.08,
              }}
            >

              <Link href={link.href}>

                <motion.div

                  whileHover={{
                    x: 4,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                    active
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >

                  <Icon size={22} />

                  <span className="text-lg">
                    {link.label}
                  </span>

                </motion.div>

              </Link>

            </motion.div>

          )

        })}

      </nav>

      {/* Logout */}
      {user && (

        <button

          onClick={logout}

          className="flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300 transition hover:bg-red-500/20"
        >

          <LogOut size={20} />

          Logout

        </button>

      )}

    </motion.aside>

  )

}