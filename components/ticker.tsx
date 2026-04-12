"use client";

const items = [
  "💰 90-Day Money-Back Guarantee",
  "🚚 Free Shipping on Orders Over $70",
  "🌟 Trusted by Over 1 Million Happy Customers",
];

export function Ticker() {
  return (
    <div className="bg-[#54b94a] overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-ticker">
        {Array.from({ length: 4 }).map((_, groupIdx) => (
          <div key={groupIdx} className="inline-flex">
            {items.map((item, idx) => (
              <p
                key={idx}
                className="inline-block px-12 py-2.5 text-white text-base font-semibold tracking-wide"
                style={{ fontFamily: "'Arial', 'Helvetica Neue', sans-serif" }}
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
