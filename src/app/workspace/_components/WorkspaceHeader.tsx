import { UserButton } from "@clerk/nextjs";

export default function WorkspaceHeader() {
  return (
    <div className="p-4 flex items-center justify-between shadow-md">
      <img src="/logo.svg" alt="logo" width={170} height={120} loading="eager" />
      <UserButton />
    </div>
  );
}