/* ============================================================
   AMIN REALTY, INC. — MASTER LISTINGS
   ------------------------------------------------------------
   THIS IS THE ONE FILE YOU EDIT TO ADD OR REMOVE LISTINGS.
   It powers both the full Listings page (listings.html) and the
   "Featured Listings" on the homepage (the ones with featured:true).

   To ADD a listing:    copy a { ... } block, edit the values, done.
   To REMOVE a listing: delete its { ... } block (and the trailing comma).
   To FEATURE on home:  set  featured: true

   Every listing automatically gets its own detail page at
   listing.html?id=<slug>. The homepage cards and the full catalog both
   link to it. The slug comes from the optional `id` field below, or (if
   you omit it) from the title. Nothing else to wire up.

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
     id          OPTIONAL short url-friendly name for this listing's page,
                 e.g. id:"houston-85-key". If omitted, it is generated from
                 the title. Keep it unique and it won't change if you later
                 edit the title (better for links people have bookmarked).
     description OPTIONAL text for the detail page. One string, or an array
                 of strings for multiple paragraphs, e.g.
                   description:[ "First paragraph.", "Second paragraph." ]
                 Omit it and the page shows a sensible default line.
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
    id:"houston-85-key-franchise-hotel",
    title:"85-Key Franchise Hotel", type:"Franchise Hotel", location:"Houston, TX", lat:29.7604, lng:-95.3698,
    status:"Available", price:7900000, priceLabel:"$7,900,000", icon:"hotel", featured:true,
    specs:[["Keys","85"],["Brand","Flagged"],["Year Built","2016"]],
    description:[
      "A well-maintained, nationally flagged select-service hotel in one of Houston's strongest interstate corridors. Built in 2016, the property benefits from a modern prototype, strong brand standards, and steady corporate and leisure demand.",
      "The asset is offered with in-place financing potential and value-add upside through revenue management. A full offering memorandum and trailing financials are available in the deal room."
    ],
    dealRoom:[
      { label:"Offering Memorandum (sample)", file:"documents/SAMPLE-offering-memorandum.txt" },
      { label:"Property Financials (sample)", file:"documents/SAMPLE-property-financials.txt" }
    ]
  },
  {
    id:"san-antonio-42-room-motel",
    title:"42-Room Independent Motel", type:"Independent Motel", location:"San Antonio, TX", lat:29.4241, lng:-98.4936,
    status:"Available", price:2450000, priceLabel:"$2,450,000", icon:"motel", featured:true,
    specs:[["Rooms","42"],["Lot","1.8 ac"],["Cap Rate","9.1%"]],
    description:[
      "A cash-flowing independent motel on a 1.8-acre parcel with excellent visibility and ample parking. In-place operations produce a 9.1% cap rate with room to grow through light renovation and improved online distribution.",
      "Ideal for an owner-operator or a 1031 exchange buyer seeking durable, unbranded roadside hospitality income."
    ],
    dealRoom:[
      { label:"Property Financials (sample)", file:"documents/SAMPLE-property-financials.txt" }
    ]
  },
  {
    id:"katy-highway-frontage-land",
    title:"Highway-Frontage Development Land", type:"Land / Development", location:"Katy, TX", lat:29.7858, lng:-95.8245,
    status:"Available", price:1850000, priceLabel:"$1,850,000", icon:"land", featured:true,
    specs:[["Acres","4.6"],["Zoning","Commercial"],["Frontage","320 ft"]],
    description:"A 4.6-acre commercially zoned development site with 320 feet of highway frontage in fast-growing Katy. Suited to new hospitality, retail, or mixed-use construction, with utilities available to the site and strong daily traffic counts."
  },
  {
    id:"dallas-120-key-select-service",
    title:"120-Key Upscale Select-Service", type:"Franchise Hotel", location:"Dallas, TX", lat:32.7767, lng:-96.797,
    status:"Under Contract", price:14250000, priceLabel:"$14,250,000", icon:"hotel", featured:true,
    specs:[["Keys","120"],["Brand","Upper-Midscale"],["Year Built","2019"]],
    description:"A newer upper-midscale, select-service hotel in the Dallas metro, currently under contract. Contact us to be notified if it returns to market or to discuss comparable assets in our pipeline."
  },
  {
    id:"sugar-land-mixed-use-retail-office",
    title:"Mixed-Use Retail & Office", type:"Commercial", location:"Sugar Land, TX", lat:29.6197, lng:-95.6349,
    status:"Available", price:4600000, priceLabel:"$4,600,000", icon:"commercial", featured:true,
    specs:[["SF","28,000"],["Occupancy","92%"],["Parking","110"]],
    description:"A 28,000-square-foot mixed-use retail and office property in Sugar Land at 92% occupancy. A stable tenant roster and 110 parking spaces make this a dependable commercial income play with modest lease-up upside."
  },
  {
    id:"el-paso-58-room-motel",
    title:"58-Room Roadside Motel", type:"Independent Motel", location:"El Paso, TX", lat:31.7619, lng:-106.485,
    status:"Sold", price:3100000, priceLabel:"$3,100,000", icon:"motel", featured:true,
    specs:[["Rooms","58"],["Lot","2.3 ac"],["Closed","2025"]],
    description:"Sold in 2025. This 58-room roadside motel is shown as a representative closed transaction. Ask us about current opportunities in the El Paso and West Texas markets."
  },
  {
    id:"austin-extended-stay-conversion",
    title:"Extended-Stay Conversion Opportunity", type:"Franchise Hotel", location:"Austin, TX", lat:30.2672, lng:-97.7431,
    status:"Available", price:9750000, priceLabel:"$9,750,000", icon:"hotel",
    specs:[["Keys","98"],["Type","Extended-Stay"],["Cap Rate","8.4%"]],
    description:"A 98-key hotel in Austin positioned for conversion to an extended-stay flag, with an 8.4% in-place cap rate and strong long-stay demand drivers nearby. A compelling value-add repositioning for an experienced operator."
  },
  {
    id:"amarillo-truck-stop-motel-pad",
    title:"Interstate Truck-Stop Motel & Pad", type:"Independent Motel", location:"Amarillo, TX", lat:35.222, lng:-101.8313,
    status:"Available", price:2200000, priceLabel:"$2,200,000", icon:"motel",
    specs:[["Rooms","36"],["Lot","3.1 ac"],["Add'l Pad","Yes"]],
    description:"A 36-room interstate motel on 3.1 acres with an additional buildable pad site, offering both stabilized roadside income and land for future expansion or a complementary use."
  },
  {
    id:"new-orleans-downtown-boutique-hotel",
    title:"Downtown Boutique Hotel", type:"Franchise Hotel", location:"New Orleans, LA", lat:29.9511, lng:-90.0715,
    status:"Under Contract", price:18900000, priceLabel:"$18,900,000", icon:"hotel",
    specs:[["Keys","76"],["Class","Boutique"],["ADR","$210"]],
    description:"A 76-key downtown boutique hotel commanding a $210 ADR, currently under contract. Contact us about similar boutique and lifestyle assets across the Gulf South."
  },
  {
    id:"sugar-land-commercial-strip-center",
    title:"Commercial Strip Center", type:"Commercial", location:"Sugar Land, TX", lat:29.6197, lng:-95.6349,
    status:"Available", price:5400000, priceLabel:"$5,400,000", icon:"commercial",
    specs:[["SF","31,500"],["Occupancy","88%"],["Tenants","11"]],
    description:"A 31,500-square-foot multi-tenant strip center with 11 tenants at 88% occupancy. Diversified rent roll with lease-up and mark-to-market upside in an affluent, high-traffic Sugar Land trade area."
  },
  {
    id:"frisco-hospitality-development-parcel",
    title:"Hospitality Development Parcel", type:"Land / Development", location:"Frisco, TX", lat:33.1507, lng:-96.8236,
    status:"Available", price:3650000, priceLabel:"$3,650,000", icon:"land",
    specs:[["Acres","6.2"],["Zoning","Mixed-Use"],["Utilities","To Site"]],
    description:"A 6.2-acre mixed-use parcel in booming Frisco, entitled for hospitality and complementary uses, with utilities to the site. A rare development-ready position in one of the nation's fastest-growing suburbs."
  },
  {
    id:"texas-limited-service-portfolio",
    title:"Limited-Service Portfolio (3 Assets)", type:"Franchise Hotel", location:"Multiple, TX",
    status:"Available", price:0, priceLabel:"Call for Price", icon:"hotel",
    specs:[["Keys","254 total"],["Assets","3"],["Markets","Secondary"]],
    description:"A three-asset, 254-key limited-service portfolio across Texas secondary markets, available individually or as a package. Priced on request; qualified principals may request a confidential summary."
  }
];
