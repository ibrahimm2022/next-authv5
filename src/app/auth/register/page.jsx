import Register from "@/component/register/Register";
import { signJWT, verifyJWT } from "@/lib/jwt";
const page = async () => {
  // await sendMails({
  //   to: "7ee52f9e79@emailabox.pro",
  //   subject: "html try",
  //   body: `<div style={{ background: "red" }}>hello </div>`,
  // });
  
  return (
    <div>
      <Register />
    </div>
  );
};

export default page;
