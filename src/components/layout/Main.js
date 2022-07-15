import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Main() {
  return (
      <Fragment>
          <Header />
          <Outlet />
    </Fragment>
  )
}
