import React from "react"
import App from 'next/app'
import Head from 'next/head'

import LayoutDefault from '@/layouts/default'

// import UI framework and global css
// import '@/assets/styles/tailwind.css'
import '@/assets/styles/globals.scss'

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`
=========================================================
* TP NextJS
=========================================================

* Website: https://tampm.com
=========================================================
    `)
    document.insertBefore(comment, document.documentElement)
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    const Layout = Component.layout || LayoutDefault

    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>TP NextJS</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    )
  }
}