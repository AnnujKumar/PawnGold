import React from 'react'
import { CNav, CNavItem, CNavLink } from '@coreui/react'

const  DashboardHeader = () => {
  return (
    <CNav variant="pills" layout="fill">
      <CNavItem>
        <CNavLink href="#" active>Dashboard</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/loans">Loans</CNavLink>
      </CNavItem>
    </CNav>
  )
}

export default DashboardHeader