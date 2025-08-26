import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/email')({
  component: () => <div>Email</div>,
})
