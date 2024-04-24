import React from 'react'

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth'

type Props = {}

const DashboardPage = (props: Props) => {
  const { user, logout } = useAuth();
  return (
    <>
    {<p>Welcome, {user?.first_name} {user?.last_name}</p>}
    {<p>Your email is: {user?.email}</p>}
    {<p>Your username is: {user?.username}</p>}
    {<p>Your account ID is: {user?.id}</p>}
    <Button onClick={() => logout()}>Logout now.</Button>
    </>
  )
}

export default DashboardPage