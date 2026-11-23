export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  overview: string;
  indications: string[];
  whatWeExamine: string[];
  preparation: string[];
  turnaroundTime: string;
  paymentNotice: string;
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "ultrasound-scan",
    title: "Color Doppler Ultrasound Scans in Bolgatanga",
    shortTitle: "Color Doppler Ultrasound",
    badge: "Imaging & Radiology",
    metaTitle: "Color Doppler Ultrasound Scans in Bolgatanga | Alba Medical",
    metaDescription:
      "High-resolution color Doppler ultrasound imaging in Bolgatanga. Abdominal, pelvic, prostate, breast, and vascular scans with instant doctor-ready reports.",
    keywords: [
      "ultrasound scan Bolgatanga",
      "Doppler scan Upper East",
      "abdominal ultrasound Bolgatanga",
      "pelvic scan Bolgatanga",
      "prostate scan Bolgatanga",
      "sonogram Ghana",
    ],
    overview:
      "Our ultrasound unit utilizes high-resolution color Doppler sonography to non-invasively visualize internal organs, soft tissue structures, and vascular blood flow. Reports are interpreted with high precision and delivered promptly for your clinician.",
    indications: [
      "Unexplained abdominal or pelvic pain",
      "Digestive issues, gallstones, or liver evaluation",
      "Urinary tract difficulties, kidney stones, or prostate assessment",
      "Breast lumps or soft tissue swellings",
      "Vascular circulation and deep vein assessments",
    ],
    whatWeExamine: [
      "Abdominal & Abdomino-pelvic structures (Liver, Gallbladder, Kidneys, Spleen)",
      "Male Pelvis & Prostate gland volume calculation",
      "Female Pelvic scan (Uterus, Endometrium, Ovaries)",
      "Breast & Thyroid small-part sonography",
      "Color Doppler blood flow evaluation",
    ],
    preparation: [
      "Abdominal scans: Fast for 6 to 8 hours prior to the test (water is permitted unless instructed otherwise).",
      "Pelvic & Prostate scans: Drink 3 to 4 glasses of water 1 hour before the scan and do not empty your bladder.",
      "Bring any previous scan reports or doctor's referral notes.",
    ],
    turnaroundTime: "Images and printed diagnostic report provided immediately following the scan.",
    paymentNotice: "NHIS card accepted for covered clinical indications, cash, and Mobile Money.",
    faqs: [
      {
        question: "Is ultrasound painful or dangerous?",
        answer:
          "No. Ultrasound uses safe high-frequency sound waves, not radiation. It is completely painless, safe for all ages, and safe during pregnancy.",
      },
      {
        question: "Do I need a doctor's referral for an ultrasound?",
        answer:
          "While a doctor's referral is helpful, walk-in patients seeking diagnostic scans are also welcomed and given full reports.",
      },
      {
        question: "How long does the scan take?",
        answer:
          "A typical scan takes between 15 and 30 minutes, followed by immediate report preparation.",
      },
    ],
  },
  {
    slug: "pregnancy-ultrasound",
    title: "Obstetric & Pregnancy Ultrasound Scans in Bolgatanga",
    shortTitle: "Pregnancy & Obstetric Scan",
    badge: "Maternal Health",
    metaTitle: "Obstetric & Pregnancy Ultrasound in Bolgatanga | Alba Medical",
    metaDescription:
      "Accurate pregnancy ultrasound in Bolgatanga. First-trimester dating, anomaly screening, placenta location, amniotic fluid, and fetal Doppler blood flow.",
    keywords: [
      "pregnancy scan Bolgatanga",
      "antenatal ultrasound Upper East",
      "baby scan Bolgatanga",
      "fetal Doppler Ghana",
      "due date scan Bolgatanga",
      "obstetric ultrasound Ghana",
    ],
    overview:
      "Comprehensive obstetric sonography designed to support expectant mothers and midwives through every trimester. From early pregnancy dating to late-trimester fetal wellbeing and umbilical Doppler assessments.",
    indications: [
      "First-trimester gestational dating and estimated due date (EDD) verification",
      "Evaluation of early pregnancy bleeding or viability",
      "Second-trimester anatomical and growth review",
      "Placental localization to screen for placenta praevia",
      "Amniotic fluid volume assessment and fetal positioning",
      "Umbilical cord Doppler blood flow evaluation",
    ],
    whatWeExamine: [
      "Crown-Rump Length (CRL) and gestational age calculation",
      "Fetal heartbeat and cardiac activity confirmation",
      "Biparietal diameter (BPD), Femur length (FL), and Abdominal circumference (AC)",
      "Placental maturity and distance from the internal cervical os",
      "Amniotic fluid index (AFI) for oligohydramnios or polyhydramnios detection",
    ],
    preparation: [
      "First Trimester (under 12 weeks): Drink 2 to 3 glasses of water 1 hour before and arrive with a comfortably full bladder.",
      "Second & Third Trimester: Standard hydration is fine; an excessively full bladder is usually not required.",
      "Wear comfortable two-piece clothing for easy abdominal exposure.",
    ],
    turnaroundTime: "Complete ultrasound report and printed scan thermal images provided immediately.",
    paymentNotice: "NHIS card accepted with valid ANC registration, cash, and Mobile Money.",
    faqs: [
      {
        question: "Can an ultrasound determine my baby's sex?",
        answer:
          "Yes, fetal sex can typically be identified with good accuracy from around 18 to 20 weeks onward, depending on fetal position.",
      },
      {
        question: "How many pregnancy scans should I have?",
        answer:
          "Most clinical guidelines recommend at least an early dating scan (first trimester), a mid-pregnancy anomaly check (18–22 weeks), and a third-trimester growth/placenta assessment.",
      },
    ],
  },
  {
    slug: "ecg-test",
    title: "12-Lead Resting ECG Heart Monitoring in Bolgatanga",
    shortTitle: "12-Lead ECG Monitoring",
    badge: "Cardiovascular Diagnostics",
    metaTitle: "Resting 12-Lead ECG Test in Bolgatanga | Alba Medical",
    metaDescription:
      "Fast, painless 12-lead resting ECG in Bolgatanga. Screen for hypertension heart strain (LVH), arrhythmias, palpitations, and ischaemia with instant doctor reports.",
    keywords: [
      "ECG test Bolgatanga",
      "electrocardiogram Upper East",
      "heart test Bolgatanga",
      "hypertension heart scan Ghana",
      "arrhythmia test Bolgatanga",
      "cardiac test Bolgatanga",
    ],
    overview:
      "A resting 12-lead electrocardiogram (ECG) measures the electrical activity of your heart with precision electrodes. Essential for hypertensive patients, individuals experiencing palpitations or chest tightness, and routine cardiovascular check-ups.",
    indications: [
      "Hypertension (high blood pressure) heart strain assessment (Left Ventricular Hypertrophy)",
      "Heart palpitations, irregular fluttering, or rapid pulse",
      "Unexplained dizziness, lightheadedness, or fainting episodes",
      "Chest tightness, shortness of breath on exertion, or chronic fatigue",
      "Pre-operative medical clearance and baseline cardiovascular assessment",
    ],
    whatWeExamine: [
      "Heart rate and sinus rhythm regularity",
      "Atrial fibrillation and dangerous arrhythmias",
      "Conduction blocks and bundle branch delays",
      "Left Ventricular Hypertrophy (LVH) voltage patterns",
      "Signs of reduced coronary blood flow or myocardial ischaemia",
    ],
    preparation: [
      "Wear a comfortable shirt or blouse that can be easily unbuttoned or opened at the chest.",
      "Avoid caffeine or heavy physical exertion 1 hour before the test.",
      "Continue taking your prescribed blood pressure medications unless your doctor explicitly directed otherwise.",
    ],
    turnaroundTime: "The ECG trace is recorded in under 10 minutes; printed strip and report delivered promptly.",
    paymentNotice: "NHIS card accepted for eligible clinician orders, cash, and Mobile Money.",
    faqs: [
      {
        question: "Does an ECG deliver an electric shock?",
        answer:
          "No. The ECG only records the tiny natural electrical impulses produced by your own heart muscle. It is 100% painless and harmless.",
      },
      {
        question: "Why do I need an ECG if my blood pressure machine shows my pulse?",
        answer:
          "A blood pressure cuff only counts beats per minute. An ECG provides the actual electrical waveform, showing heart muscle thickening, rhythm disorders, and ischaemic changes that arm cuffs cannot see.",
      },
    ],
  },
  {
    slug: "medical-laboratory-tests",
    title: "Medical Laboratory Tests & Health Panels in Bolgatanga",
    shortTitle: "Medical Laboratory Tests",
    badge: "Clinical Laboratory",
    metaTitle: "Medical Laboratory Tests in Bolgatanga | Alba Medical Diagnostic",
    metaDescription:
      "Licensed medical laboratory in Bolgatanga. Haematology, biochemistry, infectious diseases, hormone assays, and urine/stool testing. NHIS accredited.",
    keywords: [
      "medical laboratory Bolgatanga",
      "blood test Bolgatanga",
      "lab tests Upper East",
      "NHIS lab tests Bolgatanga",
      "clinical lab Bolgatanga",
      "full blood count Ghana",
    ],
    overview:
      "HeFRA-licensed and NHIS-accredited medical laboratory operated by certified Medical Laboratory Scientists. We process blood, urine, stool, and other biological fluids using modern automated analyzers to ensure reliable diagnostic outcomes.",
    indications: [
      "Routine annual preventive health screenings",
      "Clinician diagnostic requests and hospital referrals",
      "Pre-employment, university entry, and visa medical certificates",
      "Monitoring chronic medical conditions (Diabetes, Hypertension, Liver/Kidney disease)",
      "Acute fevers, infections, and digestive complaints",
    ],
    whatWeExamine: [
      "Haematology: Full Blood Count (FBC), Sickling status, Hb Electrophoresis, ESR, G-6-PD",
      "Biochemistry: Liver Function Tests (LFT), Renal Function Tests (RFT), Electrolytes, Lipid Profile",
      "Endocrinology: Thyroid hormones (TSH, T3, T4), Reproductive hormones, PSA",
      "Serology & Infectious Diseases: Hepatitis B/C, HIV, Syphilis, Helicobacter pylori",
      "Microbiology: Routine Urinalysis, Stool RE, Culture and Sensitivity tests",
    ],
    preparation: [
      "Fasting blood tests (FBS, Lipid Profile): Fast for 8 to 12 hours overnight; drink water freely.",
      "Urine tests: A fresh early-morning mid-stream urine sample is preferred.",
      "Bring any existing prescription, doctor's request form, or NHIS card.",
    ],
    turnaroundTime: "Routine blood and urine results ready same-day (most within 1 to 2 hours). Specialized referral panels provided according to assay schedule.",
    paymentNotice: "NHIS card accepted for all approved tariff items, cash, and Mobile Money.",
    faqs: [
      {
        question: "Can I do lab tests without a doctor's request?",
        answer:
          "Yes. We offer self-requested routine health screening packages (like Full Blood Count, Liver/Kidney profiles, and infectious disease screenings).",
      },
      {
        question: "Are your laboratory results accepted at regional and teaching hospitals?",
        answer:
          "Yes. Alba Medical is fully licensed by HeFRA and accredited by the Allied Health Professions Council. Our reports are recognized across hospitals in Ghana.",
      },
    ],
  },
  {
    slug: "hepatitis-b-screening",
    title: "Hepatitis B Screening, Profile & Vaccination in Bolgatanga",
    shortTitle: "Hepatitis B Testing & Care",
    badge: "Infectious Disease & Liver",
    metaTitle: "Hepatitis B Test & Screening in Bolgatanga | Alba Medical",
    metaDescription:
      "Confidential Hepatitis B rapid screening, 5-panel profile, and viral load diagnostics in Bolgatanga. Safe vaccination and liver health monitoring.",
    keywords: [
      "Hepatitis B test Bolgatanga",
      "Hep B vaccine Ghana",
      "Hepatitis B profile Bolgatanga",
      "liver viral load Upper East",
      "Hep B surface antigen test",
    ],
    overview:
      "Hepatitis B is highly endemic across Northern Ghana, often progressing silently for decades without symptoms. Early detection through precision screening protects your liver from cirrhosis and primary liver cancer.",
    indications: [
      "Routine screening for all adolescents and adults",
      "Antenatal screening for expectant mothers to prevent mother-to-child transmission",
      "Family members or partners of Hepatitis B positive individuals",
      "Healthcare workers and individuals with occupational exposure",
      "Pre-vaccination antibody status confirmation",
    ],
    whatWeExamine: [
      "HBsAg (Surface Antigen) rapid and quantitative detection",
      "Full 5-Panel Hepatitis Profile (HBsAg, HBsAb, HBeAg, HBeAb, HBcAb)",
      "Liver Function Tests (ALT, AST, Bilirubin, Albumin) to evaluate liver inflammation",
      "Hepatitis B DNA Viral Load testing (via referral partner network)",
    ],
    preparation: [
      "No special fasting is required for a simple Hepatitis B rapid test or antibody panel.",
      "If paired with a comprehensive Liver Function Test, minimal 4-hour fasting is recommended.",
      "Testing is strictly confidential and performed in a supportive environment.",
    ],
    turnaroundTime: "Rapid Hepatitis B screening results in 15 to 30 minutes; full profile panels same day.",
    paymentNotice: "NHIS accepted where covered, cash, and Mobile Money.",
    faqs: [
      {
        question: "What happens if I test negative for Hepatitis B?",
        answer:
          "If you test negative with no protective antibodies, we recommend receiving the 3-dose Hepatitis B vaccination series to achieve lifelong immunity.",
      },
      {
        question: "Does a positive Hepatitis B test mean liver failure?",
        answer:
          "No. Most people diagnosed early live long, healthy lives. A complete profile and viral load determine if medical treatment or periodic monitoring is needed.",
      },
    ],
  },
  {
    slug: "malaria-and-typhoid-test",
    title: "Accurate Malaria Microscopy & Typhoid Testing in Bolgatanga",
    shortTitle: "Malaria & Typhoid Testing",
    badge: "Fever & Parasitology",
    metaTitle: "Accurate Malaria & Typhoid Testing in Bolgatanga | Alba Medical",
    metaDescription:
      "Avoid misdiagnosis. Expert microscopic blood film for malaria parasites and evidence-based typhoid diagnostics in Bolgatanga. Stop unnecessary antibiotics.",
    keywords: [
      "malaria test Bolgatanga",
      "typhoid test Bolgatanga",
      "blood film for malaria parasites",
      "Widal test accuracy Ghana",
      "fever lab test Upper East",
    ],
    overview:
      "In Ghana, patients with acute fever are frequently told they have 'malaria and typhoid' simultaneously based on flawed rapid slide tests. At Alba Medical, we emphasize gold-standard microscopic examination and evidence-based serology to identify the true cause of your fever.",
    indications: [
      "Acute fever, chills, persistent headaches, or body aches",
      "Suspected malaria not responding to over-the-counter ACTs",
      "Severe abdominal cramps, persistent nausea, or gastrointestinal distress",
      "Prolonged unexplained fever or recurrent weakness",
    ],
    whatWeExamine: [
      "Giemsa-stained thick and thin blood films for definitive malaria parasite confirmation and species identification",
      "Malaria parasite density count per microliter of blood",
      "Typhoid IgM/IgG rapid antibody assays and clinical correlation",
      "Full Blood Count (FBC) to differentiate viral from bacterial infections",
    ],
    preparation: [
      "No fasting required. It is best to test as soon as fever or symptoms emerge, preferably before self-medicating with antibiotics.",
    ],
    turnaroundTime: "Malaria blood film and FBC results ready in 30 to 45 minutes.",
    paymentNotice: "NHIS card accepted, cash, and Mobile Money.",
    faqs: [
      {
        question: "Why does the Widal test often give false positives?",
        answer:
          "The classic Widal test detects circulating antibodies that can linger for months after an old exposure or cross-react with other febrile illnesses. We use microscopic blood films and clinical correlation to ensure you only take antibiotics when genuinely necessary.",
      },
      {
        question: "Can I test if I have already started taking malaria drugs?",
        answer:
          "Yes, but inform our laboratory scientists which medications you have taken, as they can affect parasite numbers.",
      },
    ],
  },
  {
    slug: "kidney-and-diabetes-screening",
    title: "Kidney Function & Diabetes Screening in Bolgatanga",
    shortTitle: "Kidney & Diabetes Screening",
    badge: "Metabolic Health",
    metaTitle: "Kidney Function & Diabetes Screening in Bolgatanga | Alba Medical",
    metaDescription:
      "Catch silent organ strain early. HbA1c 3-month blood sugar, Serum Creatinine, eGFR, and Urine Microalbumin tests in Bolgatanga. Protect your kidneys.",
    keywords: [
      "diabetes test Bolgatanga",
      "HbA1c test Ghana",
      "kidney function test Bolgatanga",
      "creatinine eGFR test Upper East",
      "urine microalbumin screening",
    ],
    overview:
      "Both diabetes and chronic kidney disease develop silently for years before causing noticeable symptoms. Our metabolic screening panel measures average 3-month blood sugar and detects microscopic protein leakage before irreversible kidney damage happens.",
    indications: [
      "Individuals with Type 1 or Type 2 diabetes",
      "Hypertensive patients needing annual kidney screening",
      "Individuals aged 40+ or with a family history of diabetes or kidney failure",
      "Unexplained fatigue, ankle puffiness, or changes in urination",
      "Frequent users of NSAID painkillers or herbal medicines",
    ],
    whatWeExamine: [
      "Glycated Hemoglobin (HbA1c) — 3-month continuous glucose control",
      "Serum Creatinine and Blood Urea Nitrogen (BUN)",
      "Estimated Glomerular Filtration Rate (eGFR) filtration score",
      "Serum Electrolytes (Sodium, Potassium, Chloride)",
      "Urine Microalbumin and total protein-to-creatinine ratio",
    ],
    preparation: [
      "HbA1c testing does NOT require fasting.",
      "If a Fasting Blood Sugar (FBS) or Lipid Profile is included, fast for 8 to 10 hours overnight.",
      "Bring an early morning mid-stream urine sample in a sterile container (available at our desk).",
    ],
    turnaroundTime: "Routine kidney profile and HbA1c results delivered same-day (typically within 2 to 3 hours).",
    paymentNotice: "NHIS card accepted for covered items, cash, and Mobile Money.",
    faqs: [
      {
        question: "What is the difference between a daily sugar test and HbA1c?",
        answer:
          "A finger-prick measures your glucose at that exact second. The HbA1c measures how much sugar attached to your red blood cells over the last 90 to 120 days, giving your doctor an uncheatable 3-month average.",
      },
      {
        question: "How does a urine test check my kidneys?",
        answer:
          "Healthy kidney filters keep protein inside your blood. When kidneys are strained, microscopic amounts of albumin leak into the urine. Catching this early allows treatments that halt the damage.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
