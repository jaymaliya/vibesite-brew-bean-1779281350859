"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

const products = [
  {
    id: "brew-bean-hand-roasted",
    name: "Brew Bean Hand-Roasted",
    price: 650,
    description: "Notes of dark chocolate, toasted hazelnut, and a hint of wild berry. Cultivated in the lush hills of Coorg.",
    badge: "Single Origin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhbiVVCZNFFnGotogo8W8NERVuBvpJXmVj43Olg-wlDVc8h6CuH2xZ4BEkGJA160KZkniKOKrNQH0d9TYNpKQ59ssmIqEKS3CYmBSj7eFBueXgEF7qX0vPpdRV4Udsd7DiUh09a2Sl9iVQPg4FhNG_Su-gNenM6qMa9FVrx0OcJedKNaHOYcnQ3USiQjkAsnb_QX9LBiPlPMFlfDTH9v_Xsi2dI8LSVc3qLFLNmkI2ZbVcM124Y_pjSYbWepzmlE651Ry6qc3Hc42v",
    buttonStyle: "solid",
    offsetMd: false,
  },
  {
    id: "monsoon-malabar-blend",
    name: "Monsoon Malabar Blend",
    price: 720,
    description: "A unique process creating a heavy-bodied brew with earthy nuances and an incredibly smooth, low-acidity finish.",
    badge: "New Arrival",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCETy5aibkRsf-0rjeEK0cfgq1vf8ep37qzWaioIPsqZrqEffJdwawicqsZb_gmcxJIX5_g-r7fhdLfgO8KxQH0vi0sSlSsK2ShFXoSdTv-kEUJdUXGqWvtYsVgj8zkWiezmBVLNaN484xPc7750hM6bcM3uQhGyc1a66Wv2KIYIx2k6xpVERMwnUPiyfGRzSo-vip7saN5IPBbO1sF_qfLlixM2sGOgCLxGc30TRTo_HQFC0BfV0Oif7HoMk6zaqq31tKMiHvMFfsk",
    buttonStyle: "ghost",
    offsetMd: true,
  },
];

const noiseBgStyle = {
  backgroundImage:
    "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
  backgroundRepeat: "repeat",
  backgroundSize: "200px 200px",
};

