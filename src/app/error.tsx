'use client'

import { LogoutBtn } from '@/modules/auth/components/logout-btn'
import { Button } from '@/modules/core/components/ui/button'
import { Separator } from '@/modules/core/components/ui/separator'
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
    <section className="h-[calc(100vh_-_2rem)] flex flex-col items-center justify-center gap-4 p-8 text-muted-foreground">
      <header className="flex gap-2 items-center">
        <h2 className="text-xl font-bold">500</h2>
        <Separator orientation="vertical" />
        <p className='text-sm max-w-96'>Try logging out or deleting your cookies manually.</p>
      </header>
      <LogoutBtn variant="link"/>
      <Button type='button' onClick={() => reset()}>Try again</Button>
    </section>
  )
}