import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Welcome = () => {
  const customer = useSelector((state: RootState) => state.user?.customer);
  const name = customer?.firstName?.trim();

  console.log("Redux customer:", customer);

  return (
    <div>
      <h1>WELCOME{name ? `, ${name}` : ''}!</h1>
      <p>Here you can manage your account, view your profile, and access other features.</p>
    </div>
  );
};

export default Welcome;
