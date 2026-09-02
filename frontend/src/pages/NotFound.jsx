import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-5xl text-brass/50">404</p>
      <h1 className="mt-4 font-display text-2xl text-mist">This page doesn't exist.</h1>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  )
}
