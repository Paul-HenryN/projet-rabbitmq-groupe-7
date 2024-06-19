import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Votre mot de passe doit contenir au moins 6 caractères.",
    }),
    passwordConfirmation: z.string().min(6),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      path: ["password"],
      message: "Veuillez entrer le même mot de passe pour la confirmation.",
    }
  );

export function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({
    username,
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    const response = await axios.post("http://localhost:3333/signup", {
      username,
      email,
      password,
    });
    console.log(response);
  };
  return (
    <div className="grid place-items-center min-h-screen color-red-500">
      <h1>INSCRIPTION</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          {...form.register("username")}
        ></input>
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
        <input
          type="password"
          placeholder="Confirmer mot de passe"
          {...form.register("passwordConfirmation")}
        ></input>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
