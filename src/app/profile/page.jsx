import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(OPTIONS);
  
  // if (!session || !session.user) redirect("/auth/signin");
  // console.log(session.user?.email);
  return <div style={{ textAlign: "center" }}>welcome to profile page</div>;
};

export default page;
