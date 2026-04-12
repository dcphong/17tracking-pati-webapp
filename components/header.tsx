"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const MENUS: Record<string, { label: string; href: string }[]> = {
  "Shop All": [
    { label: "Shilajit Daily Rituals", href: "https://wellnessnest.co/collections/shilajit-daily-rituals" },
    { label: "Women's Probiotics", href: "https://wellnessnest.co/collections/women" },
  ],
  "Learn": [
    { label: "About us", href: "https://wellnessnest.co/pages/about-us" },
    { label: "Our Shilajit Quality", href: "https://wellnessnest.co/pages/100-shilajit" },
    { label: "Our Lab Test", href: "https://wellnessnest.co/pages/lab-test-result" },
    { label: "What Customers Say", href: "https://wellnessnest.co/pages/review-and-testimonial" },
    { label: "Blog", href: "https://wellnessnest.co/blogs/news" },
  ],
  "Help": [
    { label: "FAQs", href: "https://wellness-nest.gorgias.help/en-US" },
    { label: "Contact us", href: "https://wellnessnest.co/pages/contact-us" },
    { label: "Track My Order", href: "/" },
    { label: "Manage Subscription", href: "https://wellnessnest.co/pages/manage-my-subscription" },
    { label: "Shipping Policy", href: "https://wellnessnest.co/policies/shipping-policy" },
    { label: "Refund & Return Policy", href: "https://wellnessnest.co/policies/refund-policy" },
  ],
};

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    if (!isMobile) { setDrawerOpen(false); setSubMenu(null); }
  }, [isMobile]);

  return (
    <header
      style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e5e5", position: "relative", zIndex: 100 }}
      onMouseLeave={() => !isMobile && setOpenMenu(null)}
    >
      <div
        className="header-root"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 20px", maxWidth: 1200, margin: "0 auto", position: "relative",
        }}
      >
        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            onClick={() => { setDrawerOpen(true); setSubMenu(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* Desktop: nav */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14, fontWeight: 400, color: "#121212", letterSpacing: "0.96px", fontFamily: "var(--font-montserrat), sans-serif" }}>
            {Object.keys(MENUS).map((label) => {
              const isOpen = openMenu === label;
              return (
                <button
                  key={label}
                  onMouseEnter={() => setOpenMenu(label)}
                  onClick={() => setOpenMenu(isOpen ? null : label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "inherit", color: isOpen ? "#54b94a" : "inherit",
                    letterSpacing: "inherit", fontFamily: "inherit",
                    transition: "color 0.15s", paddingBottom: 2,
                    borderBottom: isOpen ? "2px solid #54b94a" : "2px solid transparent",
                  }}
                  onMouseOver={(e) => { if (!isOpen) e.currentTarget.style.color = "#54b94a"; }}
                  onMouseOut={(e) => { if (!isOpen) e.currentTarget.style.color = "#121212"; }}
                >
                  {label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              );
            })}
          </nav>
        )}

        {/* Center logo */}
        <div style={isMobile ? { position: "absolute", left: "50%", transform: "translateX(-50%)" } : { position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Image src={logo} alt="Wellness Nest" width={isMobile ? 130 : 160} height={isMobile ? 30 : 37} priority />
        </div>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#121212" }}>
          {!isMobile && (
            <a href="https://wellnessnest.co/customer_authentication/redirect?locale=en&region_country=VN" style={{ color: "inherit", display: "flex" }} aria-label="Account">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </a>
          )}
          <a href="https://wellnessnest.co/cart" style={{ color: "inherit", display: "flex" }} aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Desktop dropdown */}
      {!isMobile && openMenu && MENUS[openMenu] && (
        <div
          style={{
            position: "absolute", left: 0, right: 0,
            background: "#fff", borderBottom: "1px solid #e5e5e5",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            animation: "fadeSlideDown 0.2s ease-out",
          }}
          onMouseEnter={() => setOpenMenu(openMenu)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <ul style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 20px", listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
            {MENUS[openMenu].map((item) => (
              <li key={item.href}>
                <a href={item.href} style={{ display: "block", padding: "8px 0", fontSize: 14, color: "#303030", textDecoration: "none", fontFamily: "var(--font-montserrat), sans-serif", transition: "color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#54b94a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#303030"; }}
                >{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile drawer overlay */}
      {isMobile && drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999 }} onClick={() => { setDrawerOpen(false); setSubMenu(null); }}>
          {/* Backdrop */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />

          {/* Drawer panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: "85%", maxWidth: 360,
              background: "#fff", boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
              display: "flex", flexDirection: "column",
              animation: "slideDrawerIn 0.25s ease-out",
              overflow: "hidden",
            }}
          >
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #e5e5e5" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#121212" }}>Menu</span>
              <button onClick={() => { setDrawerOpen(false); setSubMenu(null); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Main menu + sub menu container */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              {/* Main nav items */}
              <div style={{
                position: "absolute", inset: 0, padding: "8px 0",
                transform: subMenu ? "translateX(-100%)" : "translateX(0)",
                transition: "transform 0.25s ease",
                overflowY: "auto",
              }}>
                {Object.keys(MENUS).map((label, idx, arr) => (
                  <button
                    key={label}
                    onClick={() => setSubMenu(label)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "14px 20px", background: "none", border: "none",
                      borderBottom: idx < arr.length - 1 ? "1px solid #f0f0f0" : "none", cursor: "pointer",
                      fontSize: 16, fontWeight: 400, color: "#121212", textAlign: "left",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    <span>{label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                ))}

                {/* Log in link */}
                <a
                  href="https://wellnessnest.co/customer_authentication/redirect?locale=en&region_country=VN"
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "16px 20px", borderTop: "1px solid #e5e5e5",
                    color: "#121212", textDecoration: "none", fontSize: 16, fontWeight: 600,
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Log in
                </a>
              </div>

              {/* Sub menu panel — slides in from right */}
              <div style={{
                position: "absolute", inset: 0,
                transform: subMenu ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.25s ease",
                background: "#fff", overflowY: "auto",
              }}>
                {subMenu && (
                  <>
                    {/* Back button */}
                    <button
                      onClick={() => setSubMenu(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 8, width: "100%",
                        padding: "14px 20px", background: "none", border: "none",
                        borderBottom: "1px solid #e5e5e5", cursor: "pointer",
                        fontSize: 14, fontWeight: 500, color: "#121212",
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                      {subMenu}
                    </button>

                    {/* Sub links */}
                    {MENUS[subMenu]?.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        style={{
                          display: "block", padding: "14px 20px",
                          fontSize: 15, color: "#303030", textDecoration: "none",
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
