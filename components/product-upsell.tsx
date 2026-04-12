"use client";

import { useState, useEffect } from "react";
import type { ProductInfo } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

function formatPrice(price: string): string {
  if (!price) return '0.00';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  // Shopify Storefront API returns cents (no decimal) — convert to dollars
  if (!price.includes('.') && num > 100) return (num / 100).toFixed(2);
  return num.toFixed(2);
}

interface RelatedProduct {
  title: string;
  image: string;
  price: string;
  compare_at_price: string;
  variant_id: number;
  handle: string;
}

// ── Reorder Widget ──
export function ProductUpsell({ products, shopifyDomain }: { products: ProductInfo[]; shopifyDomain: string }) {
  const buyable = products.filter((p) => p.variant_id && p.variant_id !== 0);
  if (!buyable.length || !shopifyDomain) return null;

  return (
    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #e5e5e5" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#303030", marginBottom: 10 }}>Reorder</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {buyable.map((product, idx) => (
          <ReorderCard key={idx} product={product} shopifyDomain={shopifyDomain} />
        ))}
      </div>
    </div>
  );
}

function ReorderCard({ product, shopifyDomain }: { product: ProductInfo; shopifyDomain: string }) {
  const [qty, setQty] = useState(1);
  const price = formatPrice(product.unit_price);
  const compareAt = product.compare_at_price ? formatPrice(product.compare_at_price) : '';
  const hasDiscount = compareAt && parseFloat(compareAt) > parseFloat(price);
  const savePercent = hasDiscount ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100) : 0;
  const total = (parseFloat(price) * qty).toFixed(2);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#fafafa", borderRadius: 8, border: "1px solid #eee" }}>
      {/* Image */}
      <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 6, overflow: "hidden", background: "#f0f0f0" }}>
        {product.image ? (
          <img src={product.image} alt="" style={{ width: 48, height: 48, objectFit: "cover" }} />
        ) : (
          <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#303030", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {product.title}
        </div>
        {product.variant_title && product.variant_title !== "Default Title" && (
          <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>{product.variant_title}</div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>${qty > 1 ? total : price}</span>
          {hasDiscount && <span style={{ fontSize: 10, color: "#999", textDecoration: "line-through" }}>${compareAt}</span>}
          {hasDiscount && savePercent > 0 && (
            <span style={{ fontSize: 9, fontWeight: 700, color: "#e53935", background: "#fde8e8", borderRadius: 3, padding: "0px 3px" }}>-{savePercent}%</span>
          )}
        </div>

        {/* Qty + Buy */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 4, overflow: "hidden" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 22, height: 22, border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: 13, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <span style={{ width: 22, textAlign: "center", fontSize: 11, fontWeight: 600, color: "#303030" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ width: 22, height: 22, border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: 13, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
          <a
            href={`https://${shopifyDomain}/cart/${product.variant_id}:${qty}`}
            style={{ padding: "4px 10px", background: "#007a5c", color: "#fff", borderRadius: 4, fontSize: 10, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Buy Again
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Related Products Widget ──
// Cache outside component — persists across mount/unmount cycles
let _relatedCache: { domain: string; products: RelatedProduct[] } | null = null;

export function RelatedProducts({ shopifyDomain }: { shopifyDomain: string }) {
  const [products, setProducts] = useState<RelatedProduct[]>(
    _relatedCache?.domain === shopifyDomain ? _relatedCache.products : []
  );

  useEffect(() => {
    if (!shopifyDomain) return;
    if (_relatedCache?.domain === shopifyDomain && _relatedCache.products.length > 0) {
      setProducts(_relatedCache.products);
      return;
    }
    fetch(`https://${shopifyDomain}/collections/all/products.json?limit=8`)
      .then(r => r.json())
      .then(data => {
        const items: RelatedProduct[] = (data.products || [])
          .filter((p: any) => p.available !== false && p.variants?.[0])
          .slice(0, 4)
          .map((p: any) => ({
            title: p.title,
            image: p.images?.[0]?.src || '',
            price: p.variants[0].price,
            compare_at_price: p.variants[0].compare_at_price || '',
            variant_id: p.variants[0].id,
            handle: p.handle,
          }));
        _relatedCache = { domain: shopifyDomain, products: items };
        setProducts(items);
      })
      .catch(() => {});
  }, [shopifyDomain]);

  if (!products.length) return null;

  return (
    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #e5e5e5" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#303030", marginBottom: 10 }}>You may also like</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {products.map((p, idx) => {
          const price = formatPrice(p.price);
          const compareAt = p.compare_at_price ? formatPrice(p.compare_at_price) : '';
          const hasDiscount = compareAt && parseFloat(compareAt) > parseFloat(price);

          return (
            <a
              key={idx}
              href={`https://${shopifyDomain}/products/${p.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                background: "#fafafa", borderRadius: 8, border: "1px solid #eee",
                textDecoration: "none", color: "inherit", transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#007a5c"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; }}
            >
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 6, overflow: "hidden", background: "#f0f0f0" }}>
                {p.image ? (
                  <img src={p.image} alt="" style={{ width: 40, height: 40, objectFit: "cover" }} />
                ) : (
                  <div style={{ width: 40, height: 40 }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#303030", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>${price}</span>
                  {hasDiscount && <span style={{ fontSize: 10, color: "#999", textDecoration: "line-through" }}>${compareAt}</span>}
                  {hasDiscount && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#e53935", background: "#fde8e8", borderRadius: 3, padding: "0px 3px" }}>
                      -{Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100)}%
                    </span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#007a5c", fontWeight: 600, flexShrink: 0 }}>View →</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
