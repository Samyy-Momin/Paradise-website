# PRD — Paradise English School & Tender Kidz Pre-School Website + Admin Panel
### Internal / Technical — for development use

---

## 1. Project Snapshot

| | |
|---|---|
| **Client** | Paradise English School & Tender Kidz Pre-School |
| **Managed by** | Aariyan's Academy Trust |
| **Slogan** | "Join the Fun, Learn with Love" |
| **Medium** | English |
| **Type** | Co-ed |
| **Active campaign** | Admissions Open — Academic Year 2026–27 |
| **Address** | Bhandari Compound, Waghbil, Balaji Nagar, Opposite Jay Jalaram Medical, Narpoli Gaon, Bhiwandi, Thane, Maharashtra 421302 |
| **Phones** | +91 9607177889 / +91 9607277889 |
| **Hours** | Mon–Sat, 10:00 AM–5:00 PM (Closed Sunday) |
| **Instagram** | [@paradise_english_school](https://www.instagram.com/paradise_english_school/) |
| **Facebook** | Tender Kidz Pre-School / Paradise English School page |
| **Threads** | @paradise_english_school |
| **Logo** | Circular badge — "PARADISE ENGLISH SCHOOL" (top arc) / "TENDER KIDZ PRE-SCHOOL" (bottom arc), "AARIYAN'S ACADEMY TRUST" banner, black graduation-cap + pencil emblem with "PES" lettering in blue/yellow/red, two gold stars. Primary palette to pull from logo: black, gold/yellow, blue, red. |

---

## 2. Goals

1. Rank on Google for local intent searches ("school in Bhiwandi", "pre-school Narpoli Gaon", "English medium school Waghbil Thane").
2. Convert visitors into admission enquiries (primary CTA everywhere).
3. Give non-technical school staff a CMS to manage notices, gallery, and enquiries without a developer.
4. Automate the enquiry → follow-up loop via WhatsApp/SMS so no lead goes cold.
5. Ship a demo-ready v1 fast, then iterate.

---

## 3. Tech Stack

- **Frontend (storefront):** Next.js (App Router), SSG/ISR for marketing pages, Tailwind CSS
- **Admin panel:** Next.js (separate route group or separate app — decide based on auth isolation preference) or a lightweight React SPA served from the same NestJS backend
- **Backend/API:** NestJS + PostgreSQL (Prisma or TypeORM)
- **Auth (admin only):** Better Auth (session-cookie based, Prisma adapter, `admin` plugin for roles) — not hand-rolled JWT
- **Media storage:** Cloudinary (free tier, 25GB)
- **Messaging:** MSG91 (WhatsApp Business API + SMS) — see §7
- **Email:** Zoho Mail free tier or Hostinger mailbox for admin@ / enquiries@
- **Hosting:** containerized — API and Web each ship as Docker images (see TRD.md §4); deploy to any container host (Railway, Render, a VPS with Docker Compose) rather than a platform-specific setup
- **CI/CD:** GitHub Actions

---

## 4. Storefront — Site Map & Page Specs

### 4.1 Home (`/`) — content-rich, not a thin landing page
Sections top to bottom, each pulling from real seeded/admin-managed content, no stock photography:
1. **Hero** — slogan "Join the Fun, Learn with Love", real campus/student photo (Cloudinary), primary CTA "Enquire Now" + secondary "View Gallery"
2. **Sticky admissions banner** — 2026–27 open, dismissible
3. **About snapshot** — 2-3 sentence intro pulled from the "About Tender Kidz Pre School & Paradise English School" material, linking to the full `/about` page
4. **Key Features grid** — experienced faculty, well-rounded curriculum, state-of-the-art facilities, technology integration, safety/security, regular assessments (each as an icon + short line, scannable not paragraph-heavy)
5. **Academic Programs overview** — one card for Tender Kidz (pre-school) and one for Paradise English School (primary+), each linking to its dedicated page
6. **Extracurricular Activities strip** — sports, art & craft, dance & music, debate/public speaking, science & tech clubs (icon row)
7. **Principal/Founder message** — photo + name + designation + a short welcome message (see §4.2a) — this is a trust-building anchor, give it real visual weight, not a small sidebar mention
8. **Parent Involvement** — short section on PTMs, workshops, events (from client material)
9. **Latest Notices** — CMS-driven, latest 3-5
10. **Gallery preview** — 6-8 recent photos across categories, "View Full Gallery" CTA
11. **Testimonials carousel**
12. **FAQ preview** — 3-4 questions (landmark, hours, admission process), "View All FAQs" if more exist
13. **Footer** — address, phone (click-to-call), hours, social icons, sitemap links — repeated on every page

Design direction: the eye should move hero → key features → programs → principal → notices/gallery/testimonials → FAQ, i.e. broad appeal first, trust-building in the middle, proof + answers at the end. Use consistent heading hierarchy (H2 per section) and short scannable bullet lists rather than dense paragraphs — this is a page parents skim, not read line by line.

### 4.2 About Us (`/about`) — the detailed page, Home only summarizes
- Full "About" narrative (institution overview, child-centric approach)
- Key Features as a proper list (not just icons — the full bullet set from client material)
- Academic Programs section (expanded — age groups, structure once confirmed with client)
- Extracurricular Activities (expanded, one paragraph per activity type if content allows)
- Parent Involvement (expanded)
- Aariyan's Academy Trust info
- Vision/Mission
- Management/leadership names (optional photos) — links to the Principal section (§4.2a) if not duplicating it here

### 4.2a Principal/Founder Section
- Photo, name ("Sangeeta Nagvanshi"), designation ("Founder & President"), and a message — admin-editable as a single record (not a list; there's one principal), fields live on the `Settings` model per TRD.md data model. Displayed prominently on Home and again (fuller) on About.

### 4.3 Academics (`/academics`)
- Curriculum overview, medium of instruction
- Grade-wise structure: Pre-school (Tender Kidz) vs Primary (Paradise English School) — clearly differentiate the two brands here
- Teaching methodology

### 4.4 Admissions (`/admissions`) — **highest priority page**
- Process steps (enquiry → visit → document submission → confirmation) — client material confirms a straightforward "visit website or contact office" process; expand into clear numbered steps
- Eligibility/age criteria per grade
- Required documents checklist
- Fee structure (or "Contact for fee details" toggle if trust doesn't want public pricing — confirm with client)
- Downloadable prospectus (PDF, admin-uploadable)
- **Enquiry form** (see §4.10) — embedded directly on this page, not just linked
- 2026–27 admissions-open banner reinforced here
- FAQ block reused here (landmark/hours questions are genuinely admissions-adjacent — "where are you, when can I visit")

### 4.5 Student Life (`/student-life`)
- Day-in-the-life narrative: what a student's day/week looks like across academics + extracurriculars
- Extracurricular Activities in full: sports & physical education, art & craft, dance & music, debates & public speaking, science & technology clubs — each with a short description + gallery photos filtered to relevant categories
- Events highlights (pulls recent Notices tagged as events, or a gallery category like "Annual Day"/"Sports Day")
- Safety/well-being note (CCTV, secure campus — ties to Facilities page without duplicating it fully)

### 4.6 Tender Kidz Pre-School (`/tender-kidz`)
- Dedicated landing page for SEO — separate H1, meta title/description targeting "pre-school Bhiwandi" / "pre-school Narpoli Gaon"
- Age groups (playgroup/nursery/junior KG/senior KG — confirm exact structure with client)
- Facilities specific to pre-school (play area, safety, hygiene)
- Its own mini enquiry CTA

### 4.7 Facilities (`/facilities`)
- Classrooms, play area, safety measures (24/7 CCTV, secure boundaries — from client material), transport (if offered), smart classes/computer labs, interactive digital whiteboards, library, etc.

### 4.8 Faculty (`/faculty`)
- Teacher cards: photo, name, qualification, subject/grade — admin-managed via the Faculty module (same CRUD pattern as everything else in the admin panel; "Faculty" and "Teachers" refer to the same module, use whichever label reads better to the client)

### 4.9 Gallery (`/gallery`) — category-managed, not a hardcoded enum
- Categories are created and named by admin staff (e.g. "Annual Day", "Campus", "Sports Day", "Classroom Activities") — not a fixed list baked into the code, so the school can add new categories as new events happen, matching how their Facebook photo albums are organized
- Photo grid, filterable by category (tabs or dropdown)
- Lightbox viewer
- Alt text required on every image (SEO + accessibility)
- Images uploaded via the admin panel go through Cloudinary (see §7.2 / TRD.md §5.6) — real photos only, no placeholders once live

### 4.10 Events & Notices (`/notices`)
- Chronological list, CMS-driven
- Each notice: title, date, body, optional attachment/image
- Individual notice detail pages (good for long-tail SEO — e.g. "Annual Day 2026 Highlights")

### 4.11 Testimonials (`/testimonials`)
- Parent reviews, schema-marked, moderated via admin before going live

### 4.12 FAQ (`/faq`, plus embedded blocks on Home/Admissions)
- Admin-managed Q&A list (not hardcoded) — seed with the real questions the client already has (nearest landmark, operating hours per day) and add more over time
- Schema-marked (`FAQPage` structured data) — this is genuinely good for SEO, Google often shows FAQ rich results for exactly these kinds of "hours" and "location" questions

### 4.13 Contact (`/contact`)
- Address + embedded Google Map
- Phone (click-to-call), WhatsApp (click-to-chat with prefilled message)
- Hours (day-by-day, per client material — Mon-Sat 10-5, closed Sunday)
- Social links
- Second enquiry form instance

### 4.14 Enquiry Form (component, embedded on Home/Admissions/Tender Kidz/Contact)
Fields (max 5–6):
- Parent name
- Phone number
- Child's age / intended grade
- Branch preference: Paradise English School / Tender Kidz Pre-School
- Message (optional)

On submit:
1. Save to `enquiries` table with status `NEW`
2. Trigger WhatsApp auto-reply (template) to parent
3. Trigger notification (WhatsApp/SMS or in-app) to admission staff
4. Show on-page success confirmation

---

## 5. Admin Panel — Modules

### 5.1 Auth & Roles
- Roles: `SUPER_ADMIN` (trust), `ADMIN` (school staff), `RECEPTIONIST` (enquiry handling only)
- Better Auth session cookie (not a hand-rolled JWT), role guards per route via the `admin` plugin

### 5.2 Enquiry / Lead CRM
- Table view with filters: status, branch, date range
- Pipeline stages: `NEW → CONTACTED → VISIT_SCHEDULED → ADMITTED → LOST`
- Notes/activity log per enquiry
- Manual "send WhatsApp/SMS" action from within a lead record
- Auto-reminder flag: leads stuck >3 days in a stage surface in a "needs follow-up" widget

### 5.3 Content Management (CMS)
- **Notices**: create/edit/delete, schedule publish date, optional image/attachment
- **Gallery Categories**: create/rename/reorder categories (e.g. "Annual Day", "Sports Day", "Campus") — mirrors how the school already organizes photos on Facebook. A category can't be deleted while it still has photos in it.
- **Gallery**: upload photos (via the `/uploads` endpoint → Cloudinary, see §7.2), assign to a category, reorder within category
- **Testimonials**: add/edit, approve/reject toggle before public display
- **Faculty**: add/edit teacher profiles + photo — this is the "Teachers" management the client asked for
- **FAQ**: add/edit/delete/reorder question-answer pairs shown on Home, Admissions, and the dedicated FAQ page
- **Principal/Founder profile**: single editable record (name, designation, message, photo) — not a list, since there's one principal
- **Banners/Homepage hero**: editable hero image + text without a redeploy
- **Prospectus PDF**: upload/replace

### 5.4 Document Generation
- Templates (stored as HTML/PDF templates) for: admission form, fee receipt, ID card
- Generate → download PDF, using enquiry/student data as merge fields

### 5.5 Analytics Dashboard
- Enquiries this month vs last month
- Conversion rate by stage
- Enquiries by branch (school vs pre-school)
- Traffic source (if UTM params captured on enquiry)

### 5.6 Settings
- Contact info, hours, social links (single source of truth — feeds storefront footer)
- Staff/user management (add/remove admin users, assign roles)

---

## 6. Data Model (draft — Prisma-style outline)

```
# User/Session/Account are generated and owned by Better Auth (see TRD.md §5.3)
# — not hand-defined here. Role field (SUPER_ADMIN/ADMIN/RECEPTIONIST) comes
# from Better Auth's admin plugin.
Enquiry          { id, parentName, phone, childAge, branch, message, status, source, createdAt, updatedAt }
EnquiryNote      { id, enquiryId, authorId, note, createdAt }
Notice           { id, title, slug, body, imageUrl, publishAt, createdAt }
GalleryCategory  { id, name, slug, order, createdAt }
GalleryItem      { id, url, categoryId, altText, order, createdAt }
Testimonial      { id, parentName, content, rating, approved, createdAt }
FacultyMember    { id, name, qualification, subjectOrGrade, photoUrl, order }
FAQItem          { id, question, answer, order }
Settings         { id, address, phones, hours, instagramUrl, facebookUrl, threadsUrl,
                    principalName, principalDesignation, principalMessage, principalPhotoUrl }
DocumentTemplate { id, type, templateHtml }
```

---

## 7. Integrations

### 7.1 WhatsApp + SMS (MSG91)
- Use MSG91 WhatsApp Business API (not Twilio — cheaper for India, no USD billing, DLT-friendly)
- Templates needed (submit for Meta approval in advance — approval can take 24–48 hrs):
  - Enquiry acknowledgment (to parent)
  - New lead notification (to staff number)
  - Follow-up reminder (optional, staff-facing)
- SMS as fallback if WhatsApp delivery fails or number isn't on WhatsApp

### 7.2 Cloudinary
- Account cloud name: `dghemsxka` (already provisioned)
- **Uploads go through the backend, not directly from the browser** — the API key/secret stay server-side only (see TRD.md §5.6 for the `/uploads` endpoint design). No unsigned upload preset needed with this approach, since the backend is doing signed/authenticated uploads on the admin's behalf.
- Auto-format + auto-quality on delivery for performance (Cloudinary URL transformation params, e.g. `f_auto,q_auto`)

### 7.3 Google Maps
- Embed via iframe (no API key needed for basic embed) or JS API if custom pin styling wanted

### 7.4 Google Business Profile
- Not part of the codebase, but NAP (Name/Address/Phone) must match exactly across site, GMB, Facebook, Instagram — flag this as a client-side task, not dev task

---

## 8. SEO Requirements (build-time, non-negotiable)

- [ ] SSR/SSG for all marketing pages (no client-only rendering for indexable content)
- [ ] `EducationalOrganization` schema.org JSON-LD on every page (sitewide NAP)
- [ ] Unique `<title>` + meta description per page, targeting local keywords naturally
- [ ] `sitemap.xml` + `robots.txt` generated and submitted to Search Console at launch
- [ ] Image alt text mandatory field in CMS (block save without it, or warn)
- [ ] Core Web Vitals: lazy-load below-fold images, `next/image` everywhere, no unoptimized carousels
- [ ] Mobile-first responsive breakpoints tested at 360px width minimum
- [ ] Review/Testimonial schema markup
- [ ] Canonical URLs set to avoid duplicate content between `www` and non-`www`

---

## 9. Non-Functional Requirements

- Admin panel must be usable by non-technical staff — no jargon, confirm-before-delete on destructive actions
- Enquiry form must work without JS validation being the only gate (server-side validation too)
- All public pages < 2.5s LCP on 4G mobile
- Daily automated DB backup (cron or hosting-provider snapshot)

---

## 10. Build Phases (suggested)

**Phase 1 — Demo/MVP**
Home, Admissions (with enquiry form), Contact, basic CMS (notices + gallery), enquiry CRM table view, WhatsApp auto-reply on enquiry.

**Phase 2**
About, Academics, Tender Kidz landing, Facilities, Faculty, Testimonials, full CRM pipeline stages + reminders.

**Phase 3**
Document generation (admission form/ID card/receipt), analytics dashboard, role-based staff accounts, SEO polish + schema + sitemap submission.

---

## 11. Open Questions for Client

- Exact age-group/grade structure for both branches (Playgroup/Nursery/Jr KG/Sr KG, then Grade 1 onward?)
- Is public fee display okay, or "contact for fees" only?
- Do they want transport/bus service listed as a facility?
- Who will be the admin panel's day-to-day user — front desk staff or trust member? (affects role design)
- Existing photos/videos available, or do we need a shoot?
