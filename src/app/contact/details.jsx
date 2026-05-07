"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  RotateCcw,
} from "lucide-react";

const GithubIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.56 6.5-7.16 0-1.54-.53-2.8-1.5-3.8.15-.38.69-1.8-.15-3.8-1.2-.38-3.9 1.4-3.9 1.4-1.1-.3-2.3-.46-3.5-.46s-2.4.16-3.5.46c0 0-2.7-1.78-3.9-1.4-.84 2-.3 3.42-.15 3.8-1 1-1.5 2.26-1.5 3.8 0 5.6 3.32 6.81 6.5 7.16-.9.8-1.1 2.2-1.1 3.02V22" />
    <path d="M9 20c-4.2 1.4-5.6-1.4-5.6-1.4" />
  </svg>
);

const LinkedinIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import Image from "next/image";
import Loader from "@/components/Loader";
import { toast } from "sonner";

// --- Input Field ---
const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-foreground text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-card border border-black/5 dark:border-orange-500/10 text-foreground placeholder-muted focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300"
    />
  </div>
);

// --- TextArea Field ---
const TextAreaField = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-foreground text-sm font-medium">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={5}
      className="w-full px-4 py-3 rounded-xl bg-card border border-black/5 dark:border-orange-500/10 text-foreground placeholder-muted focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 resize-none"
    />
  </div>
);

// --- Contact Card ---
const ContactCard = ({ icon: Icon, title, value, href }) => {
  const content = (
    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-black/5 dark:border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-foreground font-semibold mb-1">{title}</h4>
        <p className="text-muted text-sm">{value}</p>
      </div>
    </div>
  );

  if (href)
    return (
      <a href={href} className="block">
        {content}
      </a>
    );

  return content;
};

// --- Social Button ---
const SocialButton = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
  >
    <Icon size={20} />
  </a>
);

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () =>
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = new FormData();
        const accessKey = "5b01e6cd-0933-4f60-90a6-d70803638afa";
        if (!accessKey) throw new Error("API Key is missing.");

        data.append("access_key", accessKey);
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("message", formData.message);
        data.append(
          "subject",
          `New Contact from ${formData.firstName} ${formData.lastName}`
        );

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
        });
        const res = await response.json();

        if (res.success) {
          handleReset();
          resolve(res);
        } else reject(new Error(res.message || "Failed to send message"));
      } catch (err) {
        reject(err);
      } finally {
        setSubmitting(false);
      }
    });

    toast.promise(promise, {
      loading: "Sending your message...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: (err) =>
        err.message || "Something went wrong. Please try again.",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background text-muted font-sans selection:bg-orange-500/30 py-20 px-6 md:px-20 mt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-col">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">Let's</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Connect
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted text-lg max-w-3xl mx-auto"
          >
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 order-1 lg:order-2 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Contact <span className="text-orange-400">Information</span>
            </h3>

            <div className="p-6 rounded-2xl bg-card border border-black/5 dark:border-orange-500/10 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500/50">
  <Image
    src="/dev.png"
    alt="Muhammad Hassan"
    fill
    className="object-cover object-[50%_15%]"
  />
</div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">
                    Muhammad Hassan
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-orange-400 text-xs font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <SocialButton
                  icon={LinkedinIcon}
                  href="https://www.linkedin.com/in/muhammad-hassan-a47b67251/"
                  label="LinkedIn"
                />
                <SocialButton
                  icon={GithubIcon}
                  href="https://github.com/HadssanK"
                  label="GitHub"
                />
                <SocialButton
                  icon={Mail}
                  href="mailto:hassantheDev945@gmail.com"
                  label="Email"
                />
              </div>

              <p className="text-muted text-sm leading-relaxed py-2">
                My inbox is always open. Whether you have a project or just want
                to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <ContactCard
                icon={Phone}
                title="Phone"
                value="(+92) 330 0273758"
                href="tel:+92330 0273758"
              />
              <ContactCard
                icon={Mail}
                title="Email"
                value="hassantheDev945@gmail.com"
                href="mailto:hassantheDev945@gmail.com"
              />
              <ContactCard icon={MapPin} title="Location" value="Pakistan" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="hidden md:block relative p-8 rounded-3xl bg-background shadow-[0_0_30px_rgba(255,140,0,0.5)]">
              <div className="p-8 md:p-10 rounded-3xl bg-card border border-black/5 dark:border-orange-500/10 shadow-[0_0_20px_rgba(255,140,0,1)]">
                <FormContent
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  submitting={submitting}
                  handleReset={handleReset}
                />
              </div>
            </div>

            <div className="block md:hidden p-6 rounded-3xl bg-card/95 shadow-[0_0_20px_rgba(255,140,0,0.5)]">
              <FormContent
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                submitting={submitting}
                handleReset={handleReset}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Form Content ---
const FormContent = ({
  formData,
  setFormData,
  handleSubmit,
  submitting,
  handleReset,
}) => (
  <>
    <div className="mb-8">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        Let's <span className="text-orange-400">Work Together</span>
      </h3>
      <div className="relative w-full overflow-hidden h-8 mb-6">
        <div className="flex w-max animate-form-marquee whitespace-nowrap text-muted text-lg">
          Hi, I'm Muhammad Hassan! Use the form below to connect for web development, UI/UX design, or consulting projects. Let's collaborate to build innovative solutions that truly make an impact!
        </div>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          placeholder="Hassan"
          value={formData.firstName}
          onChange={(value) =>
            setFormData({ ...formData, firstName: value })
          }
          required
        />
        <InputField
          label="Last Name"
          placeholder="Hameed"
          value={formData.lastName}
          onChange={(value) =>
            setFormData({ ...formData, lastName: value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Email Address"
          type="email"
          placeholder="Hassan@example.com"
          value={formData.email}
          onChange={(value) =>
            setFormData({ ...formData, email: value })
          }
          required
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+92 312 3456 789"
          value={formData.phone}
          onChange={(value) =>
            setFormData({ ...formData, phone: value })
          }
        />
      </div>

      <TextAreaField
        label="Your Message"
        placeholder="Type your message here..."
        value={formData.message}
        onChange={(value) =>
          setFormData({ ...formData, message: value })
        }
        required
      />

      <div className="flex flex-wrap gap-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send"}
          <Send
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold hover:bg-orange-500/30 transition-all duration-300"
        >
          Reset
          <RotateCcw
            size={18}
            className="group-hover:-rotate-180 transition-transform duration-500"
          />
        </button>
      </div>
    </form>
  </>
);