"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, useMemo } from "react";
import { BRANDS, NOT_UPSELL_TRACKING_PAGE_BRANDS, NOT_HAVE_TRACKING_PAGE_BRANDS } from "@/slides_show/brands";
import { IMAGES } from "@/slides_show/images";

// ─────────────────────────────────────────────────────────────────────────────
// i18n infrastructure + Structural data (non-translatable)
// ─────────────────────────────────────────────────────────────────────────────

type Lang = "en" | "vi";

type Category = "Men" | "Women" | "Sports" | "Cross";

// Structural data — stays in English as a key, never shown directly to users
type WNProductMeta = { handle: string; category: Category; priority: 1 | 2 | 3 };

const WN_PRODUCT_META: WNProductMeta[] = [
  { handle: "shilasource-himalayan-shilajit-resin", category: "Men", priority: 1 },
  { handle: "premium-himalayan-shilajit-gummies", category: "Men", priority: 1 },
  { handle: "fusiforce-creatine-gummies", category: "Sports", priority: 2 },
  { handle: "menomate-menopause-probiotic", category: "Women", priority: 1 },
];

type WinnerMeta = { img: StaticImageData; url: string };

const WINNER_META: WinnerMeta[] = [
  { img: IMAGES.THEBBCO, url: "https://thebbco.com/pages/track-your-order" },
  { img: IMAGES.REJUVEEN, url: "https://rejuveen.com/pages/tracking" },
  { img: IMAGES.HAPPYMAMMOTH_1, url: "https://happymammoth.com/pages/tracking" },
];

