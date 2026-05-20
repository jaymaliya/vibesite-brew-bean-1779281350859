"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  };

  const footerLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#4e453b",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "0.9375rem",
    padding: "0.25rem 0",
    display: "block",
    textAlign: "left" as const,
    transition: "color 0.2s ease",
    lineHeight: 1.6,
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    (e.currentTarget as HTMLButtonElement).style.color = enter ? "#705731" : "#4e453b";
  };

  const socialBtnStyle: React.CSSProperties = {
    background: "none",
    border: "1.5px solid rgba(112, 87, 49, 0.25)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
    color: "#705731",
  };

  const handleSocialHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.style.backgroundColor = enter ? "rgba(112, 87, 49, 0.08)" : "transparent";
    btn.style.borderColor = enter ? "rgba(112, 87, 49, 0.6)" : "rgba(112, 87, 49, 0.25)";
    btn.style.transform = enter ? "scale(1.08)" : "scale(1)";
  };

  return (
    <footer
      style={{
        backgroundColor: "#f2ebe3",
        borderTop: "1px solid rgba(112, 87, 49, 0.12)",
        fontFamily: "'Source Sans 3', sans-serif",
        color: "#2a170f",
      }}
    >
      {/* Main footer content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem 2.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "2.5rem",
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand */}
          <div style={{ maxWidth: "320px" }}>
            <button
              onClick={() => router.push("/")}
              aria-label="Brew Bean home"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.625rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#2a170f",
                padding: 0,
                marginBottom: "1rem",
                lineHeight: 1,
                display: "block",
              }}
            >
              Brew Bean
            </button>
            <p
              style={{
                color: "#4e453b",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Premium hand-roasted single-origin coffee from the rich estates of Coorg, Karnataka. Bold. Earthy. Purposeful.
            </p>

            {/* Provenance badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(112, 87, 49, 0.08)",
                border: "1px solid rgba(112, 87, 49, 0.15)",
                borderRadius: "999px",
                padding: "0.375rem 0.875rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#705731"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#705731",
                }}
              >
                Coorg, Karnataka
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#2a170f",
                marginBottom: "1.25rem",
                letterSpacing: "0.01em",
              }}
            >
              Explore
            </h3>
            <nav aria-label="Footer navigation">
              <button
                onClick={() => router.push("/")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Home
              </button>
              <button
                onClick={() => router.push("/shop")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Shop
              </button>
              <button
                onClick={() => router.push("/our-story")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Our Story
              </button>
              <button
                onClick={() => router.push("/brew-guides")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Brew Guides
              </button>
              <button
                onClick={() => router.push("/subscription")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Subscription
              </button>
              <button
                onClick={() => router.push("/contact")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#2a170f",
                marginBottom: "1.25rem",
                letterSpacing: "0.01em",
              }}
            >
              Support
            </h3>
            <nav aria-label="Support navigation">
              <button
                onClick={() => router.push("/faq")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                FAQ
              </button>
              <button
                onClick={() => router.push("/shipping")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Shipping & Returns
              </button>
              <button
                onClick={() => router.push("/track")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Track My Order
              </button>
              <button
                onClick={() => router.push("/privacy")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push("/terms")}
                style={footerLinkStyle}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Terms of Service
              </button>
            </nav>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#2a170f",
                marginBottom: "0.5rem",
                letterSpacing: "0.01em",
              }}
            >
              Stay in the Loop
            </h3>
            <p
              style={{
                color: "#4e453b",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                marginBottom: "1.25rem",
              }}
            >
              New roasts, brew tips, and harvest updates — straight to your inbox.
            </p>

            {subscribed ? (
              <div
                role="status"
                style={{
                  backgroundColor: "rgba(107, 142, 95, 0.12)",
                  border: "1px solid rgba(107, 142, 95, 0.3)",
                  borderRadius: "6px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B8E5F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span
                  style={{
                    color: "#3d5c35",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  You&apos;re subscribed — welcome to the community!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="your@email.com"
                      aria-label="Email address for newsletter"
                      style={{
                        flex: 1,
                        padding: "0.625rem 0.875rem",
                        fontSize: "0.9375rem",
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#2a170f",
                        backgroundColor: "#fff8f6",
                        border: "1.5px solid rgba(112, 87, 49, 0.25)",
                        borderRight: "none",
                        borderRadius: "4px 0 0 4px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                        minWidth: 0,
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "#705731";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(112, 87, 49, 0.25)";
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#705731",
                        color: "#ffffff",
                        border: "1.5px solid #705731",
                        borderRadius: "0 4px 4px 0",
                        padding: "0.625rem 1.125rem",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        fontFamily: "'Source Sans 3', sans-serif",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        cursor: "pointer",
                        whiteSpace: "nowrap" as const,
                        transition: "background-color 0.2s ease, transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5c4425";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#705731";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                      }}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
                      }}
                      onMouseUp={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                  {emailError && (
                    <p
                      role="alert"
                      style={{
                        color: "#c0392b",
                        fontSize: "0.8125rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              </form>
            )}

            {/* Social icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "#4e453b",
                  marginRight: "0.25rem",
                }}
              >
                Follow
              </span>

              {/* Instagram */}
              <button
                aria-label="Follow Brew Bean on Instagram"
                onClick={() => window.open("https://instagram.com", "_blank", "noopener,noreferrer")}
                style={socialBtnStyle}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#705731"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </button>

              {/* Twitter / X */}
              <button
                aria-label="Follow Brew Bean on Twitter"
                onClick={() => window.open("https://twitter.com", "_blank", "noopener,noreferrer")}
                style={socialBtnStyle}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#705731"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                aria-label="Chat with Brew Bean on WhatsApp"
                onClick={() => window.open("https://wa.me/919999999999", "_blank", "noopener,noreferrer")}
                style={socialBtnStyle}
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#705731"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div
        style={{
          borderTop: "1px solid rgba(112, 87, 49, 0.1)",
          backgroundColor: "rgba(112, 87, 49, 0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {[
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B8E5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              label: "100% Arabica",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B8E5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
              label: "Farmer-direct",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B8E5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              ),
              label: "Free shipping above ₹599",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B8E5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              ),
              label: "Roasted to order",
            },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#4e453b",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(112, 87, 49, 0.1)",
          backgroundColor: "#ede6db",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              color: "#4e453b",
              fontSize: "0.8125rem",
              margin: 0,
            }}
          >
            &copy; {currentYear} Brew Bean. All rights reserved. Made with care in India.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap" as const,
            }}
          >
            <button
              onClick={() => router.push("/privacy")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4e453b",
                fontSize: "0.8125rem",
                fontFamily: "'Source Sans 3', sans-serif",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#705731"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4e453b"; }}
            >
              Privacy
            </button>
            <button
              onClick={() => router.push("/terms")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4e453b",
                fontSize: "0.8125rem",
                fontFamily: "'Source Sans 3', sans-serif",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#705731"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4e453b"; }}
            >
              Terms
            </button>
            {/* Razorpay trust badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                backgroundColor: "rgba(112, 87, 49, 0.06)",
                border: "1px solid rgba(112, 87, 49, 0.15)",
                borderRadius: "4px",
                padding: "0.25rem 0.625rem",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#705731"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: "#705731",
                }}
              >
                Secured by Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>

      <FooterGridStyles />
    </footer>
  );
}

function FooterGridStyles() {
  return <noscript />;
}