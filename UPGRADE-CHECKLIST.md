# Upgrade audit and checklist

## Existing project (audited)
Static HTML/CSS/JS site: 7 pages, 16 sample products in `js/data.js`, localStorage cart and wishlist, no backend, no database.

## Done in this phase
- Configurable taxonomy (`js/taxonomy.js`): all 12 categories and their subcategories. Hide/rename/reorder by editing the file (`hidden`, order, names). Empty categories are hidden from menus (`SHOW_EMPTY=false`).
- Navigation: Home, Shop All, Categories (mega menu), New Arrivals, Best Sellers, Offers, Collections, More (About Us, Contact Us); mobile drawer; announcement bar; header search; wishlist and cart.
- `category.html` (main category and subcategory pages) and `shop.html` (all, search, new, best, offers) share one engine: breadcrumbs, subcategory cards with accurate counts, per-category filters (material, color, style, room, price, discount), multi-select, active chips, clear, sorting, filter state kept in the URL, no-results state, per-page title, description and canonical.
- Contact form: Name, Email, Subject, Message; validation; honeypot; loading state. It reports success ONLY if a configured endpoint accepts the message (`js/config.js`).
- Removed behaviours that broke your rules: fake order success at checkout, star ratings on product pages.
- Product JSON-LD and SKU placeholder on product pages.

## Not done yet (needs backend, credentials or data)
- Backend, database schema and migrations, auth, accounts, addresses, orders, tracking, returns, refunds, notifications.
- Payment gateway (UPI, cards, COD), GST, PIN-code serviceability, server-side pricing and stock.
- Admin panel (all 12 areas), image uploads, rate limiting, webhooks, `.env.example`.
- Pages: account, login, register, password recovery, checkout, confirmation, order pages, FAQs, policies, sitemap, 404, collections and room inspiration.
- Filters needing data: brand, availability, dimensions, thread count, capacity, bulb type, etc. Products have no such fields yet.
- Quick view, image zoom, variants, reviews, Q&A, recently viewed, newsletter, testimonials (only genuine ones).
- Competitor research (IKEA, Wayfair, West Elm, Pepperfry, Myntra, Baymard) was NOT performed; no findings are claimed.
- Sample prices, "was" prices and badges in `data.js` are placeholders. Replace them before launch to avoid false discounts.

## Product photos
The 13 products with photos in `assets/img/products/` use PLACEHOLDER prices and no discounts. Lamps, planters, side table and bookshelf still use illustrated placeholders. Photos 6 and 13 carry other stores' watermarks; use only images you own or are licensed to use.

## Latest update
- Home hero rebuilt: black-and-white background with a cursor-following glow, "LV HOME PRODUCTS" heading, cut-out mustard sofa (`assets/img/hero-sofa.png`). Pure CSS and JS; movement is off for visitors who prefer reduced motion.
- Navigation: each category with products is now its own dropdown listing its subcategories with product counts. If more than 5 categories ever have products, it switches back to the single Categories mega menu.
- 12 new products added from the supplied photos (`js/data.js` ids 30-41, mapped in `js/taxonomy.js`). **Their prices are PLACEHOLDERS with no discounts. Replace before launch.**
- About and Contact pages now have photos; home "Featured products" shows one product per subcategory.
- Photo licensing: bed-carved, bed-platform-wood and some others carry visible store watermarks. Use only images you own or are licensed to use.
- Still illustrated placeholders (no photos supplied): side table, lamps, planters, bookshelf.
- About page claims (5-year warranty, 7-day returns) were not changed. Confirm they are true.
