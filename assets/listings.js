/* ============================================================
   AMIN REALTY, INC. — MASTER LISTINGS
   ------------------------------------------------------------
   THIS IS THE ONE FILE YOU EDIT TO ADD OR REMOVE LISTINGS.
   It powers both the full Listings page (listings.html) and the
   "Featured Listings" on the homepage (the ones with featured:true).

   To ADD a listing:    copy a { ... } block, edit the values, done.
   To REMOVE a listing: delete its { ... } block (and the trailing comma).
   To FEATURE on home:  set  featured: true

   FIELD REFERENCE
     title       text shown as the listing name
     type        MUST be one of: "Franchise Hotel" | "Independent Motel"
                 | "Land / Development" | "Commercial"
     location    e.g. "Houston, TX"
     status      "Available" | "Under Contract" | "Sold"
     price       number only, no $ or commas (used for filtering/sorting)
     priceLabel  the text shown, e.g. "$7,900,000"  (use "Call for Price")
     icon        "hotel" | "motel" | "land" | "commercial"
     image       OPTIONAL "https://.../photo.jpg" — shows a real photo
                 (alt text is generated automatically). Omit to use the icon.
     featured    OPTIONAL true to also show it on the homepage
     specs       up to ~4 pairs of [ "Label", "Value" ]
     lat, lng    OPTIONAL coordinates. Adding them drops a glowing pin for
                 this listing on the homepage map ("Nationwide Reach");
                 removing them (or the listing) removes the pin. Get numbers
                 from Google Maps: right-click the property -> first menu row.
     dealRoom    OPTIONAL list of gated files for this listing. When present,
                 the card shows a "View Deal Room" button; visitors enter
                 first name, last name, and email (logged like signatures)
                 and then see these links. Upload ANY file types you want
                 (PDF, Excel, photos, zip, ...) to the documents/ folder —
                 or use a full https:// URL — and list them here:
                   dealRoom: [
                     { label:"Offering Memorandum (PDF)", file:"documents/my-om.pdf" },
                     { label:"T-12 Financials (Excel)",   file:"documents/my-t12.xlsx" }
                   ]
   ============================================================ */
window.AMIN_LISTINGS = [
  {
    title:"85-Key Franchise Hotel", type:"Franchise Hotel", location:"Houston, TX", lat:29.7604, lng:-95.3698,
    status:"Available", price:7900000, priceLabel:"$7,900,000", icon:"hotel", featured:true,
    specs:[["Keys","85"],["Brand","Flagged"],["Year Built","2016"]],
    dealRoom:[
      { label:"Offering Memorandum (sample)", file:"documents/SAMPLE-offering-memorandum.txt" },
      { label:"Property Financials (sample)", file:"documents/SAMPLE-property-financials.txt" }
    ]
  },
  {
    title:"42-Room Independent Motel", type:"Independent Motel", location:"San Antonio, TX", lat:29.4241, lng:-98.4936,
    status:"Available", price:2450000, priceLabel:"$2,450,000", icon:"motel", featured:true,
    specs:[["Rooms","42"],["Lot","1.8 ac"],["Cap Rate","9.1%"]],
    dealRoom:[
      { label:"Property Financials (sample)", file:"documents/SAMPLE-property-financials.txt" }
    ]
  },
  {
    title:"Highway-Frontage Development Land", type:"Land / Development", location:"Katy, TX", lat:29.7858, lng:-95.8245,
    status:"Available", price:1850000, priceLabel:"$1,850,000", icon:"land", featured:true,
    specs:[["Acres","4.6"],["Zoning","Commercial"],["Frontage","320 ft"]]
  },
  {
    title:"120-Key Upscale Select-Service", type:"Franchise Hotel", location:"Dallas, TX", lat:32.7767, lng:-96.797,
    status:"Under Contract", price:14250000, priceLabel:"$14,250,000", icon:"hotel", featured:true,
    specs:[["Keys","120"],["Brand","Upper-Midscale"],["Year Built","2019"]]
  },
  {
    title:"Mixed-Use Retail & Office", type:"Commercial", location:"Sugar Land, TX", lat:29.6197, lng:-95.6349,
    status:"Available", price:4600000, priceLabel:"$4,600,000", icon:"commercial", featured:true,
    specs:[["SF","28,000"],["Occupancy","92%"],["Parking","110"]]
  },
  {
    title:"58-Room Roadside Motel", type:"Independent Motel", location:"El Paso, TX", lat:31.7619, lng:-106.485,
    status:"Sold", price:3100000, priceLabel:"$3,100,000", icon:"motel", featured:true,
    specs:[["Rooms","58"],["Lot","2.3 ac"],["Closed","2025"]]
  },
  {
    title:"Extended-Stay Conversion Opportunity", type:"Franchise Hotel", location:"Austin, TX", lat:30.2672, lng:-97.7431,
    status:"Available", price:9750000, priceLabel:"$9,750,000", icon:"hotel",
    specs:[["Keys","98"],["Type","Extended-Stay"],["Cap Rate","8.4%"]]
  },
  {
    title:"Interstate Truck-Stop Motel & Pad", type:"Independent Motel", location:"Amarillo, TX", lat:35.222, lng:-101.8313,
    status:"Available", price:2200000, priceLabel:"$2,200,000", icon:"motel",
    specs:[["Rooms","36"],["Lot","3.1 ac"],["Add'l Pad","Yes"]]
  },
  {
    title:"Downtown Boutique Hotel", type:"Franchise Hotel", location:"New Orleans, LA", lat:29.9511, lng:-90.0715,
    status:"Under Contract", price:18900000, priceLabel:"$18,900,000", icon:"hotel",
    specs:[["Keys","76"],["Class","Boutique"],["ADR","$210"]]
  },
  {
    title:"Commercial Strip Center", type:"Commercial", location:"Sugar Land, TX", lat:29.6197, lng:-95.6349,
    status:"Available", price:5400000, priceLabel:"$5,400,000", icon:"commercial",
    specs:[["SF","31,500"],["Occupancy","88%"],["Tenants","11"]]
  },
  {
    title:"Hospitality Development Parcel", type:"Land / Development", location:"Frisco, TX", lat:33.1507, lng:-96.8236,
    status:"Available", price:3650000, priceLabel:"$3,650,000", icon:"land",
    specs:[["Acres","6.2"],["Zoning","Mixed-Use"],["Utilities","To Site"]]
  },
  {
    title:"Limited-Service Portfolio (3 Assets)", type:"Franchise Hotel", location:"Multiple, TX",
    status:"Available", price:0, priceLabel:"Call for Price", icon:"hotel",
    specs:[["Keys","254 total"],["Assets","3"],["Markets","Secondary"]]
  }
];
