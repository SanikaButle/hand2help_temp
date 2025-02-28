import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return(
    <div className="flex items-center justify-center mt-10">
      <SignIn className="w-full max-w-md" />
  </div>
  );
}
