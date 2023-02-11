import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Loading, Navbar, TripDetailsContainer } from "../../components";
import { clsx } from "clsx";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "../../utils/api";

const UserTrip: NextPage = () => {
  const { query, push } = useRouter();
  const { tripId: id, tripName: name } = query;
  const { data: session, status } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const { data: participants } = api.userTrips.getTripParticipants.useQuery({
    tripId: id as string,
  });
  const utils = api.useContext();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }

    if (status !== "loading" && !id) {
      push("/404");
    }

    // validation to ensure that the user is a participant
    if (status !== "loading" && participants && user?.id) {
      const foundParticipant = participants.find((p) =>
        p.participants.find((pp) => pp.id === user?.id),
      );
      if (!foundParticipant) {
        push("/404");
      }
    }

    if (session?.user?.email) {
      utils.userProfile.getProfileDetails.refetch({
        email: session?.user?.email,
      });
    }

    if (id) {
      utils.userTrips.getTripParticipants.refetch({ tripId: id as string });
    }

    return () => {
      utils.userProfile.getProfileDetails.invalidate();
      utils.userTrips.getTripParticipants.invalidate();
    };
  }, [
    id,
    push,
    status,
    user?.id,
    participants,
    session?.user?.email,
    utils.userProfile.getProfileDetails,
    utils.userTrips.getTripParticipants,
  ]);

  if (status === "loading") return <Loading />;

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
          "flex h-screen w-screen items-center justify-center",
          "flex-col gap-2",
          "text-gray-900 dark:text-zinc-100",
        )}
      >
        <TripDetailsContainer tripId={id as string} />
      </main>
    </>
  );
};

export default UserTrip;
