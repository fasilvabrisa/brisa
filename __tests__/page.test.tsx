import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Home page', () => {
  it('renders the BRISA heading', () => {
    render(<Home />)
    expect(screen.getByText('BRISA')).toBeDefined()
  })

  it('renders the tagline', () => {
    render(<Home />)
    expect(screen.getByText('Help every work.')).toBeDefined()
  })
})
