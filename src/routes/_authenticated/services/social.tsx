import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/social')({
  component: () => <div>Social</div>,
})
