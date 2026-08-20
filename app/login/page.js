import LoginForm from "../_components/auth/LoginForm";

export const metadata = {
  title: "Log into your account | Natours",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center py-24 px-6 bg-slate-50 min-h-[80vh]">
      <div className="bg-white shadow-2xl rounded-2xl p-10 md:p-14 max-w-[32rem] w-full">
        <h2 className="text-3xl font-bold uppercase mb-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 text-center md:text-left">
          Log into your account
        </h2>

        <LoginForm />
      </div>
    </main>
  );
}
