# SolarSquare — AI Solar Savings Estimator & Rooftop Field Test App

SolarSquare is a Next.js web and mobile-ready application designed to help residential electricity consumers (such as MSEDCL / Maharashtra households) estimate rooftop solar system sizing, calculate PM Surya Ghar subsidies, evaluate physical rooftop spots using multimeter readings, and submit site survey or DIY test-kit inquiries.

## Key Features

- **Bill Upload & Solar Calculator**: Upload MSEB electricity bills (PDF/Image) or load instant sample presets (`150`, `240`, `450` Units/month) to estimate required system kW capacity, capital cost, central DBT subsidy, net payable, and break-even payback period.
- **Multilingual Voice & Appliance Load Assistant**: Supports Marathi (`mr-IN`), Hindi (`hi-IN`), and English (`en-IN`) speech recognition alongside conversational text chat to estimate monthly kWh load from home appliances and sync directly to the calculator.
- **Rooftop Field Spot & Multimeter Tester (`#field-test`)**: Log candidate roof spots with tilt angle, compass orientation, open-circuit voltage (`Voc`), short-circuit current (`Isc`), shading notes, and site photos, with an automated visual multi-spot comparison bar chart.
- **PM Surya Ghar & Multi-Scheme Hub (`#schemes`)**: Quick-access hub for PM Surya Ghar: Muft Bijli Yojana, MNRE, MSEDCL Net Metering, and MEDA portals, plus an in-app Registration & Form-Filling Assistant modal.
- **Account Sign-In / Verification**: Interactive authentication modal with Mobile (`+91`) / Email 6-digit OTP verification, Google & Apple account picker flow, and seamless pending-action execution after sign-in.
- **MongoDB-Backed Order / Inquiry Flow (`#order-inquiry`)**: Submit Rooftop Site Survey or DIY Field Test Kit requests persisted to MongoDB via `/api/orders`, alongside downloadable UTF-8 `.csv` calculation reports.
- **Tariff & Source Transparency (`#transparency`)**: Clear breakdown of MSEDCL residential tariff slabs, rooftop budget matrix, and deterministic sizing logic.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/turbopack`)
- **Database**: MongoDB with Mongoose (`lib/mongodb.ts`, `models/Order.ts`)
- **Mobile Packaging**: Capacitor 8 (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`)

## Project Structure

```text
evs-app/
├── app/
│   ├── api/
│   │   ├── orders/route.ts      # POST & GET endpoints for MongoDB Order persistence
│   │   └── scan-bill/route.ts   # Bill OCR API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Main SolarSquare application UI
├── data/
│   └── mseb_mock_data.json      # Reference consumer & tariff dataset
├── lib/
│   └── mongodb.ts               # Cached Mongoose connection helper
├── models/
│   └── Order.ts                 # Mongoose Order schema & model
├── utils/
│   └── solarCalculator.ts       # Deterministic kW sizing, subsidy, and ROI helper
├── capacitor.config.ts          # Capacitor Android/iOS configuration
└── next.config.ts               # Next.js configuration
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (ignored by Git):

```env
MONGODB_URI=your_mongodb_connection_string
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Type Check & Production Build

```bash
npx tsc --noEmit
npm run build
npm run start
```
