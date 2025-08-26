import { Link } from '@tanstack/react-router'
import { Menu, Shield, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <Link to="/" className="text-sm font-semibold tracking-wide">
              Aegis OSINT
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="opacity-90 hover:opacity-100">
              Home
            </Link>
            <Link to="/_authenticated/services" className="opacity-90 hover:opacity-100">
              Services
            </Link>
            <a
              href="#features"
              className="opacity-90 hover:opacity-100"
            >
              Features
            </a>
            <a
              href="#about"
              className="opacity-90 hover:opacity-100"
            >
              About
            </a>
          </nav>

          <div className="md:hidden">
            <button
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 grid gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">
              Home
            </Link>
            <Link to="/_authenticated/services" onClick={() => setOpen(false)} className="py-2">
              Services
            </Link>
            <a href="#features" onClick={() => setOpen(false)} className="py-2">
              Features
            </a>
            <a href="#about" onClick={() => setOpen(false)} className="py-2">
              About
            </a>
          </div>
        </div>
      )}
    </header>
  )
}


