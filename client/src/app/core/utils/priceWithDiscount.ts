export function priceWithDiscount(price: number, discount: number = 1): number {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
    return Number(price) - discountAmount;
  }