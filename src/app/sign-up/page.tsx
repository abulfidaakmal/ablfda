import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthContainer from "@/features/auth/AuthContainer";
import SignUpForm from "@/features/auth/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <AuthContainer>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Let&apos;s sign up quickly to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={"/sign-in"} className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </CardContent>
    </AuthContainer>
  );
};

export default SignUpPage;
