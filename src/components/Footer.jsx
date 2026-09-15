import React from "react";
import { Clock, Instagram, MapPin, Phone, Send, Stethoscope, Youtube } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import { scrollToId } from "../utils/scroll.js";

export default function Footer({ links = [] }) {
  const { content } = useContent();
  const site = content.site || {};
  const footer = content.footer || {};
  const courses = content.courses?.items || [];

  const socials = [
    { href: site.telegram, Icon: Send, label: "Telegram" },
    { href: site.instagram, Icon: Instagram, label: "Instagram" },
    { href: site.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-indigo-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center">
              <Stethoscope className="w-[18px] h-[18px] text-white" />
            </span>
            <span className="font-semibold text-lg text-white">{site.name}</span>
          </div>
          <p className="text-sm text-indigo-300 mt-4 leading-relaxed">{footer.about}</p>
          {socials.length > 0 && (
            <div className="flex gap-3 mt-5">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Menyu</h4>
          <div className="space-y-2.5">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                className="block text-sm text-indigo-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Yo'nalishlar</h4>
          <div className="space-y-2.5">
            {courses.slice(0, 5).map((c) => (
              <a
                key={c.id || c.title}
                href="#kurslar"
                onClick={(e) => { e.preventDefault(); scrollToId("kurslar"); }}
                className="block text-sm text-indigo-300 hover:text-white transition-colors"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Aloqa</h4>
          <div className="space-y-2.5 text-sm text-indigo-300">
            {[site.phone, site.phone2].filter(Boolean).map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {p}
              </a>
            ))}
            {site.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {site.address}
              </div>
            )}
            {site.hours && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" /> {site.hours}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/5 text-xs text-indigo-400">
        © {new Date().getFullYear()} {site.name}. {footer.copyright}
      </div>
    </footer>
  );
}
