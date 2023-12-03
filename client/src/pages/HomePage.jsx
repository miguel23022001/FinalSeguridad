import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">React Passwords</h1>
      <p className="text-md text-slate-400">
      Tu clave para una seguridad digital sólida: almacena, organiza y 
      genera contraseñas fuertes con facilidad. Tecnología de cifrado 
      avanzada protege tus datos. Accede desde cualquier dispositivo. 
      Simplifica y protege tu experiencia en línea. ¡Bienvenido a la 
      seguridad digital sin complicaciones!
      </p>

      <Link
        className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/register"
      >
        Get Started
      </Link>
      
    </header>
  </section>
  );
}

export default HomePage;