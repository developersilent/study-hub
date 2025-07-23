"use client";
import {
  AlertCircle,
  ChartNoAxesGantt,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignUp, SignUpType } from "@/app/(auth)/types/form.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useSignUpMutation } from "@/query-calls/auth-query-calls";
import { ErrorToast, SuccessToast } from "@/components/toast";
import { redirect } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const rhf = useForm<SignUpType>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const { isPending, mutateAsync } = useSignUpMutation();

  const submitForm = async (data: SignUpType) => {
    const res = await mutateAsync(data);
    if (res.isSuccess) {
      SuccessToast(res.Message);
      redirect("/");
    } else {
      ErrorToast(res.Message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6 mb-7", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <ChartNoAxesGantt className="size-14" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground/80">
            Sign up to continue.
          </h1>
        </div>
        <Form {...rhf}>
          <form
            onSubmit={rhf.handleSubmit(submitForm)}
            className="flex flex-col gap-2.5"
          >
            <div className="space-y-[12px]">
              {/* Username Input */}
              <FormField
                control={rhf.control}
                name="username"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="username, eg: user_10_"
                          type="text"
                          autoComplete="off"
                          placeholder="Username"
                          className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.username ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                          {...field}
                        />
                        {formState.errors.username && (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertCircle size={15} className="text-rose-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                  </FormItem>
                )}
              />

              {/* Email Input */}
              <FormField
                control={rhf.control}
                name="email"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          autoComplete="off"
                          placeholder="user@example.com"
                          className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.username ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                          {...field}
                        />
                        {formState.errors.email && (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertCircle size={15} className="text-rose-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={rhf.control}
                name="password"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.password ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                          {...field}
                        />
                        {formState.errors.password ? (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertCircle size={15} className="text-rose-600" />
                          </div>
                        ) : (
                          formState.dirtyFields.password && (
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] cursor-pointer place-content-center rounded-full"
                            >
                              {showPassword ? (
                                <Eye size={15} className="text-foreground/70" />
                              ) : (
                                <EyeOff
                                  size={15}
                                  className="text-foreground/70"
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-300 ease-in-out" />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="my-4">
              <Button className="text-xs w-full" type="submit">
                {isPending ? (
                  <Loader2
                    size={30}
                    className="animate-spin duration-[370ms]"
                  />
                ) : (
                  <span className="text-sm text-primary-foreground">
                    Sign up
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-primary text-primary/80"
        >
          Sign in
        </Link>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
