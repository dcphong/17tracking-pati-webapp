Task: Research 40 brand wellness/supplement để phân tích tracking page và khả năng upsell, phục vụ đề xuất nội bộ lên sếp.

## Context dự án
- Working dir: c:\Users\phong\Coding_workspace\PATI\wellnessnest-tracking-order
- Next.js project, đã có cấu trúc sẵn tại slides_show/
- Đọc CLAUDE.md và AGENTS.md trước khi làm.
- Đã có sẵn dữ liệu cho 12 brand đầu (GNC, Happy Mammoth, Froya Organics, Marmens/Mengotomars, Hone Health, Rejuvacare, Luxeresearchlab, Bucked Up, Olavita, Alpha Lion, Tryrosabella, Ellaola) trong:
  - slides_show/brands.ts (3 nhóm: BRANDS có upsell, NOT_UPSELL_TRACKING_PAGE_BRANDS, NOT_HAVE_TRACKING_PAGE_BRANDS)
  - slides_show/domains.ts (URL tracking page)
  - slides_show/images.ts (import screenshot từ slides_show/assets/*.png)
- Screenshot hiện có trong slides_show/assets/ (file .png đặt tên theo brand, vd gnc_1.png, happymammoth_1.png).

## 40 brand cần research (giữ nguyên thứ tự)
1. GNC, 2. Tryrosabella, 3. Rejuvacare, 4. Happy Mammoth, 5. Marmens, 6. Froya, 7. Hone Health, 8. Ellaola, 9. Luxeresearchlab, 10. Bucked Up, 11. Olavita, 12. MuscleFood, 13. Alpha Lion, 14. Primal King, 15. InnoSupps, 16. Ploise, 17. Equip Foods, 18. Ancestral Supplements, 19. Myoro, 20. Fiera Cosmetic, 21. Pendulum, 22. The BB Co, 23. Norse Organics, 24. Balmbare, 25. Truvani, 26. True Protein, 27. Lonvera, 28. Rejuvia, 29. Zenith, 30. Rejuveen, 31. Trynomend, 32. WelleCo, 33. Trysaphire, 34. OmniCreatine, 35. Spnutrition, 36. Zenther, 37. Mivourr, 38. Martinclinic, 39. Blymeskinsystems, 40. Soovera.

## Quy trình cho MỖI brand
1. Mở site chính của brand (google "<brand> official site" nếu không chắc domain).
2. Tìm tracking page theo thứ tự ưu tiên:
   a. Thử các URL chuẩn: /pages/tracking, /apps/track, /apps/parcelpanel, /pages/order-tracking, /account/orders, /check-order, /tools/track.
   b. Tìm link "Track Order" ở footer/header/help center.
   c. Nếu không có, google "<brand> track order" và mở kết quả official.
   d. Nếu brand dùng subdomain AfterShip (vd alphalion.aftership.com), mở subdomain đó.
3. Với tracking page tìm được, CHỤP SCREENSHOT (fullpage) bằng Playwright MCP, lưu vào slides_show/assets/<brand_slug>.png (hoặc <brand_slug>_1.png, _2.png nếu có nhiều khu vực quan trọng: hero, upsell section, product recommendations).
4. Phân loại brand vào 1 trong 3 nhóm:
   - CÓ tracking page + CÓ upsell widget (product recommend, bundle, discount banner, quiz, content marketing...)
   - CÓ tracking page nhưng KHÔNG upsell (chỉ text status, không widget bán hàng)
   - KHÔNG có tracking page public (login-gated, email-only, redirect sang carrier như USPS/UPS)

## Outputs bắt buộc (mỗi brand)
A. File markdown tại slides_show/investigate/<brand_slug>.md, tiếng Việt, cấu trúc:
<Brand Name>
Website: <url>
Tracking URL: <url hoặc "Không có public">
Category: <từ sheet: Women's Wellness / Men's Health / Sports Nutrition...>
Nhóm phân loại: <1/2/3 như trên>
Giới thiệu brand
<2-4 câu về brand, quốc gia, định vị>

Sản phẩm chủ lực
<bullet list 3-6 sản phẩm nổi bật>

Tracking page - Mô tả UI
<mô tả layout: header, form input, status timeline, sections dưới>

Có upsell không? Nếu có, hình thức gì?
<banner, product grid, bundle, quiz, testimonial, content, email capture...>

Vì sao họ chèn widget đó? (phân tích)
<lý do thương mại: tận dụng traffic post-purchase, tăng AOV, giảm support ticket, cross-sell, tái kích hoạt...>

Điểm mạnh của tracking page
<bullet>
Điểm yếu / hạn chế
<bullet>
Screenshot
[Image]



B. Cập nhật slides_show/domains.ts: thêm entry cho brand mới.
C. Cập nhật slides_show/images.ts: import screenshot mới, export trong IMAGES.
D. Cập nhật slides_show/brands.ts: đưa brand vào đúng 1 trong 3 nhóm (BRANDS / NOT_UPSELL_TRACKING_PAGE_BRANDS / NOT_HAVE_TRACKING_PAGE_BRANDS).
E. Với brand ĐÃ có sẵn dữ liệu (12 brand đầu): vẫn viết file md mới, KHÔNG tạo screenshot lại.
F. Với brand KHÔNG có tracking page: vẫn viết file md đầy đủ phần brand + sản phẩm, phần tracking ghi "Không tồn tại public tracking page, khách nhận link qua email carrier trực tiếp" (hoặc lý do thực tế).

## Ràng buộc kỹ thuật
- BẮT BUỘC dùng Playwright MCP (mcp__playwright__browser_*) để chụp screenshot. Nếu tool không có sẵn, DỪNG ngay và báo user restart Claude Code.
- Kiểm tra Playwright có chạy được bằng cách navigate vào https://example.com trước khi bắt đầu brand đầu tiên.
- Mỗi screenshot: fullPage=true, chờ networkidle trước khi chụp.
- Brand slug: lowercase, không dấu, không space (vd "Happy Mammoth" -> "happymammoth", "The BB Co" -> "thebbco").
- KHÔNG commit gì cả cho đến khi user bảo commit.
- Làm tuần tự từng brand, report progress sau mỗi 5 brand.
- Nếu site chặn bot hoặc redirect lạ, ghi nhận vào file md và đi tiếp, đừng bỏ cuộc.

## Pre-flight checklist (làm trước khi động vào brand nào)
1. Đọc CLAUDE.md, AGENTS.md.
2. Đọc slides_show/brands.ts, domains.ts, images.ts để hiểu pattern.
3. Verify Playwright MCP alive bằng 1 lần navigate test.
4. Tạo TodoWrite list 40 brand, mark brand đang làm là in_progress.
5. Bắt đầu brand #1 (GNC) — nhưng vì đã có data, chỉ cần viết file md, không chụp lại.

Bắt đầu ngay khi sẵn sàng