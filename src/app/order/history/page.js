import HistoryPage from '@/app/components/History'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions)
  return <HistoryPage userId={session.user.id}/>
}

export default page