export function waLink(message: string) {
  const phone = "966500000000";

  const text = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${text}`;
}