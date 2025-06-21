import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthContainer from "@/features/auth/AuthContainer";
import SignInForm from "@/features/auth/SignInForm";
import Link from "next/link";

const SignInPage = () => {
  return (
    <AuthContainer>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} className="underline underline-offset-4">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </AuthContainer>
  );
};

export default SignInPage;
