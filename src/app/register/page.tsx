import { AuthPage } from "../components/auth-page";

export default function RegisterPage() {
  return (
    <AuthPage
      title="Регистрация в Rayon"
      subtitle="Создайте аккаунт и получите доступ к холодной аналитике"
      mode="register"
      ctaLabel="Создать аккаунт"
      altText="Уже с нами?"
      altHref="/login"
      altLabel="Войти"
    />
  );
}
