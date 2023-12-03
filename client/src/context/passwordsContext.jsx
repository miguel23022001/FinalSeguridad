import { createContext, useContext, useState } from "react";
import {
  createPasswordRequest,
  deletePasswordRequest,
  getPasswordsRequest,
  getPasswordRequest,
  updatePasswordRequest,
} from "../api/passwords";

const PasswordContext = createContext();

export const usePasswords = () => {
  const context = useContext(PasswordContext);
  if (!context) throw new Error("usePasswords must be used within a PasswordProvider");
  return context;
};

export function PasswordProvider({ children }) {
  const [passwords, setPasswords] = useState([]);

  const getPasswords = async () => {
    const res = await getPasswordsRequest();
    setPasswords(res.data);
  };

  const deletePassword = async (id) => {
    try {
      const res = await deletePasswordRequest(id);
      if (res.status === 204) setPasswords(passwords.filter((password) => password._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPassword = async (password) => {
    try {
      console.log(password.masterKey);
      const res = await createPasswordRequest(password);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPassword = async (id) => {
    try {
      const res = await getPasswordRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePassword = async (id, password) => {
    try {
      await updatePasswordRequest(id, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        getPasswords,
        deletePassword,
        createPassword,
        getPassword,
        updatePassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}