![repo banner](https://socialify.git.ci/TypeSafe-Travellers/trippins/image?description=1&font=Raleway&forks=1&issues=1&name=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark)

## About

Welcome to our group trip-planning app! We are a team of travel enthusiasts who understand the challenges of planning a group trip. We created this app to make the process as easy and stress-free as possible. Our web app allows users to create a trip itinerary, share it with their group, and collaborate on details such as accommodations, transportation, and activities. We believe that group trip planning should be fun and exciting, not overwhelming. That's why we've designed our app to be user-friendly and intuitive. Thank you for choosing our group trip-planning app. Bon voyage!

**Note:** The app is currently in development. We are working on adding new features and improving the user experience. Please check back soon for updates!

## Screenshots

**Note:** Please note that the app is still in active development and the following screenshots are pre-alpha previews.

- To start using Trippins, you must create an account. You can do so by clicking the "Get Started" button on the home page.

![Home Page](https://user-images.githubusercontent.com/89210438/215353896-6a96d1b2-c8cb-4f51-9bb5-048144d10d8a.png)

## Get Started

Here's how you can set up the Trippins app on your local machine:

1. Clone the repo

```bash
git clone https://github.com/TypeSafe-Travellers/trippins.git
```

2. Install dependencies

```bash
npm install
```

3. Connect to PlanetScale database

```bash
pscale auth login
pscale connect typesafetravellers dev --port 3309 --org typesafetravellers
npx prisma studio
```

4. Run the app

```bash
npm run dev
```

5. Check and format code

```bash
npm run format:check
npm run format
```

# Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Twilio SendGrid](https://sendgrid.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [MySQL](https://www.mysql.com/)
- [PlanetScale](https://planetscale.com/)
- [Repl.it](https://replit.com/)

## Team

- [Ayanava Karmakar](https://github.com/AyanavaKarmakar)
- [Subham Sarkar](https://github.com/ssarkar551)
- [Nishith Savla](https://github.com/Nishith-Savla)

## Links

- [Website](https://trippins.ayanavakarmakar.repl.co)
- [Repl.it Repo](https://replit.com/@AyanavaKarmakar/trippins?v=1)
- [Milestones](https://github.com/TypeSafe-Travellers/App/milestones)
- [Roadmap & Priorities](https://github.com/TypeSafe-Travellers/App/projects?query=is%3Aopen)

## Show your support

Give a ⭐️ if you like this project! Your support helps us continue to develop and improve Trippins.

---
