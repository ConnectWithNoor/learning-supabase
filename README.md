## Learning how to use Supabase with NextJS

![Preview](https://miro.medium.com/v2/resize:fit:720/format:webp/1*xOqCfciF90c8nH0HhMpapQ.png)

First, do the following:

```js
- add authentication providers in supabase dashboard.
- in case of OAuth providers, add client and secret keys in supabase dashboard.
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

- Authentication (refresh auth token using middleware included)

#### Project Features

- The project UI is incomplete but it has fully functional functionalities.
- Password less authentication, A user can create an account using only the email, a confirmation email is sent to let user verify their email (using supabase server, server action)
- OAuth (Google and Github) authentication (using supabase client)
- Page protection example in Navbar (for protected pages)
- Signout user on Navbar (client)
- Middleware to check for cookies on every request, (this is to refresh expired Auth tokens and store them back to cookies and localstorage)

#### Authentication Strategies used

- PasswordLess Authentication, with Email only (Magic Link)
- OAuth (Google and Github)

#### Useful resources for Supabase with NextJS

- [Authentication with NextJS SSR](https://www.youtube.com/watch?v=VVElr2n90KY)
- [Supabase SSR package](https://supabase.com/docs/guides/auth/server-side/overview)
- [How to Increase Supabase signup rate limit 3000 free emails](https://medium.com/@techalchimiste/how-to-increase-supabase-signup-rate-limit-3000-emails-mo-261289882cf4)

Made by [Noor Muhammad](https://www.linkedin.com/in/connectwithnoor)
