// Indian Rupee (INR - ₹) Formatting Utilities

export function formatINR(amount: number, includeDecimals: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  if (includeDecimals) {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function formatINRCompact(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} L`;
  }

  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }

  return `₹${amount.toLocaleString('en-IN')}`;
}