function ShopPageInner() {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeBagSize, setActiveBagSize] = useState<string>("");
  const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);

  const filterOptions = ["Roast Level", "Flavor Profile"];
  const bagSizes = ["250g", "500g", "1kg"];

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleAddToCart = (p: typeof products[0]) => {
    addItem({
      id: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.img,
    });
    setAddedStates((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const handleCardClick = (p: typeof products[0]) => {
    router.push(
      `/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`
    );
  };

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

  return (
    <div
      style={{
        background: "#faf6f1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .is-hidden { opacity: 0; transform: translateY(28px); }
        .visible { opacity: 1; transform: translateY(0); transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1); }

        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 8px 20px rgba(44,24,16,0.18); }
        .btn-lift:active { transform: scale(0.98); }

        .card-hover {
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }
        .card-hover:hover {
          box-shadow: 0 12px 24px rgba(44, 24, 16, 0.12);
          transform: translateY(-4px);
        }

        .editorial-shadow {
          box-shadow: 0 4px 12px rgba(44, 24, 16, 0.08);
        }
      `}</style>

      {/* Top Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(250,246,241,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 4px rgba(212,165,116,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
            padding: "0 96px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Brand */}
          <div
            onClick={() => router.push("/")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontStyle: "italic",
              fontWeight: 600,
              color: "#2c1810",
              cursor: "pointer",
            }}
          >
            Brew Bean
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[
              { label: "Shop", href: "/shop", active: true },
              { label: "Our Story", href: "/story", active: false },
              { label: "Brew Guides", href: "/guides", active: false },
              { label: "Subscription", href: "/subscription", active: false },
            ].map((link) => (
              <a
                key={link.label}
                onClick={() => router.push(link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: link.active ? "#D4A574" : "#7a6a5a",
                  borderBottom: link.active ? "2px solid #D4A574" : "2px solid transparent",
                  paddingBottom: "4px",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.3s, opacity 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!link.active) (e.target as HTMLElement).style.color = "#D4A574";
                }}
                onMouseLeave={(e) => {
                  if (!link.active) (e.target as HTMLElement).style.color = "#7a6a5a";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", gap: "1.5rem", color: "#D4A574" }}>
            <a
              aria-label="shopping_bag"
              onClick={() => router.push("/checkout")}
              style={{ cursor: "pointer", transition: "opacity 0.3s", color: "#D4A574" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>
                shopping_bag
              </span>
            </a>
            <a
              aria-label="person"
              onClick={() => router.push("/account")}
              style={{ cursor: "pointer", transition: "opacity 0.3s", color: "#D4A574" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>
                person
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Trust Strip */}
      <div
        style={{
          marginTop: "80px",
          background: "#D4A574",
          color: "#fff",
          textAlign: "center",
          padding: "10px 24px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          letterSpacing: "0.05em",
          fontWeight: 500,
        }}
      >
        ★★★★★ 4.8 &nbsp;|&nbsp; 10,000+ customers &nbsp;|&nbsp; Free Shipping &nbsp;|&nbsp; Made in India
      </div>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 96px 80px",
        }}
      >
        {/* Header Section */}
        <section
          className="reveal"
          style={{
            paddingTop: "80px",
            paddingBottom: "40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
              lineHeight: 1.1,
              color: "#2c1810",
              marginBottom: "1.5rem",
              fontWeight: 700,
            }}
          >
            Our Collection
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              color: "#7a6a5a",
              maxWidth: "42rem",
              margin: "0 auto",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            Taste the richness of authentic Indian coffee.
          </p>
        </section>

        {/* Filters Section */}
        <section
          className="reveal"
          style={{
            marginBottom: "64px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className="btn-lift"
              style={{
                background: activeFilters.includes(f) ? "#b8895a" : "#D4A574",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                padding: "12px 24px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(44,24,16,0.1)",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.2s",
              }}
            >
              {f}
            </button>
          ))}

          {/* Bag Size Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#f7f2ed",
              borderRadius: "9999px",
              padding: "4px",
              boxShadow: "0 2px 6px rgba(44,24,16,0.08)",
              border: "1px solid rgba(44,24,16,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#7a6a5a",
                fontWeight: 600,
                padding: "8px 16px",
              }}
            >
              Bag Size:
            </span>
            {bagSizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveBagSize(activeBagSize === size ? "" : size)}
                style={{
                  background: activeBagSize === size ? "#D4A574" : "#fff",
                  color: activeBagSize === size ? "#fff" : "#2c1810",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
          }}
        >
          {products.map((p) => (
            <article
              key={p.id}
              className="card-hover editorial-shadow"
              onClick={() => handleCardClick(p)}
              style={{
                background: "#f7f2ed",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                marginTop: p.offsetMd ? "48px" : "0",
                transition: "box-shadow 0.5s ease, transform 0.5s ease",
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  background: "#e8e0d8",
                  ...noiseBgStyle,
                }}
              >
                {/* Noise overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    pointerEvents: "none",
                    backgroundImage: noiseBgStyle.backgroundImage,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                    opacity: 0.05,
                  }}
                />
                <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                  <img
                    alt={p.name}
                    src={p.img}
                    onMouseEnter={() => setHoveredImg(p.id)}
                    onMouseLeave={() => setHoveredImg(null)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: hoveredImg === p.id ? "scale(1.06)" : "scale(1)",
                      transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    zIndex: 20,
                  }}
                >
                  <span
                    style={{
                      background: "#6B8E5F",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      borderRadius: "9999px",
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  background: "#f7f2ed",
                  position: "relative",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.375rem",
                      fontWeight: 600,
                      color: "#2c1810",
                      lineHeight: 1.25,
                      flex: 1,
                      marginRight: "16px",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4A574")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#2c1810")}
                  >
                    {p.name}
                  </h2>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.125rem",
                      color: "#7a6a5a",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹ {p.price}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#7a6a5a",
                    lineHeight: 1.65,
                    marginBottom: "32px",
                    flexGrow: 1,
                  }}
                >
                  {p.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  className="btn-lift"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(p);
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "8px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition:
                      "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.2s, color 0.2s",
                    ...(p.buttonStyle === "solid"
                      ? {
                          background: addedStates[p.id] ? "#6B8E5F" : "#e8d5bf",
                          color: "#2c1810",
                          border: "none",
                          boxShadow: "0 2px 6px rgba(44,24,16,0.1)",
                        }
                      : {
                          background: addedStates[p.id] ? "#6B8E5F" : "#f7f2ed",
                          color: addedStates[p.id] ? "#fff" : "#e8d5bf",
                          border: "2px solid #e8d5bf",
                          boxShadow: "0 2px 6px rgba(44,24,16,0.06)",
                        }),
                  }}
                  onMouseEnter={(e) => {
                    if (!addedStates[p.id]) {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "#D4A574";
                      el.style.color = "#fff";
                      el.style.borderColor = "#D4A574";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!addedStates[p.id]) {
                      const el = e.currentTarget as HTMLButtonElement;
                      if (p.buttonStyle === "solid") {
                        el.style.background = "#e8d5bf";
                        el.style.color = "#2c1810";
                        el.style.borderColor = "transparent";
                      } else {
                        el.style.background = "#f7f2ed";
                        el.style.color = "#e8d5bf";
                        el.style.borderColor = "#e8d5bf";
                      }
                    }
                  }}
                >
                  {addedStates[p.id] ? (
                    "Added ✓"
                  ) : (
                    <>
                      Add to Cart{" "}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                      >
                        shopping_cart
                      </span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "64px 0",
          background: "#ede8e2",
          borderTop: "1px solid rgba(44,24,16,0.08)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 8fr",
            gap: "32px",
            padding: "0 96px",
            maxWidth: "1400px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          {/* Brand col */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div
              onClick={() => router.push("/")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                fontStyle: "italic",
                color: "#D4A574",
                marginBottom: "12px",
                cursor: "pointer",
              }}
            >
              Brew Bean
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#2c1810",
                opacity: 0.75,
                lineHeight: 1.6,
              }}
            >
              © 2024 Brew Bean. Crafted for the Daily Ritual.
            </p>
          </div>

          {/* Links col */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {[
              { label: "Shipping Policy", href: "/shipping" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Wholesale", href: "/wholesale" },
              { label: "Contact Us", href: "/contact" },
              { label: "Sustainability", href: "/sustainability" },
            ].map((link) => (
              <a
                key={link.label}
                onClick={() => router.push(link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#7a6a5a",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                  outline: "none",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4A574")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#7a6a5a")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#faf6f1" }} />}>
      <ShopPageInner />
    </Suspense>
  );
}