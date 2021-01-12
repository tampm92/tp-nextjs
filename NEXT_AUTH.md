# Next-Auth

## Referents

- [Next JS](https://nextjs.org/)
- [Next Auht](https://next-auth.js.org/)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Prepare social app

- [Github](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app)
- [Google](https://console.developers.google.com/apis/credentials)
- [Facebook](https://developers.facebook.com/docs/facebook-login/web)

> **TIP**: callback url: `{baseUrl}/api/auth/callback/{provider}`

## Install libs

```bash
yarn add next-auth
```

## Setup ENV

- Add file `.env.local`

```css
ENV=development
NEXTAUTH_URL=http://localhost:3000
SECRET=
FACEBOOK_ID=
FACEBOOK_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
```

## Setup Next-Auth

- Add file `pages\api\auth\[...nextauth].js`

```jsx
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    // fake login by username/password
    Providers.Credentials({
      id: 'tpCredentials',
      name: 'TpCredentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {  label: "Password", type: "password", placeholder: "Password" }
      },
      authorize: async (credentials) => {
        const users = [
          { id: 1, name: 'J Test', email: 'test@example.com', image: 'https://live.staticflickr.com/65535/48991856476_e02e5b2f51_s.jpg', username: 'test', password: '123456' }
        ]

        const user = users.find( user => 
          user.username === credentials.username
          && user.password === credentials.password
        )
  
        if (user) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.SECRET,

  session: {
    jwt: true, 
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    // signIn: '/login'
  },
  debug: process.env.ENV === 'development'
}

export default (req, res) => NextAuth(req, res, options)
```

- Update file `pages/_app.jsx`

```jsx
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
```

- Update `pages/index.js`

```jsx
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={signOut}>Sign out</button>
    </>}
  </>
}
```

## Let enjoy

Now you can run `yarn dev`

Go to browser, you can test now

## Advance

### If you need custom login page

- Add file `pages/login`

```jsx
import React from 'react'
import { providers, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}
```

> More info [here](https://next-auth.js.org/configuration/pages)

- Open command in file `pages\api\auth\[...nextauth].js`

```jsx
const options = {
  ...
  pages: {
    signIn: '/login'
  }
  ...
}
```

- Now, when you click `Sign in` button, you can access your custom login page
