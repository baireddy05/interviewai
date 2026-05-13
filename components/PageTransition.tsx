'use client'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import { usePathname } from 'next/navigation'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  return (

    <AnimatePresence mode="wait">

      <motion.div

        key={pathname}

        initial={{
          opacity: 0,
          y: 12,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
          y: -8,
        }}

        transition={{
          duration: 0.32,
          ease: [0.25, 1, 0.5, 1],
        }}

        className="motion-safe min-h-screen"
      >

        {children}

      </motion.div>

    </AnimatePresence>

  )

}