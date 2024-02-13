import { ActivateUserFun } from "@/lib/actions/registerForm";

const Activation = async ({ params }) => {
  const result = await ActivateUserFun(params.jwt);
  return <div>{result}</div>;
};

export default Activation;
