import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" border-b border-gray-200 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-white/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-lg font-bold">Talkify</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
