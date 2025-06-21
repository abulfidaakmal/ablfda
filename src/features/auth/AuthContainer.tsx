import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
