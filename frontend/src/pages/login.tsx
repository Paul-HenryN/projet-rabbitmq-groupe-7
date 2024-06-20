import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/input";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import useAuth from "../hooks/useAuth";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    const response = await axios.post<User>("http://localhost:3333/login", {
      email,
      password,
    });

    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));

    navigate("/");
  };
  return (
    <main className="grid place-items-center min-h-screen text-xl">
      <div className="flex flex-col items-center gap-8">
        <h1>Connexion</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          {form.formState.errors.root && (
            <FormError>{form.formState.errors.root.message}</FormError>
          )}
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            required
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            {...form.register("password")}
            required
          />
          <Button type="submit">Se connecter</Button>
        </form>
      </div>
    </main>
  );
}
