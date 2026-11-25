export function calculateSolarRequirement(monthlyUnits: number) {
  const reqKw = Math.ceil(monthlyUnits / 120);
  const cost = reqKw * 55000;
  const sub = reqKw === 1 ? 30000 : reqKw === 2 ? 60000 : reqKw >= 3 ? 78000 : 0;
  return { 
    reqKw, 
    totalCost: cost, 
    subsidy: sub, 
    finalPayable: cost - sub, 
    breakEvenYrs: ((cost - sub) / (monthlyUnits * 8 * 12)).toFixed(1) 
  };
}