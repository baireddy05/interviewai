'use client'

import './globals.css'

import Sidebar from '@/components/Sidebar'

import PageTransition from '@/components/PageTransition'

import {
  AuthProvider,
} from '@/components/AuthProvider'

import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const hideSidebar =
    pathname === '/login' ||
    pathname === '/signup'

  return (

    <html lang="en">

      <body className="overflow-x-hidden bg-[#050505] text-white">

        <AuthProvider>

          {!hideSidebar && (
            <Sidebar />
          )}

          <main
            className={
              hideSidebar
                ? ''
                : 'ml-[260px]'
            }
          >

            <PageTransition>

              {children}

            </PageTransition>

          </main>

        </AuthProvider>

      </body>

    </html>

  )

}