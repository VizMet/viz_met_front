"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useSignInMutation } from "@/api/api";
import { useRouter } from "next/navigation";
import { tokenService } from "@/services/tokenService";

const formSchema = z.object({
  login: z.string().min(1, {
    message: "Введите логин",
  }),
  password: z.string().min(1, {
    message: "Введите пароль",
  }),
});

const SignUp = () => {
  const [signIn, { isLoading, isError }] = useSignInMutation();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  useEffect(() => {
    return () => {
      setErrorMessage(null);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      setErrorMessage("Неверный логин или пароль");
    }
  }, [isError]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const result = await signIn({
        username: values.login,
        password: values.password,
      }).unwrap();

      // Используем сервис для сохранения токенов
      tokenService.setAccessToken(result.access_token);
      tokenService.setRefreshToken(result.refresh_token);

      setIsSuccess(true);
      router.replace("/");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-[660px] p-6 sm:p-10 md:p-16 lg:p-20 bg-[#FFFFFF1A] rounded-[42px] sm:rounded-[64px] lg:rounded-[84px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-between gap-6 sm:gap-8 lg:gap-10 text-white">
              <div className="w-[120px] sm:w-[150px] lg:w-[182px]">
                <Image
                  src={"/icons/logo.svg"}
                  alt="Logo"
                  width={182}
                  height={52}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col justify-between gap-4 sm:gap-5">
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-normal">
                        Логин
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          className="pr-10 h-12 sm:h-14 lg:h-16 bg-[#FFFFFF1A] border-[#8b8b8b] placeholder:text-base sm:placeholder:text-lg lg:placeholder:text-xl placeholder:opacity-40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-normal">
                          Пароль
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="pr-10 h-12 sm:h-14 lg:h-16 bg-[#FFFFFF1A] border-[#8b8b8b] placeholder:text-base sm:placeholder:text-lg lg:placeholder:text-xl placeholder:opacity-40"
                              placeholder="password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                  color="white"
                                />
                              ) : (
                                <Eye
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                  color="white"
                                />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        {errorMessage && (
                          <p className="text-red-500 text-sm mt-2">
                            {errorMessage}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Запомнить меня
                    </label>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full text-base sm:text-lg font-semibold rounded-md h-12 sm:h-14 bg-action text-white hover:bg-action hover:opacity-75"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? "Загрузка..." : isSuccess ? "Успешно!" : "Войти"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
