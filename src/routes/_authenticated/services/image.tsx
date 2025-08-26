import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/image')({
  component: () => <div>Image</div>,
})
