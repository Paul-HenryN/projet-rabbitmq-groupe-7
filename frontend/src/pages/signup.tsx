import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { axios } from "../lib/axios";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    username: z.string({}),
    email: z.string({}).email(),
    password: z.string({}).min(6),
    passwordConfirmation: z.string({}).min(6),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      path: ["passwordConfirmation"],
      message: "Passwords must match.",
    }
  );

export function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const { user } = useAuth();

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

    navigate("/login");
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="grid place-items-center min-h-screen text-xl">
      <div className="flex flex-col items-center gap-8">
        <h1>Register</h1>

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
              placeholder="Username"
              required
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
              required
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
              placeholder="Password"
              required
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
              placeholder="Confirm Password"
              required
              {...form.register("passwordConfirmation")}
            />
          </div>

          <Button type="submit">Register</Button>

          <p className="text-sm">
            Already registered?{" "}
            <a href="/login" className="underline">
              login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
