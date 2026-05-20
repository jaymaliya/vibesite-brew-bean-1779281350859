"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    if (totalItems !== prevTotalRef.current) {
      setBadgeKey((k) => k + 1);
      prevTotalRef.current = totalItems;
    }
  }, [totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#2a170f",
    fontFamily: "'Source Sans 3', sans-serif",
    padding: "0.25rem 0",
    transition: "color 0.2s ease, opacity 0.2s ease",
  };

  const mobileLinkStyle: React.CSSProperties = {
    ...navLinkStyle,
    fontSize: "0.875rem",
    padding: "0.75rem 1.5rem",
    width: "100%",
    textAlign: "left" as const,
    borderBottom: "1px solid rgba(112, 87, 49, 0.08)",
    display: "block",
  };

  const iconBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    color: "#705731",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  const handleNavHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    (e.currentTarget as HTMLButtonElement).style.color = enter ? "#705731" : "#2a170f";
    (e.currentTarget as HTMLButtonElement).style.opacity = enter ? "0.85" : "1";
  };

  const handleIconHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    (e.currentTarget as HTMLButtonElement).style.opacity = enter ? "0.75" : "1";
    (e.currentTarget as HTMLButtonElement).style.transform = enter ? "scale(0.95)" : "scale(1)";
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 248, 246, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(112, 87, 49, 0.08)",
        transition: "box-shadow 0.3s ease",
        boxShadow: scrolled
          ? "0 2px 16px rgba(112, 87, 49, 0.1)"
          : "0 1px 3px rgba(112, 87, 49, 0.04)",
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Mobile hamburger */}
        <button
          aria-label="Open mobile menu"
          onClick={() => setMobileOpen((v) => !v)}
          onMouseEnter={(e) => handleIconHover(e, true)}
          onMouseLeave={(e) => handleIconHover(e, false)}
          style={{
            ...iconBtnStyle,
            display: "none",
          }}
          className="md-hidden-show"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#705731"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Brand Logo */}
        <button
          onClick={() => router.push("/")}
          aria-label="Brew Bean home"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#2a170f",
            letterSpacing: "-0.01em",
            padding: 0,
            lineHeight: 1,
          }}
        >
          Brew Bean
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          <button
            onClick={() => router.push("/shop")}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            style={navLinkStyle}
            aria-label="Go to Shop"
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/our-story")}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            style={navLinkStyle}
            aria-label="Go to Our Story"
          >
            Our Story
          </button>
          <button
            onClick={() => router.push("/brew-guides")}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            style={navLinkStyle}
            aria-label="Go to Brew Guides"
          >
            Brew Guides
          </button>
          <button
            onClick={() => router.push("/subscription")}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            style={navLinkStyle}
            aria-label="Go to Subscription"
          >
            Subscription
          </button>
        </nav>

        {/* Trailing Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            aria-label="Search"
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
            style={iconBtnStyle}
            className="desktop-only"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#705731"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            aria-label="Account"
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
            style={iconBtnStyle}
            className="desktop-only"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#705731"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <button
            aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            onClick={() => router.push("/cart")}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
            style={{ ...iconBtnStyle, position: "relative" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#705731"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                key={badgeKey}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  backgroundColor: "#c0392b",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  fontFamily: "'Source Sans 3', sans-serif",
                  animation: "badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "320px" : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "#fff8f6",
          borderTop: mobileOpen ? "1px solid rgba(112, 87, 49, 0.08)" : "none",
        }}
        className="mobile-menu"
      >
        <nav
          aria-label="Mobile navigation"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem 0",
          }}
        >
          <button
            onClick={() => { router.push("/shop"); setMobileOpen(false); }}
            style={mobileLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(112, 87, 49, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Shop
          </button>
          <button
            onClick={() => { router.push("/our-story"); setMobileOpen(false); }}
            style={mobileLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(112, 87, 49, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => { router.push("/brew-guides"); setMobileOpen(false); }}
            style={mobileLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(112, 87, 49, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Brew Guides
          </button>
          <button
            onClick={() => { router.push("/subscription"); setMobileOpen(false); }}
            style={{ ...mobileLinkStyle, borderBottom: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(112, 87, 49, 0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Subscription
          </button>
        </nav>
      </div>

      {/* Scoped CSS using Tailwind-friendly approach via className targeting */}
      <NavbarStyles />
    </header>
  );
}

function NavbarStyles() {
  return (
    <noscript />
  );
}