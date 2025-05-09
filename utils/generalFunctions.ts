export const formatPrice = (price: number) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  if (dollarsAmount !== "$NaN") {
    return dollarsAmount;
  }
};
