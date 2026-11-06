export const SITE = {
  name: "Alba Medical Diagnostic Centre",
  altName: "Alba-Baal Medical Diagnostics",
  address: "Commercial Street, Bolgatanga, Upper East Region, Ghana",
  plusCode: "Q4QV+MW2",
  landmark: "Next to Jumia pick-up office and Get Rich Super Market",
  phonePrimary: { display: "+233 24 471 6535", tel: "+233244716535" },
  phoneSecondary: { display: "+233 20 800 0654", tel: "+233208000654" },
  mapEmbed: "https://www.google.com/maps?q=Q4QV%2BMW2%20Commercial%20Road%20Bolgatanga%20Ghana&z=17&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Q4QV%2BMW2%20Commercial%20Road%20Bolgatanga%20Ghana",
} as const;

const message =
  "Hello Alba Medical Diagnostic Centre, I would like to book an appointment. " +
  "Service needed: \nPreferred day and time: \nMy name: ";

export const WHATSAPP_NUMBER = "233244716535";

/** Build a WhatsApp chat link with a prefilled message. */
export function whatsappLink(body: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

export const WHATSAPP_URL = whatsappLink(message);

/** Opening and closing hour (24h) by JS day index, 0 = Sunday. null = closed. */
export const SCHEDULE: ([number, number] | null)[] = [
  null,
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 15],
];

export const HOURS_ROWS = [
  { days: "Monday to Friday", time: "8:00 AM – 5:00 PM", dayIdx: [1, 2, 3, 4, 5] },
  { days: "Saturday", time: "8:00 AM – 3:00 PM", dayIdx: [6] },
  { days: "Sunday", time: "Closed", dayIdx: [0] },
];

/** Laboratory menu, grouped by discipline. Prices are given in person or on WhatsApp, not published here. */
export const LAB_TESTS = [
  {
    group: "Haematology",
    tests: [
      "Full Blood Count (FBC)",
      "Blood Film for Malaria",
      "Sickling Test",
      "Hb Electrophoresis",
      "ESR",
      "Hb Only",
      "Full ANC",
      "Widal Test",
      "Blood Group",
      "Pregnancy Test",
      "Rheumatoid Factor",
      "G-6-PD",
      "Coomb's Test",
      "Blood Film for Microfilaria",
      "Skin Snip for Microfilaria",
    ],
  },
  {
    group: "Bacteriology & Parasitology",
    tests: [
      "Urine RE",
      "Stool RE",
      "High Vaginal Swab (HVS) RE",
      "Culture & Sensitivity (Urine)",
      "Gram Stain",
      "Semen Analysis",
      "Stool Occult Blood (FOB)",
      "Semen C/S",
      "H. pylori Antigen (Stool)",
      "H. pylori Antibody (Blood)",
      "Gonorrhoea",
      "Chlamydia",
      "Skin Scraping for Fungal",
    ],
  },
  {
    group: "External & referral tests",
    tests: [
      "Hepatitis B Viral Load",
      "Hepatitis C Viral Load",
      "HIV Viral Load",
      "Blood C/S",
      "Specimen for Biopsy",
    ],
  },
  {
    group: "Biochemistry & Serology",
    tests: [
      "Hepatitis B (Rapid)",
      "Hepatitis B Full Profile",
      "Hepatitis C (Rapid)",
      "Syphilis (Rapid)",
      "HIV Screen (Rapid)",
      "Typhoid IgG/IgM",
      "Vaccination",
      "HIV Confirmation (Oral Quick)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (RFT) + Electrolytes",
      "Lipid Profile",
      "Cardiac Profile",
      "Cholesterol",
      "Uric Acid",
      "Fasting / Random Blood Sugar (FBS/RBS)",
      "CMT",
      "OGTT",
      "2hr Post Prandial (HPP)",
      "Thyroid Hormones (TSH, T3, T4)",
      "Thyroid Hormones (Each)",
      "Female Hormones (EST, PRG, PRL, LH, FSH)",
      "Female Hormones (Each)",
      "B-HCG",
      "Male Hormones (test)",
      "Troponin",
      "C-Reactive Protein (CRP)",
      "Prostate (PSA) Quantitative",
      "Electrolytes (Na+, K+, Cl-)",
      "Urea",
      "Creatinine (Cr)",
      "Calcium (Ca)",
      "Magnesium (Mg)",
      "Phosphorous (P)",
      "Glycosylated Haemoglobin (HbA1c)",
    ],
  },
] as const;

/** Drop your own photos into /public/images using these names. */
export const IMAGES = {
  lab: "/images/lab-scientist-africa.jpg",
  ultrasound: "/images/ultrasound-scan-africa.jpg",
  ecg: "/images/ecg-electrodes-closeup.jpg",
  award: "/images/alba-award.jpeg",
};
