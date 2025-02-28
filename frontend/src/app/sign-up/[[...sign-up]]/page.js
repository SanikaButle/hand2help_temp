import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center mt-10">
      <SignUp className="w-full max-w-md" />
    </div>
  );
}