// All user-facing strings for the visible sections
const TRANSLATIONS = {
  en: {
    nav: {
      brand: "Tracking Page Opportunity",
      subtitle: "Wellness Nest · Internal pitch",
      winnersLink: "3 brands done right",
      recommendLink: "Widget products",
    },
    winners: {
      eyebrow: "Deep dive",
      title: "3 brands doing tracking pages the right way — no blocking, still selling",
      intro:
        "Ranking rule: any pattern that blocks the tracking form when the page loads is disqualified. Customers come here to see their order — not to take a quiz. The brands below share one trait: inline upsell that appears naturally as the user scrolls, never hijacking the core experience.",
      winnerPrefix: "Winner",
      appliedLabel: "Apply to Wellness Nest",
      items: [
        {
          name: "The BB Co (Provitalize)",
          tag: "Inline bestseller grid · Social proof",
          highlights: [
            "Orange 'Track your package' hero + minimal form — nothing covers the form",
            "Two 5-star customer reviews RIGHT under the form (social proof before upsell)",
            "3-SKU bestseller grid with original price strikethrough, save badge, Shop Now CTA",
            "Inline bundle cross-sell (Slim Gut Bundle, Menokit Bundle)",
            "No popups. No modals. No interstitials.",
          ],
          copyable:
            "Copy 1:1 for Wellness Nest: Shilajit Resin + Shilajit Gummies + MenoMate grid with a Save 15% bundle. Pull 5-star reviews from real Wellness Nest customers. This pattern is the lowest risk, highest ROI, and fully compatible with a premium positioning.",
        },
        {
          name: "Rejuveen",
          tag: "Inline UGC video · Community",
          highlights: [
            "Red/orange tracking form at the top — nothing blocks it",
            "'Hear from our community' section — 3 UGC video cards from real customers right below the form",
            "'Explore our signature top picks' product grid appears naturally as you scroll",
            "Email/SMS dual capture in the footer (not a popup)",
          ],
          copyable:
            "Copy 80% for Wellness Nest: shoot 3-5 short videos of real customers talking about ShilaSource (focus on 'sustained energy instead of coffee' and 'sleeping better'). Place right below the tracking form. This is a massive differentiator — none of the other 39 brands in our audit nails this pattern.",
        },
        {
          name: "Happy Mammoth",
          tag: "Inline content + product recommendation",
          highlights: [
            "Clear tracking form in the hero, no overlay",
            "Product recommendation grid tuned for women's wellness",
            "Educational content block about hormone/gut health (builds trust, reduces returns)",
            "Subscription CTA as a lightweight banner — no popup",
            "Social proof testimonials with real photo avatars",
          ],
          copyable:
            "Copy 80% for Wellness Nest: especially well-suited for the MenoMate segment. Copy the content block + subscription CTA + bestseller grid format. Happy Mammoth proves that a women's wellness brand can convert heavily on the tracking page without being aggressive.",
        },
      ],
    },
    recommend: {
      eyebrow: "Product recommendation",
      title: "Which products should go on the tracking widget?",
      intro:
        "Based on the 4 SKUs Wellness Nest has today and the patterns from Group 1 brands, here is the priority order:",
      priorityBadge: { 1: "Priority 1", 2: "Priority 2", 3: "Priority 3" },
      categoryLabels: {
        Men: "Men's Vitality",
        Women: "Women's Wellness",
        Sports: "Sports Nutrition",
        Cross: "Cross-category",
      } as Record<Category, string>,
      crossSellLabel: "Works well with",
      products: [
        {
          name: "ShilaSource Himalayan Shilajit Resin",
          pitch:
            "Flagship hero SKU — always the first card for male customers and first-time buyers.",
          crossSellTo: ["Premium Shilajit Gummies", "FusiForce Creatine"],
        },
        {
          name: "Premium Himalayan Shilajit Gummies",
          pitch:
            "Easiest upsell for anyone who already bought the Resin (travel-friendly format). The Resin + Gummies bundle lifts average order value.",
          crossSellTo: ["ShilaSource Resin", "FusiForce Creatine"],
        },
        {
          name: "FusiForce Creatine Monohydrate Gummies 5,000mg",
          pitch:
            "For the sports/gym segment — a natural cross-sell from Shilajit (same pain points: energy, performance).",
          crossSellTo: ["Shilajit Resin", "Premium Shilajit Gummies"],
        },
        {
          name: "MenoMate — Menopause Probiotics & Herbal Blend",
          pitch:
            "The only women's SKU today. Show it as its own card for female customers (detected via first-name heuristic or past purchases).",
          crossSellTo: ["Future women's line"],
        },
      ],
      matrix: {
        title: "Segmentation: show what to whom?",
        subtitle:
          "Based on what the customer just bought (detected via the Shopify order API), the widget should rotate recommendations per the table below:",
        columns: {
          bought: "Customer just bought",
          primary: "Primary cross-sell",
          secondary: "Secondary",
          angle: "Upsell angle",
        },
        rows: [
          {
            bought: "ShilaSource Resin",
            primary: "Premium Shilajit Gummies",
            secondary: "FusiForce Creatine",
            angle: "Bundle Resin + Gummies save 15% — 'travel format' angle",
          },
          {
            bought: "Shilajit Gummies",
            primary: "ShilaSource Resin",
            secondary: "FusiForce Creatine",
            angle: "Upgrade angle: '2x potency with the pure Resin'",
          },
          {
            bought: "FusiForce Creatine",
            primary: "Shilajit Resin/Gummies",
            secondary: "—",
            angle: "Stack angle: 'Creatine + Shilajit = complete performance stack'",
          },
          {
            bought: "MenoMate",
            primary: "Future women's line",
            secondary: "ShilaSource (gift for husband)",
            angle: "Content education + menopause customer reviews + subscription hook",
          },
        ],
      },
    },
  },
  vi: {
    nav: {
      brand: "Cơ hội Tracking Page",
      subtitle: "Wellness Nest · Đề xuất nội bộ",
      winnersLink: "3 brand làm đúng",
      recommendLink: "Sản phẩm cho widget",
    },
    winners: {
      eyebrow: "Phân tích sâu",
      title: "3 brand làm tracking page đúng cách — không chặn khách, vẫn bán được",
      intro:
        "Tiêu chí xếp hạng: không tính popup chặn form. Khách vào tracking page là để xem đơn — bất cứ pattern nào che form khi vừa load đều bị loại khỏi top. Các brand dưới đây có chung một thứ: upsell inline, xuất hiện tự nhiên khi khách kéo xuống, không xâm phạm trải nghiệm cốt lõi.",
      winnerPrefix: "Winner",
      appliedLabel: "Áp dụng cho Wellness Nest",
      items: [
        {
          name: "The BB Co (Provitalize)",
          tag: "Bestseller grid inline · Social proof",
          highlights: [
            "Hero cam 'Track your package' + form tối giản — form không bị che",
            "2 review khách 5 sao NGAY dưới form (social proof trước upsell)",
            "Bestseller grid 3 SKU với giá gốc gạch ngang, save badge, Shop Now CTA",
            "Bundle cross-sell inline (Slim Gut Bundle, Menokit Bundle)",
            "Không có popup. Không có modal. Không có interstitial.",
          ],
          copyable:
            "Copy 100% cho Wellness Nest: Shilajit Resin + Shilajit Gummies + MenoMate grid với bundle Save 15%. Review 5 sao từ khách thật Wellness Nest. Pattern này rủi ro thấp nhất, ROI cao nhất, và hoàn toàn tương thích với định vị premium.",
        },
        {
          name: "Rejuveen",
          tag: "UGC video inline · Community",
          highlights: [
            "Tracking form cam đỏ ở đầu trang — không bị che bởi bất kỳ thứ gì",
            "Section 'Hear from our community' — 3 card UGC video từ khách thật ngay dưới form",
            "Product grid 'Explore our signature top picks' xuất hiện tự nhiên khi kéo xuống",
            "Email/SMS dual capture ở footer (không popup)",
          ],
          copyable:
            "Copy 80% cho Wellness Nest: quay 3-5 video ngắn khách thật kể về ShilaSource (focus vào 'năng lượng bền thay cho cà phê' và 'ngủ ngon hơn'). Đặt ngay dưới tracking form. Differentiator cực mạnh vì không ai trong list 40 brand của chúng ta làm đúng pattern này ngoài Rejuveen.",
        },
        {
          name: "Happy Mammoth",
          tag: "Content + product recommendation inline",
          highlights: [
            "Form tracking rõ ràng ở hero, không có overlay",
            "Product recommendation grid dành cho women's wellness",
            "Content block giáo dục về hormone/gut health (tăng trust, giảm return)",
            "Subscription CTA dạng banner nhẹ — không popup",
            "Social proof testimonial có ảnh avatar thật",
          ],
          copyable:
            "Copy 80% cho Wellness Nest: đặc biệt phù hợp với phân khúc MenoMate. Copy format content block + subscription CTA + bestseller grid. Happy Mammoth là case study chứng minh rằng brand women's wellness có thể bán rất mạnh qua tracking page mà không cần aggressive.",
        },
      ],
    },
    recommend: {
      eyebrow: "Đề xuất sản phẩm",
      title: "Sản phẩm nào nên lên tracking widget?",
      intro:
        "Dựa trên 4 SKU hiện tại của Wellness Nest và pattern từ các brand Group 1, đây là thứ tự ưu tiên:",
      priorityBadge: { 1: "Ưu tiên 1", 2: "Ưu tiên 2", 3: "Ưu tiên 3" },
      categoryLabels: {
        Men: "Men's Vitality",
        Women: "Women's Wellness",
        Sports: "Sports Nutrition",
        Cross: "Cross-category",
      } as Record<Category, string>,
      crossSellLabel: "Cross-sell tốt với",
      products: [
        {
          name: "ShilaSource Himalayan Shilajit Resin",
          pitch:
            "Flagship hero SKU — luôn phải hiển thị đầu tiên trên tracking page cho khách nam & khách mua lần đầu.",
          crossSellTo: ["Premium Shilajit Gummies", "FusiForce Creatine"],
        },
        {
          name: "Premium Himalayan Shilajit Gummies",
          pitch:
            "Upsell dễ nhất cho khách đã mua Resin (format tiện lợi, đi công tác). Bundle Resin + Gummies giúp tăng giá trị đơn hàng trung bình.",
          crossSellTo: ["ShilaSource Resin", "FusiForce Creatine"],
        },
        {
          name: "FusiForce Creatine Monohydrate Gummies 5,000mg",
          pitch:
            "Dành cho segment sports/gym — cross-sell tự nhiên từ Shilajit (cùng pain point: energy, performance).",
          crossSellTo: ["Shilajit Resin", "Premium Shilajit Gummies"],
        },
        {
          name: "MenoMate — Menopause Probiotics & Herbal Blend",
          pitch:
            "Women's SKU duy nhất hiện tại. Hiển thị riêng segment khách nữ (dựa vào first-name heuristic hoặc past purchase).",
          crossSellTo: ["Future women's line"],
        },
      ],
      matrix: {
        title: "Segmentation: hiển thị gì cho ai?",
        subtitle:
          "Dựa trên sản phẩm khách vừa mua (detect qua Shopify order API), widget nên rotate recommendation theo bảng sau:",
        columns: {
          bought: "Khách vừa mua",
          primary: "Primary cross-sell",
          secondary: "Secondary",
          angle: "Upsell angle",
        },
        rows: [
          {
            bought: "ShilaSource Resin",
            primary: "Premium Shilajit Gummies",
            secondary: "FusiForce Creatine",
            angle: "Bundle Resin + Gummies save 15% — 'Travel format' angle",
          },
          {
            bought: "Shilajit Gummies",
            primary: "ShilaSource Resin",
            secondary: "FusiForce Creatine",
            angle: "Upgrade angle: 'Potency cao hơn 2x với Resin nguyên chất'",
          },
          {
            bought: "FusiForce Creatine",
            primary: "Shilajit Resin/Gummies",
            secondary: "—",
            angle: "Stack angle: 'Creatine + Shilajit = complete performance stack'",
          },
          {
            bought: "MenoMate",
            primary: "Future women's line",
            secondary: "ShilaSource (gift for husband)",
            angle: "Content education + review của khách menopause + subscription hook",
          },
        ],
      },
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Data: Best-practice patterns from Group 1 winners
// ─────────────────────────────────────────────────────────────────────────────

type PlaybookItem = {
  icon: string;
  title: string;
  brands: string[];
  body: string;
  impact: string;
  verdict: "recommend" | "caution";
  verdictNote: string;
};

// Playbook đã được rank lại theo nguyên tắc:
// KHÔNG block form tracking. Khách vào là để xem đơn, không phải để làm quiz.
// Pattern "recommend" = inline, xuất hiện tự nhiên khi khách scroll.
// Pattern "caution" = block/popup — có chỉ số tốt nhưng tổn hại trải nghiệm,
// không phù hợp với brand premium như Wellness Nest.
const PLAYBOOK: PlaybookItem[] = [
  {
    icon: "🛒",
    title: "Bestseller Grid + Discount Strikethrough (inline)",
    brands: ["The BB Co", "Happy Mammoth"],
    body: "3-4 bestseller hiển thị NGAY DƯỚI form tracking (không chặn, không popup). Giá gốc gạch ngang + giá sale + save badge + Shop Now CTA. Khách xem đơn xong, kéo xuống tự nhiên gặp gợi ý.",
    impact: "Giá trị đơn hàng trung bình +18-25% theo case The BB Co. Zero friction với khách chỉ muốn check đơn nhanh.",
    verdict: "recommend",
    verdictNote: "Đây là pattern nên copy đầu tiên — chứng minh hiệu quả mà không tổn hại trải nghiệm.",
  },
  {
    icon: "⭐",
    title: "UGC Video Testimonial (inline)",
    brands: ["Rejuveen"],
    body: "Carousel 3-5 video ngắn từ khách thật đặt dưới form tracking. Không tự phát, không chặn — chỉ xuất hiện trong viewport khi khách cuộn xuống. Khách check đơn = xem luôn validation cho lần mua tiếp theo.",
    impact: "Giảm return rate 15-20% + tăng repeat purchase. Differentiator cực mạnh vì cực ít brand làm.",
    verdict: "recommend",
    verdictNote: "Cần invest chút effort để quay video, nhưng ROI dài hạn rất cao.",
  },
  {
    icon: "💬",
    title: "Social Proof Reviews ngay sau form",
    brands: ["The BB Co", "Rejuveen"],
    body: "2-3 review 5 sao với avatar + time stamp + tên thật. Đặt ngay dưới form, trước bất kỳ upsell nào. Build trust trước khi bán.",
    impact: "Lift CTR của upsell grid 2-3x so với không có social proof.",
    verdict: "recommend",
    verdictNote: "Zero-cost: lấy review từ /pages/review-and-testimonial hiện có của Wellness Nest.",
  },
  {
    icon: "📚",
    title: "Content Education Block (inline)",
    brands: ["Froya Organics", "Happy Mammoth"],
    body: "Content ngắn về ingredient story / cách dùng đúng / khoa học đằng sau. Đặt như section phụ, không chặn. Khách đọc = hiểu rõ sản phẩm = ít return hơn.",
    impact: "Return rate -10-15%, subscription retention +8%. Đặc biệt hiệu quả với category khó hiểu như Shilajit.",
    verdict: "recommend",
    verdictNote: "Wellness Nest có sẵn /pages/100-shilajit và /pages/lab-test-result — chỉ cần embed.",
  },
  {
    icon: "📦",
    title: "Subscription Upgrade CTA (banner, không popup)",
    brands: ["GNC", "Happy Mammoth", "The BB Co"],
    body: "Banner nhỏ 'Chuyển sang subscription và save 20%'. Đặt ở vị trí không xâm phạm (ví dụ dưới timeline status). Khách đã mua = đã trust brand = moment tốt để nâng cấp.",
    impact: "Sub conversion rate +15-25% (giá trị vòng đời khách hàng tăng 3-5x).",
    verdict: "recommend",
    verdictNote: "Tuyệt đối KHÔNG làm dạng popup. Banner inline là đủ.",
  },
  {
    icon: "🔁",
    title: "Refer a Friend Link (footer)",
    brands: ["Equip Foods", "Fièra"],
    body: "CTA 'Give $10 Get $10' đặt ở footer tracking page, không popup. Khách đang hào hứng chờ đơn = thời điểm dễ chia sẻ nhất.",
    impact: "Referral rate +40% vs CTA chỉ có trong email footer.",
    verdict: "recommend",
    verdictNote: "Low-risk, có thể thêm sau các pattern trên.",
  },
  {
    icon: "🎯",
    title: "Inline Goal Selector (thay cho popup quiz)",
    brands: ["— chưa có brand nào làm đúng"],
    body: "Segmentation quiz nhưng đặt INLINE: 1 section collapsible ở dưới product grid, mặc định đóng, khách chủ động click mở. Copy: 'Bạn đang quan tâm điều gì? → Energy · Focus · Recovery · Women's Health'. Không có discount hook aggressive.",
    impact: "Engagement rate thấp hơn popup (10-15% vs 30-40%) nhưng quality cao hơn gấp 3x vì là khách tự chọn.",
    verdict: "recommend",
    verdictNote: "Đây là phiên bản 'đúng' của quiz segmentation — không block, không forced, không erode brand premium.",
  },
  {
    icon: "⚠️",
    title: "Full-Screen Quiz Popup (pattern trade-off)",
    brands: ["Inno Supps", "Soovera", "Equip Foods"],
    body: "Popup full-screen chặn form tracking ngay khi load, hỏi pain point + offer 5-10% off. Các brand volume lớn chọn pattern này vì math thắng trên số đông: 70% bực bội, 30% engage bù lại.",
    impact: "Email capture rate +35-50% — nhưng đi kèm bounce rate cao hơn, complaint tăng, và không phù hợp brand premium.",
    verdict: "caution",
    verdictNote: "KHÔNG recommend cho Wellness Nest. Lý do: (1) định vị premium — khách nhạy cảm với popup aggressive, (2) Trustpilot đã có complaint về auto-ship 'scam' — thêm popup = đổ dầu vào lửa, (3) traffic chưa đủ lớn để math trade-off có lợi.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: brand card
// ─────────────────────────────────────────────────────────────────────────────

type BrandLike = { name: string; domain: string; images: StaticImageData[] };

function BrandCard({ brand, tone }: { brand: BrandLike; tone: "win" | "mid" | "none" }) {
  const bg =
    tone === "win"
      ? "border-emerald-400/40 bg-emerald-500/5"
      : tone === "mid"
      ? "border-amber-400/30 bg-amber-500/5"
      : "border-rose-400/30 bg-rose-500/5";

  const label =
    tone === "win" ? "Có upsell" : tone === "mid" ? "Tracking only" : "Không có";
  const labelColor =
    tone === "win" ? "text-emerald-300" : tone === "mid" ? "text-amber-300" : "text-rose-300";

  const firstImage = brand.images?.[0];

  return (
    <a
      href={brand.domain}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl border ${bg} backdrop-blur transition hover:scale-[1.02] hover:border-white/40`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover object-top opacity-90 transition group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-white/40">
            No screenshot
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className={`text-[10px] font-semibold uppercase tracking-wider ${labelColor}`}>
          {label}
        </div>
        <div className="text-sm font-medium text-white line-clamp-2">{brand.name}</div>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sections
// ─────────────────────────────────────────────────────────────────────────────

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-6 py-24 md:py-32 ${className}`}>
      {eyebrow && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="mb-12 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function PitchDeck() {
  const [lang, setLang] = useState<Lang>("en");
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState<"all" | "win" | "mid" | "none">("all");

  const counts = useMemo(
    () => ({
      total: BRANDS.length + NOT_UPSELL_TRACKING_PAGE_BRANDS.length + NOT_HAVE_TRACKING_PAGE_BRANDS.length,
      win: BRANDS.length,
      mid: NOT_UPSELL_TRACKING_PAGE_BRANDS.length,
      none: NOT_HAVE_TRACKING_PAGE_BRANDS.length,
    }),
    [],
  );

  const winPct = Math.round((counts.win / counts.total) * 100);
  const midPct = Math.round((counts.mid / counts.total) * 100);
  const nonePct = 100 - winPct - midPct;

  const showWin = filter === "all" || filter === "win";
  const showMid = filter === "all" || filter === "mid";
  const showNone = filter === "all" || filter === "none";

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white antialiased">
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 20% 0%, rgba(16,185,129,0.15), transparent), radial-gradient(ellipse 800px 600px at 80% 100%, rgba(59,130,246,0.1), transparent)",
        }}
      />

      {/* Sticky top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <span className="text-lg">📦</span>
            </div>
            <div>
              <div className="text-sm font-semibold">{t.nav.brand}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">{t.nav.subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
              <a href="#winners" className="transition hover:text-white">{t.nav.winnersLink}</a>
              <a href="#recommend" className="transition hover:text-white">{t.nav.recommendLink}</a>
            </div>
            {/* Language toggle */}
            <div className="flex items-center overflow-hidden rounded-full border border-white/15 text-[10px] font-semibold uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition ${lang === "en" ? "bg-emerald-500 text-black" : "text-white/60 hover:text-white"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`px-3 py-1.5 transition ${lang === "vi" ? "bg-emerald-500 text-black" : "text-white/60 hover:text-white"}`}
              >
                VI
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ───── BLOCK A HIDDEN: Hero + Landscape + Playbook ───── */}
      {false && (
      <>
      {/* ───── HERO ───── */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Internal Pitch · 40 brand market research · Apr 2026
        </div>

        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Trang tracking là{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            kênh marketing
          </span>{" "}
          đang bị bỏ lỡ nhất của <span className="underline decoration-emerald-400/60 decoration-4 underline-offset-8">Wellness Nest</span>.
        </h1>

        <p className="mt-8 max-w-3xl text-lg text-white/70 md:text-xl">
          Mỗi khách mua hàng quay lại trang tracking <strong className="text-white">3-5 lần</strong>,{" "}
          trust cao nhất trong toàn bộ user journey. Nhưng 80% brand wellness vẫn chỉ hiển thị{" "}
          <em className="text-white/90">một cái form trống</em>. Đây là đề xuất biến trang đó thành engine tăng trưởng giá trị đơn hàng trung bình và giá trị vòng đời khách hàng.
        </p>

        {/* Stats */}
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {[
            { label: "Brand researched", value: counts.total, suffix: "" },
            { label: "Có upsell widget", value: counts.win, suffix: `(${winPct}%)`, tone: "emerald" },
            { label: "Chỉ có form trống", value: counts.mid, suffix: `(${midPct}%)`, tone: "amber" },
            { label: "Không có tracking", value: counts.none, suffix: `(${nonePct}%)`, tone: "rose" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{s.label}</div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className={`text-5xl font-bold ${s.tone === "emerald" ? "text-emerald-400" : s.tone === "amber" ? "text-amber-400" : s.tone === "rose" ? "text-rose-400" : "text-white"}`}>
                  {s.value}
                </div>
                {s.suffix && <div className="text-sm text-white/60">{s.suffix}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Opportunity bar */}
        <div className="mt-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="flex h-12 w-full text-xs font-semibold">
            <div
              className="flex items-center justify-center bg-gradient-to-r from-emerald-500/70 to-emerald-400/70"
              style={{ width: `${winPct}%` }}
            >
              {winPct > 8 ? `Có upsell ${winPct}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-gradient-to-r from-amber-500/70 to-amber-400/70"
              style={{ width: `${midPct}%` }}
            >
              {midPct > 8 ? `Tracking-only ${midPct}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-gradient-to-r from-rose-500/70 to-rose-400/70"
              style={{ width: `${nonePct}%` }}
            >
              {nonePct > 8 ? `Không có ${nonePct}%` : ""}
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm text-white/50">
          ⬆ <strong className="text-white">{midPct + nonePct}%</strong> thị trường đang ở sân sau của cơ hội. Mỗi 1% cải thiện tracking UX = 1% khách loyal có lý do quay lại.
        </div>
      </section>

      {/* ───── LANDSCAPE ───── */}
      <Section id="landscape" eyebrow="Market landscape" title="40 brand wellness · Cách họ đang (và không) làm trang tracking">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {(
            [
              { k: "all", label: `All (${counts.total})`, color: "bg-white/10 text-white" },
              { k: "win", label: `🏆 Có upsell (${counts.win})`, color: "bg-emerald-500/20 text-emerald-300" },
              { k: "mid", label: `📄 Tracking only (${counts.mid})`, color: "bg-amber-500/20 text-amber-300" },
              { k: "none", label: `❌ Không có (${counts.none})`, color: "bg-rose-500/20 text-rose-300" },
            ] as const
          ).map((b) => (
            <button
              key={b.k}
              onClick={() => setFilter(b.k)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                filter === b.k ? `${b.color} border-current` : "border-white/10 bg-transparent text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {showWin &&
            BRANDS.map((b) => <BrandCard key={`w-${b.name}`} brand={b} tone="win" />)}
          {showMid &&
            NOT_UPSELL_TRACKING_PAGE_BRANDS.map((b) => <BrandCard key={`m-${b.name}`} brand={b} tone="mid" />)}
          {showNone &&
            NOT_HAVE_TRACKING_PAGE_BRANDS.map((b) => <BrandCard key={`n-${b.name}`} brand={b} tone="none" />)}
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="text-sm font-semibold text-emerald-300">💡 Insight</div>
          <p className="mt-2 text-white/80">
            Chỉ <strong className="text-emerald-400">{counts.win} / {counts.total} brand ({winPct}%)</strong> thực sự biến tracking page thành kênh marketing.{" "}
            Trong đó, 5 brand làm xuất sắc nhất đều có chung một pattern: <strong>quiz segmentation</strong>,{" "}
            <strong>bestseller grid với giá strikethrough</strong>, và <strong>social proof đặt ngay dưới form</strong>.{" "}
            Đây chính là playbook có thể áp dụng ngay cho Wellness Nest.
          </p>
        </div>
      </Section>

      {/* ───── PLAYBOOK ───── */}
      <Section id="playbook" eyebrow="The playbook" title="8 pattern thắng từ các brand Group 1">
        <div className="grid gap-6 md:grid-cols-2">
          {PLAYBOOK.map((p, i) => {
            const recommend = p.verdict === "recommend";
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border p-8 backdrop-blur transition ${
                  recommend
                    ? "border-white/10 bg-white/5 hover:border-emerald-400/30 hover:bg-white/10"
                    : "border-rose-500/30 bg-rose-500/[0.03] hover:border-rose-400/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                        recommend ? "bg-emerald-500/10" : "bg-rose-500/10"
                      }`}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-widest ${
                          recommend ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {recommend ? `Pattern #${i + 1} · Recommend` : "Trade-off · Không khuyến nghị"}
                      </div>
                      <h3 className="text-xl font-bold">{p.title}</h3>
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/70">{p.body}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Đã thấy ở</span>
                  {p.brands.map((b) => (
                    <span
                      key={b}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        recommend
                          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-400/30 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-black/30 p-3 text-xs text-white/70">
                  <span className={`font-semibold ${recommend ? "text-emerald-400" : "text-rose-400"}`}>
                    Impact:{" "}
                  </span>
                  {p.impact}
                </div>
                <div
                  className={`mt-3 rounded-xl border-l-2 p-3 text-xs ${
                    recommend
                      ? "border-emerald-400 bg-emerald-500/5 text-white/80"
                      : "border-rose-400 bg-rose-500/5 text-white/80"
                  }`}
                >
                  <span className={`font-semibold ${recommend ? "text-emerald-400" : "text-rose-400"}`}>
                    {recommend ? "✓ Verdict: " : "⚠ Verdict: "}
                  </span>
                  {p.verdictNote}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      </>
      )}
      {/* ───── END BLOCK A ───── */}

      {/* ───── WINNERS DEEP DIVE (VISIBLE) ───── */}
      <Section id="winners" eyebrow={t.winners.eyebrow} title={t.winners.title}>
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-sm text-white/80">
          {t.winners.intro}
        </div>

        <div className="space-y-16">
          {t.winners.items.map((w, i) => {
            const meta = WINNER_META[i];
            return (
              <div key={w.name} className="grid gap-8 md:grid-cols-5">
                <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={meta.img}
                      alt={w.name}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      placeholder="blur"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="sticky top-28 self-start">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                      {t.winners.winnerPrefix} #{i + 1} · {w.tag}
                    </div>
                    <h3 className="mt-2 text-3xl font-bold md:text-4xl">{w.name}</h3>
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-emerald-400 hover:text-emerald-300"
                    >
                      {meta.url.replace("https://", "")} ↗
                    </a>

                    <ul className="mt-6 space-y-3">
                      {w.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-white/80">
                          <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                            ✓
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-2xl border-l-4 border-emerald-400 bg-emerald-500/5 p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                        {t.winners.appliedLabel}
                      </div>
                      <p className="mt-2 text-white/90">{w.copyable}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ───── BLOCK B HIDDEN: Controversial + WellnessNest current state ───── */}
      {false && (
      <>
      {/* ───── CONTROVERSIAL PATTERNS ───── */}
      <Section
        id="controversial"
        eyebrow="Pattern gây tranh cãi"
        title="3 brand chọn popup chặn form — và tại sao Wellness Nest KHÔNG nên copy"
      >
        <div className="mb-10 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 text-sm text-white/80">
          <strong className="text-rose-300">Lý do đưa vào đây:</strong> Inno Supps, Soovera và Equip Foods đều có{" "}
          <em>số liệu email capture rất cao</em> — đây là sự thật. Nhưng số liệu đó đi kèm trade-off ẩn: bounce rate
          cao hơn, complaint trên social, và tổn hại định vị thương hiệu premium. Với brand volume lớn
          (10M+ visit/năm) thì math vẫn thắng. Với brand tầm Wellness Nest, trade-off không có lợi.
        </div>

        <div className="space-y-10">
          {[
            {
              name: "Inno Supps",
              img: IMAGES.INNOSUPPS,
              url: "https://www.innosupps.com/pages/track-my-order",
              issue: "Popup 'What's Your Biggest Challenge?' full-screen chặn form ngay khi load",
              honestTake:
                "Quiz segment rất thông minh, 5 option pain point rất đúng category. Nhưng vị trí popup là sai — khách vào để xem đơn, bị chặn bởi marketing. Trên traffic lớn math bù lại được, nhưng khách premium sẽ gai mắt.",
              whyNotForWN:
                "Wellness Nest định vị $45-60/sản phẩm, cao hơn Inno Supps 2x. Khách premium tolerance thấp với popup. Cộng thêm Trustpilot đã có complaint về auto-ship 'scam marketing', thêm popup là overkill.",
            },
            {
              name: "Soovera",
              img: IMAGES.SOOVERA,
              url: "https://soovera.com/apps/parcelpanel",
              issue: "Popup full-screen 'You've Got 5% OFF · What are you suffering from?' khi vừa load tracking page",
              honestTake:
                "5% off là discount vừa phải (không erode margin như 20%), quiz 4 pain point thông minh. Nhưng pattern chặn form vẫn là pattern chặn form. Khách 'suffering from sinus infections' không nên bị chặn khi họ chỉ muốn biết thuốc mình đặt đang ở đâu.",
              whyNotForWN:
                "Wellness Nest không phải category pain point khẩn cấp như sinus. Không có lý do đánh aggressive ở moment khách đang lo đơn.",
            },
            {
              name: "Equip Foods",
              img: IMAGES.EQUIPFOODS,
              url: "https://www.equipfoods.com/pages/tracking",
              issue: "Popup 10% off email capture che toàn bộ tracking form",
              honestTake:
                "Hook 10% off mạnh, hình ảnh sản phẩm đẹp, email capture rate chắc chắn cao. Nhưng khách chỉ muốn check đơn nhanh sẽ phải đóng 'No thanks' một cách bực bội.",
              whyNotForWN:
                "Pattern này thắng khi bạn có budget để chấp nhận ~15% khách churn vì annoyance. Wellness Nest chưa ở scale đó.",
            },
          ].map((c, i) => (
            <div key={c.name} className="grid gap-8 md:grid-cols-5">
              <div className="md:col-span-2">
                <div className="overflow-hidden rounded-2xl border border-rose-500/30 bg-white/5">
                  <Image
                    src={c.img}
                    alt={c.name}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                  Trade-off case #{i + 1}
                </div>
                <h3 className="mt-2 text-3xl font-bold md:text-4xl">{c.name}</h3>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-rose-300 hover:text-rose-200"
                >
                  {c.url.replace("https://", "")} ↗
                </a>

                <div className="mt-5 rounded-xl bg-black/30 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                    Vấn đề UX
                  </div>
                  <p className="mt-1 text-sm text-white/80">{c.issue}</p>
                </div>

                <div className="mt-4 rounded-xl bg-black/30 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                    Đánh giá thẳng thắn
                  </div>
                  <p className="mt-1 text-sm text-white/80">{c.honestTake}</p>
                </div>

                <div className="mt-4 rounded-2xl border-l-4 border-rose-400 bg-rose-500/5 p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                    Tại sao Wellness Nest không nên copy
                  </div>
                  <p className="mt-2 text-white/90">{c.whyNotForWN}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-bold">Quy tắc vàng của tracking page UX</h3>
          <p className="mt-3 text-white/70">
            Khách vào tracking page với <strong className="text-white">một mục đích duy nhất</strong>: biết đơn hàng
            đang ở đâu. Bất cứ thứ gì cản trở mục đích đó đều tính là friction — bất kể chỉ số conversion đẹp đến đâu.
          </p>
          <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-xl bg-emerald-500/10 p-4 text-white/90">
              <div className="font-semibold text-emerald-300">✓ Được phép</div>
              <ul className="mt-2 space-y-1 text-white/70">
                <li>• Form tracking luôn là thứ đầu tiên khách thấy khi load</li>
                <li>• Mọi widget upsell đặt DƯỚI form, yêu cầu khách scroll</li>
                <li>• Banner subscription dạng strip nhỏ, dismissible</li>
                <li>• Content education, social proof, bestseller grid — tất cả inline</li>
                <li>• Quiz segmentation dạng collapsible, khách chủ động mở</li>
              </ul>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-4 text-white/90">
              <div className="font-semibold text-rose-300">✗ Tuyệt đối tránh</div>
              <ul className="mt-2 space-y-1 text-white/70">
                <li>• Popup full-screen khi vừa load</li>
                <li>• Interstitial 'You've got X% off' trước tracking form</li>
                <li>• Auto-play video hoặc audio</li>
                <li>• Modal quiz ép khách trả lời trước khi xem đơn</li>
                <li>• Email capture bắt buộc trước khi hiển thị tracking status</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ───── WELLNESSNEST CURRENT STATE ───── */}
      <Section id="wellnessnest" eyebrow="Current state" title="Wellness Nest hiện đang ở đâu?">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-8">
            <div className="text-sm font-semibold text-amber-300">Where we are today</div>
            <h3 className="mt-3 text-2xl font-bold">Group 2 — Có tracking nhưng chưa có upsell</h3>
            <p className="mt-4 text-white/70">
              Wellness Nest đang dùng <strong className="text-white">TrackingMore</strong> qua{" "}
              <code className="rounded bg-black/40 px-2 py-0.5 text-xs">/apps/trackingmore</code>.
              Form tracking hoạt động tốt, nhưng trang chỉ có 1 form + status timeline — không có:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>❌ Product recommendation grid inline</li>
              <li>❌ Social proof / review 5 sao ngay dưới form</li>
              <li>❌ Bundle cross-sell (Shilajit Resin + Gummies)</li>
              <li>❌ UGC video testimonial từ khách thật</li>
              <li>❌ Subscription upgrade CTA dạng banner</li>
              <li>❌ Content education block tận dụng /lab-test-result có sẵn</li>
              <li>❌ Referral link ở footer</li>
            </ul>
            <div className="mt-6 rounded-xl bg-black/30 p-4 text-xs text-white/60">
              Cùng group với 16 brand khác (Mengotomars, Olavita, Alpha Lion, Myoro, Fièra, Balmbare...) — tức là đang <strong>ngang bằng với thị trường trung bình</strong>, chưa có differentiator.
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8">
            <div className="text-sm font-semibold text-emerald-300">Where we could be</div>
            <h3 className="mt-3 text-2xl font-bold">Group 1 — Top 20% brand biến tracking thành growth engine</h3>
            <p className="mt-4 text-white/70">
              Chỉ cần áp dụng 3-4 pattern từ playbook và thêm vào trang hiện có. Wellness Nest có lợi thế so với các brand Group 1:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>✅ Đã có SKU đa segment (Men: Shilajit · Women: MenoMate · Sports: FusiForce)</li>
              <li>✅ Đã có subscription + Gorgias support → dễ tích hợp</li>
              <li>✅ Đã có custom Next.js app (hiện tại đang xem) → full control UI</li>
              <li>✅ Cross-sell rất tự nhiên (Resin → Gummies, Shilajit → Creatine)</li>
              <li>✅ Có lab test + quality page để làm social proof content</li>
            </ul>
            <div className="mt-6 rounded-xl bg-black/30 p-4 text-xs text-white/60">
              Chúng ta không cần đi từ 0. Hạ tầng đã sẵn sàng — chỉ cần thêm <strong>4 widget</strong> vào trang tracking hiện có.
            </div>
          </div>
        </div>
      </Section>

      </>
      )}
      {/* ───── END BLOCK B ───── */}

      {/* ───── RECOMMENDED PRODUCTS (VISIBLE) ───── */}
      <Section id="recommend" eyebrow={t.recommend.eyebrow} title={t.recommend.title}>
        <p className="mb-12 max-w-3xl text-lg text-white/70">{t.recommend.intro}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {t.recommend.products.map((p, i) => {
            const meta = WN_PRODUCT_META[i];
            const isPriority1 = meta.priority === 1;
            const categoryIcon =
              meta.category === "Men"
                ? "♂️"
                : meta.category === "Women"
                ? "♀️"
                : meta.category === "Sports"
                ? "💪"
                : "🔄";
            return (
              <div
                key={meta.handle}
                className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur ${
                  isPriority1
                    ? "border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-transparent"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="absolute right-6 top-6">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black ${
                      isPriority1 ? "bg-emerald-500" : "bg-amber-500/80"
                    }`}
                  >
                    {t.recommend.priorityBadge[meta.priority]}
                  </span>
                </div>
                <div className="flex items-start gap-5">
                  <div className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    {categoryIcon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                      {t.recommend.categoryLabels[meta.category]}
                    </div>
                    <h3 className="mt-1 text-xl font-bold leading-tight">{p.name}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm text-white/80">{p.pitch}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    {t.recommend.crossSellLabel}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.crossSellTo.map((c) => (
                      <span key={c} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                        → {c}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={`https://wellnessnest.co/products/${meta.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-xs text-emerald-400 hover:text-emerald-300"
                >
                  wellnessnest.co/products/{meta.handle} ↗
                </a>
              </div>
            );
          })}
        </div>

        {/* Segmentation matrix — HIDDEN: các angle là hypothesis chưa verify, không có data backing */}
        {false && (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-2xl font-bold">{t.recommend.matrix.title}</h3>
          <p className="mt-2 text-sm text-white/60">{t.recommend.matrix.subtitle}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-white/50">
                  <th className="pb-3 pr-4">{t.recommend.matrix.columns.bought}</th>
                  <th className="pb-3 pr-4">{t.recommend.matrix.columns.primary}</th>
                  <th className="pb-3 pr-4">{t.recommend.matrix.columns.secondary}</th>
                  <th className="pb-3">{t.recommend.matrix.columns.angle}</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {t.recommend.matrix.rows.map((r) => (
                  <tr key={r.bought} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold">{r.bought}</td>
                    <td className="py-3 pr-4 text-emerald-300">{r.primary}</td>
                    <td className="py-3 pr-4 text-white/60">{r.secondary}</td>
                    <td className="py-3 text-white/70">{r.angle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </Section>

      {/* ───── BLOCK C HIDDEN: Roadmap + CTA Footer ───── */}
      {false && (
      <>
      {/* ───── ROADMAP ───── */}
      <Section id="roadmap" eyebrow="Implementation" title="Roadmap 4 tuần · Từ form trống → Group 1">
        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-400/50 to-transparent md:left-1/2" />
          <div className="space-y-12">
            {[
              {
                week: "Tuần 1",
                title: "Bestseller Grid + Social Proof",
                pattern: "The BB Co · Happy Mammoth",
                tasks: [
                  "Render 3 product card (Resin / Gummies / MenoMate hoặc FusiForce) dưới form tracking",
                  "Giá gốc strikethrough + save badge + Shop Now CTA",
                  "2 review 5 sao (lấy từ trang /review-and-testimonial hiện có)",
                  "A/B test: grid đằng sau form vs bên cạnh form",
                ],
                effort: "2-3 dev day",
                metric: "CTR tracking → PDP, tăng giá trị đơn hàng trung bình",
              },
              {
                week: "Tuần 2",
                title: "Segmentation theo order vừa mua",
                pattern: "Tailored recommendation như bảng trên",
                tasks: [
                  "Fetch order line items qua Shopify API (hoặc TrackingMore response)",
                  "Map SKU → primary/secondary cross-sell",
                  "Rotate product card theo bảng segmentation",
                  "Fallback: bestseller grid nếu không detect được",
                ],
                effort: "3-4 dev day",
                metric: "Cross-sell CTR vs generic grid",
              },
              {
                week: "Tuần 3",
                title: "UGC Video Testimonial + Inline Goal Selector",
                pattern: "Rejuveen · (inline pattern riêng)",
                tasks: [
                  "Quay 3-5 video ngắn (30-60s) khách thật kể về ShilaSource/MenoMate",
                  "Embed carousel dưới form tracking — không autoplay, không popup",
                  "Thêm section 'Bạn đang quan tâm điều gì?' (collapsible, mặc định đóng)",
                  "4 option: Energy · Focus · Recovery · Women's Health → dẫn sang collection + sync tag CRM",
                  "Tuyệt đối không dùng popup hay modal che form tracking",
                ],
                effort: "4-5 dev day + thời gian quay video",
                metric: "Video view rate, engagement inline quiz, segment tag coverage",
              },
              {
                week: "Tuần 4",
                title: "Subscription CTA + Content Block",
                pattern: "GNC · Happy Mammoth · Froya Organics",
                tasks: [
                  "Banner 'Chuyển sang subscription save 20%' (nếu khách chưa sub)",
                  "Content block ngắn về quality (link /pages/100-shilajit, /pages/lab-test-result)",
                  "Referral CTA 'Give $10 Get $10' dưới footer",
                  "Analytics hook: track từng widget view + click riêng",
                ],
                effort: "2-3 dev day",
                metric: "Subscription conversion rate, tăng giá trị vòng đời khách hàng",
              },
            ].map((s, i) => (
              <div key={i} className={`relative md:grid md:grid-cols-2 md:gap-8 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                <div className="md:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
                    {s.week}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                  <div className="mt-1 text-sm text-white/50">Copy từ: {s.pattern}</div>
                </div>

                <div className="mt-4 md:mt-0">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <ul className="space-y-2 text-sm text-white/80">
                      {s.tasks.map((t, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="flex-none text-emerald-400">▸</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4 text-[10px] uppercase tracking-widest">
                      <span className="rounded bg-black/40 px-2 py-1 text-white/60">Effort: {s.effort}</span>
                      <span className="rounded bg-emerald-500/10 px-2 py-1 text-emerald-300">Metric: {s.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected outcome */}
        <div className="mt-20 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent p-10">
          <div className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Expected outcome sau 4 tuần</div>
          <h3 className="mt-2 text-3xl font-bold md:text-4xl">
            Wellness Nest từ Group 2 → Group 1
          </h3>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              { label: "Giá trị đơn hàng trung bình", value: "+15-25%", sub: "từ bestseller grid + bundle inline" },
              { label: "Repeat purchase", value: "+20-30%", sub: "từ UGC video testimonial" },
              { label: "Sub conversion", value: "+15-25%", sub: "từ subscription CTA banner" },
              { label: "Support ticket", value: "-20%", sub: "self-service tracking rõ ràng" },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl bg-black/30 p-5">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{m.label}</div>
                <div className="mt-2 text-3xl font-bold text-emerald-400">{m.value}</div>
                <div className="mt-1 text-xs text-white/60">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───── CTA FOOTER ───── */}
      <section className="mx-auto max-w-5xl px-6 pb-32 pt-16 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Tracking page không phải là chi phí{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            support.
          </span>
        </h2>
        <p className="mt-4 text-xl text-white/70">Nó là kênh marketing có ROI cao nhất mà chúng ta chưa khai thác.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wellnessnest.co/apps/trackingmore"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Xem trang tracking hiện tại ↗
          </a>
          <a
            href="#landscape"
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Review 40 brand landscape
          </a>
        </div>
        <div className="mt-16 text-xs text-white/30">
          Internal pitch · Apr 2026 · Based on 40-brand market research · Data in{" "}
          <code>slides_show/investigate/*</code>
        </div>
      </section>
      </>
      )}
      {/* ───── END BLOCK C ───── */}
    </div>
  );
}
