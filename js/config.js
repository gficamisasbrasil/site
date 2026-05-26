export const SITE_CONFIG = {
  brand: "Shir7",
  partner: "GFI Connect",
  whatsappNumber: "5541991097071",
  instagram: "https://www.instagram.com/gficonnect",
  year: new Date().getFullYear(),
};

export const WHATSAPP_MESSAGE =
  "olá, gostaria de comprar minha camisa do brasil pelo GFI pay";

export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  const encoded = encodeURIComponent(message);
  const phone = SITE_CONFIG.whatsappNumber.trim();

  return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}
