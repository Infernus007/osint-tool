import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/news')({
  component: () => <div>News</div>,
})
