
import { motion } from "framer-motion"
import { Card, type CardProps } from "@mui/material"
import { useScrollAnimation } from "../../hooks/use-animations"
import type { ReactNode } from "react"

interface AnimatedCardProps extends Omit<CardProps, "children"> {
  children: ReactNode
  hoverEffect?: boolean
  slideDirection?: "up" | "down" | "left" | "right"
  delay?: number
}

export const AnimatedCard = ({
  children,
  hoverEffect = true,
  slideDirection = "up",
  delay = 0,
  sx,
  ...props
}: AnimatedCardProps) => {
  const { ref, isInView } = useScrollAnimation()

  const slideVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...slideVariants[slideDirection],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay,
      },
    },
  }

  const hoverVariants = hoverEffect
    ? {
        whileHover: {
          y: -8,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.3 },
        },
      }
    : {}

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      {...hoverVariants}
    >
      <Card
        {...props}
        sx={{
          ...sx,
          border:"0px",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Card>
    </motion.div>
  )
}
