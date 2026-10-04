import { useState, forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface UnderlineFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/**
 * Minimal underline input — borderless field with a single static
 * bottom rule. No focus border, no outline, no hover effects.
 */
export const UnderlineInput = forwardRef<HTMLInputElement, UnderlineFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = (!!props.value && String(props.value).length > 0) || !!props.defaultValue
    const floatLabel = focused || hasValue

    return (
      <div className="relative w-full">
        <label
          className={cn(
            'pointer-events-none absolute left-0 origin-left select-none z-10 transition-all duration-300 ease-out',
            floatLabel
              ? 'top-0 scale-90 -translate-x-1 text-primary-light text-xs font-semibold'
              : 'top-4 scale-100 text-zinc-500 text-sm',
          )}
        >
          {label}
        </label>

        {/* Focus bloom — soft light breathes in, no border/outline */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: focused && !error ? 1 : 0, scale: focused && !error ? 1 : 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl"
          style={{
            background:
              'radial-gradient(140px circle at 50% 100%, rgba(96,165,250,0.16) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)',
          }}
        />

        <input
          ref={ref}
          {...props}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            'w-full pt-6 pb-2.5 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none caret-primary-light',
            className,
          )}
        />

        {/* Bottom line — grows from 0 to 100% when the field is clicked/focused */}
        <span className={cn('absolute bottom-0 left-0 right-0 h-px', error && 'bg-blue-500/60')} />
        <motion.span
          aria-hidden
          className={cn(
            'absolute bottom-0 left-0 h-px origin-left',
            error ? 'bg-blue-500/80' : 'bg-gradient-to-r from-blue-400 to-blue-500',
          )}
          style={error ? undefined : { boxShadow: '0 0 10px rgba(96,165,250,0.45)' }}
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-1.5 text-xs text-blue-300"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
UnderlineInput.displayName = 'UnderlineInput'

interface UnderlineTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const UnderlineTextarea = forwardRef<HTMLTextAreaElement, UnderlineTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = (!!props.value && String(props.value).length > 0) || !!props.defaultValue
    const floatLabel = focused || hasValue

    return (
      <div className="relative w-full">
        <label
          className={cn(
            'pointer-events-none absolute left-0 origin-left select-none z-10 transition-all duration-300 ease-out',
            floatLabel
              ? 'top-0 scale-90 -translate-x-1 text-primary-light text-xs font-semibold'
              : 'top-5 scale-100 text-zinc-500 text-sm',
          )}
        >
          {label}
        </label>

        {/* Focus bloom — soft light breathes in, no border/outline */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: focused && !error ? 1 : 0, scale: focused && !error ? 1 : 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl"
          style={{
            background:
              'radial-gradient(140px circle at 50% 100%, rgba(96,165,250,0.16) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)',
          }}
        />

        <textarea
          ref={ref}
          {...props}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            'w-full pt-8 pb-3 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none transition-colors duration-300 resize-none caret-primary-light',
            className,
          )}
        />

        <span className={cn('absolute bottom-0 left-0 right-0 h-px', error && 'bg-blue-500/60')} />
        <motion.span
          aria-hidden
          className={cn(
            'absolute bottom-0 left-0 h-px origin-left',
            error ? 'bg-blue-500/80' : 'bg-gradient-to-r from-blue-400 to-blue-500',
          )}
          style={error ? undefined : { boxShadow: '0 0 10px rgba(96,165,250,0.45)' }}
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-1.5 text-xs text-blue-300"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
UnderlineTextarea.displayName = 'UnderlineTextarea'