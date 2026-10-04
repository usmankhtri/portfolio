import { describe, expect, it } from 'vitest'
import { contactSchema } from '../../lib/contactSchema'

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Project inquiry',
  message: 'I would love to discuss a new project with you.',
}

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a name shorter than 2 characters', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'J' }).success).toBe(false)
  })

  it('rejects an invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects a subject shorter than 4 characters', () => {
    expect(contactSchema.safeParse({ ...valid, subject: 'Hi' }).success).toBe(false)
  })

  it('rejects a message shorter than 20 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Too short' }).success).toBe(false)
  })

  it('rejects missing fields', () => {
    expect(contactSchema.safeParse({}).success).toBe(false)
  })
})