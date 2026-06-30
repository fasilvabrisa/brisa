import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock Next.js navigation and auth so we can render the landing page in isolation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))
vi.mock('@/app/lib/auth', () => ({
  getSession: vi.fn().mockResolvedValue(null),
}))
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import Home from '@/app/page'

describe('Home page', () => {
  it('renders the BRISA brand name', async () => {
    const Page = await Home()
    render(Page)
    const headings = screen.getAllByText('BRISA')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders the tagline', async () => {
    const Page = await Home()
    render(Page)
    expect(screen.getByText('Help every work.')).toBeDefined()
  })

  it('renders signup and login links', async () => {
    const Page = await Home()
    render(Page)
    const signupLinks = screen.getAllByRole('link', { name: /criar conta/i })
    expect(signupLinks.length).toBeGreaterThan(0)
    const loginLinks = screen.getAllByRole('link', { name: /entrar|já tenho conta/i })
    expect(loginLinks.length).toBeGreaterThan(0)
  })
})
