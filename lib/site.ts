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

export const WHATSAPP_URL = `https://wa.me/233244716535?text=${encodeURIComponent(message)}`;

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

/** Drop your own photos into /public/images using these names. */
export const IMAGES = {
  lab: "/images/laboratory.jpg",
  ultrasound: "/images/ultrasound.jpg",
  ecg: "/images/ecg.jpg",
  award: "/images/alba-award.jpeg",
};
