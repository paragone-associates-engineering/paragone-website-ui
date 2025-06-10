/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion, type Variants } from "framer-motion"
import { useScrollAnimation } from "../../hooks/use-animations"
import type { ReactNode } from "react"

interface AnimatedWrapperProps {
  children: ReactNode
  animation?: "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "fadeIn" | "scaleIn" | "rotateIn"
  duration?: number
  delay?: number
  threshold?: number
  className?: string
  once?: boolean
}

const animationVariants: Record<string, Variants> = {
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
}

export const AnimatedWrapper = ({
  children,
  animation = "slideUp",
  duration = 0.6,
  delay = 0.2,
  threshold = 0.1,
  className,
  //once = true,
}: AnimatedWrapperProps) => {
  const { ref, isInView } = useScrollAnimation(threshold)

  const baseVisible = animationVariants[animation].visible
  const baseTransition =
    typeof baseVisible === "object" &&
    baseVisible !== null &&
    "transition" in baseVisible &&
    typeof (baseVisible as any).transition === "object"
      ? (baseVisible as any).transition
      : {}

  const variants = {
    ...animationVariants[animation],
    visible: {
      ...baseVisible,
      transition: {
        ...baseTransition,
        duration,
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
