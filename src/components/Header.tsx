import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useLogoutMutation } from "@/api/api";
import { useRouter } from "next/navigation";
import { tokenService } from "@/services/tokenService";

const Header = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await logout({ refresh: refreshToken }).unwrap();
      }

      tokenService.clearTokens();

      router.replace("/signUp");
    } catch (error) {
      console.error("Ошибка при выходе:", error);

      tokenService.clearTokens();
      router.replace("/signUp");
    }
  };

  return (
    <header className="w-full bg-dark">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-12">
          {/* Левая часть */}
          <div className="flex items-center">
            <Link
              href="/"
              className="block w-[100px] sm:w-[120px] lg:w-[150px]"
            >
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={94}
                height={26}
                priority
              />
            </Link>
          </div>

          {/* Правая часть */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="default"
              className="bg-action text-white hover:bg-action hover:opacity-75 text-sm sm:text-base px-3 sm:px-4"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Выход..." : "Выйти"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
