
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@mui/material"
import type { ReactNode } from "react"

interface AnimatedButtonProps extends Omit<ButtonProps, "children"> {
  children: ReactNode
  hoverScale?: number
  tapScale?: number
  glowEffect?: boolean
}

export const AnimatedButton = ({
  children,
  hoverScale = 1.05,
  tapScale = 0.95,
  glowEffect = false,
  sx,
  ...props
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        ...(glowEffect && {
          boxShadow: "0 0 20px rgba(25, 118, 210, 0.4)",
        }),
      }}
      whileTap={{ scale: tapScale }}
      transition={{ duration: 0.2 }}
    >
      <Button
        {...props}
        sx={{
          ...sx,
          transition: "all 0.3s ease",
          ...(glowEffect && {
            "&:hover": {
              boxShadow: "0 0 20px rgba(25, 118, 210, 0.4)",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(sx && (sx as any)["&:hover"]),
            },
          }),
        }}
      >
        {children}
      </Button>
    </motion.div>
  )
}
