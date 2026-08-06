"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@openzync/design-system";
import { contactTopics } from "@/content/contact";

const inputClass =
  "w-full rounded-lg bg-surface-900 border border-surface-800 px-3 py-2 text-sm text-text-primary placeholder:text-surface-600 focus:border-brand-500 focus:outline-none";
const labelClass =
  "block text-xs font-semibold uppercase tracking-widest text-surface-500 mb-1.5";
const errorClass = "text-sm text-red-400";

interface FormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    topic: contactTopics[0],
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const setField = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!values.message.trim()) nextErrors.message = "Please enter a message.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    const subject = `[${values.topic}] ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Topic: ${values.topic}`,
      "",
      values.message,
    ].join("\n");

    window.location.href = `mailto:hello@openzync.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder="Your name"
          className={inputClass}
        />
        {errors.name && (
          <p id="contact-name-error" className={`${errorClass} mt-1.5`}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setField("email")}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && (
          <p id="contact-email-error" className={`${errorClass} mt-1.5`}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-topic" className={labelClass}>
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          value={values.topic}
          onChange={setField("topic")}
          className={inputClass}
        >
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={setField("message")}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="How can we help?"
          className={inputClass}
        />
        {errors.message && (
          <p id="contact-message-error" className={`${errorClass} mt-1.5`}>
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" size="md" icon={<Send size={16} />}>
        Send Message
      </Button>
      <p className="text-xs text-surface-500">
        This opens your email app. If it doesn&apos;t, write to hello@openzync.tech
        directly.
      </p>
    </form>
  );
}
