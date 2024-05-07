import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaArrowLeft } from "react-icons/fa";
import { LoginForm } from "./components/LoginForm";
import { OtpForm } from "./components/OtpForm";

const LoginPage = () => {
  const [isOTPLogin, setIsOTPLogin] = useState(false);

  const loginModeHandler = () => {
    setIsOTPLogin(!isOTPLogin);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center px-4">
      <Link
        to="/"
        className="absolute top-6 left-6 text-slate-700 hover:text-slate-800 transition-colors duration-300 flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        <span className="text-slate-700 hover:text-slate-800 duration-300 text-lg">
          Home
        </span>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back!</CardTitle>
          <CardDescription>
            Please enter your credentials to access your Repair Ninja account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isOTPLogin ? <OtpForm /> : <LoginForm />}
        </CardContent>
        <CardFooter>
          <Button onClick={loginModeHandler} className="w-full" variant="link">
            {isOTPLogin ? "Regular Login" : "PasswordLess Login"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
