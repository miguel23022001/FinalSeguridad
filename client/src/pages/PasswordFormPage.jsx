import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { usePasswords } from "../context/passwordsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';
dayjs.extend(utc);

export function PasswordFormPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { createPassword, getPassword, updatePassword } = usePasswords();
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

  const onMasterPasswordSubmit = async (data) => {
    try {
      // Obtener la contraseña derivada usando una función de cifrado (por ejemplo, encryptPassword)
      const derivedPassword = encryptPassword(data.masterPassword, data.password);
  
      // Setear la contraseña derivada en el campo correspondiente
      setValue("derivedPassword", derivedPassword);
    } catch (error) {
      console.error(error);
    }
  };

  const encryptPassword = (masterPassword, plainPassword) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encryptedPassword = CryptoJS.AES.encrypt(plainPassword, key, { iv: iv });
  
    // Devuelve la contraseña cifrada en formato base64
    return {
      encryptedPassword: encryptedPassword.toString(),
      iv: iv.toString()
    };
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    try {

      const encryptedPassword = data.derivedPassword || data.password;

      if (params.id) {
        updatePassword(params.id, {
          ...data,
          password: encryptedPassword.encryptedPassword,
          iv: encryptedPassword.iv,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createPassword({
          ...data,
          password: encryptedPassword.encryptedPassword,
          iv: encryptedPassword.iv,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/Passwords");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadPassword = async () => {
      if (params.id) {
        const password = await getPassword(params.id);
        setValue("siteName", password.siteName);
        setValue("password", password.password);
        setValue("iv", password.iv);
        setValue("completed", password.completed);
      }
    };
    loadPassword();
  }, []);

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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password")}
            autoFocus
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2 p-2"
          >
            {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          </Button>
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
         <Button onClick={handleSubmitMasterPassword(onMasterPasswordSubmit)}>
            Generate Encrypted Password
          </Button>
      </form>
    </Card>
  );
}