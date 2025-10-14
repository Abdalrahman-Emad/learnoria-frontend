import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  // ✅ cookies لازم await
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (token) {
    // ✅ مستخدم مسجل دخول → Redirect فوري
    redirect("/");
  }

  // ✅ مستخدم مش مسجل دخول → عرض الفورم
  return <LoginForm />;
}
