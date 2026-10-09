# LuxeHaven | Luxury Real Estate & Living Platform

A modern, responsive, and luxury-focused Real Estate web application built with **React** and **Vite**.

---

## 🌟 Key Features

### 1. Home Page
- **Hero Section**: High-impact luxury architectural hero banner with dark frosted glass overlay.
- **Dynamic Search Bar**: Switch between *Buy* and *Rent*, select destination enclaves, property types, and price ranges.
- **Key Performance Metrics**: Live stats ribbon showing transacted volume ($1.8B+), verified properties, and client satisfaction.
- **Curated Featured Properties**: Tabbed filtering (All, Villas, Penthouses, Waterfront) with luxury badges.
- **Lifestyle & Architectural Styles**: Direct discovery by architectural categories (Hillside Villas, Sky Penthouses, Coastal Waterfronts, Alpine Sanctuaries).
- **The LuxeHaven Advantage**: Highlights off-market inventory, 3D virtual walkthroughs, and private wealth advisory.
- **Executive Advisors Preview**: Leading real estate brokers with direct contact and review metrics.
- **Client Testimonials & Press**: Reviews with star ratings from private equity partners, founders, and collectors.
- **Private Valuation Callout**: Dedicated CTA banner for prospective sellers.

### 2. Property Listings & Multi-Faceted Filters
- **Real-Time Keyword Search**: Filter across titles, cities, addresses, and styles.
- **Purpose Toggle**: Easily view properties For Sale or For Rent.
- **Advanced Filters Drawer/Panel**:
  - Property Type selection
  - Target Market / City
  - Min and Max Price numeric range
  - Bedroom and Bathroom count selector pills
  - Luxury Amenities checklist (Infinity Pool, Smart Home, Wine Cellar, Cinema, Direct Beach Access, Ski-in/Ski-out, etc.)
- **Sorting Options**: Sort by Featured, Price (Low to High), Price (High to Low), Largest Square Footage, or Most Bedrooms.
- **View Modes**: One-click toggle between **3-Column Grid View** and **Horizontal List View**.
- **Active Filter Chips**: Visual tags of all applied filters with 1-click removal and "Reset All Filters" button.

### 3. Property Details Page
- **Breadcrumb Navigation**: Seamless tracking back to all listings or home.
- **Multi-Image Luxury Gallery**: Primary featured photo with thumbnail previews and a **Full-Screen Lightbox Modal** with previous/next controls.
- **Key Residence Specs**: Bed count, Bath count, Square footage, Garage capacity, Year Built, and Lot Size.
- **Architectural Overview & Highlights**: In-depth narrative descriptions with verified amenity checkmarks.
- **Interactive Mortgage Calculator**:
  - Live sliders for Home Price, Down Payment percentage, Interest Rate, and Loan Term (15/30 years).
  - Real-time monthly breakdown (Principal & Interest, Property Tax, Insurance, and HOA dues).
- **Neighborhood & Lifestyle Scores**: Walk Score, Transit Score, Schools Rating, Safety Score, and list of nearby venues.
- **Listing Agent Sidebar**: Direct call, email, and one-click **"Schedule Private Tour"** booking modal.
- **Similar Properties Recommendations**: Tailored listings based on location and architectural style.

### 4. Agent Details & Directory
- **Executive Broker Directory**: Search by advisor name or filter by specialty (Hillside Estates, Manhattan Penthouses, Waterfront, Mountain/Ski).
- **Advisory Metrics**: Career sales volume, industry tenor, active listings, languages spoken, and star ratings.
- **Interactive Agent Modal**: Complete biographical dossier, credentials, listed properties, and direct confidential messaging form.

### 5. Login & Sign Up
- **Tabbed Authentication**: Toggle effortlessly between *Sign In* and *Create Account*.
- **1-Click Instant Demo Login**: Test user flows with pre-configured buyer and investor accounts (*"Demo Buyer"*, *"Demo Investor"*).
- **User Profile State**: Persistent user avatar and name in the navigation bar, with account menu and sign out.

### 6. Contact & Private Concierge
- **Direct Headquarters & Flagships**: Beverly Hills, Manhattan, Miami Beach, and Aspen.
- **Interactive Confidential Inquiry Form**: Custom selection for buying, selling, leasing, or wealth advisory with instant confirmation.
- **Interactive FAQ Accordion**: Expandable answers to client questions regarding private tours, pocket listings, and financing.

### 7. Interactive Extras
- **Favorites / Saved Homes Drawer**: Bookmark properties with heart icon, persisted in `localStorage`.
- **Property Comparison Modal**: Compare up to 3 listings side-by-side across price, price per sq ft, specs, and amenities.
- **Reactive Toast Notifications**: Real-time feedback for saving homes, scheduling tours, submitting inquiries, and comparing.
- **100% Responsive Design**: Fluid typography, mobile navigation drawer, and adaptable flex/grid layouts.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite 8
- **Icons**: Lucide React + Inline SVGs
- **Typography**: Google Fonts (*Outfit* for headlines, *Plus Jakarta Sans* for UI body)
- **Styling**: Vanilla CSS Design System with CSS Custom Properties

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
