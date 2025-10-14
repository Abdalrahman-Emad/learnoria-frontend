import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import RegisterForm from "@/components/auth/RegisterForm";

export default async function RegisterPage() {
  // ✅ جلب الكوكيز بشكل async
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (token) {
    redirect("/");
  }

  return <RegisterForm />;
}
