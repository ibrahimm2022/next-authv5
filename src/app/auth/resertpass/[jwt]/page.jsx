import ResetPass from "@/component/resetpass/ResetPass";
import { verifyJWT } from "@/lib/jwt";

const page = async ({ params }) => {
  const verfiy = await verifyJWT(params.jwt);
  console.log(verfiy);
  return <ResetPass params={params} token={verfiy}/>;
};

export default page;
