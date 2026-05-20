"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect, Suspense } from "react";

export default function BrewBeanHome() {
  const router = useRouter();
  const { addItem } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const products = [
    {
      id: "single-origin-1",
      name: "Brew Bean Hand-Roasted Single Origin Coffee",
      price: 650,
      description:
        "Notes of dark chocolate, toasted hazelnut, and a hint of wild berry. Cultivated at 1800m.",
      badge: "Single Origin",
      badgeColor: "#4a7c59",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBYyPzs0PsGjayQIXfs8v11Swuy4XY4IRWceDnUnmLfM9BufVIFrI_VLDIt2c2eIZ4fUAFyeim9uE5KDV-Z-UJYDLqeB1ddfMcN1_7J8_EjESSHuWQ4fJKCnSJRFisdyxJhhfOzZadfG2cVsXEsuCXBz4a7S5qfcH59KpVbLmnELOnjWgPRPGSLh-9OY6oWicNYE9DvOKaDPrWuhtasDQishGnyntmjw7kdzoX10RAUqltDOhMEx3cTN4IsFwpsgUxgNBDlCLsh",
    },
    {
      id: "artisan-blend-1",
      name: "The Artisan's Reserve House Blend",
      price: 550,
      description:
        "A meticulously balanced daily drinker with a smooth caramel body and subtle citrus acidity.",
      badge: "Signature Blend",
      badgeColor: "#705731",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_FMUmhV6M4A8V8HDLv8h69rhDCbigSXfwf5XevG5zg5lsj4zaqvALgFWWT8nkje1SBYCmnsti7Nxn_CI9R-ZpFhyPEYnVWi-jDh1WRXK-zyVjbFBM4sqPf3O10cjWPYgzExU9aTNUvZU9M3dczwKclzatBegf8zeGr_hny6cVLWMuCOERHrFBr9Mp84eYSVAxYzbNJQYDXgH8tCCWIDcBUTMA0ZQuzmKQtV7o8SuFfXLCfNwTcLFDmoTEpBzLC6YL6OsDyZhEBX4p",
    },
  ];

  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Lato:wght@300;400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Lato', sans-serif;
          background-color: #fdf8f3;
          color: #1c1008;
        }

        .page-enter {
          animation: fadeInPage 0.6s ease forwards;
        }

        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .is-hidden {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }

        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .reveal {
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }

        .btn-lift {
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-lift:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(44,24,16,0.18);
        }
        .btn-lift:active {
          transform: scale(0.98);
        }

        .card-hover {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(44,24,16,0.12);
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nav-link {
          font-family: 'Lato', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b5744;
          transition: color 0.3s ease, opacity 0.3s ease;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #705731;
          opacity: 0.8;
        }

        .story-img:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .cta-title { font-size: 2.4rem; }
        }
      `}</style>

      <div className="page-enter" style={{ background: "#fdf8f3", minHeight: "100vh" }}>
        {/* Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />

        {/* ── TOP NAV ── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 50,
            background: "rgba(253,248,243,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 1px 4px rgba(112,87,49,0.05)",
            borderBottom: "1px solid rgba(247,242,237,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
              padding: "0 24px",
              maxWidth: "1280px",
              margin: "0 auto",
            }}
          >
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                color: "#705731",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => router.push("/")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#1c1008",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Brew Bean
            </button>

            {/* Desktop Nav Links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
              className="desktop-nav"
            >
              <button
                onClick={() => router.push("/shop")}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Shop
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Our Story
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Brew Guides
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Subscription
              </button>
            </div>

            {/* Trailing Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#705731" }}>
              <button
                aria-label="Search"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#705731",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
              <button
                aria-label="Account"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#705731",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                <span className="material-symbols-outlined">person</span>
              </button>
              <button
                aria-label="Cart"
                onClick={() => router.push("/checkout")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#705731",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div
              style={{
                background: "#fdf8f3",
                borderTop: "1px solid rgba(112,87,49,0.1)",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <button onClick={() => { router.push("/shop"); setMobileMenuOpen(false); }} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>Shop</button>
              <button onClick={() => { router.push("/shop"); setMobileMenuOpen(false); }} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>Our Story</button>
              <button onClick={() => { router.push("/shop"); setMobileMenuOpen(false); }} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>Brew Guides</button>
              <button onClick={() => { router.push("/shop"); setMobileMenuOpen(false); }} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>Subscription</button>
            </div>
          )}
        </nav>

        <main>
          {/* ── HERO SECTION ── */}
          <section
            className="reveal"
            style={{
              position: "relative",
              width: "100%",
              height: "100vh",
              minHeight: "600px",
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "80px",
              paddingLeft: "24px",
              paddingRight: "24px",
              overflow: "hidden",
            }}
          >
            {/* Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <img
                alt="Hero Background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB05brTYwL32SXBhXw-_dGmGhIf65xhA7TSw2OEYTXFf9D1Pt3XT6T7AcXqC9Ya4xt2DywqvPiPyhgT5Wqg4BcfeK0_PbPQehkz440FQVFoHCbLO9GotfpPEKsYOYG5AOFafPxHrZ3I59B0j2Y8O7S66najfDb70GwnMyevpZU7yBhLwnSWCAA6Ya-1f6gIE9DoIJVnnxl5pkXDxDd8_S3TpuRPbxq2WdFGJ7b3Bggy28o37rOQxm9xdCNbHGowz8UcXnqVuJomu28J"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.25)",
                }}
              />
              {/* Grain overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: grainSvg,
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />
            </div>

            {/* Content */}
            <div
              className="hero-content"
              style={{
                position: "relative",
                zIndex: 20,
                width: "100%",
                maxWidth: "1280px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "32px",
              }}
            >
              {/* Left: Headline + CTA */}
              <div style={{ maxWidth: "672px", color: "#fdf8f3" }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginBottom: "24px",
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                    color: "#fdf8f3",
                  }}
                >
                  Brew Bean:
                  <br />
                  Rooted in Origin.
                  <br />
                  Crafted with Purpose.
                </h1>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "1.125rem",
                    lineHeight: 1.6,
                    marginBottom: "32px",
                    maxWidth: "540px",
                    opacity: 0.9,
                    textShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    color: "#fdf8f3",
                  }}
                >
                  Experience the bold earthy flavour of our single-origin roast.
                </p>
                <button
                  className="btn-lift"
                  onClick={() => router.push("/shop")}
                  style={{
                    display: "inline-block",
                    background: "#705731",
                    color: "#fdf8f3",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    padding: "16px 32px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(44,24,16,0.15)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(112,87,49,0.9)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#705731";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  Shop Now
                </button>
              </div>

              {/* Right: Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(247,242,237,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(247,242,237,0.2)",
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  color: "#fdf8f3",
                  flexShrink: 0,
                }}
                className="hero-badge"
              >
                <span
                  className="material-symbols-outlined filled"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    color: "#c49a6c",
                    fontSize: "20px",
                  }}
                >
                  location_on
                </span>
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Made in India
                </span>
              </div>
            </div>
          </section>

          {/* ── CRAFT / ORIGIN STORY ── */}
          <section
            className="reveal"
            style={{
              padding: "96px 24px",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: "24px",
                  alignItems: "center",
                }}
                className="story-grid"
              >
                {/* Left: Editorial Photo (7 cols) */}
                <div
                  className="story-img"
                  style={{
                    gridColumn: "span 7",
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(44,24,16,0.08)",
                  }}
                >
                  <div style={{ aspectRatio: "4/5", position: "relative", overflow: "hidden" }}>
                    <img
                      alt="Coffee Roasting Process"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuALckLnJ_bXDYotQVjW1AyaLRRosw5MNZVGCZ2BNtUp9TR3cfFn18UTQGsQXJYdkIToiTwbN8uhpGJ0YS0oRo87R7fw8G-K9UBz3zKuxuMc3LZTCfu2hw_RjyxJk77-HcEpk4bou_YFbh_-hevBLkD_fceZJ5tqVmA7hZDqBYfGlox6tUjpg0U2LVtjPgXINWQOzwrensTD6l5eVvdiuxyRE-uw4qk42E7KE8x9k8iJw8z1z2YjaonCGEMZBKd-WQ6WNdSDDJ3JqEZ8"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 700ms ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(112,87,49,0.05)",
                        transition: "background 500ms ease",
                      }}
                    />
                  </div>
                </div>

                {/* Right: Manifesto Text (5 cols) */}
                <div
                  style={{
                    gridColumn: "span 5",
                    background: "#f7f2ed",
                    padding: "48px",
                    borderRadius: "16px",
                    marginLeft: "-48px",
                    position: "relative",
                    zIndex: 10,
                    boxShadow: "0 4px 20px rgba(44,24,16,0.05)",
                    border: "1px solid rgba(112,87,49,0.1)",
                  }}
                  className="story-text"
                >
                  {/* Label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ height: "1px", width: "48px", background: "#705731" }} />
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#705731",
                      }}
                    >
                      The Process
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                      fontWeight: 700,
                      color: "#1c1008",
                      marginBottom: "24px",
                      lineHeight: 1.2,
                    }}
                  >
                    Our Story:
                    <br />
                    From Bean to Brew
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "#6b5744", fontFamily: "'Lato', sans-serif", fontSize: "1rem", lineHeight: 1.6 }}>
                    <p>
                      Every cup begins with a seed, nurtured in the rich soils of high-altitude estates. We partner directly with farmers who share our obsessive dedication to quality and sustainable practices.
                    </p>
                    <p>
                      Our roasting process is a delicate balance of art and science, designed to coax out the unique terroir of each batch. We don't mask the flavor; we reveal it.
                    </p>
                  </div>

                  <button
                    onClick={() => router.push("/shop")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "32px",
                      color: "#705731",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(112,87,49,0.75)";
                      const arrow = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
                      if (arrow) arrow.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#705731";
                      const arrow = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
                      if (arrow) arrow.style.transform = "translateX(0)";
                    }}
                  >
                    Read the full manifesto
                    <span
                      className="material-symbols-outlined arrow-icon"
                      style={{ transition: "transform 0.3s ease", fontSize: "20px" }}
                    >
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── PRODUCT SHOWCASE ── */}
          <section
            className="reveal"
            style={{
              padding: "96px 24px",
              background: "#f0ebe4",
            }}
          >
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "64px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#705731",
                      marginBottom: "16px",
                    }}
                  >
                    Signature Collection
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                      fontWeight: 700,
                      color: "#1c1008",
                    }}
                  >
                    Curated Roasts
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/shop")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#6b5744",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#705731";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6b5744";
                  }}
                  className="view-all-btn"
                >
                  View all coffees
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
                </button>
              </div>

              {/* Product Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }}
                className="products-grid"
              >
                {products.map((product, idx) => (
                  <div
                    key={product.id}
                    className="card-hover"
                    style={{
                      background: "#f7f2ed",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() =>
                      router.push(
                        "/product?name=" +
                          encodeURIComponent(product.name) +
                          "&price=" +
                          product.price +
                          "&img=" +
                          encodeURIComponent(product.image)
                      )
                    }
                  >
                    {/* Card Image */}
                    <div
                      style={{
                        aspectRatio: "3/2",
                        position: "relative",
                        overflow: "hidden",
                        background: "#e8e0d5",
                      }}
                    >
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          transition: "transform 700ms ease",
                          transform: hoveredCard === idx ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      {/* Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          background: product.badgeColor,
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "9999px",
                          fontFamily: "'Lato', sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        {product.badge}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div
                      style={{
                        padding: "32px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "240px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "#1c1008",
                            marginBottom: "8px",
                            lineHeight: 1.3,
                          }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="line-clamp-2"
                          style={{
                            fontFamily: "'Lato', sans-serif",
                            fontSize: "0.9rem",
                            color: "#6b5744",
                            lineHeight: 1.5,
                          }}
                        >
                          {product.description}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "auto",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "#4a7c59",
                          }}
                        >
                          ₹ {product.price}
                        </span>
                        <button
                          className="btn-lift"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              "/product?name=" +
                                encodeURIComponent(product.name) +
                                "&price=" +
                                product.price +
                                "&img=" +
                                encodeURIComponent(product.image)
                            );
                          }}
                          style={{
                            background: "#c49a6c",
                            color: "#fdf8f3",
                            fontFamily: "'Lato', sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            padding: "10px 24px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.3s ease, transform 0.25s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,154,108,0.85)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#c49a6c";
                          }}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section
            className="reveal"
            style={{
              padding: "96px 24px",
              background: "#fdf8f3",
            }}
          >
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div
                style={{
                  background: "#705731",
                  borderRadius: "16px",
                  padding: "80px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(112,87,49,0.2)",
                }}
              >
                {/* Subtle radial background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    mixBlendMode: "overlay",
                    background: "radial-gradient(circle at center, white, transparent)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    maxWidth: "672px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="material-symbols-outlined filled"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                      color: "#fdf8f3",
                      fontSize: "48px",
                      marginBottom: "24px",
                      opacity: 0.8,
                    }}
                  >
                    local_cafe
                  </span>

                  <h2
                    className="cta-title"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(2.4rem, 4vw, 4.8rem)",
                      fontWeight: 700,
                      color: "#fdf8f3",
                      marginBottom: "32px",
                      lineHeight: 1.15,
                    }}
                  >
                    Elevate Your Coffee Experience
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "1.125rem",
                      lineHeight: 1.6,
                      color: "rgba(253,248,243,0.9)",
                      marginBottom: "40px",
                      maxWidth: "540px",
                    }}
                  >
                    Join our community of coffee enthusiasts. Subscribe to receive freshly roasted beans delivered directly to your door, perfectly timed for your daily ritual.
                  </p>

                  <button
                    className="btn-lift"
                    onClick={() => router.push("/shop")}
                    style={{
                      display: "inline-block",
                      background: "#fdf8f3",
                      color: "#705731",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      padding: "16px 40px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      transition: "background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#fdf8f3";
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    Explore Our Coffees
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer
          style={{
            width: "100%",
            padding: "64px 24px",
            background: "#ede8e1",
            color: "#1c1008",
            fontFamily: "'Lato', sans-serif",
            fontSize: "1rem",
            borderTop: "1px solid rgba(112,87,49,0.1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 8fr",
              gap: "24px",
              maxWidth: "1280px",
              margin: "0 auto",
            }}
            className="footer-grid"
          >
            {/* Brand & Copyright */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#705731",
                }}
              >
                Brew Bean
              </span>
              <p style={{ color: "#6b5744", fontSize: "0.9rem" }}>
                © 2024 Brew Bean. Crafted for the Daily Ritual.
              </p>
            </div>

            {/* Nav Links */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px 32px",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
              className="footer-links"
            >
              {[
                { label: "Shipping Policy", path: "/shop" },
                { label: "Terms of Service", path: "/shop" },
                { label: "Wholesale", path: "/shop" },
                { label: "Contact Us", path: "/shop" },
                { label: "Sustainability", path: "/shop" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => router.push(link.path)}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem",
                    color: "#6b5744",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    padding: 0,
                    outline: "none",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#705731";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6b5744";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </footer>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .mobile-menu-btn { display: flex !important; }
            .desktop-nav { display: none !important; }
            .hero-badge { display: none !important; }
            .story-grid { grid-template-columns: 1fr !important; }
            .story-grid > div:first-child { grid-column: span 1 !important; }
            .story-grid > div:last-child { grid-column: span 1 !important; margin-left: 0 !important; margin-top: 32px; }
            .products-grid { grid-template-columns: 1fr !important; }
            .footer-grid { grid-template-columns: 1fr !important; }
            .footer-links { justify-content: flex-start !important; margin-top: 32px; }
            .view-all-btn { display: none !important; }
          }
          @media (min-width: 769px) {
            .mobile-menu-btn { display: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}