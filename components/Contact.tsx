"use client";

import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export function Contact() {
  const contactInfo = {
    name: "Manar Saadi",
    email: "manarsaadi187@gmail.com",
    phone: "+972 52-257-1151",
    handle: "@Manar.Saadi",
    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/manar-saadi-b0357720b/",
        icon: <Linkedin className="h-4 w-4" />,
      },
      {
        name: "GitHub",
        url: "https://github.com/saadimanar",
        icon: <Github className="h-4 w-4" />,
      },
    ],
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 px-4">
      <div className="rounded-2xl bg-accent/40 p-6 shadow-md backdrop-blur-sm">
        {/* Header with name and handle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
          <span className="text-sm text-muted-foreground">
            {contactInfo.handle}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Let’s connect via email, phone, or socials.
        </p>

        <div className="space-y-4 text-sm">
          {/* Email */}
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {contactInfo.email}
          </a>

          {/* Phone */}
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {contactInfo.phone}
          </a>

          {/* Social Links */}
          <div className="flex gap-5 pt-2">
            {contactInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                title={social.name}
              >
                {social.icon}
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
