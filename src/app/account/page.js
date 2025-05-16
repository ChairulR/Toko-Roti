import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

async function page() {
  const session = await getServerSession(authOptions)
  return (
JSON.stringify(session, null, 2) 
  )
}

export default page