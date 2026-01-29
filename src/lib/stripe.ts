// Stripe placeholder functions
// These will be replaced with real Stripe integration later

export const PRICE_IDS = {
  monthly: "price_monthly_placeholder",
  yearly: "price_yearly_placeholder",
} as const;

export const PRICES = {
  monthly: {
    amount: 30,
    interval: "miesiąc" as const,
  },
  yearly: {
    amount: 250,
    interval: "rok" as const,
    savings: 110, // 30 * 12 = 360, 360 - 250 = 110 zł oszczędności
  },
} as const;

export function calculateYearlySavingsPercent(): number {
  const monthlyTotal = PRICES.monthly.amount * 12;
  const yearlyTotal = PRICES.yearly.amount;
  return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
}

export async function handleCheckout(priceId: string): Promise<void> {
  // Placeholder: Log to console for now
  // Will be replaced with actual Stripe Checkout redirect
  console.log("=================================");
  console.log("STRIPE CHECKOUT PLACEHOLDER");
  console.log(`Price ID: ${priceId}`);
  console.log("This will redirect to Stripe Checkout when configured.");
  console.log("=================================");

  // Simulate a small delay as if we're making an API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would:
  // 1. Call your API to create a Stripe Checkout Session
  // 2. Redirect to the Checkout URL
  // Example:
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ priceId }),
  // });
  // const { url } = await response.json();
  // window.location.href = url;

  alert(
    `Płatność zainicjowana dla: ${priceId}\n\nSprawdź konsolę po szczegóły.\n\nPodłącz klucze Stripe aby włączyć prawdziwe płatności.`
  );
}
