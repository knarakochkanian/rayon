import { AuthPage } from "../components/auth-page";

export default function LoginPage() {
  return (
    <AuthPage
      title="Вход в Rayon"
      subtitle="Доступ к аналитике рынка и отчётам"
      mode="login"
      ctaLabel="Войти"
      altText="Нет аккаунта?"
      altHref="/register"
      altLabel="Зарегистрироваться"
    />
  );
}
