"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Botón flotante de WhatsApp, solo mobile (<768px), aparece después de
 * scrollear más allá del hero.
 */
export default function MobileWhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getThreshold = () =>
      (document.getElementById("inicio")?.offsetHeight ?? window.innerHeight) * 0.6;

    let threshold = getThreshold();
    const onResize = () => {
      threshold = getThreshold();
    };
    const onScroll = () => setVisible(window.scrollY > threshold);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
