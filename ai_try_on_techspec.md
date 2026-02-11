# AI Try-On Web App — Technical Specification (MVP)

> Privacy-first AI fashion try-on web application that generates an approximate preview of how clothing looks on a user’s body.

---

## 1. Goals & Non-Goals

### Goals (MVP)
- Upload full-body photo + clothing image
- Generate 1 realistic try-on preview in ~15–30s
- Simple, guided UX
- Strong privacy guarantees (auto-delete)
- Scalable metered usage

### Non-Goals (Out of MVP)
- 100% photorealism guarantee
- Video / AR / real-time try-on
- Multi-angle poses
- Pants/dresses (tops only for MVP)

---

## 2. System Architecture (High Level)

```
Browser (Next.js)
   ↓ HTTPS
API Gateway (Node.js)
   ↓
Image Intake & Validation
   ↓
AI Processing Pipeline
   ↓
Post-processing
   ↓
Result Delivery
```

---

## 3. Tech Stack

### Frontend
- Framework: Next.js (App Router)
- Styling: Tailwind CSS + shadcn/ui
- State: React hooks
- Image handling: client-side preview + compression

### Backend
- Runtime: Node.js (or Bun)
- Framework: Express / Hono / Fastify
- API: REST (MVP) or tRPC
- Auth: Email magic link / OAuth (optional MVP)

### AI / ML
- Human Parsing: MediaPipe / DensePose
- Pose Estimation: OpenPose / MediaPipe
- Virtual Try-On: CP-VTON / VITON (pre-trained)
- Image Gen: Stable Diffusion + ControlNet
- Inference: GPU instance (cloud)

### Storage
- Temporary object storage (S3-compatible)
- Encrypted at rest
- Auto-delete after TTL (e.g., 24h)

### Database
- PostgreSQL
- Tables: users, jobs, usage, plans

### Payments
- Stripe / Polar
- Metered billing + subscription

---

## 4. Core User Flow

1. User uploads body photo
2. User uploads clothing image or product URL
3. System validates & moderates images
4. AI pipeline generates try-on preview
5. Result shown with before/after slider
6. Assets auto-deleted after TTL

---

## 5. AI Processing Pipeline

### Input
- Body image (front-facing)
- Clothing image (front view)

### Steps
1. Content moderation
2. Background removal
3. Body segmentation & keypoints
4. Clothing segmentation
5. Cloth warping & alignment
6. Image generation
7. Color & lighting correction

### Output
- 1–3 generated images (PNG/JPEG)
- Medium resolution (MVP)

---

## 6. API Endpoints (MVP)

### POST /tryon/job
- Create try-on job
- Inputs: body_image, clothing_image

### GET /tryon/job/:id
- Poll job status

### GET /tryon/result/:id
- Fetch generated result

### POST /billing/upgrade
- Upgrade plan / add credits

---

## 7. Data Privacy & Security

- HTTPS everywhere
- Images encrypted at rest
- Auto-delete images after 24 hours
- No training on user images without explicit consent
- Access scoped per user

---

## 8. Content Safety Rules

Blocked inputs:
- Nudity / sexual content
- Children
- Multiple people
- Non-human images

Automated moderation before AI processing

---

## 9. Monetization Model

### Plans
- Free: 2 try-ons/day (watermarked)
- Starter: 20/month
- Pro: 100/month + priority queue
- Business: API access

### Metered Usage
- Credit deducted per generation
- Hard cap per billing cycle

---

## 10. Performance Targets

- Upload → result: ≤ 30s
- API response latency: < 300ms
- Job failure rate: < 5%

---

## 11. Logging & Monitoring

- Job status logs
- Error tracking (Sentry)
- Usage metrics per user
- GPU utilization monitoring

---

## 12. MVP Roadmap

### Phase 1
- Single pose
- Tops only
- Web app

### Phase 2
- Multi pose
- Seller catalog
- API for e-commerce

---

## 13. Legal Disclaimer (Required)

> AI-generated previews are approximations and may differ from real-world results.
> Uploaded images are used only for preview generation and automatically deleted.

