"use client";

import { useRef, useState } from "react";

export function ContactActions() {
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setExpanded(false);
    buttonRef.current?.focus();
  }

  return (
    <div
      className="contact-actions"
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) closeMenu();
      }}
    >
      {expanded && (
        <div id="contact-actions-menu" className="contact-actions__menu" role="group" aria-label="Contact options">
          <a href="https://wa.me/19565433188" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="tel:+19565433188">Call</a>
          <a href="sms:+19565433188">Text</a>
        </div>
      )}
      <button
        ref={buttonRef}
        className="contact-actions__toggle"
        type="button"
        aria-label="Contact Sound Factory"
        aria-expanded={expanded}
        aria-controls="contact-actions-menu"
        onClick={() => setExpanded((isExpanded) => !isExpanded)}
      >
        Contact <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
