import AuthForm from "../_components/auth/AuthForm";

export const metadata = {
  title: "Create your account | Natours",
};

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center py-24 px-6 bg-slate-50 min-h-[80vh]">
      <div className="bg-white shadow-2xl rounded-2xl p-10 md:p-14 max-w-[32rem] w-full">
        <h2 className="text-3xl font-bold uppercase mb-10 text-slate-800 text-center md:text-left">
          Create your account
        </h2>
        {/* Render as a Signup Form */}
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
