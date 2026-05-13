'use client'

import './globals.css'

import Sidebar from '@/components/Sidebar'

import PageTransition from '@/components/PageTransition'

import {
  AuthProvider,
  useAuth,
} from '@/components/AuthProvider'

import { usePathname } from 'next/navigation'

function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const { user } = useAuth()

  // Hide sidebar on auth pages
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup'

  // Show sidebar only if logged in
  const showSidebar =
    user && !isAuthPage

  return (

    <>

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar />
      )}

      {/* Main */}
      <main
        className={
          showSidebar
            ? 'ml-[260px]'
            : ''
        }
      >

        <PageTransition>

          {children}

        </PageTransition>

      </main>

    </>

  )

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body className="overflow-x-hidden bg-[#050505] text-white">

        <AuthProvider>

          <LayoutContent>

            {children}

          </LayoutContent>

        </AuthProvider>

      </body>

    </html>

  )

}