import useUserStatus from "../hooks/useUserStatus";
import { signOut } from "../services/amplify";

export default function Header() {
  const user = useUserStatus();

  return (
    <nav className="container mx-auto p-4 pt-6 mb-4 flex place-items-center text-gray-700">
      <a className="text-2xl font-semibold cursor-pointer">Amplify</a>
      <div className="hidden sm:block ml-auto">
        <a className="font-semibold mr-4 hover:underline cursor-pointer">
          {user && user.attributes.email}
        </a>
        <a className="font-semibold mr-4 hover:underline cursor-pointer">
          {user && user.username}
        </a>

        {user ? (
          <a
            className="py-2 px-4 bg-gray-800 rounded text-lg font-semibold text-white cursor-pointer hover:bg-gray-900"
            onClick={signOut}
          >
            logout
          </a>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
