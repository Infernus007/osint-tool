import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/government')({
  component: () => <div>Government</div>,
})
