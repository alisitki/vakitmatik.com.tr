"use client";

import { FormEvent, useState } from "react";
import { LockIcon } from "./icons";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    const payload = (await response.json()) as {
      ok?: boolean;
      next?: string;
      error?: string;
    };

    setLoading(false);

    if (!response.ok || !payload.ok) {
      setError(payload.error || "Giriş yapılamadı.");
      return;
    }

    window.location.assign(payload.next || "/dashboard");
  }

  return (
    <form action="/api/login" className="loginForm" method="post" onSubmit={onSubmit}>
      <label>
        <span>Kullanıcı adı</span>
        <input autoComplete="username" name="username" required type="text" />
      </label>
      <label>
        <span>Şifre</span>
        <input autoComplete="current-password" name="password" required type="password" />
      </label>
      {error ? <p className="formError">{error}</p> : null}
      <button disabled={loading} type="submit">
        <LockIcon />
        <span>{loading ? "Kontrol ediliyor" : "Giriş yap"}</span>
      </button>
    </form>
  );
}
