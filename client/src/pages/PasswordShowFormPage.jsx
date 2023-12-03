import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { usePasswords } from "../context/passwordsContext";
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';
dayjs.extend(utc);

export function PasswordShowFormPage() {
  const { getPassword } = usePasswords();
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerMasterPassword,
    handleSubmit: handleSubmitMasterPassword,
    formState: { errors: errorsMasterPassword },
  } = useForm();

  const decryptPassword = (masterPassword, encryptedPassword, iv) => {
    try {
      const key = CryptoJS.PBKDF2(masterPassword, CryptoJS.enc.Hex.parse(iv), {
        keySize: 256 / 32,
        iterations: 1000
      });

      const decryptedPassword = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Base64.parse(encryptedPassword)
        },
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) }
      );

      return decryptedPassword.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error(error);
      return ""; // Otra acción adecuada en caso de error de desencriptación
    }
  };  
  
  const onMasterPasswordSubmit = async (data) => {
    try {
      const password = await getPassword(params.id);

      // Desencriptar la contraseña utilizando el masterPassword ingresado
      const decryptedPassword = decryptPassword(
        data.masterPassword,
        password.password,
        password.iv
      );

      // Muestra un alert con la contraseña desencriptada
      alert(`Contraseña desencriptada: ${decryptedPassword}`);

      // También puedes almacenar la contraseña desencriptada en el estado si es necesario
      setValue("derivedPassword", decryptedPassword);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Llamada a la función que desencripta con el masterPassword ingresado
      await onMasterPasswordSubmit(data);

      // Puedes realizar otras acciones después de la desencriptación si es necesario
      // navigate("/Passwords");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadPassword = async () => {
      if (params.id) {
        const password = await getPassword(params.id);
        setValue("siteName", password?.siteName || "");
        setValue("password", password?.password || "");
        setValue("iv", password?.iv || "");
        setValue("completed", password?.completed || false);
      }
    };
    loadPassword();
  }, [params.id, getPassword, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="siteName">SiteName</Label>
        <Input
          type="text"
          name="siteName"
          placeholder="SiteName"
          {...register("siteName")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password")}
          autoFocus
        />
        <Label htmlFor="masterPassword">Master Password</Label>
        <Input
          type="password"
          name="masterPassword"
          placeholder="Master Password"
          {...registerMasterPassword("masterPassword", { required: true })}
        />
        {errorsMasterPassword.masterPassword && (
          <p className="text-red-500 text-xs italic">Please enter the master password.</p>
        )}
        <Button
          type="button"
          onClick={handleSubmitMasterPassword(onMasterPasswordSubmit)}
          className="ml-2 p-2"
        >
          Show Password
        </Button>
      </form>
    </Card>
  );
}
