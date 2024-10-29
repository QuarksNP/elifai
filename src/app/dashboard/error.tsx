'use client'
 
import { Button } from '@/modules/core/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col min-h-screen items-center justify-center gap-4 p-8 text-muted-foreground'>
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}