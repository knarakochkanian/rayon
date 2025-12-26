"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/auth/store";
import type { AuthSuccessResponse } from "@/lib/auth/types";

type AuthFormProps = {
  mode: "login" | "register";
  ctaLabel: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse =
  | AuthSuccessResponse
  | { error: string; details?: unknown };

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        className="input-shell w-full bg-white"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}

export function AuthForm({ mode, ctaLabel }: AuthFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isRegister = mode === "register";

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (isRegister && form.password !== form.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? {
            email: form.email,
            password: form.password,
            password2: form.confirmPassword || form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
          }
        : {
            email: form.email,
            password: form.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        const apiError =
          "error" in data && typeof data.error === "string"
            ? data.error
            : "Не удалось выполнить запрос";
        throw new Error(apiError);
      }

      setSuccess(isRegister ? "Успешная регистрация" : "Готово, заходим");
      setUser("user" in data ? data.user : null);

      const next = searchParams.get("next");
      router.push(next || "/");
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить форму";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      {isRegister && (
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Имя"
            placeholder="Иван"
            value={form.firstName}
            onChange={(value) => updateField("firstName", value)}
          />
          <InputField
            label="Фамилия"
            placeholder="Иванов"
            value={form.lastName}
            onChange={(value) => updateField("lastName", value)}
          />
          <InputField
            label="Телефон"
            type="tel"
            placeholder="+79991234567"
            value={form.phone}
            onChange={(value) => updateField("phone", value)}
            required={false}
          />
        </div>
      )}

      <InputField
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(value) => updateField("email", value)}
      />
      <InputField
        label="Пароль"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(value) => updateField("password", value)}
      />
      {isRegister && (
        <InputField
          label="Повторите пароль"
          type="password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
        />
      )}

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправляем..." : ctaLabel}
      </button>
    </form>
  );
}
