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
    [0, 0.05, 0.95, 1],
    [1, 1, 1, 1],
  )

  const cardY = useTransform(
    progress,
    [0, 0.5, 1],
    [0, 0, 0],
  )

  const cardScale = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.99, 1, 1, 1, 0.99],
  )

  const cardRotateX = useTransform(
    progress,
    [0, 0.38, 0.62, 1],
    [0.5, 0, 0, -0.5],
  )

  /* Clean full card frame — no artificial edge clipping */
  const cardClip = useTransform(
    progress,
    [0, 1],
    ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
  )

  /* =============================================================== */
  /* IMAGE                                                             */
  /* =============================================================== */

  const imageScale = useTransform(progress, [0, 0.5, 1], [1.08, 1, 1.06])
  const imageX = useTransform(progress, [0, 0.5, 1], [16, 0, -14])
  const imageY = useTransform(progress, [0, 0.5, 1], [-8, 0, 8])
  const imageRotate = useTransform(progress, [0, 0.5, 1], [-0.5, 0, 0.5])

  /* Spotlight-coming-up brightness pass */
  const brightness = useTransform(progress, [0.08, 0.45], [0.8, 1])

  /* =============================================================== */
  /* GLOW + CAPTION                                                    */
  /* =============================================================== */

  const glowOpacity = useTransform(
    progress,
    [0, 0.24, 0.5, 0.76, 1],
    [0.15, 0.35, 0.45, 0.35, 0.15],
  )

  const captionY = useTransform(
    progress,
    [0, 0.5, 1],
    [0, 0, 0],
  )

  const captionOpacity = useTransform(
    progress,
    [0, 0.05, 0.95, 1],
    [1, 1, 1, 1],
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