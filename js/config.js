export const SITE_CONFIG = {
  brand: "Shir7",
  partner: "GFI Connect",
  whatsappNumber: "",
  instagram: "https://www.instagram.com/gficonnect",
  year: new Date().getFullYear(),
};

export const WHATSAPP_MESSAGE =
  "Olá! Tenho interesse na Camisa {produto}. Gostaria de saber tamanhos disponíveis e como funciona a condição especial pela GFI Connect.";

export function buildWhatsAppUrl(productName) {
  const message = WHATSAPP_MESSAGE.replace("{produto}", productName);
  const encoded = encodeURIComponent(message);
  const phone = SITE_CONFIG.whatsappNumber.trim();

  return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}
