import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../lib/auth'
import ProfilePage from '../components/AccountPage'


async function page() {
  const session = await getServerSession(authOptions) 
  
  return <ProfilePage user={session.user} />
}

export default page