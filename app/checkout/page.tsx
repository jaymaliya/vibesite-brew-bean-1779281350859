"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, totalPrice } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const orderTotal = totalPrice + shippingCost;

  useEffect(() => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.4s ease";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (id === "phone") {
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phone: numeric }));
    } else if (id === "pincode") {
      const numeric = value.replace(/\D/g, "").slice(0, 6);
      setForm((prev) => ({ ...prev, pincode: numeric }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (form.pincode.length !== 6) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (form.phone.length !== 10) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    return newErrors;
  }

  async function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (items.length === 0) {
      router.push("/shop");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal }),
      });
      const order = await res.json();

      const options = {
        key: "rzp_test_",
        amount: order.amount,
        currency: "INR",
        name: "Brew Bean",
        description: "Order Payment",
        order_id: order.id,
        handler: function () {
          clearCart();
          router.push("/");
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#8B6F47" },
      };

      const win = window as any;
      if (win.Razorpay) {
        const rzp = new win.Razorpay(options);
        rzp.open();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const rzp = new win.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      }
    } catch {
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    borderRadius: "8px",
    borderColor: errors[field] ? "#dc2626" : "#c9b8a8",
    borderWidth: errors[field] ? "2px" : "1px",
    borderStyle: "solid",
    backgroundColor: "transparent",
    color: "#2a170f",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "16px",
    padding: "12px 16px",
    transition: "all 0.3s ease",
    width: "100%",
    outline: "none",
    display: "block",
  });

  const labelStyle: React.CSSProperties = {
    color: "#4e453b",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  if (items.length === 0) {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <div
          style={{
            minHeight: "100vh",
            background: "#f7f2ed",
            fontFamily: "'Source Sans 3', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            color: "#2a170f",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#8B6F47" }}>
            shopping_cart
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#8B6F47" }}>Your cart is empty</h2>
          <p style={{ color: "#4e453b", fontSize: "16px" }}>
            Add some great coffee before checking out.
          </p>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "#8B6F47",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
              transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#705731";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#8B6F47";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            Start Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet"
      />

      <style>{`
        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .visible { opacity: 1; transform: translateY(0); }
        .form-input-focus:focus { border-color: #8B6F47 !important; border-width: 2px !important; }
        .btn-lift:hover { transform: scale(1.02) !important; }
        .btn-lift:active { transform: scale(0.98) !important; }
      `}</style>

      <div
        style={{
          background: "#f7f2ed",
          minHeight: "100vh",
          fontFamily: "'Source Sans 3', sans-serif",
          color: "#2a170f",
        }}
      >
        {/* Header */}
        <header
          style={{
            width: "100%",
            borderBottom: "1px solid rgba(139,111,71,0.3)",
            padding: "24px 24px",
            background: "#f7f2ed",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              onClick={() => router.push("/")}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#8B6F47",
                fontStyle: "italic",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Brew Bean
            </a>
          </div>
        </header>

        {/* Main */}
        <main
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 24px",
          }}
        >
          {/* Page Title */}
          <div style={{ marginBottom: "48px", textAlign: "center" }} className="reveal">
            <h1
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 700,
                color: "#8B6F47",
                letterSpacing: "-0.5px",
              }}
            >
              Checkout
            </h1>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "48px",
            }}
          >
            {/* Left: Shipping Form */}
            <div
              style={{ gridColumn: "span 7" }}
              className="reveal"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Shipping Section */}
                <section
                  style={{
                    background: "#f7f2ed",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow: "0 4px 12px rgba(44,24,16,0.08)",
                    border: "1px solid rgba(139,111,71,0.15)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      borderBottom: "1px solid rgba(139,111,71,0.3)",
                      paddingBottom: "16px",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#8B6F47", fontSize: "24px" }}
                    >
                      local_shipping
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#8B6F47",
                      }}
                    >
                      Shipping Details
                    </h2>
                  </div>

                  <form
                    style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {/* Full Name */}
                    <div>
                      <label style={labelStyle} htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        className="form-input-focus"
                        style={inputStyle("fullName")}
                      />
                      {errors.fullName && (
                        <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label style={labelStyle} htmlFor="address">
                        Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="123 Coffee Lane, Suite 4B"
                        value={form.address}
                        onChange={handleChange}
                        className="form-input-focus"
                        style={inputStyle("address")}
                      />
                      {errors.address && (
                        <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* City + State */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "24px",
                      }}
                    >
                      <div>
                        <label style={labelStyle} htmlFor="city">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder="Mumbai"
                          value={form.city}
                          onChange={handleChange}
                          className="form-input-focus"
                          style={inputStyle("city")}
                        />
                        {errors.city && (
                          <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="state">
                          State
                        </label>
                        <input
                          id="state"
                          type="text"
                          placeholder="Maharashtra"
                          value={form.state}
                          onChange={handleChange}
                          className="form-input-focus"
                          style={inputStyle("state")}
                        />
                        {errors.state && (
                          <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pincode + Phone */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "24px",
                      }}
                    >
                      <div>
                        <label style={labelStyle} htmlFor="pincode">
                          Pincode
                        </label>
                        <input
                          id="pincode"
                          type="text"
                          placeholder="400001"
                          value={form.pincode}
                          onChange={handleChange}
                          className="form-input-focus"
                          style={inputStyle("pincode")}
                          inputMode="numeric"
                        />
                        {errors.pincode && (
                          <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="phone">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={handleChange}
                          className="form-input-focus"
                          style={inputStyle("phone")}
                          inputMode="numeric"
                        />
                        {errors.phone && (
                          <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle} htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input-focus"
                        style={inputStyle("email")}
                      />
                      {errors.email && (
                        <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </form>
                </section>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "16px 0",
                  }}
                >
                  {[
                    { icon: "lock", label: "Secure Payments" },
                    { icon: "verified", label: "Freshly Roasted" },
                    { icon: "eco", label: "Sustainable Sourcing" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(107,142,95,0.1)",
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(107,142,95,0.2)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "#6B8E5F", fontSize: "20px" }}
                      >
                        {badge.icon}
                      </span>
                      <span
                        style={{
                          color: "#6B8E5F",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ gridColumn: "span 5" }} className="reveal">
              <section
                style={{
                  background: "#ede8e3",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: "0 4px 12px rgba(44,24,16,0.08)",
                  position: "sticky",
                  top: "32px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#8B6F47",
                    borderBottom: "1px solid rgba(139,111,71,0.3)",
                    paddingBottom: "16px",
                    marginBottom: "24px",
                  }}
                >
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "#f7f2ed",
                          borderRadius: "8px",
                          flexShrink: 0,
                          overflow: "hidden",
                          boxShadow: "0 1px 4px rgba(44,24,16,0.1)",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.6s ease",
                            }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                            }
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ color: "#8B6F47", fontSize: "32px" }}
                            >
                              coffee
                            </span>
                          </div>
                        )}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h3
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#2a170f",
                            lineHeight: 1.3,
                            marginBottom: "4px",
                          }}
                        >
                          {item.name}
                        </h3>
                        {(item.size || item.color) && (
                          <p style={{ color: "#4e453b", fontSize: "13px", marginBottom: "4px" }}>
                            {item.size && item.size}
                            {item.size && item.color && " | "}
                            {item.color && item.color}
                          </p>
                        )}
                        <p style={{ color: "#4e453b", fontSize: "13px", marginBottom: "4px" }}>
                          Qty: {item.quantity}
                        </p>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#8B6F47",
                            fontFamily: "'Source Sans 3', sans-serif",
                          }}
                        >
                          ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Fallback item if cart somehow empty but we still render (should not reach here) */}
                  {items.length === 0 && (
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "#f7f2ed",
                          borderRadius: "8px",
                          flexShrink: 0,
                          overflow: "hidden",
                          boxShadow: "0 1px 4px rgba(44,24,16,0.1)",
                        }}
                      >
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxp1-gunByfMihF4RVK2G28t3gAjFWgr3WLPOi8Qk8Xaz1rKixErshgCdmypAm9S5bH6xzaz7ZH2gucB18xJedJgaR3--R0C8nv2jo9Iegl5j0x2cXW-0EySAf0pDO8bvAXjZxW1GLuOpwfZvJIIKLJxR4TRSUMK6NLQxzJBRB18EtoURMICQkymqZDJXbEBl0ACjl5GyPLEN5QI1u_K3RodnkXn6JIiu-W62pd9El4qLUrVRTynttqYpw3ykITpEXs-3xW-5yq7ia"
                          alt="Coffee beans"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h3
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#2a170f",
                            lineHeight: 1.3,
                            marginBottom: "4px",
                          }}
                        >
                          Brew Bean Hand-Roasted Single Origin Coffee
                        </h3>
                        <p style={{ color: "#4e453b", fontSize: "13px", marginBottom: "4px" }}>
                          250g | Whole Bean
                        </p>
                        <p style={{ fontWeight: 700, color: "#8B6F47" }}>₹ 650</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div
                  style={{
                    borderTop: "1px solid rgba(139,111,71,0.3)",
                    paddingTop: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#4e453b",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>₹ {totalPrice > 0 ? totalPrice.toLocaleString("en-IN") : "650"}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#4e453b",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    <span>Shipping</span>
                    <span>
                      {totalPrice > 0
                        ? shippingCost === 0
                          ? "FREE"
                          : `₹ ${shippingCost}`
                        : "₹ 50"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(139,111,71,0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "#2a170f",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#8B6F47",
                      }}
                    >
                      ₹ {totalPrice > 0 ? orderTotal.toLocaleString("en-IN") : "700"}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-lift"
                  onMouseEnter={(e) => {
                    setArrowHovered(true);
                    (e.currentTarget as HTMLButtonElement).style.background = "#705731";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 6px 16px rgba(44,24,16,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    setArrowHovered(false);
                    (e.currentTarget as HTMLButtonElement).style.background = "#8B6F47";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 4px 12px rgba(44,24,16,0.15)";
                  }}
                  style={{
                    width: "100%",
                    background: "#8B6F47",
                    color: "#fff",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "16px 32px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(44,24,16,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition:
                      "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                  {!loading && (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "20px",
                        transform: arrowHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      arrow_forward
                    </span>
                  )}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#4e453b",
                    marginTop: "16px",
                    opacity: 0.7,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Secured via Razorpay
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            width: "100%",
            padding: "48px 0",
            background: "#ede8e3",
            borderTop: "1px solid rgba(139,111,71,0.3)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#8B6F47",
                  fontStyle: "italic",
                }}
              >
                Brew Bean
              </span>
              <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
                {[
                  { label: "Shipping Policy", path: "/shop" },
                  { label: "Terms of Service", path: "/shop" },
                  { label: "Wholesale", path: "/shop" },
                  { label: "Contact Us", path: "/shop" },
                  { label: "Sustainability", path: "/shop" },
                ].map((link) => (
                  <a
                    key={link.label}
                    onClick={() => router.push(link.path)}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "15px",
                      color: "#4e453b",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#8B6F47")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#4e453b")
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(139,111,71,0.2)",
                paddingTop: "32px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "15px",
                  color: "#2a170f",
                  opacity: 0.8,
                }}
              >
                © 2024 Brew Bean. Crafted for the Daily Ritual.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}