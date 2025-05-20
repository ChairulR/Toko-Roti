import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";
import ProfilePage from "../components/AccountPage";

async function page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="justify-center items-center flex flex-col">
      <ProfilePage user={session.user} />
    </div>
  );
}

export default page;
