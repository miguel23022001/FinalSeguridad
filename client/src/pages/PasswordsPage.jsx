import { useEffect } from "react";
import { usePasswords } from "../context/passwordsContext";
import { PasswordCard } from "../components/passwords/PasswordCard";
import { ImFileEmpty } from "react-icons/im";

export function PasswordsPage() {
  const { passwords, getPasswords } = usePasswords();

  useEffect(() => {
    getPasswords();
  }, []);

  return (
    <>
      {passwords.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No passwords yet, please add a new password
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {passwords.map((password) => (
          <PasswordCard password={password} key={password._id} />
        ))}
      </div>
    </>
  );
}