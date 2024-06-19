import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    const response = await axios.post("http://localhost:3333/login", {
      email,
      password,
    });
    console.log(response);
  };
  return (
    <div>
      <h1>CONNEXION</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...form.register("email")}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          {...form.register("password")}
        ></input>
        {form.formState.errors.password &&
          form.formState.errors.password.message && (
            <p>{form.formState.errors.password.message}</p>
          )}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
