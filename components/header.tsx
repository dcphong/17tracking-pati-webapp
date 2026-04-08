import Image from "next/image";
import logo from "@/app/assets/logo.png";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 40px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e5e5",
        position: "relative"
      }}
    >
      {/* Left nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontSize: 14,
          fontWeight: 400,
          color: "#121212",
          letterSpacing: "0.96px"
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            color: "inherit",
            letterSpacing: "inherit",
            fontFamily: "inherit"
          }}
        >
          Shop All
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            color: "inherit",
            letterSpacing: "inherit",
            fontFamily: "inherit"
          }}
        >
          Learn
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            color: "inherit",
            letterSpacing: "inherit",
            fontFamily: "inherit"
          }}
        >
          Help
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      {/* Center logo - 160x37 matching original */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <Image
          src={logo}
          alt="Wellness Nest"
          width={160}
          height={37}
          priority
        />
      </div>

      {/* Right icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#121212"
        }}
      >
        <a
          href="https://wellnessnest.co/customer_authentication/redirect?locale=en&region_country=VN"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            padding: 0,
            display: "flex"
          }}
          aria-label="Account"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </a>
        <a
          href="https://wellnessnest.co/cart"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            padding: 0,
            display: "flex"
          }}
          aria-label="Cart"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
