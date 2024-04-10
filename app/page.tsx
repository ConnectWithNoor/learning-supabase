import getUserData from "@/actions/user";
import UserCard from "@/components/shared/user/user-card";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) {
    // throw new error
  }

  return (
    <div className="grid place-content-center h-[80vh]">
      <UserCard userData={userData} />
    </div>
  );
}
