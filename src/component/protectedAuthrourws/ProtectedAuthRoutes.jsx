import React, { useContext } from 'react'
import { Authcontext } from '../Authcontext/Authcontext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoutes({children}) {
    const {userToken} = useContext(Authcontext)
  return (
   !userToken? children:<Navigate to={"/"}/>
  )
}
