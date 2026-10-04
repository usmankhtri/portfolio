import type { RefObject } from 'react'
import { useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { portfolioData } from '../../../../data/portfolioData'

export type Project = (typeof portfolioData.projects)[number]

export interface ProjectScrub {
  progress: MotionValue<number>
  cardOpacity: MotionValue<number>
  cardY: MotionValue<number>
  cardScale: MotionValue<number>
  cardRotateX: MotionValue<number>
  cardClip: MotionValue<string>
  imageScale: MotionValue<number>
  imageX: MotionValue<number>
  imageY: MotionValue<number>
  imageRotate: MotionValue<number>
  brightness: MotionValue<number>
  glowOpacity: MotionValue<number>
  captionY: MotionValue<number>
  captionOpacity: MotionValue<number>
}

/**
 * The proven spring-scrub rig from the homepage project showcase:
 * one per-card scroll target with springed opacity/y/scale/rotateX,
 * plus cinematic extras (curtain clip-path, parallax, brightness reveal).
 */
export const useProjectScrub = (ref: RefObject<HTMLElement | null>): ProjectScrub => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  })

  /* =============================================================== */
  /* CARD                                                             */
  /* =============================================================== */

  const cardOpacity = useTransform(
    progress,
    [0, 0.07, 0.32, 0.7, 0.93, 1],
    [0, 1, 1, 1, 1, 0],
  )

  const cardY = useTransform(
    progress,
    [0, 0.07, 0.32, 0.7, 0.93, 1],
    [60, 14, 0, 0, -20, -60],
  )

  const cardScale = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.955, 0.992, 1, 0.992, 0.955],
  )

  const cardRotateX = useTransform(
    progress,
    [0, 0.38, 0.62, 1],
    [2, 0, 0, -2],
  )

  /* Curtain wipe reveal */
  const cardClip = useTransform(
    progress,
    [0.04, 0.3],
    ['inset(16% 8% 16% 8%)', 'inset(0% 0% 0% 0%)'],
  )

  /* =============================================================== */
  /* IMAGE                                                             */
  /* =============================================================== */

  const imageScale = useTransform(progress, [0, 0.5, 1], [1.16, 1, 1.12])
  const imageX = useTransform(progress, [0, 0.5, 1], [30, 0, -26])
  const imageY = useTransform(progress, [0, 0.5, 1], [-18, 0, 16])
  const imageRotate = useTransform(progress, [0, 0.5, 1], [-1.2, 0, 1.2])

  /* Spotlight-coming-up brightness pass */
  const brightness = useTransform(progress, [0.08, 0.45], [0.55, 1])

  /* =============================================================== */
  /* GLOW + CAPTION                                                    */
  /* =============================================================== */

  const glowOpacity = useTransform(
    progress,
    [0, 0.24, 0.5, 0.76, 1],
    [0, 0.18, 0.45, 0.18, 0],
  )

  const captionY = useTransform(
    progress,
    [0, 0.26, 0.5, 0.78, 1],
    [24, 6, 0, -4, -16],
  )

  const captionOpacity = useTransform(
    progress,
    [0, 0.1, 0.34, 0.78, 1],
    [0, 1, 1, 1, 0],
  )

  return {
    progress,
    cardOpacity,
    cardY,
    cardScale,
    cardRotateX,
    cardClip,
    imageScale,
    imageX,
    imageY,
    imageRotate,
    brightness,
    glowOpacity,
    captionY,
    captionOpacity,
  }
}