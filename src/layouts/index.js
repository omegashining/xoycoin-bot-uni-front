import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import MainLayout from './Main'
import AuthLayout from './Auth'

const Layouts = {
  main: MainLayout,
  auth: AuthLayout,
}

const mapStateToProps = ({ user }) => ({ user })
let previousPath = ''

const Layout = ({ user, children, location: { pathname, search } }) => {
  // NProgress & ScrollTop Management
  const currentPath = pathname + search
  if (currentPath !== previousPath) {
    window.scrollTo(0, 0)
    NProgress.start()
  }
  setTimeout(() => {
    NProgress.done()
    previousPath = currentPath
  }, 300)

  // Layout Rendering
  const getLayout = () => {
    return 'main'
  }

  // auth for demo build, remove it in your app
  const DEMO_AUTH = process.env.REACT_APP_AUTHENTICATED === 'true'

  const Container = Layouts[getLayout()]
  const isUserAuthorized = DEMO_AUTH || user.authorized
  const isUserLoading = user.loading
  const isAuthLayout = getLayout() === 'main'

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
      return null
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized) {
      return <Redirect to="/pools" />
    }
    // in other case render previously set layout
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      <Helmet titleTemplate="XoyCoin | %s" title="" />
      {BootstrappedLayout()}
    </Fragment>
  )
}

export default withRouter(connect(mapStateToProps)(Layout))
