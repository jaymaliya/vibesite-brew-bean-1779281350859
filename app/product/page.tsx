"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProductContent() {
  const router = useRouter();
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const paramImg = searchParams.get("img") ? decodeURIComponent(searchParams.get("img")!) : null;
  const paramName = searchParams.get("name") ? decodeURIComponent(searchParams.get("name")!) : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price")) : null;

  const displayImg = paramImg ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuB_a4YrggudsfWm-UBer-A-255aTOBx1kC001U8d8h4DcjxZKFIT3xo6hQlFe1StzX_ARjcop3dPfYJ7GzzrSlpcufyh64bXNO-KwfPCdGqUWcLlO_6g2JVTHhlne3PIAckdI9oqaY_99Gl14OzpJjA8_AHLnRX11auAxFKFdHiYtVqMmApj-nc97ZdgK4XSWHBODyv_aNVSFcxEJGlqK8GKzq2hdrVejDUk7Kzo0EM_pNH4uvRcYsHsKK4mJkZGfItYE6nbdldKa7o";
  const displayName = paramName ?? "Brew Bean Hand-Roasted Single Origin Coffee";
  const displayPrice = paramPrice ?? 650;

  const thumbnails = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_a4YrggudsfWm-UBer-A-255aTOBx1kC001U8d8h4DcjxZKFIT3xo6hQlFe1StzX_ARjcop3dPfYJ7GzzrSlpcufyh64bXNO-KwfPCdGqUWcLlO_6g2JVTHhlne3PIAckdI9oqaY_99Gl14OzpJjA8_AHLnRX11auAxFKFdHiYtVqMmApj-nc97ZdgK4XSWHBODyv_aNVSFcxEJGlqK8GKzq2hdrVejDUk7Kzo0EM_pNH4uvRcYsHsKK4mJkZGfItYE6nbdldKa7o",
      alt: "Thumbnail 1"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaEmKYra6iv_5d8OGIbVecjyIzAMRuKXi4nebUJ6xwvMbcKKEuiC8LrwS7B74Oz3oDboBIiQZLWic5WoY0tg29HSRPEeOMDYv-rJvm8jMEp33qksEN1IDmNUisS_h6w7HNPJoAcldTyDX29PC6U4VORoV6y22UHVFurxrEFfJOE5ARHKPwM8sxyjMHLLkBOxAikodUjcKE8cOmFR5WrP-qio-ZgaJfdV8LGjsxI_QCj4SicaacwcS0KLfxtgCxXOjzj4f2ih1TbUbm",
      alt: "Thumbnail 2"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk97XkZd_CUhhgEjgUQxpyAnN3_DI8_hYUXdDjhlP_wEpqFYYUmkr4H3FBe7l3jV-UInyo5UN_ZVX85aoZ4iSaolDMb7Cg_padfvh4JwMf_kxQ8WpAZXsd7E2DeSnoJDjH7yE9GtrEw9xRWrMOKTff-ex3It-DY3QnjB1hth-shnG0qJWnClwzzroJQ9ZS8NlWE1c_2RZiUXvjz7CPRdg5YhcJkmHg1qdr5E_Wq2QwRGxI6yCeMiXAxOwO2cFbiXEVT1_utlxuHspX",
      alt: "Thumbnail 3"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3YJqx_gwaBbo89gqp9C7lyTFSZmf0WLyxk3jOoqsHLPDahhYs61deX5anKr8cHIPrpfcbGkgCet9nIU3wJkFSARmDtTYq5DwZ9L3PcmWHiVV95Jtezz191Ulz_qWlkg2_Th00z1-QaNaxChgb4EWgvNwU7LJdwuZQ6bLQqFoBLil77-EeWDxwMg4FGbWmvXEi6SqW8JwilJOtZvJT1x09IjUDyQ_xs8Jt1_P6K1D0q0giA0Du9JdutVtUVZJCapeoqVEx0OtMpdem",
      alt: "Thumbnail 4"
    }
  ];

  const showThumbnails = !paramImg;

  const [mainImage, setMainImage] = useState(displayImg);
  const [activeThumb, setActiveThumb] = useState(0);
  const [grind, setGrind] = useState("Whole Bean");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [accordions, setAccordions] = useState<{ [key: string]: boolean }>({
    tasting: false,
    brewing: false,
    origin: false,
  });

  const toggleAccordion = (key: string) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    addItem({
      id: "brew-bean-single-origin",
      name: displayName,
      price: displayPrice,
      quantity,
      image: mainImage,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({
      id: "brew-bean-single-origin",
      name: displayName,
      price: displayPrice,
      quantity,
      image: mainImage,
    });
    router.push("/checkout");
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
    return () => {
      if (document.body.contains(s)) document.body.removeChild(s);
    };
  }, []);

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

  const grainStyle: React.CSSProperties = {
    position: "relative",
  };

  const grainBeforeStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "url('data:image/svg+xml;utf8,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
    pointerEvents: "none",
    zIndex: 10,
  };

  return (
    <div
      style={{
        background: "#fdf8f3",
        color: "#2c1810",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .visible { opacity: 1; transform: translateY(0); }
        .btn-lift { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(44,24,16,0.15); }
        .btn-lift:active { transform: scale(0.98); }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(44,24,16,0.08) !important; }
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .img-zoom:hover img { transform: scale(1.05); }
        .grain-overlay { position: relative; }
        .grain-overlay::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
          pointer-events: none;
          z-index: 10;
        }
        select { background-color: #f7f2ed; }
        select option { background-color: #f7f2ed; }
      `}</style>

      {/* Top Navigation */}
      <nav
        style={{
          background: "rgba(253,248,243,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 4px rgba(107,63,42,0.05)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
            padding: "0 24px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <a
            onClick={() => router.push("/")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#2c1810",
              fontStyle: "italic",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Brew Bean
          </a>
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
            }}
            className="hidden-mobile"
          >
            {["Shop", "Our Story", "Brew Guides", "Subscription"].map((item, i) => (
              <a
                key={item}
                onClick={() => {
                  if (item === "Shop") router.push("/shop");
                  else router.push("/");
                }}
                style={{
                  color: i === 0 ? "#6b3f2a" : "#6b5c52",
                  borderBottom: i === 0 ? "2px solid #6b3f2a" : "none",
                  paddingBottom: i === 0 ? "4px" : "0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.3s ease, opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#6b3f2a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = i === 0 ? "#6b3f2a" : "#6b5c52";
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <button
              onClick={() => router.push("/shop")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b5c52",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b3f2a")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b5c52")}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                shopping_bag
              </span>
            </button>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b5c52",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b3f2a")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b5c52")}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                person
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          paddingTop: "128px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Trust Strip */}
        <div
          style={{
            background: "#f7f2ed",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            fontSize: "0.8rem",
            color: "#6b5c52",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
          className="reveal"
        >
          <span style={{ color: "#c0622f" }}>★★★★★</span>
          <span>4.8 Rating</span>
          <span style={{ color: "#c9b8a8" }}>|</span>
          <span>10,000+ customers</span>
          <span style={{ color: "#c9b8a8" }}>|</span>
          <span>Free Shipping above ₹999</span>
          <span style={{ color: "#c9b8a8" }}>|</span>
          <span>Hand-Roasted in India</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
          }}
        >
          {/* Product Gallery — Left 7 cols */}
          <div
            style={{
              gridColumn: "span 12",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
            className="reveal product-gallery"
          >
            {/* Main Image */}
            <div
              className="grain-overlay img-zoom"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#f7f2ed",
                boxShadow: "0 1px 4px rgba(107,63,42,0.05)",
              }}
            >
              <img
                src={mainImage}
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              {/* Accent Badge */}
              <span
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  background: "#c0622f",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "4px 16px",
                  borderRadius: "9999px",
                  boxShadow: "0 2px 8px rgba(192,98,47,0.2)",
                  zIndex: 20,
                }}
              >
                Single Origin
              </span>
            </div>

            {/* Thumbnails — only show if no paramImg */}
            {showThumbnails && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {thumbnails.slice(0, 3).map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMainImage(thumb.src);
                      setActiveThumb(idx);
                    }}
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: activeThumb === idx ? "2px solid #6b3f2a" : "2px solid transparent",
                      transition: "border-color 0.3s ease",
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (activeThumb !== idx) {
                        (e.currentTarget as HTMLElement).style.borderColor = "#c9b8a8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeThumb !== idx) {
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      }
                    }}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Panel — Right 5 cols */}
          <div
            style={{
              gridColumn: "span 12",
              display: "flex",
              flexDirection: "column",
              paddingTop: "32px",
            }}
            className="reveal product-info"
          >
            {/* Title & Price */}
            <div style={{ marginBottom: "40px" }}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  color: "#2c1810",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                {displayName}
              </h1>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.8rem",
                  fontWeight: 600,
                  color: "#c0622f",
                  marginTop: "16px",
                  lineHeight: 1.1,
                }}
              >
                ₹ {displayPrice.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Selectors */}
            <div style={{ marginBottom: "40px", display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Grind Type */}
              <div>
                <label
                  htmlFor="grind-type"
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6b5c52",
                    marginBottom: "12px",
                  }}
                >
                  Grind Type
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="grind-type"
                    value={grind}
                    onChange={(e) => setGrind(e.target.value)}
                    style={{
                      width: "100%",
                      appearance: "none",
                      background: "#f7f2ed",
                      border: "1px solid #c9b8a8",
                      borderRadius: "8px",
                      padding: "16px 40px 16px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      color: "#2c1810",
                      cursor: "pointer",
                      outline: "none",
                      transition: "box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px #6b3f2a";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <option>Whole Bean</option>
                    <option>French Press</option>
                    <option>Espresso</option>
                    <option>Pour Over</option>
                  </select>
                  <div
                    style={{
                      pointerEvents: "none",
                      position: "absolute",
                      inset: "0",
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: "16px",
                      color: "#6b5c52",
                    }}
                  >
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6b5c52",
                    marginBottom: "12px",
                  }}
                >
                  Quantity
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #c9b8a8",
                    borderRadius: "8px",
                    width: "fit-content",
                    overflow: "hidden",
                    background: "#f7f2ed",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      padding: "16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6b5c52",
                      display: "flex",
                      alignItems: "center",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ece4da")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      remove
                    </span>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    min={1}
                    style={{
                      width: "64px",
                      textAlign: "center",
                      border: "none",
                      background: "transparent",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      color: "#2c1810",
                      outline: "none",
                      padding: 0,
                    }}
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      padding: "16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6b5c52",
                      display: "flex",
                      alignItems: "center",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ece4da")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      add
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              <button
                onClick={handleAddToCart}
                className="btn-lift"
                style={{
                  flex: 1,
                  background: "#6b3f2a",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "16px 32px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(107,63,42,0.15)",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
                }}
              >
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-lift"
                style={{
                  flex: 1,
                  background: "#c0622f",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "16px 32px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(192,98,47,0.15)",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Accordion Details */}
            <div
              style={{
                borderTop: "1px solid rgba(201,184,168,0.3)",
              }}
            >
              {/* Tasting Notes */}
              <div style={{ borderBottom: "1px solid rgba(201,184,168,0.3)" }}>
                <button
                  onClick={() => toggleAccordion("tasting")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                  }}
                  onMouseEnter={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#6b3f2a";
                  }}
                  onMouseLeave={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#2c1810";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#2c1810",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Tasting Notes
                  </h3>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#6b5c52", transition: "transform 0.3s ease", transform: accordions.tasting ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    {accordions.tasting ? "remove" : "add"}
                  </span>
                </button>
                {accordions.tasting && (
                  <div style={{ paddingBottom: "16px", paddingTop: "0" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#6b5c52",
                      }}
                    >
                      Experience a rich, full-bodied profile with distinct notes of dark chocolate, toasted hazelnut, and a subtle hint of bright cherry acidity on the finish. Perfect for those who appreciate a complex, yet smooth cup.
                    </p>
                  </div>
                )}
              </div>

              {/* Brewing Guide */}
              <div style={{ borderBottom: "1px solid rgba(201,184,168,0.3)" }}>
                <button
                  onClick={() => toggleAccordion("brewing")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                  }}
                  onMouseEnter={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#6b3f2a";
                  }}
                  onMouseLeave={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#2c1810";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#2c1810",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Brewing Guide
                  </h3>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#6b5c52", transform: accordions.brewing ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                  >
                    {accordions.brewing ? "remove" : "add"}
                  </span>
                </button>
                {accordions.brewing && (
                  <div style={{ paddingBottom: "16px" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                      {[
                        { icon: "water_drop", text: "Ratio: 1:15 (Coffee to Water)" },
                        { icon: "device_thermostat", text: "Temperature: 93°C (200°F)" },
                        { icon: "timer", text: "Brew Time: 3-4 minutes" },
                      ].map((item, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <span
                            className="material-symbols-outlined"
                            style={{ color: "#6b3f2a", fontSize: "16px", marginTop: "2px" }}
                          >
                            {item.icon}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#6b5c52" }}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Origin Story */}
              <div style={{ borderBottom: "1px solid rgba(201,184,168,0.3)" }}>
                <button
                  onClick={() => toggleAccordion("origin")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                  }}
                  onMouseEnter={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#6b3f2a";
                  }}
                  onMouseLeave={(e) => {
                    const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "#2c1810";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#2c1810",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Origin Story
                  </h3>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#6b5c52", transform: accordions.origin ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                  >
                    {accordions.origin ? "remove" : "add"}
                  </span>
                </button>
                {accordions.origin && (
                  <div style={{ paddingBottom: "16px" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#6b5c52",
                      }}
                    >
                      Sourced directly from small-holder farms in the elevated regions of Antigua, Guatemala. These beans are cultivated at 1,500 meters above sea level in nutrient-rich volcanic soil, ensuring a dense bean and profound flavor development before being hand-roasted in small batches.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section
          className="reveal"
          style={{
            marginTop: "80px",
            borderTop: "1px solid rgba(201,184,168,0.3)",
            paddingTop: "80px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#2c1810",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            Ritual Reviews
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              {
                stars: 5,
                half: false,
                quote:
                  '"An incredibly smooth pour-over experience. The chocolate notes are prominent without being overwhelming. My new morning staple."',
                author: "— Sarah M.",
              },
              {
                stars: 4,
                half: true,
                quote:
                  '"Pulls a beautiful, syrupy espresso shot with excellent crema. The hazelnut finish lingers pleasantly. Highly recommend for espresso lovers."',
                author: "— James T.",
              },
              {
                stars: 5,
                half: false,
                quote:
                  '"The aroma right out of the bag is intoxicating. It brews a very clean and bright cup in the French Press. Craftsmanship is evident."',
                author: "— Elena R.",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="card-hover"
                style={{
                  background: "#f7f2ed",
                  padding: "32px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(44,24,16,0.04)",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div style={{ display: "flex", color: "#6b3f2a", marginBottom: "16px" }}>
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <span
                      key={si}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
                    >
                      star
                    </span>
                  ))}
                  {review.half && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
                    >
                      star_half
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    color: "#2c1810",
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {review.quote}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6b5c52",
                  }}
                >
                  {review.author}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#ece4da",
          borderTop: "1px solid rgba(201,184,168,0.3)",
          width: "100%",
          paddingTop: "64px",
          paddingBottom: "64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div style={{ gridColumn: "span 12", marginBottom: "32px" }}>
            <a
              onClick={() => router.push("/")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#6b3f2a",
                fontStyle: "italic",
                display: "block",
                marginBottom: "16px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Brew Bean
            </a>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#2c1810",
                opacity: 0.8,
              }}
            >
              © 2024 Brew Bean. Crafted for the Daily Ritual.
            </p>
          </div>
          <div
            style={{
              gridColumn: "span 12",
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            {["Shipping Policy", "Terms of Service", "Wholesale", "Contact Us", "Sustainability"].map((link) => (
              <a
                key={link}
                onClick={() => router.push("/")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#6b5c52",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b3f2a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b5c52")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fdf8f3",
          borderTop: "1px solid rgba(201,184,168,0.4)",
          padding: "12px 24px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          zIndex: 40,
          boxShadow: "0 -4px 16px rgba(44,24,16,0.08)",
        }}
        className="mobile-sticky-bar"
      >
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#6b5c52", margin: 0 }}>
            {displayName.length > 30 ? displayName.slice(0, 30) + "…" : displayName}
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#c0622f", margin: 0 }}>
            ₹ {displayPrice.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn-lift"
          style={{
            background: "#6b3f2a",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {addedToCart ? "Added ✓" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          className="btn-lift"
          style={{
            background: "#c0622f",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Buy Now
        </button>
      </div>

      {/* Responsive overrides via style tag forbidden — use inline responsive logic via JS */}
      <style>{`
        @media (min-width: 1024px) {
          .product-gallery { grid-column: span 7 !important; }
          .product-info { grid-column: span 5 !important; padding-top: 0 !important; padding-left: 32px !important; }
          .mobile-sticky-bar { display: none !important; }
        }
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
        }
        .hidden-mobile { display: none; }
        @media (min-width: 640px) {
          .cta-row { flex-direction: row !important; }
        }
        @media (max-width: 1023px) {
          .product-gallery { grid-column: span 12 !important; }
          .product-info { grid-column: span 12 !important; }
        }
        @media (min-width: 1024px) {
          main { padding-left: 96px !important; padding-right: 96px !important; }
        }
      `}</style>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fdf8f3" }} />}>
      <ProductContent />
    </Suspense>
  );
}