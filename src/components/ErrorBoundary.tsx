import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// Last-resort client guard: a render error anywhere in the tree currently
// unmounts the whole app (there is no other error boundary). This catches it,
// keeps the page usable, and logs the failure for diagnosis.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-zinc-100 px-6 text-center">
        <p className="font-heading font-extrabold tracking-tighter text-4xl sm:text-6xl text-gradient">
          Something went wrong
        </p>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
          An unexpected error occurred while rendering this page. Your data is safe — try reloading.
        </p>
        <button
          type="button"
          onClick={() => {
            this.setState({ hasError: false })
            window.location.reload()
          }}
          className="px-7 py-3 rounded-full font-semibold text-xs sm:text-sm text-white font-heading bg-blue-600 hover:bg-blue-500 transition-colors"
        >
          Reload
        </button>
      </main>
    )
  }
}