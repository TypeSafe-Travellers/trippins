import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Footer, Navbar, TripDetailsContainer } from "../../components";
import { clsx } from "clsx";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { boldFont } from "../../fonts";
import { api } from "../../utils/api";

const UserTrip: NextPage = () => {
  const { query, push } = useRouter();
  const { tripId: id, tripName: name } = query;
  const { data: session, status } = useSession();
  const { data: participants } = api.userTrips.getTripParticipants.useQuery({
    tripId: id as string,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }

    if (status !== "loading" && !id) {
      push("/404");
    }

    // validation to ensure that the user is a participant
    if (status !== "loading" && participants && session?.user?.id) {
      const foundParticipant = participants.find((p) =>
        p.participants.find((pp) => pp.id === session?.user?.id),
      );
      if (!foundParticipant) {
        push("/404");
      }
    }
  }, [id, participants, push, session?.user?.id, status]);

  if (status === "loading")
    return (
      <div
        className={clsx(
          "flex min-h-screen items-center justify-center text-center",
          "text-4xl lg:text-7xl",
          `${boldFont.className}`,
        )}
      >
        Loading...
      </div>
    );

  return (
    <>
      <Head>
        <title>Trippins | {name}</title>
        <meta name="description" content="Group Trip Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        className={clsx(
          "flex h-[calc(100vh-200px)] w-screen items-center justify-center",
          "flex-col gap-2",
          "text-gray-900 dark:text-zinc-100",
        )}
      >
        <TripDetailsContainer tripId={id as string} />
      </main>

      <div className={clsx("relative bottom-3 text-center lg:bottom-6")}>
        <Footer />
      </div>
    </>
  );
};

export default UserTrip;
