## Learning how to use Supabase with NextJS

![Preview](https://miro.medium.com/v2/resize:fit:720/format:webp/1*xOqCfciF90c8nH0HhMpapQ.png)

First, do the following:

```js
- add authentication providers in supabase dashboard.
- fill .env.local file
- configure lib/supabase/client
- configure lib/supabase/server
```

then , run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Supabase Services Used

- Authentication

#### Project Features

- The project UI is incomplete but it has fully functional functionalities.
- Password less authentication, A user can create an account using only the email, a confirmation email is sent to let user verify their email, and later a magic link is sent to login for that email. (using supabase server, server action)
- OAuth (Google and Github) authentication (using supabase client)
- Retreive user data on Navbar (client)
- Signout user on Navbar (client)

#### Authentication Strategies used

- PasswordLess Authentication, with Email only (Magic Link)
- OAuth (Google and Github)

#### Useful resources for Supabase with NextJS

-

Made by [Noor Muhammad](https://www.linkedin.com/in/connectwithnoor)
