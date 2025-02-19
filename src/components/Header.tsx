import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Удаляем cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // Диспатчим экшен логаута
    dispatch(logout());
    // Редиректим на страницу входа
    router.replace("/signUp");
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
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
