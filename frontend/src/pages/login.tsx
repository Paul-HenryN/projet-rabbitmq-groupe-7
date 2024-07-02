import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/input";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import useAuth from "../hooks/useAuth";
import { User } from "../types/user";
import { Navigate, useNavigate } from "react-router-dom";
import { axios } from "../lib/axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    const response = await axios.post<User>("/login", {
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
        <h1>Login</h1>
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
            placeholder="Password"
            {...form.register("password")}
            required
          />
          <Button type="submit">Login</Button>
          <p className="text-sm">
            Not registered?{" "}
            <a href="/signup" className="underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
