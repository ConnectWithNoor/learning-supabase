import getUserData from "@/actions/user";
import UserCard from "@/components/shared/user/user-card";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) {
    return (
      <div className="grid place-content-center h-[80vh]">
        <p className="text-red-500">An error occured</p>
      </div>
    );
  }

  if (userData && "error" in userData) {
    return (
      <div className="grid place-content-center h-[80vh]">
        <p className="text-red-500">{userData.error}</p>
      </div>
    );
  }

  return (
    <div className="grid place-content-center h-[80vh]">
      <UserCard userData={userData} />
    </div>
  );
}
