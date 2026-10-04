import { z } from 'zod'

// Contact form validation, shared by the Contact section and its tests.
// Kept out of the component file so it stays importable without React.
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(4, 'Subject is too short'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
export type ContactFormData = z.infer<typeof contactSchema>