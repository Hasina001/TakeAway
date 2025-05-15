import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='mt-10'>
      <div className='text-center'>
        <h1 className='text-3xl'>HomePage</h1>
        <Button asChild>
          <Link href="/users/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}

export default HomePage