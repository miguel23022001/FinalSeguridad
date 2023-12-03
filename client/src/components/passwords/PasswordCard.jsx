import { usePasswords } from "../../context/passwordsContext";
import { Button, ButtonLink, Card } from "../ui";

export function PasswordCard({ password }) {
  const { deletePassword } = usePasswords();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{password.siteName}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deletePassword(password._id)}>Delete</Button>
          <ButtonLink to={`/passwords/${password._id}`}>Edit</ButtonLink>
          <ButtonLink to={`/passwords-show/${password._id}`}>Show</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{password.password}</p>
      {/* format date */}
      <p>
        {password.iv}
      </p>
    </Card>
  );
}