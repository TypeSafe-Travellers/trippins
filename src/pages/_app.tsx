import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "../utils/api";
import "../styles/globals.css";
import clsx from "clsx";
import { regularFont } from "../fonts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <SessionProvider session={session}>
        <main className={clsx(`${regularFont.variable} font-regular`)}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
