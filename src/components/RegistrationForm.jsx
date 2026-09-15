import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import { submitApplication } from "../utils/api.js";
import Reveal from "./Reveal.jsx";

const UZ_PHONE_RE = /^\+998\d{9}$/;

const INITIAL_FORM = {
  name: "", phone: "", age: "", course: "", level: "", branch: "", time: "", comment: "",
};

function fieldClass(hasError) {
  return `mt-1.5 w-full rounded-xl border px-4 py-3 text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
      : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400"
  }`;
}
const labelClass = "text-sm font-medium text-slate-600";
const errorClass = "text-xs text-red-500 mt-1.5";

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const phone = form.phone.replace(/\s+/g, "");
  const age = Number(form.age);

  if (name.length < 2) errors.name = "Ism va familiyangizni kiriting";
  if (!UZ_PHONE_RE.test(phone)) errors.phone = "Telefon raqamingizni to'g'ri kiriting";
  if (!form.age || Number.isNaN(age) || age < 5 || age > 90) errors.age = "Yoshingizni to'g'ri kiriting";
  if (!form.course) errors.course = "Yo'nalishni tanlang";
  if (!form.level) errors.level = "Darajani tanlang";
  if (!form.branch) errors.branch = "Filialni tanlang";
  if (!form.time) errors.time = "Qulay vaqtni tanlang";

  return errors;
}

export default function RegistrationForm({ prefill, onSuccess }) {
  const { content } = useContent();
  const data = content.form || {};
  const courses = content.courses?.items || [];
  const branches = content.branches?.items || [];
  const levels = data.levels || [];
  const times = data.times || [];

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const submittingRef = useRef(false);

  useEffect(() => {
    if (prefill) setForm((f) => ({ ...f, ...prefill }));
  }, [prefill]);

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er));
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (submittingRef.current) return;

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      await submitApplication({
        fullName: form.name.trim(),
        phone: form.phone.replace(/\s+/g, ""),
        age: Number(form.age),
        course: form.course,
        level: form.level,
        branch: form.branch,
        preferredTime: form.time,
        message: form.comment.trim(),
      });
      setForm(INITIAL_FORM);
      setErrors({});
      onSuccess();
    } catch (err) {
      if (err.fieldErrors) {
        const map = { fullName: "name", phone: "phone", age: "age", course: "course", level: "level", branch: "branch", preferredTime: "time" };
        const mapped = {};
        Object.entries(err.fieldErrors).forEach(([k, v]) => { if (map[k]) mapped[map[k]] = v; });
        setErrors(mapped);
      } else {
        setServerError("Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section id="aloqa" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">{data.title}</h2>
          {data.subtitle && <p className="text-slate-500 mt-3">{data.subtitle}</p>}
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} noValidate className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Ism va familiya</label>
                <input value={form.name} onChange={setField("name")} className={fieldClass(errors.name)} placeholder="Ism familiya" aria-invalid={!!errors.name} />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Telefon</label>
                <input value={form.phone} onChange={setField("phone")} className={fieldClass(errors.phone)} placeholder="+998 90 123 45 67" inputMode="tel" aria-invalid={!!errors.phone} />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>

              <div>
                <label className={labelClass}>Yosh</label>
                <input type="number" value={form.age} onChange={setField("age")} className={fieldClass(errors.age)} placeholder="17" aria-invalid={!!errors.age} />
                {errors.age && <p className={errorClass}>{errors.age}</p>}
              </div>

              <div>
                <label className={labelClass}>Yo'nalish</label>
                <select value={form.course} onChange={setField("course")} className={fieldClass(errors.course)} aria-invalid={!!errors.course}>
                  <option value="">Tanlang...</option>
                  {courses.map((c) => <option key={c.id || c.title} value={c.title}>{c.title}</option>)}
                </select>
                {errors.course && <p className={errorClass}>{errors.course}</p>}
              </div>

              <div>
                <label className={labelClass}>Daraja</label>
                <select value={form.level} onChange={setField("level")} className={fieldClass(errors.level)} aria-invalid={!!errors.level}>
                  <option value="">Tanlang...</option>
                  {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.level && <p className={errorClass}>{errors.level}</p>}
              </div>

              <div>
                <label className={labelClass}>Filial</label>
                <select value={form.branch} onChange={setField("branch")} className={fieldClass(errors.branch)} aria-invalid={!!errors.branch}>
                  <option value="">Tanlang...</option>
                  {branches.map((b) => <option key={b.id || b.name} value={b.name}>{b.name}</option>)}
                </select>
                {errors.branch && <p className={errorClass}>{errors.branch}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Qulay vaqt</label>
                <select value={form.time} onChange={setField("time")} className={fieldClass(errors.time)} aria-invalid={!!errors.time}>
                  <option value="">Tanlang...</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className={errorClass}>{errors.time}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Izoh</label>
                <textarea value={form.comment} onChange={setField("comment")} rows={3} className={fieldClass(false)} placeholder="Qo'shimcha ma'lumot (ixtiyoriy)" />
              </div>
            </div>

            {serverError && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold py-3.5 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Yuborilmoqda...</>) : (<>Arizani yuborish <ArrowRight className="w-4 h-4" /></>)}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
