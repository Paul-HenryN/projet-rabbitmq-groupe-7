import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";

const formSchema = z
  .object({
    username: z.string({ required_error: "Ce champ est obligatoire." }),
    email: z.string({ required_error: "Ce champ est obligatoire." }).email(),
    password: z.string({ required_error: "Ce champ est obligatoire." }).min(6, {
      message: "Votre mot de passe doit contenir au moins 6 caractères.",
    }),
    passwordConfirmation: z
      .string({ required_error: "Ce champ est obligatoire." })
      .min(6),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      path: ["passwordConfirmation"],
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
    <main className="grid place-items-center min-h-screen text-xl">
      <div className="flex flex-col items-center gap-8">
        <h1>Inscription</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div>
            {form.formState.errors.username && (
              <FormError>{form.formState.errors.username.message}</FormError>
            )}
            <Input
              type="text"
              placeholder="Nom d'utilisateur"
              {...form.register("username")}
            />
          </div>

          <div>
            {form.formState.errors.email &&
              form.formState.errors.email.message && (
                <FormError>{form.formState.errors.email.message}</FormError>
              )}
            <Input
              type="email"
              placeholder="Email"
              {...form.register("email")}
            />
          </div>

          <div>
            {form.formState.errors.password &&
              form.formState.errors.password.message && (
                <FormError>{form.formState.errors.password.message}</FormError>
              )}
            <Input
              type="password"
              placeholder="Mot de passe"
              {...form.register("password")}
            />
          </div>

          <div>
            {form.formState.errors.passwordConfirmation &&
              form.formState.errors.passwordConfirmation.message && (
                <FormError>
                  {form.formState.errors.passwordConfirmation.message}
                </FormError>
              )}
            <Input
              type="password"
              placeholder="Confirmer mot de passe"
              {...form.register("passwordConfirmation")}
            />
          </div>

          <Button type="submit">S'inscrire</Button>
        </form>
      </div>
    </main>
  );
}
