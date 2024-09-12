import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className="flex items-center justify-center h-full m-5">
      <UserProfile routing="hash" />
    </div>
  );
};

export default Settings;
