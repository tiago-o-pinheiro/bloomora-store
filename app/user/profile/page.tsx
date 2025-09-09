import { auth } from "@/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import ProfileForm from "./components/ProfileForm";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View and edit your profile information",
};

const ProfilePage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold text-2xl font-bold">Profile</h1>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
};

export default ProfilePage;
