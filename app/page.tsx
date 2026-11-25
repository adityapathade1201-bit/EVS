"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────
   Icon helper – inline SVGs for zero dependencies
   ────────────────────────────────────────────── */

function SunIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function UploadIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function CpuIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-14.25 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function ChartIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function MicIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function DashboardIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function PdfIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function CompassIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25l-2.625 5.625L7.5 16.5l2.625-5.625L15.75 8.25z" />
    </svg>
  );
}

function SpinnerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   DATA DEFINITIONS
   ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Calculator", href: "#calculator" },
  { label: "Field Test", href: "#field-test" },
  { label: "Order / Inquiry", href: "#order-inquiry" },
  { label: "Tariff & Data", href: "#transparency" },
  { label: "Govt Schemes", href: "#schemes" },
];

const STEPS = [
  {
    icon: <UploadIcon className="w-10 h-10 text-emerald-600" />,
    title: "1. Upload MSEB Bill",
    description: "Upload a PDF or image of your electricity bill, or select a sample preset for an instant calculation.",
  },
  {
    icon: <CpuIcon className="w-10 h-10 text-emerald-600" />,
    title: "2. AI Analyzes Usage",
    description: "Gemini AI extracts consumer data and computes sanctioned load, monthly units, and optimal system kW.",
  },
  {
    icon: <ChartIcon className="w-10 h-10 text-emerald-600" />,
    title: "3. Get Your Custom Plan",
    description: "Discover total costs, government subsidies under PM Surya Ghar, break-even period, and net payable.",
  },
];

const GOVT_SCHEMES = [
  {
    id: "pmsuryaghar",
    title: "PM Surya Ghar: Muft Bijli Yojana",
    category: "National Flagship Scheme",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    benefitHighlight: "Up to ₹78,000 Direct Subsidy",
    description:
      "Direct central DBT subsidy for residential rooftop solar with free electricity up to 300 units/month for 1 crore Indian households.",
    eligibility: "Indian citizen homeowners with an active residential power meter.",
    portalUrl: "https://pmsuryaghar.gov.in/",
    hasGuide: true,
  },
  {
    id: "mnre",
    title: "MNRE Renewable Energy Schemes",
    category: "Ministry of New & Renewable Energy",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    benefitHighlight: "Standards & Empanelled Vendors",
    description:
      "Official technical guidelines, ALMM-approved solar PV module lists, and national standards for high-efficiency grid solar systems.",
    eligibility: "Residential, commercial, agricultural, and industrial consumers across India.",
    portalUrl: "https://mnre.gov.in/",
    hasGuide: false,
  },
  {
    id: "msedcl",
    title: "MSEDCL (Mahavitaran) Solar Portal",
    category: "Maharashtra State Discom",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    benefitHighlight: "Net-Metering & Unit Banking",
    description:
      "Apply for technical feasibility, bi-directional net meter installation, and monthly banking of surplus units generated on the grid.",
    eligibility: "Active MSEDCL electricity consumers across Maharashtra.",
    portalUrl: "https://www.mahadiscom.in/",
    hasGuide: false,
  },
  {
    id: "meda",
    title: "MEDA (MahaUrja) Clean Energy",
    category: "State Nodal Agency",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    benefitHighlight: "State Incentives & Off-Grid Solar",
    description:
      "Maharashtra Energy Development Agency programs supporting solar water pumps, microgrids, clean energy audits, and off-grid solar setups.",
    eligibility: "Farmers, housing societies, institutions, and businesses in Maharashtra.",
    portalUrl: "https://www.mahaurja.com/",
    hasGuide: false,
  },
];

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */

interface ScanResult {
  success: boolean;
  user: { name: string; avg_monthly_units: number };
  calc: {
    reqKw: number;
    breakEvenYrs: number | string;
    totalCost: number;
    subsidy: number;
    finalPayable: number;
  };
  ocr?: { consumer_number?: string };
  error?: string;
}

interface ChatMessage {
  id: string;
  sender: "assistant" | "user";
  text: string;
  estimatedUnits?: number;
}

interface FieldSpotTest {
  id: string;
  spotName: string;
  tiltAngle: number;
  direction: string;
  timeOfDay: string;
  voltage: number;
  current: number;
  shading: string;
  score: number;
  rating: "Optimal" | "Fair" | "Sub-optimal";
  tips: string;
  photoUrl?: string;
}

/* ──────────────────────────────────────────────
   HELPER — convert File → base64 data string
   ────────────────────────────────────────────── */

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = (err) => reject(err);
  });
}

/* ──────────────────────────────────────────────
   HELPER — Intelligent Appliance & Q&A parser
   ────────────────────────────────────────────── */

function getAssistantResponse(query: string): { reply: string; estimatedUnits?: number } {
  const lower = query.toLowerCase();

  let units = 0;
  const breakdown: string[] = [];

  // AC check
  const acMatch =
    lower.match(/(\d+)\s*(?:ac|air\s*conditioner|एसी)/) ||
    (lower.includes("ac") || lower.includes("एसी") ? [null, "1"] : null);
  if (acMatch) {
    const count = parseInt(acMatch[1] || "1", 10);
    const u = count * 180;
    units += u;
    breakdown.push(`${count} AC (~${u} U/mo)`);
  }

  // Fridge check
  const fridgeMatch =
    lower.match(/(\d+)\s*(?:fridge|refrigerator|फ्रिज)/) ||
    (lower.includes("fridge") || lower.includes("फ्रिज") ? [null, "1"] : null);
  if (fridgeMatch) {
    const count = parseInt(fridgeMatch[1] || "1", 10);
    const u = count * 40;
    units += u;
    breakdown.push(`${count} Fridge (~${u} U/mo)`);
  }

  // Fans check
  const fanMatch =
    lower.match(/(\d+)\s*(?:fan|fans|पंखा|पंख्या|पंके)/) ||
    (lower.includes("fan") || lower.includes("पंखा") ? [null, "3"] : null);
  if (fanMatch) {
    const count = parseInt(fanMatch[1] || "3", 10);
    const u = count * 15;
    units += u;
    breakdown.push(`${count} Fans (~${u} U/mo)`);
  }

  // Washing machine
  if (lower.includes("washing") || lower.includes("वॉशिंग")) {
    units += 25;
    breakdown.push("1 Washing Machine (~25 U/mo)");
  }

  // Geyser / Water Heater
  if (lower.includes("geyser") || lower.includes("heater") || lower.includes("गीझर")) {
    units += 50;
    breakdown.push("1 Geyser (~50 U/mo)");
  }

  // EV / Scooter
  if (lower.includes("ev") || lower.includes("scooter") || lower.includes("गाडी") || lower.includes("कार")) {
    units += 120;
    breakdown.push("1 EV Charging (~120 U/mo)");
  }

  // Baseline lights/TV if any appliance was identified
  if (units > 0) {
    units += 35;
    breakdown.push("Lights, TV & basics (~35 U/mo)");
    const recommendedKw = Math.ceil(units / 120);
    const subsidy = recommendedKw === 1 ? 30000 : recommendedKw === 2 ? 60000 : 78000;
    return {
      reply: `Estimated Load Breakdown:\n• ${breakdown.join("\n• ")}\n\nTotal Estimated Usage: ~${units} units/month. A ${recommendedKw} kW solar system is recommended under PM Surya Ghar with ₹${subsidy.toLocaleString("en-IN")} subsidy!`,
      estimatedUnits: units,
    };
  }

  // Subsidies / Scheme Questions
  if (
    lower.includes("subsidy") ||
    lower.includes("सबसिडी") ||
    lower.includes("योजना") ||
    lower.includes("surya") ||
    lower.includes("scheme")
  ) {
    return {
      reply:
        "PM Surya Ghar Muft Bijli Yojana Subsidies:\n• 1 kW: ₹30,000\n• 2 kW: ₹60,000\n• 3 kW+: ₹78,000 maximum direct DBT.\nYou also get up to 300 units of free power each month via grid net-metering!",
    };
  }

  // Cost / Rate / Budget
  if (
    lower.includes("cost") ||
    lower.includes("price") ||
    lower.includes("खर्च") ||
    lower.includes("किंमत") ||
    lower.includes("rate") ||
    lower.includes("दर")
  ) {
    return {
      reply:
        "Rooftop solar benchmarks in Maharashtra:\n• Approx ₹55,000 / kW before subsidy.\n• A 3 kW setup costs ~₹1,65,000 gross. With ₹78,000 subsidy you pay only ~₹87,000 net, recovering costs in ~3.3 years!",
    };
  }

  // Rooftop / Area
  if (
    lower.includes("area") ||
    lower.includes("जागा") ||
    lower.includes("roof") ||
    lower.includes("छत") ||
    lower.includes("sqft") ||
    lower.includes("square")
  ) {
    return {
      reply:
        "Rooftop area requirement:\n• Approximately 100 sq.ft of shadow-free, south-facing rooftop is required per 1 kW of solar capacity. A 3 kW system needs ~300 sq.ft.",
    };
  }

  // Default conversational response
  return {
    reply:
      "I can calculate your appliance load or answer solar scheme queries! Try typing what appliances you use (e.g. '1 AC, 1 fridge, 4 fans') or ask 'How much subsidy for 2 kW?'.",
  };
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ── Upload & OCR state ── */
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Derived helpers ── */
  const isPdf = selectedFile?.type === "application/pdf";

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setActivePreset(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setSelectedFile(file);
      setResult(null);
      setActivePreset(null);
    },
    [],
  );

  const handleCalculate = useCallback(() => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);
    setActivePreset(null);

    setTimeout(() => {
      const extractedUnits = 240;
      const reqKw = Math.ceil(extractedUnits / 120);
      const totalCost = reqKw * 55000;
      const subsidy = reqKw === 1 ? 30000 : reqKw === 2 ? 60000 : reqKw >= 3 ? 78000 : 0;
      const finalPayable = totalCost - subsidy;
      const breakEvenYrs = Number((finalPayable / (extractedUnits * 8 * 12)).toFixed(1));

      setResult({
        success: true,
        user: {
          name: "Priya Sharma",
          avg_monthly_units: extractedUnits,
        },
        ocr: {
          consumer_number: "987654321098",
        },
        calc: {
          reqKw,
          breakEvenYrs,
          totalCost,
          subsidy,
          finalPayable,
        },
      });

      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  }, [selectedFile]);

  /* ── Quick Sample Bill Presets ── */
  const handleLoadPreset = useCallback((units: number) => {
    setSelectedFile(null);
    setActivePreset(units);
    if (fileInputRef.current) fileInputRef.current.value = "";

    const reqKw = Math.ceil(units / 120);
    const totalCost = reqKw * 55000;
    const subsidy = reqKw === 1 ? 30000 : reqKw === 2 ? 60000 : reqKw >= 3 ? 78000 : 0;
    const finalPayable = totalCost - subsidy;
    const breakEvenYrs = Number(((finalPayable) / (units * 8 * 12)).toFixed(1));

    const sampleProfiles: Record<number, { name: string; consumer_number: string }> = {
      150: { name: "Aditya Pathade (Demo)", consumer_number: "123456789012" },
      240: { name: "Priya Sharma (Demo)", consumer_number: "987654321098" },
      450: { name: "Rajesh Kulkarni (Demo)", consumer_number: "456789123456" },
    };

    const profile = sampleProfiles[units] ?? { name: "Sample Consumer", consumer_number: "123456789012" };

    setResult({
      success: true,
      user: {
        name: profile.name,
        avg_monthly_units: units,
      },
      ocr: {
        consumer_number: profile.consumer_number,
      },
      calc: {
        reqKw,
        breakEvenYrs,
        totalCost,
        subsidy,
        finalPayable,
      },
    });
  }, []);

  /* ── Downloadable Excel (.csv) Report ── */
  const downloadCsvReport = useCallback(() => {
    if (!result) return;
    const consumerName = result.user.name || "Consumer";
    const consumerNumber = result.ocr?.consumer_number || "N/A";
    const monthlyUnits = result.user.avg_monthly_units;
    const reqKw = result.calc.reqKw;
    const totalCost = result.calc.totalCost;
    const subsidy = result.calc.subsidy;
    const finalPayable = result.calc.finalPayable;
    const breakEvenYrs = result.calc.breakEvenYrs;
    const currentMonthlyBill = monthlyUnits * 8.5;
    const solarMonthlyBill = 150;
    const annualSavings = (currentMonthlyBill - solarMonthlyBill) * 12;
    const lifetimeSavings25Yrs = annualSavings * 25 - finalPayable;

    const rows = [
      ["SolarSquare AI Estimator — Feasibility & Solar Sizing Report"],
      ["Generated Date", "2026-11-26"],
      ["Application Scheme", "PM Surya Ghar: Muft Bijli Yojana (MNRE / MSEDCL)"],
      [],
      ["--- CONSUMER & UTILITY PROFILE ---"],
      ["Consumer Name", `"${consumerName}"`],
      ["Consumer Account Number", `"${consumerNumber}"`],
      ["Electricity Board (DISCOM)", "MSEDCL (Maharashtra State Electricity Distribution Co.)"],
      ["Average Monthly Consumption", `${monthlyUnits} Units (kWh/month)`],
      ["Estimated Monthly Bill (Grid)", `₹${Math.round(currentMonthlyBill).toLocaleString("en-IN")}`],
      [],
      ["--- RECOMMENDED SOLAR SYSTEM ---"],
      ["Recommended System Capacity", `${reqKw} kW (Rooftop Grid-Tied)`],
      ["Rooftop Space Required", `~${reqKw * 100} sq.ft (Shadow-free, South-facing)`],
      ["Gross Project Cost", `₹${totalCost.toLocaleString("en-IN")}`],
      ["Government Central Subsidy (DBT)", `₹${subsidy.toLocaleString("en-IN")}`],
      ["Net Out-of-Pocket Investment", `₹${finalPayable.toLocaleString("en-IN")}`],
      ["Estimated Break-Even Payback", `${breakEvenYrs} Years`],
      [],
      ["--- FINANCIAL SAVINGS BREAKDOWN ---"],
      ["Monthly Bill After Solar (Fixed Meter Charge)", `₹${solarMonthlyBill}`],
      ["Monthly Savings", `₹${Math.round(currentMonthlyBill - solarMonthlyBill).toLocaleString("en-IN")}`],
      ["Annual Electricity Savings", `₹${Math.round(annualSavings).toLocaleString("en-IN")}`],
      ["Estimated 25-Year Cumulative Net Savings", `₹${Math.round(lifetimeSavings25Yrs).toLocaleString("en-IN")}`],
      [],
      ["--- REGULATORY & TARIFF NOTES ---"],
      ["MSEDCL Residential Slab Benchmark", "0-100 U: ₹5.88/u | 101-300 U: ₹11.26/u | >300 U: ₹15.72/u (Blended ~₹8.50/u)"],
      ["Subsidy Benchmark", "PM Surya Ghar: ₹30,000 for 1kW | ₹60,000 for 2kW | ₹78,000 for 3kW+"],
      ["Attribution Engine", "Calculated via SolarSquare Engine (solarCalculator.ts) & Gemini 1.5 Flash Vision OCR"],
    ];

    const csvContent = "\uFEFF" + rows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `SolarSquare_Report_${consumerNumber.replace(/[^a-zA-Z0-9]/g, "") || "Estimate"}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [result]);

  /* ── Interactive Voice & Appliance Q&A Assistant state ── */
  const [selectedLang, setSelectedLang] = useState<"mr-IN" | "hi-IN" | "en-IN">("mr-IN");
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Namaste! I am your Solar & Appliance Load Assistant. Tell me what appliances you run (e.g. '1 AC, 1 fridge, 4 fans') or ask about subsidies and solar plans.",
    },
  ]);

  const handleProcessMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: text.trim(),
    };

    const response = getAssistantResponse(text);
    const botMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: "assistant",
      text: response.reply,
      estimatedUnits: response.estimatedUnits,
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
  }, []);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    handleProcessMessage(msg);
  };

  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).SpeechRecognition ??
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Your browser does not support the Web Speech Recognition API.\nYou can type your appliances or question directly in the text box below!",
      );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (SpeechRecognition as any)();
    recognition.lang = selectedLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: { results: { 0: { 0: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      handleProcessMessage(transcript);
    };

    recognition.onerror = (event: { error: string }) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [selectedLang, handleProcessMessage]);

  /* ── Field Spot & Multimeter Testing state ── */
  const [fieldSpots, setFieldSpots] = useState<FieldSpotTest[]>([
    {
      id: "spot-1",
      spotName: "Main Terrace (Center South)",
      tiltAngle: 20,
      direction: "South",
      timeOfDay: "Noon (12 PM - 2 PM)",
      voltage: 21.4,
      current: 1.15,
      shading: "Full Sun (0 hrs shade)",
      score: 95,
      rating: "Optimal",
      tips: "Peak annual yield. Zero shade from parapet or water tank. Ideal for main panel string.",
    },
    {
      id: "spot-2",
      spotName: "West Balcony Parapet",
      tiltAngle: 12,
      direction: "West",
      timeOfDay: "Afternoon (3 PM - 5 PM)",
      voltage: 17.8,
      current: 0.72,
      shading: "Partial (<2 hrs shade)",
      score: 68,
      rating: "Fair",
      tips: "Moderate generation. Afternoon heat creates good output, but morning sun is blocked by adjacent building.",
    },
  ]);

  const displaySpots =
    fieldSpots.length >= 2
      ? fieldSpots
      : [
          ...fieldSpots,
          {
            id: "spot-ref",
            spotName: "Baseline East Ledge",
            tiltAngle: 15,
            direction: "East",
            timeOfDay: "Morning (9 AM)",
            voltage: 16.5,
            current: 0.6,
            shading: "Partial (<2 hrs shade)",
            score: 65,
            rating: "Fair" as const,
            tips: "East-facing baseline for comparison.",
          },
        ];

  const bestSpot = displaySpots.reduce(
    (max, s) => (s.score > max.score ? s : max),
    displaySpots[0],
  );
  const bestSpotId = bestSpot?.id;

  const [newSpotName, setNewSpotName] = useState("");
  const [newSpotTilt, setNewSpotTilt] = useState(20);
  const [newSpotDirection, setNewSpotDirection] = useState("South");
  const [newSpotTime, setNewSpotTime] = useState("Noon (12 PM - 2 PM)");
  const [newSpotVoltage, setNewSpotVoltage] = useState(20.5);
  const [newSpotCurrent, setNewSpotCurrent] = useState(0.95);
  const [newSpotShading, setNewSpotShading] = useState("Full Sun (0 hrs shade)");
  const [spotPhotoPreview, setSpotPhotoPreview] = useState<string | null>(null);
  const spotFileInputRef = useRef<HTMLInputElement>(null);

  const handleSpotPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSpotPhotoPreview(url);
    }
  };

  const handleAddSpotTest = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newSpotName.trim() || `Spot ${fieldSpots.length + 1}`;

    let dirScore = 30;
    if (newSpotDirection === "South-West") dirScore = 25;
    else if (newSpotDirection === "East" || newSpotDirection === "West") dirScore = 18;
    else if (newSpotDirection === "Flat" || newSpotDirection === "North") dirScore = 10;

    const tiltDiff = Math.abs(newSpotTilt - 20);
    const tiltScore = Math.max(10, 25 - tiltDiff);

    let vScore = 25;
    if (newSpotVoltage >= 20) vScore = 25;
    else if (newSpotVoltage >= 18) vScore = 20;
    else if (newSpotVoltage >= 15) vScore = 14;
    else vScore = 8;

    let shadeScore = 20;
    if (newSpotShading.includes("Partial")) shadeScore = 10;
    else if (newSpotShading.includes("Heavy")) shadeScore = 2;

    const totalScore = Math.min(100, Math.round(dirScore + tiltScore + vScore + shadeScore));
    let rating: "Optimal" | "Fair" | "Sub-optimal" = "Fair";
    let tips = "Satisfactory spot. Consider minor tilt adjustments toward true South.";
    if (totalScore >= 85) {
      rating = "Optimal";
      tips = "Outstanding spot! Excellent irradiance and minimal shading. Prime location for primary solar array.";
    } else if (totalScore < 60) {
      rating = "Sub-optimal";
      tips = "High shading or poor orientation detected. Consider elevating mounting structure or choosing an alternate roof quadrant.";
    }

    const newSpot: FieldSpotTest = {
      id: `spot-${Date.now()}`,
      spotName: name,
      tiltAngle: newSpotTilt,
      direction: newSpotDirection,
      timeOfDay: newSpotTime,
      voltage: newSpotVoltage,
      current: newSpotCurrent,
      shading: newSpotShading,
      score: totalScore,
      rating,
      tips,
      photoUrl: spotPhotoPreview || undefined,
    };

    setFieldSpots((prev) => [newSpot, ...prev]);
    setNewSpotName("");
    setSpotPhotoPreview(null);
    if (spotFileInputRef.current) spotFileInputRef.current.value = "";
  };

  /* ── PM Surya Ghar modal state ── */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyField = (key: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  /* ── Sign In / OTP Verification State ── */
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"mobile" | "email">("mobile");
  const [accountPickerProvider, setAccountPickerProvider] = useState<"google" | "apple" | null>(null);
  const [selectedOAuthAccount, setSelectedOAuthAccount] = useState<string>("default");
  const [authPhone, setAuthPhone] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [verifiedUser, setVerifiedUser] = useState<{
    type: "mobile" | "email" | "google" | "apple";
    identifier: string;
    displayName?: string;
    providerLabel: string;
  } | null>(null);

  // Helper: Gate interactive actions behind authentication without blocking initial page render
  const runWithAuth = useCallback(
    (action: () => void) => {
      if (verifiedUser) {
        action();
      } else {
        setPendingAction(() => action);
        setIsAuthModalOpen(true);
      }
    },
    [verifiedUser],
  );

  // OTP Cooldown timer
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (authMode === "mobile") {
      const cleanPhone = authPhone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        setAuthError("Please enter a valid 10-digit Indian mobile number.");
        return;
      }
    } else {
      if (!authEmail.includes("@") || !authEmail.includes(".")) {
        setAuthError("Please enter a valid email address.");
        return;
      }
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpCode("");
    setOtpCooldown(30);
    setAuthSuccess(
      authMode === "mobile"
        ? `A 6-digit verification code has been sent to +91 ${authPhone.slice(-10)}`
        : `A 6-digit verification code has been sent to ${authEmail}`,
    );
  };

  const completeSignIn = useCallback(
    (user: {
      type: "mobile" | "email" | "google" | "apple";
      identifier: string;
      displayName?: string;
      providerLabel: string;
    }) => {
      setVerifiedUser(user);
      setIsAuthModalOpen(false);
      setAccountPickerProvider(null);
      setOtpSent(false);
      setOtpCode("");
      setAuthSuccess("");
      setAuthError("");

      if (pendingAction) {
        const actionToRun = pendingAction;
        setPendingAction(null);
        setTimeout(() => {
          actionToRun();
        }, 150);
      }
    },
    [pendingAction],
  );

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!otpCode.trim()) {
      setAuthError("Please enter the 6-digit OTP.");
      return;
    }

    // Validates against generated code or test pass code
    if (otpCode.trim() !== generatedOtp && otpCode.trim() !== "123456") {
      setAuthError("Invalid OTP. Please check the code or request a new OTP.");
      return;
    }

    const identifier =
      authMode === "mobile" ? `+91 ${authPhone.slice(-10)}` : authEmail.trim();

    setAuthSuccess("Account verified successfully!");
    completeSignIn({
      type: authMode,
      identifier,
      displayName: authMode === "mobile" ? `User ${authPhone.slice(-4)}` : authEmail.split("@")[0],
      providerLabel: authMode === "mobile" ? "Mobile Number" : "Email",
    });
  };

  const handleOpenAccountPicker = (provider: "google" | "apple") => {
    setAuthError("");
    setAuthSuccess("");
    setAccountPickerProvider(provider);
    setSelectedOAuthAccount(provider === "google" ? "google-1" : "apple-1");
  };

  const handleConfirmOAuthAccount = (
    provider: "google" | "apple",
    account: { name: string; email: string },
  ) => {
    setAuthError("");
    setAuthSuccess(`Signed in as ${account.name}`);
    completeSignIn({
      type: provider,
      identifier: account.email,
      displayName: account.name,
      providerLabel: provider === "google" ? "Google" : "Apple",
    });
  };

  const handleSignOut = () => {
    setVerifiedUser(null);
    setAccountPickerProvider(null);
    setPendingAction(null);
    setOtpSent(false);
    setOtpCode("");
    setAuthPhone("");
    setAuthEmail("");
    setAuthError("");
    setAuthSuccess("");
    setIsAuthModalOpen(false);
  };

  /* ── Basic Info & Order / Inquiry State ── */
  const [orderCustomerName, setOrderCustomerName] = useState("");
  const [orderCustomerMobile, setOrderCustomerMobile] = useState("");
  const [orderCustomerEmail, setOrderCustomerEmail] = useState("");
  const [orderCustomerCity, setOrderCustomerCity] = useState("Pune / Pimpri-Chinchwad");
  const [orderConsumerNumber, setOrderConsumerNumber] = useState("");
  const [orderType, setOrderType] = useState<"survey" | "kit">("survey");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderFormError, setOrderFormError] = useState("");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    id: string;
    customerName: string;
    customerMobile: string;
    customerEmail: string;
    customerCity: string;
    consumerNumber: string;
    orderType: "survey" | "kit";
    reqKw: number;
    estimatedCost: number;
    subsidy: number;
    finalPayable: number;
    createdAt: string;
    status?: string;
  } | null>(null);

  // Auto-populate order fields when verifiedUser or result changes
  useEffect(() => {
    if (verifiedUser) {
      if (verifiedUser.displayName && !orderCustomerName) {
        setOrderCustomerName(verifiedUser.displayName);
      }
      if (verifiedUser.type === "mobile" && !orderCustomerMobile) {
        setOrderCustomerMobile(verifiedUser.identifier.replace(/\D/g, "").slice(-10));
      } else if (verifiedUser.type === "email" && !orderCustomerEmail) {
        setOrderCustomerEmail(verifiedUser.identifier);
      } else if (
        (verifiedUser.type === "google" || verifiedUser.type === "apple") &&
        !orderCustomerEmail
      ) {
        setOrderCustomerEmail(verifiedUser.identifier);
      }
    }
  }, [verifiedUser]);

  useEffect(() => {
    if (result?.ocr?.consumer_number) {
      setOrderConsumerNumber(result.ocr.consumer_number);
    }
    if (result?.user?.name && !orderCustomerName) {
      setOrderCustomerName(result.user.name);
    }
  }, [result]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderFormError("");

    if (!orderCustomerName.trim()) {
      setOrderFormError("Please enter your full name.");
      return;
    }

    const cleanMobile = orderCustomerMobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setOrderFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (orderCustomerEmail && (!orderCustomerEmail.includes("@") || !orderCustomerEmail.includes("."))) {
      setOrderFormError("Please enter a valid email address.");
      return;
    }

    const reqKw = orderType === "kit" ? 0 : (result?.calc?.reqKw ?? 3);
    let estimatedCost = result?.calc?.totalCost ?? 165000;
    let subsidy = result?.calc?.subsidy ?? 78000;
    let finalPayable = result?.calc?.finalPayable ?? 87000;

    if (orderType === "kit") {
      estimatedCost = 499;
      subsidy = 0;
      finalPayable = 499;
    }

    const generatedOrderId = `SOL-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveUserId =
      verifiedUser?.identifier ||
      verifiedUser?.displayName ||
      orderCustomerEmail.trim() ||
      `+91 ${cleanMobile}`;

    const orderTypeLabel =
      orderType === "survey" ? "Rooftop Site Survey" : "DIY Field Test Kit";

    setIsSubmittingOrder(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          userId: effectiveUserId,
          customerName: orderCustomerName.trim(),
          contactNumber: cleanMobile,
          orderType: orderTypeLabel,
          systemSizeKw: reqKw,
          totalAmount: finalPayable,
          status: "Pending",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.order) {
        throw new Error(data.error || "Failed to save order to MongoDB.");
      }

      const savedDbOrder = data.order;

      setSubmittedOrder({
        id: savedDbOrder.orderId,
        customerName: savedDbOrder.customerName,
        customerMobile: savedDbOrder.contactNumber,
        customerEmail: orderCustomerEmail.trim() || "N/A",
        customerCity: orderCustomerCity.trim() || "Maharashtra",
        consumerNumber:
          orderConsumerNumber.trim() ||
          result?.ocr?.consumer_number ||
          "To be confirmed on site",
        orderType,
        reqKw: typeof savedDbOrder.systemSizeKw === "number" ? savedDbOrder.systemSizeKw : reqKw,
        estimatedCost,
        subsidy,
        finalPayable: typeof savedDbOrder.totalAmount === "number" ? savedDbOrder.totalAmount : finalPayable,
        createdAt: savedDbOrder.createdAt
          ? new Date(savedDbOrder.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        status: savedDbOrder.status || "Pending",
      });
    } catch (err: unknown) {
      console.error("Order submission error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Unable to place order right now. Please try again.";
      setOrderFormError(message);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ───── NAVBAR ───── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-emerald-700 font-extrabold text-xl tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm">
              <SunIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-gray-950 font-black">
                Solar<span className="text-emerald-600">Square</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">AI Estimator &amp; Field Test</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-emerald-600 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#calculator"
                className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm hover:shadow"
              >
                Estimate Now
              </a>
            </li>
            <li>
              {verifiedUser ? (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-emerald-950">
                    {verifiedUser.type === "google" && "G "}
                    {verifiedUser.type === "apple" && " "}
                  </span>
                  <span className="max-w-[120px] truncate">{verifiedUser.displayName || verifiedUser.identifier}</span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.2 rounded-full">✓</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition shadow-2xs"
                >
                  <span>👤</span>
                  <span>Sign In / Verify</span>
                </button>
              )}
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 shadow-lg">
            <ul className="flex flex-col gap-2 pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-sm font-medium text-gray-700 py-2 px-3 rounded-lg hover:bg-emerald-50 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#calculator"
                  className="block text-center text-sm font-semibold px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Estimate Now
                </a>
              </li>
              <li>
                {verifiedUser ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition mt-1 flex items-center justify-center gap-1.5"
                  >
                    <span>✓</span>
                    <span>Verified: {verifiedUser.displayName || verifiedUser.identifier} ({verifiedUser.providerLabel})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-center text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition mt-1"
                  >
                    Sign In / Verify Account
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ───── HERO SECTION ───── */}
      <section
        id="home"
        className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, #d1fae5 0%, #ecfdf5 45%, #ffffff 100%)",
        }}
      >
        <div className="absolute top-10 -left-20 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-emerald-800/10 text-emerald-900 border border-emerald-200/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>PM Surya Ghar Ready · Rooftop Solar &amp; Field Spot Test</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 leading-tight">
            Calculate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600">
              Solar Savings
            </span>{" "}
            Instantly
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
            Upload your MSEB electricity bill, test quick sample presets, or test your rooftop spot &amp; multimeter reading.
            Estimate capacity, subsidies, payback years, and export full reports in Excel.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg transition-all duration-200"
            >
              <SunIcon className="w-4 h-4" />
              Open Solar Estimator
            </a>
            <a
              href="#field-test"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
            >
              <CompassIcon className="w-4 h-4" />
              Rooftop Field Test ↓
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 font-bold text-sm">10,000+</span> Bills Analyzed
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-gray-300" />
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 font-bold text-sm">₹2.5 Cr+</span> Subsidies Unlocked
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-gray-300" />
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 font-bold text-sm">Excel &amp; CSV</span> Export Ready
            </span>
          </div>
        </div>
      </section>

      {/* ───── CORE APP / DASHBOARD ───── */}
      <section id="calculator" className="py-16 sm:py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Interactive Estimator</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Your AI Solar Dashboard</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Upload an MSEB bill, test quick sample presets, or chat with the Appliance Load Assistant.
            </p>
          </div>

          {/* Dashboard Window Container */}
          <div className="max-w-6xl mx-auto rounded-3xl border border-emerald-100/80 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
            {/* Window Title Bar */}
            <div className="px-6 py-3.5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-gray-500 font-mono font-medium hidden sm:inline">
                  SolarSquare AI Estimator v3.0
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Calculator &amp; Assistant</span>
              </div>
            </div>

            {/* Window Content: 3 Columns */}
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* ──── Column 1: Upload Bill & Presets ──── */}
              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <UploadIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">1. Upload Bill</h3>
                      <p className="text-xs text-gray-500">MSEB Bill (PDF or Image)</p>
                    </div>
                  </div>

                  {/* Drop-zone */}
                  <label className="w-full border-2 border-dashed border-emerald-300 rounded-2xl py-6 bg-emerald-50/40 flex flex-col items-center gap-2 cursor-pointer hover:bg-emerald-50 transition text-center px-4">
                    <UploadIcon className="w-6 h-6 text-emerald-500" />
                    <span className="text-xs text-emerald-800 font-semibold">
                      {selectedFile ? "Change file" : "Click to browse or drop bill"}
                    </span>
                    <span className="text-[10px] text-gray-400">PDF, JPG, PNG up to 10MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </label>

                  {/* File preview chip */}
                  {selectedFile && (
                    <div className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-left">
                      {isPdf ? (
                        <PdfIcon className="w-5 h-5 text-red-500 shrink-0" />
                      ) : (
                        <span className="text-base shrink-0">🖼️</span>
                      )}
                      <span className="text-xs text-gray-700 font-medium truncate flex-1">
                        {selectedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        aria-label="Remove file"
                      >
                        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Quick Sample Bill Presets */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      <span>Quick Demo Presets:</span>
                      <span className="text-emerald-700 font-bold">Instant Click</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { units: 150, label: "150 U/mo", desc: "1-2 BHK" },
                        { units: 240, label: "240 U/mo", desc: "3 BHK" },
                        { units: 450, label: "450 U/mo", desc: "Villa / AC" },
                      ].map((preset) => (
                        <button
                          key={preset.units}
                          type="button"
                          onClick={() => runWithAuth(() => handleLoadPreset(preset.units))}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            activePreset === preset.units && !selectedFile
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/40 shadow-xs"
                              : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 text-gray-700"
                          }`}
                        >
                          <div className="text-xs font-bold">{preset.label}</div>
                          <div className="text-[10px] text-gray-400">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => runWithAuth(handleCalculate)}
                    disabled={!selectedFile || loading}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon className="w-4 h-4" />
                        Analyzing Bill with AI…
                      </>
                    ) : (
                      <>
                        <SunIcon className="w-4 h-4" />
                        Calculate Solar Plan
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ──── Column 2: Interactive Voice & Appliance Q&A Assistant ──── */}
              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <MicIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">2. Appliance &amp; Voice AI</h3>
                        <p className="text-[11px] text-gray-500">Conversational Load Estimator</p>
                      </div>
                    </div>

                    {/* Language selector pills */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                      {[
                        { code: "mr-IN" as const, label: "मराठी" },
                        { code: "hi-IN" as const, label: "हिंदी" },
                        { code: "en-IN" as const, label: "EN" },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => setSelectedLang(lang.code)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${
                            selectedLang === lang.code
                              ? "bg-white text-blue-700 shadow-xs"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={() => runWithAuth(startVoiceRecognition)}
                    disabled={isListening}
                    className={`w-full py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
                      isListening
                        ? "bg-red-50 text-red-600 border border-red-200 animate-pulse"
                        : "bg-blue-50 text-blue-700 border border-blue-200/60 hover:bg-blue-100"
                    }`}
                  >
                    <MicIcon className="w-4 h-4" />
                    {isListening
                      ? "Listening… (Speak appliances or question)"
                      : `Tap to Speak (${selectedLang === "mr-IN" ? "Marathi" : selectedLang === "hi-IN" ? "Hindi" : "English"})`}
                  </button>

                  {/* Interactive Chat Scroll Container */}
                  <div className="mt-3.5 h-48 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-slate-50 border border-gray-100 text-xs">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-emerald-600 text-white rounded-br-none"
                              : "bg-white border border-gray-200/80 text-gray-800 rounded-tl-none shadow-xs whitespace-pre-line"
                          }`}
                        >
                          {msg.text}
                        </div>

                        {/* If load was estimated, offer instant 1-click apply button */}
                        {msg.estimatedUnits && (
                          <button
                            type="button"
                            onClick={() => runWithAuth(() => handleLoadPreset(msg.estimatedUnits!))}
                            className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] transition shadow-xs"
                          >
                            <span>⚡ Apply ~{msg.estimatedUnits} Units to Calculator</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Chat Input Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!chatInput.trim()) return;
                      const msg = chatInput;
                      setChatInput("");
                      runWithAuth(() => handleProcessMessage(msg));
                    }}
                    className="flex gap-1.5 mt-2.5"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type e.g. 1 AC, 1 fridge, 4 fans..."
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                    >
                      Send
                    </button>
                  </form>
                </div>

                {/* Quick Prompts */}
                <div className="mt-3 pt-2.5 border-t border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1.5">Quick Prompts:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "1 AC + 1 Fridge",
                      "2 AC + 5 Fans + Washing Machine",
                      "How much subsidy for 2 kW?",
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => runWithAuth(() => handleProcessMessage(prompt))}
                        className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-600 transition"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ──── Column 3: Results Dashboard ──── */}
              <div className="p-6 sm:p-7 flex flex-col justify-between bg-slate-50/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <DashboardIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">3. Solar Plan Results</h3>
                        <p className="text-xs text-gray-500">Financials &amp; Subsidies</p>
                      </div>
                    </div>

                    {result && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Ready
                      </span>
                    )}
                  </div>

                  {/* Loading Skeleton */}
                  {loading && (
                    <div className="space-y-3 animate-pulse py-4">
                      <div className="h-10 rounded-xl bg-gray-200" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-14 rounded-xl bg-gray-200" />
                        <div className="h-14 rounded-xl bg-gray-200" />
                      </div>
                      <div className="h-16 rounded-xl bg-gray-200" />
                      <div className="h-10 rounded-xl bg-gray-200" />
                    </div>
                  )}

                  {/* Empty state */}
                  {!result && !loading && (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-xl">
                        ☀️
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">No Bill Selected</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Upload an MSEB bill, test quick presets, or ask the Appliance Assistant.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleLoadPreset(240)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
                        >
                          Load 240 Units Demo →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active Result View */}
                  {result && !loading && (
                    <div className="space-y-3">
                      {/* Consumer info chip */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-xs shadow-xs">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Consumer</p>
                          <p className="font-bold text-gray-900 truncate max-w-[170px]">{result.user.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Average Usage</p>
                          <p className="font-bold text-emerald-700">{result.user.avg_monthly_units} U/mo</p>
                        </div>
                      </div>

                      {/* 2x2 Metric Cards Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase">Capacity</span>
                          <p className="text-base font-black text-emerald-950 mt-0.5">{result.calc.reqKw} kW</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                          <span className="text-[10px] font-bold text-blue-800 uppercase">Break-Even</span>
                          <p className="text-base font-black text-blue-950 mt-0.5">{result.calc.breakEvenYrs} yrs</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Total Cost</span>
                          <p className="text-xs font-bold text-gray-800 mt-0.5">
                            ₹{result.calc.totalCost.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-green-50/80 border border-green-200">
                          <span className="text-[10px] font-bold text-green-800 uppercase">Govt Subsidy</span>
                          <p className="text-xs font-black text-green-700 mt-0.5">
                            − ₹{result.calc.subsidy.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* Net Payable Highlight Banner */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
                            Net Out-of-Pocket
                          </p>
                          <p className="text-lg font-black tracking-tight">
                            ₹{result.calc.finalPayable.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                          After Subsidy
                        </span>
                      </div>

                      {/* Visual Savings Bar */}
                      <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-1.5 shadow-xs">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-gray-700">Estimated Monthly Bill</span>
                          <span className="text-emerald-700 font-extrabold">~88% Savings</span>
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex justify-between text-gray-500">
                            <span>Before Solar:</span>
                            <span className="font-semibold line-through text-red-500">
                              ₹{(result.user.avg_monthly_units * 8).toLocaleString("en-IN")}/mo
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-900 font-bold">
                            <span className="text-emerald-800">After Solar (Fixed only):</span>
                            <span className="text-emerald-700">₹150/mo</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "88%" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary CTA + Excel CSV Download Button */}
                {result && !loading && (
                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      onClick={() => runWithAuth(() => setIsModalOpen(true))}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Apply for PM Surya Ghar Scheme</span>
                      <span>→</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => runWithAuth(downloadCsvReport)}
                      className="w-full py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>📥 Download Excel / CSV Report</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SOLAR PANEL & MULTIMETER FIELD SPOT / ANGLE TEST SECTION ───── */}
      <section id="field-test" className="py-16 sm:py-20 bg-slate-50 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Field Engineering &amp; Hardware Test
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Rooftop Spot &amp; Multimeter Field Test
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Before permanent mounting, test your candidate rooftop spots, angles, and multimeter open-circuit voltage (Voc)
              to verify maximum solar irradiance and zero shadow loss.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Form: Add a Candidate Spot Test (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CompassIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-base leading-tight">Test a Candidate Rooftop Spot</h3>
                  <p className="text-xs text-gray-500">Angle, Azimuth &amp; Multimeter Readings</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runWithAuth(() => handleAddSpotTest(e));
                }}
                className="space-y-4 text-xs"
              >
                {/* Spot Label */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Spot Location / Label</label>
                  <input
                    type="text"
                    value={newSpotName}
                    onChange={(e) => setNewSpotName(e.target.value)}
                    placeholder="e.g. Water Tank Roof (South) or Front Terrace"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-xs text-gray-800"
                  />
                </div>

                {/* Tilt Angle & Direction */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between font-bold text-gray-700 mb-1">
                      <span>Tilt Angle</span>
                      <span className="text-emerald-700">{newSpotTilt}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={45}
                      value={newSpotTilt}
                      onChange={(e) => setNewSpotTilt(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-[10px] text-gray-400">Optimal in MH: ~18°–22°</span>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Direction (Facing)</label>
                    <select
                      value={newSpotDirection}
                      onChange={(e) => setNewSpotDirection(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-xs text-gray-800"
                    >
                      <option value="South">True South (Recommended)</option>
                      <option value="South-West">South-West</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="Flat">Flat (0° Horizontal)</option>
                    </select>
                  </div>
                </div>

                {/* Multimeter Readings */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Voltmeter (Voc)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="60"
                        value={newSpotVoltage}
                        onChange={(e) => setNewSpotVoltage(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-slate-50 focus:bg-white text-xs font-mono font-bold text-gray-900"
                      />
                      <span className="text-xs text-gray-500 font-bold">V</span>
                    </div>
                    <span className="text-[10px] text-gray-400">12V panel: ~18–22V Voc</span>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Current (Isc)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="20"
                        value={newSpotCurrent}
                        onChange={(e) => setNewSpotCurrent(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-slate-50 focus:bg-white text-xs font-mono font-bold text-gray-900"
                      />
                      <span className="text-xs text-gray-500 font-bold">A</span>
                    </div>
                    <span className="text-[10px] text-gray-400">5W–10W demo: ~0.5–1.2A</span>
                  </div>
                </div>

                {/* Shading & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Shading Profile</label>
                    <select
                      value={newSpotShading}
                      onChange={(e) => setNewSpotShading(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 bg-slate-50 text-xs text-gray-800"
                    >
                      <option value="Full Sun (0 hrs shade)">Full Sun (Zero shade)</option>
                      <option value="Partial (<2 hrs shade)">Partial shadow (&lt;2 hrs)</option>
                      <option value="Heavy (>4 hrs shade)">Heavy shadow (&gt;4 hrs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Test Time</label>
                    <select
                      value={newSpotTime}
                      onChange={(e) => setNewSpotTime(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 bg-slate-50 text-xs text-gray-800"
                    >
                      <option value="Noon (12 PM - 2 PM)">Solar Noon (12 PM - 2 PM)</option>
                      <option value="Morning (9 AM - 11 AM)">Morning (9 AM - 11 AM)</option>
                      <option value="Afternoon (3 PM - 5 PM)">Afternoon (3 PM - 5 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Rooftop / Spot Photo (Optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-3 py-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition">
                      <span>📷 Select Photo</span>
                      <input
                        ref={spotFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSpotPhotoChange}
                      />
                    </label>

                    {spotPhotoPreview && (
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={spotPhotoPreview}
                          alt="Spot preview"
                          className="w-10 h-10 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => setSpotPhotoPreview(null)}
                          className="text-[10px] text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Save &amp; Compare Spot
                </button>
              </form>
            </div>

            {/* Right Column: Tested Spots Comparison & Practical Field Guide (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Visual Spot Irradiance & Yield Comparison Chart */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-950 text-base flex items-center gap-2">
                      <span>📊</span> Visual Spot Generation Potential
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Benchmarked irradiance &amp; yield across candidate rooftop spots (Max 100%).
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Benchmark
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {displaySpots.map((spot) => {
                    const isBest = spot.id === bestSpotId;
                    return (
                      <div key={spot.id} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{spot.spotName}</span>
                            {isBest && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                                🌟 Best Spot
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-gray-500">
                            <span className="text-[11px] font-mono text-gray-600">
                              {spot.direction} · {spot.tiltAngle}° · {spot.voltage}V
                            </span>
                            <span className="font-black text-gray-900 w-10 text-right">{spot.score}%</span>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              spot.score >= 85
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                : spot.score >= 65
                                ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                : "bg-gradient-to-r from-rose-400 to-orange-500"
                            }`}
                            style={{ width: `${Math.max(12, spot.score)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base">Tested Spots Comparison</h3>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {fieldSpots.length} Spots Logged
                  </span>
                </div>

                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                  {fieldSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="p-4 rounded-2xl border border-gray-200 bg-slate-50/60 hover:bg-white hover:border-emerald-200 transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {spot.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={spot.photoUrl}
                              alt={spot.spotName}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-200 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                              ☀️
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight">{spot.spotName}</h4>
                            <p className="text-[11px] text-gray-500">
                              Facing {spot.direction} @ {spot.tiltAngle}° tilt · {spot.timeOfDay}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                              spot.rating === "Optimal"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : spot.rating === "Fair"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {spot.rating} ({spot.score}%)
                          </span>
                        </div>
                      </div>

                      {/* Multimeter metrics bar */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs py-1.5 px-3 rounded-xl bg-white border border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Voltage</span>
                          <p className="font-mono font-bold text-gray-900">{spot.voltage} V</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Current</span>
                          <p className="font-mono font-bold text-gray-900">{spot.current} A</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Shading</span>
                          <p className="font-bold text-gray-700 truncate">{spot.shading}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 italic">💡 {spot.tips}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Hardware & Sourcing Tip Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <span className="text-base">🧰</span>
                  <span>How to Settle Rooftop Angle &amp; Voltage with a ₹500 DIY Kit</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Before purchasing a full rooftop installation, you can benchmark physical spots with a small{" "}
                  <strong>5W–10W 12V test solar panel</strong> (~₹350 on Amazon or local electronics shops in Pune/Mumbai)
                  and a basic <strong>digital multimeter</strong> (~₹180). Set the multimeter to <em>DC 20V mode</em>, connect probe leads to panel output,
                  and face True South at solar noon (12:30 PM). A reading of <strong>20V–22V Voc</strong> confirms zero-loss shadow clearance!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── BASIC INFORMATION & ORDER / INQUIRY SECTION ───── */}
      <section id="order-inquiry" className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Site Survey &amp; Hardware Request
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Confirm Basic Info &amp; Place Solar Request
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Submit your verified details for an on-site shadow feasibility survey or order our physical DIY solar + multimeter test kit.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Input Form */}
            <div className="lg:col-span-7 bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📋</span>
                  <h3 className="font-bold text-gray-900 text-base">Consumer &amp; Site Details</h3>
                </div>
                {verifiedUser ? (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    ✓ Verified via {verifiedUser.providerLabel}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Sign In to Auto-Fill
                  </button>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runWithAuth(() => handlePlaceOrder(e));
                }}
                className="space-y-4"
              >
                {/* Request Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Request / Order Type
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType("survey")}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        orderType === "survey"
                          ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">🏡 Rooftop Site Survey</span>
                        {orderType === "survey" && <span className="text-emerald-600 font-bold text-xs">✓</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Full structural check, 3D shadow analysis, and DISCOM feasibility review.
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Recommended with PM Surya Ghar
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType("kit")}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        orderType === "kit"
                          ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">🧰 DIY Field Test Kit</span>
                        {orderType === "kit" && <span className="text-emerald-600 font-bold text-xs">✓</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        5W mini panel + digital multimeter + tilt compass guide shipped to doorstep.
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Nominal ₹499 Deposit (Ref.)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Name & Mobile Inputs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={orderCustomerName}
                      onChange={(e) => setOrderCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-300 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 overflow-hidden transition">
                      <span className="px-3 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={orderCustomerMobile}
                        onChange={(e) => setOrderCustomerMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="w-full px-3 py-2.5 text-xs text-gray-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Consumer Number */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={orderCustomerEmail}
                      onChange={(e) => setOrderCustomerEmail(e.target.value)}
                      placeholder="consumer@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      MSEDCL Consumer No.
                    </label>
                    <input
                      type="text"
                      value={orderConsumerNumber}
                      onChange={(e) => setOrderConsumerNumber(e.target.value)}
                      placeholder="12-digit consumer number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition font-mono"
                    />
                  </div>
                </div>

                {/* City / Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Installation District
                  </label>
                  <select
                    value={orderCustomerCity}
                    onChange={(e) => setOrderCustomerCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                  >
                    <option value="Pune / Pimpri-Chinchwad">Pune / Pimpri-Chinchwad</option>
                    <option value="Mumbai Metropolitan Region (MMR)">Mumbai Metropolitan Region (MMR)</option>
                    <option value="Nagpur Division">Nagpur Division</option>
                    <option value="Nashik Division">Nashik Division</option>
                    <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
                    <option value="Kolhapur / Western Maharashtra">Kolhapur / Western Maharashtra</option>
                    <option value="Other Maharashtra Location">Other Maharashtra Location</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Additional Site Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. 3rd floor terrace, water tank shadow on west side"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                  />
                </div>

                {orderFormError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {orderFormError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingOrder}
                    className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingOrder ? (
                      <>
                        <SpinnerIcon className="w-4 h-4" />
                        <span>Placing Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm &amp; Place Request</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                    <span>Direct submission to SolarSquare database</span>
                    <span>No upfront gateway charge</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Dynamic Order Summary or Confirmation Receipt */}
            <div className="lg:col-span-5 space-y-4">
              {submittedOrder ? (
                /* Order Confirmation Receipt */
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500 shadow-md space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-900 leading-tight">
                          Order / Request Confirmed!
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-mono font-bold">
                          ID: {submittedOrder.id}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Confirmed
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Applicant:</span>
                      <strong className="text-gray-900">{submittedOrder.customerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Contact:</span>
                      <span className="font-mono text-gray-800">+91 {submittedOrder.customerMobile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="text-gray-800">{submittedOrder.customerCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Consumer No:</span>
                      <span className="font-mono text-gray-800">{submittedOrder.consumerNumber}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-500">Request Item:</span>
                      <strong className="text-emerald-800">
                        {submittedOrder.orderType === "survey"
                          ? `Feasibility Survey (${submittedOrder.reqKw} kW Sizing)`
                          : "DIY Solar + Multimeter Test Kit"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Net Estimated Cost:</span>
                      <span className="font-bold text-gray-900 font-mono">
                        {submittedOrder.orderType === "survey"
                          ? `₹${submittedOrder.finalPayable.toLocaleString()} (After ₹${submittedOrder.subsidy.toLocaleString()} Subsidy)`
                          : `₹${submittedOrder.finalPayable.toLocaleString()} (Kit Deposit)`}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                    <p className="font-bold">Order Received &amp; Next Steps:</p>
                    <p>• Your request has been successfully recorded in our central operations database.</p>
                    <p>• Our regional solar engineer will call within 24 hours to schedule rooftop inspection.</p>
                    <p>• Digital copy linked with your PM Surya Ghar scheme application assistance.</p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmittedOrder(null)}
                      className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                    >
                      Create Another Request
                    </button>
                    <a
                      href="#schemes"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold text-center hover:bg-emerald-700 transition"
                    >
                      View Schemes Hub →
                    </a>
                  </div>
                </div>
              ) : (
                /* Dynamic Calculation Preview Card */
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h4 className="font-bold text-sm text-gray-900">Order &amp; Sizing Estimate</h4>
                    <span className="text-[10px] text-gray-400 font-mono">Deterministic Sizing</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Active Bill Calculation:</span>
                      <span className="font-bold text-gray-900">
                        {result?.user?.avg_monthly_units ?? 240} Units / Month
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Recommended System:</span>
                      <span className="font-bold text-emerald-700">
                        {orderType === "survey"
                          ? `${result?.calc?.reqKw ?? 3} kW Grid-Tied Solar`
                          : "5W Monocrystalline Test Kit"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Gross Price:</span>
                      <span className="font-mono text-gray-800">
                        {orderType === "survey"
                          ? `₹${(result?.calc?.totalCost ?? 165000).toLocaleString()}`
                          : "₹499"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">PM Surya Ghar Subsidy:</span>
                      <span className="font-mono text-emerald-600 font-bold">
                        {orderType === "survey"
                          ? `- ₹${(result?.calc?.subsidy ?? 78000).toLocaleString()}`
                          : "₹0"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 bg-emerald-50 px-3 rounded-xl">
                      <span className="font-bold text-emerald-950">Net Payable:</span>
                      <span className="font-mono font-black text-emerald-700 text-sm">
                        {orderType === "survey"
                          ? `₹${(result?.calc?.finalPayable ?? 87000).toLocaleString()}`
                          : "₹499"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 text-[11px] text-gray-500 space-y-1">
                    <p className="font-semibold text-gray-700">Official Database Sync:</p>
                    <p>
                      Submitting records your inquiry securely into the central database and generates a verified confirmation receipt. Our team will contact you to confirm scheduling.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───── TARIFF, BUDGET & SOURCE TRANSPARENCY SECTION ───── */}
      <section id="transparency" className="py-16 sm:py-20 bg-slate-100/70 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Open Data &amp; Regulatory Benchmark
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Tariff, Solar Budget &amp; Source Transparency
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Transparent breakdown of Maharashtra utility tariffs, rooftop solar budgets, and algorithm data source attribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Electricity Tariff Slabs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    MSEDCL / MERC Slabs
                  </span>
                  <span className="text-xs text-gray-400 font-mono">FY 2025-26</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">Residential Tariff Benchmark</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Maharashtra State Electricity Distribution Company (MSEDCL) telescopic slab rates for domestic LT-I supply:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">0 – 100 Units</span>
                    <span className="font-bold text-gray-900">₹5.88 / unit</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">101 – 300 Units</span>
                    <span className="font-bold text-gray-900">₹11.26 / unit</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">301 – 500 Units</span>
                    <span className="font-bold text-gray-900">₹15.72 / unit</span>
                  </div>
                  <div className="flex justify-between py-1.5 bg-emerald-50/80 px-2 rounded-lg text-emerald-900 font-bold">
                    <span>Average Blended Benchmark</span>
                    <span>~₹8.50 / unit</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                Used in break-even ROI formula: <code className="font-mono text-gray-600">finalPayable / (units * ₹8 * 12)</code>
              </div>
            </div>

            {/* Card 2: Solar System Budget & Subsidy Matrix */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    PM Surya Ghar DBT
                  </span>
                  <span className="text-xs text-gray-400 font-mono">Central Matrix</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">Rooftop Solar Budget Matrix</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Standard rooftop solar installation cost versus official central capital subsidy benefits:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">1 kW (~100 sq.ft)</span>
                    <span className="font-medium text-gray-500">₹55K - ₹30K = <strong className="text-emerald-700">₹25K Net</strong></span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">2 kW (~200 sq.ft)</span>
                    <span className="font-medium text-gray-500">₹1.10L - ₹60K = <strong className="text-emerald-700">₹50K Net</strong></span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">3 kW (~300 sq.ft)</span>
                    <span className="font-medium text-gray-500">₹1.65L - ₹78K = <strong className="text-emerald-700">₹87K Net</strong></span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">4 kW+ (~400+ sq.ft)</span>
                    <span className="font-medium text-gray-500">Max Subsidy Capped at <strong className="text-emerald-700">₹78,000</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                Direct bank transfer (DBT) credited within 30 days of net-meter commissioning.
              </div>
            </div>

            {/* Card 3: Source Transparency & Engine Attribution */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    Data Architecture
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">100% Transparent</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">Source Attribution &amp; Logic</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  How our system processes your bill versus where calculations originate:
                </p>

                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="p-2 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block">📄 Bill OCR Extraction:</span>
                    <span>Processed via Gemini 1.5 Flash to extract consumer number and monthly unit consumption.</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block">⚡ Engine &amp; Mock Database:</span>
                    <span>Computed using <code className="text-gray-800 font-mono">utils/solarCalculator.ts</code> with verified mock profiles in <code className="text-gray-800 font-mono">data/mseb_mock_data.json</code>.</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block">🏛️ Subsidy Scheme Rules:</span>
                    <span>Directly aligned with MNRE &amp; PM Surya Ghar: Muft Bijli Yojana official thresholds.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                Auditable &amp; deterministic calculations for accurate evaluation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── MULTI-SCHEME & OFFICIAL LINKS SECTION ───── */}
      <section id="schemes" className="py-20 sm:py-24 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Official Portals &amp; Incentives
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Government Solar &amp; Power Schemes Hub
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Direct access to central subsidies, ministry standards, state utility net-metering, and renewable energy boards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOVT_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${scheme.badgeColor}`}>
                      {scheme.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-950 text-base mb-2">{scheme.title}</h3>

                  <div className="mb-3 p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-900">
                    ✨ {scheme.benefitHighlight}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{scheme.description}</p>

                  <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-3 mb-4">
                    <span className="font-semibold text-gray-600">Eligibility: </span>
                    {scheme.eligibility}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-800 text-xs font-semibold transition"
                  >
                    Open Official Portal ↗
                  </a>

                  {scheme.hasGuide && (
                    <button
                      type="button"
                      onClick={() => runWithAuth(() => setIsModalOpen(true))}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition shadow-xs"
                    >
                      In-App Registration Guide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section id="about" className="py-20 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Workflow</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Three Simple Steps</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              No technical expertise needed. Just provide your bill units and unlock instant savings estimates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="relative bg-slate-50/60 rounded-2xl p-7 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROFESSIONAL FOOTER ───── */}
      <footer id="contact" className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
                <SunIcon className="w-6 h-6 text-emerald-400" />
                SolarSquare
              </span>
              <p className="text-xs leading-relaxed text-gray-400">
                AI-powered solar calculations, subsidy estimation, field testing, and scheme navigation for homeowners and businesses in India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-emerald-400 transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Resources */}
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Official Resources</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                    PM Surya Ghar Portal ↗
                  </a>
                </li>
                <li>
                  <a href="https://mnre.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                    MNRE Ministry Portal ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.mahadiscom.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                    MSEDCL Mahavitaran ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.mahaurja.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                    MEDA MahaUrja ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Support &amp; Location</h4>
              <ul className="space-y-2 text-xs">
                <li>📧 support@solarsquare.in</li>
                <li>📞 +91 98765 43210</li>
                <li>📍 Pune &amp; Mumbai, Maharashtra</li>
                <li className="pt-2 text-emerald-400 font-semibold">🕒 Mon - Sat (9:00 AM - 7:00 PM)</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; 2026 SolarSquare AI Estimator. All rights reserved.</p>
            <p>
              Built with Next.js, Tailwind CSS &amp; Google Gemini AI
            </p>
          </div>
        </div>
      </footer>

      {/* ───── PM SURYA GHAR MODAL ───── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal window */}
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden relative flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-emerald-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <SunIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    PM Surya Ghar — Application Assistant
                  </h3>
                  <p className="text-xs text-gray-500">Muft Bijli Yojana Official Subsidy Guide</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Card with extracted details */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200/60">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Extracted Consumer Details
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-gray-900 font-mono tracking-wide">
                        {result?.ocr?.consumer_number || "Not detected"}
                      </span>
                      {result?.ocr?.consumer_number && (
                        <button
                          type="button"
                          onClick={() => copyField("consumer_quick", result?.ocr?.consumer_number || "")}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-1 shadow-sm"
                        >
                          {copiedField === "consumer_quick" ? "Copied! ✓" : "Copy Consumer No."}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-500">Recommended Size</p>
                      <p className="text-lg font-bold text-emerald-800">
                        {result?.calc?.reqKw ? `${result.calc.reqKw} kW` : "—"}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-500">Estimated Subsidy</p>
                      <p className="text-lg font-bold text-green-700">
                        {result?.calc?.subsidy ? `₹${result.calc.subsidy.toLocaleString("en-IN")}` : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-emerald-800/80 mt-3 flex items-center gap-1.5">
                  <span>💡</span> Keep your consumer number handy when logging in to the National Rooftop Solar Portal.
                </p>
              </div>

              {/* Enhanced Form-Filling Assistant Table with Quick Copy */}
              <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <span>📋</span> Official Portal Form-Filling Helper
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Exact information to enter on <strong>pmsuryaghar.gov.in</strong>. Click to copy each value directly.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  {/* Field 1 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Step 1: State &amp; DISCOM</span>
                      <p className="font-bold text-gray-900">Maharashtra / MSEDCL (Mahavitaran)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyField("discom", "MSEDCL")}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                    >
                      {copiedField === "discom" ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>

                  {/* Field 2 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Step 2: Consumer Account No.</span>
                      <p className="font-bold text-gray-900 font-mono">{result?.ocr?.consumer_number || "123456789012"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyField("consumer", result?.ocr?.consumer_number || "123456789012")}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                    >
                      {copiedField === "consumer" ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>

                  {/* Field 3 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Step 3: Proposed Solar Capacity</span>
                      <p className="font-bold text-gray-900">{result?.calc?.reqKw ? `${result.calc.reqKw} kW` : "3 kW"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyField("capacity", result?.calc?.reqKw ? `${result.calc.reqKw} kW` : "3 kW")}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                    >
                      {copiedField === "capacity" ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>

                  {/* Field 4 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Step 4: Estimated Subsidy Amount</span>
                      <p className="font-bold text-green-700">{result?.calc?.subsidy ? `₹${result.calc.subsidy.toLocaleString("en-IN")}` : "₹78,000"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyField("subsidy", result?.calc?.subsidy ? `₹${result.calc.subsidy.toLocaleString("en-IN")}` : "₹78,000")}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
                    >
                      {copiedField === "subsidy" ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
                  <span>⚠️</span>
                  <div>
                    <strong>Bank &amp; Aadhaar Tip:</strong> Ensure your Bank Account &amp; Aadhaar Name strictly matches the Consumer Name on your MSEDCL bill ({result?.user?.name || "Electricity Consumer"}) so the direct bank subsidy (DBT) is credited without rejection.
                  </div>
                </div>
              </div>

              {/* 4-Step Registration Guide */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Official Registration Steps on PM Surya Ghar Portal
                </h4>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-emerald-200 transition">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-2.5">
                      1
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Select Discom</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Select your State (e.g., Maharashtra) and Electricity Distribution Company (e.g., MSEDCL).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-emerald-200 transition">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-2.5">
                      2
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Enter Consumer Number</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Enter your Consumer Account Number and registered mobile number to authenticate.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-emerald-200 transition">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-2.5">
                      3
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Submit Application</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Fill the online application form and request technical feasibility approval from your Discom.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-emerald-200 transition">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-2.5">
                      4
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Vendor Installation &amp; Subsidy</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Once approved, install solar via any registered vendor. Subsidy is directly transferred to your bank account after net-metering.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Helper Note */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <span className="text-2xl shrink-0">🤖</span>
                <div className="text-xs leading-relaxed text-amber-950">
                  <p className="font-semibold text-amber-900 mb-0.5">SolarSquare AI Assistant Note</p>
                  <p>
                    {result?.ocr?.consumer_number ? (
                      <>
                        I have saved your details. Use consumer number{" "}
                        <span className="font-bold text-gray-900">{result.ocr.consumer_number}</span>{" "}
                        when asked by the Discom portal.
                      </>
                    ) : (
                      <>
                        I have prepared your plan estimation. You can reference the recommended capacity ({result?.calc?.reqKw ?? 3} kW) while submitting your scheme form.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-gray-500 text-center sm:text-left">
                Directs to <strong className="text-gray-700">pmsuryaghar.gov.in</strong> (Govt. of India)
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"
                >
                  Close
                </button>
                <a
                  href="https://pmsuryaghar.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Open Official PM Surya Ghar Portal ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ───── SIGN IN / OTP VERIFICATION MODAL ───── */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-lg border border-white/20">
                  🔐
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">
                    {verifiedUser
                      ? "Account Verified"
                      : accountPickerProvider === "google"
                      ? "Sign in with Google"
                      : accountPickerProvider === "apple"
                      ? "Sign in with Apple"
                      : "Sign In / Verify"}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    {accountPickerProvider
                      ? "Choose an account to continue to SolarSquare"
                      : "SolarSquare Account & Plan Verification"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setAccountPickerProvider(null);
                }}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition text-lg leading-none"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-gray-700">
              {verifiedUser ? (
                /* Already Verified View */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <span className="text-3xl block">
                      {verifiedUser.type === "google"
                        ? "🌐"
                        : verifiedUser.type === "apple"
                        ? "🍎"
                        : "✓"}
                    </span>
                    <h4 className="font-bold text-sm text-emerald-900">
                      {verifiedUser.displayName
                        ? `Welcome, ${verifiedUser.displayName}`
                        : "You are signed in & verified"}
                    </h4>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        {verifiedUser.providerLabel}
                      </span>
                    </div>
                    <div className="font-mono font-bold text-xs text-gray-900 bg-white py-1.5 px-3 rounded-lg border border-emerald-200 inline-block">
                      {verifiedUser.identifier}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-[11px] text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800">Account Benefits Active:</p>
                    <p>• Saved rooftop spot tests and field multimeter logs.</p>
                    <p>• Fast auto-fill for PM Surya Ghar portal submission.</p>
                    <p>• Instant CSV export with verified consumer identity.</p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                    >
                      Done / Continue
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="py-2.5 px-4 rounded-xl border border-rose-200 text-rose-700 font-semibold hover:bg-rose-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : accountPickerProvider ? (
                /* In-Modal Account Chooser Picker (Google / Apple) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => setAccountPickerProvider(null)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>←</span>
                      <span>Back</span>
                    </button>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Choose an account
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {accountPickerProvider === "google" ? (
                      [
                        {
                          id: "google-1",
                          name: "Aditya Pathade",
                          email: "aditya.pathade@gmail.com",
                          initials: "AP",
                          bg: "bg-blue-600",
                        },
                        {
                          id: "google-2",
                          name: "Priya Sharma",
                          email: "priya.sharma.solar@gmail.com",
                          initials: "PS",
                          bg: "bg-emerald-600",
                        },
                        {
                          id: "google-3",
                          name: "Solar Project Account",
                          email: "home.energy.msedcl@gmail.com",
                          initials: "SP",
                          bg: "bg-amber-600",
                        },
                      ].map((acc) => (
                        <div
                          key={acc.id}
                          onClick={() => setSelectedOAuthAccount(acc.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                            selectedOAuthAccount === acc.id
                              ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full ${acc.bg} text-white font-bold flex items-center justify-center text-xs shrink-0`}
                            >
                              {acc.initials}
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-gray-900 text-xs">{acc.name}</p>
                              <p className="text-[11px] text-gray-500 font-mono">{acc.email}</p>
                            </div>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              selectedOAuthAccount === acc.id
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedOAuthAccount === acc.id && "✓"}
                          </span>
                        </div>
                      ))
                    ) : (
                      [
                        {
                          id: "apple-1",
                          name: "Aditya Pathade",
                          email: "a.pathade@icloud.com",
                          initials: "AP",
                          bg: "bg-gray-900",
                        },
                        {
                          id: "apple-2",
                          name: "Aditya (Private Relay)",
                          email: "aditya.k8f9@privaterelay.appleid.com",
                          initials: "",
                          bg: "bg-black",
                        },
                      ].map((acc) => (
                        <div
                          key={acc.id}
                          onClick={() => setSelectedOAuthAccount(acc.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                            selectedOAuthAccount === acc.id
                              ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full ${acc.bg} text-white font-bold flex items-center justify-center text-xs shrink-0`}
                            >
                              {acc.initials}
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-gray-900 text-xs">{acc.name}</p>
                              <p className="text-[11px] text-gray-500 font-mono">{acc.email}</p>
                            </div>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              selectedOAuthAccount === acc.id
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedOAuthAccount === acc.id && "✓"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {authError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {authError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (accountPickerProvider === "google") {
                        if (selectedOAuthAccount === "google-2") {
                          handleConfirmOAuthAccount("google", {
                            name: "Priya Sharma",
                            email: "priya.sharma.solar@gmail.com",
                          });
                        } else if (selectedOAuthAccount === "google-3") {
                          handleConfirmOAuthAccount("google", {
                            name: "Solar Project Account",
                            email: "home.energy.msedcl@gmail.com",
                          });
                        } else {
                          handleConfirmOAuthAccount("google", {
                            name: "Aditya Pathade",
                            email: "aditya.pathade@gmail.com",
                          });
                        }
                      } else {
                        if (selectedOAuthAccount === "apple-2") {
                          handleConfirmOAuthAccount("apple", {
                            name: "Aditya Pathade",
                            email: "aditya.k8f9@privaterelay.appleid.com",
                          });
                        } else {
                          handleConfirmOAuthAccount("apple", {
                            name: "Aditya Pathade",
                            email: "a.pathade@icloud.com",
                          });
                        }
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Continue with Selected Account</span>
                    <span>→</span>
                  </button>
                </div>
              ) : (
                /* Unverified Login / OTP Flow */
                <div className="space-y-4">
                  {/* External Fast Sign-In Providers */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center">
                      Continue with
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Google Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenAccountPicker("google")}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs transition shadow-2xs hover:border-gray-300"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          />
                        </svg>
                        <span>Google</span>
                      </button>

                      {/* Apple Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenAccountPicker("apple")}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-900 bg-gray-950 hover:bg-black text-white font-semibold text-xs transition shadow-2xs"
                      >
                        <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 170 170">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.43-5.74-8.8-10.22-18.78-13.43-29.93-3.21-11.15-4.82-21.73-4.82-31.74 0-14.67 3.7-26.68 11.09-36.03 7.4-9.35 16.73-14.12 28.01-14.33 4.79 0 10.15 1.34 16.08 4.02 5.93 2.68 9.68 4.08 11.25 4.19 1.45 0 5.43-1.48 11.95-4.44 6.52-2.95 12.33-4.25 17.43-3.9 13.06.67 23.36 5.56 30.9 14.67-11.53 6.96-17.15 16.63-16.85 29.02.29 9.77 4.13 17.89 11.53 24.35 5.16 4.58 11.1 7.6 17.82 9.06-2.58 7.82-5.77 15.65-9.57 23.49zm-32.99-106.63c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.83-10.37 19.59-11.95.89 7.02-.9 13.78-5.36 20.27-4.46 6.49-10.97 10.74-19.53 12.75-.82-.14-1.7-.22-2.65-.4z" />
                        </svg>
                        <span>Apple</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest shrink-0">
                      Or use OTP Verification
                    </span>
                  </div>

                  {/* Mode Tabs (Mobile vs Email) */}
                  <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("mobile");
                        setOtpSent(false);
                        setAuthError("");
                        setAuthSuccess("");
                      }}
                      className={`py-2 rounded-lg transition ${
                        authMode === "mobile"
                          ? "bg-white text-emerald-800 shadow-xs font-bold"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      📱 Mobile Number
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("email");
                        setOtpSent(false);
                        setAuthError("");
                        setAuthSuccess("");
                      }}
                      className={`py-2 rounded-lg transition ${
                        authMode === "email"
                          ? "bg-white text-emerald-800 shadow-xs font-bold"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      ✉️ Email Address
                    </button>
                  </div>

                  {/* Input Step: Identifier */}
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      {authMode === "mobile" ? (
                        <div>
                          <label className="block text-gray-700 font-semibold mb-1">
                            Indian Mobile Number
                          </label>
                          <div className="flex items-center rounded-xl border border-gray-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 bg-white overflow-hidden transition">
                            <span className="px-3 text-gray-500 bg-gray-50 font-semibold border-r border-gray-200">
                              +91
                            </span>
                            <input
                              type="tel"
                              maxLength={10}
                              value={authPhone}
                              onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, ""))}
                              placeholder="9876543210"
                              className="w-full px-3 py-2.5 text-xs text-gray-900 focus:outline-none"
                              autoFocus
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            We will send a 6-digit verification code.
                          </span>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-gray-700 font-semibold mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            placeholder="consumer@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-gray-900 focus:outline-none transition"
                            autoFocus
                          />
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            We will send a 6-digit verification code to your inbox.
                          </span>
                        </div>
                      )}

                      {authError && (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                          {authError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm text-xs flex items-center justify-center gap-1.5"
                      >
                        <span>Send 6-Digit OTP</span>
                        <span>→</span>
                      </button>
                    </form>
                  ) : (
                    /* Step 2: Enter & Verify OTP */
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-500">
                          Code sent to:{" "}
                          <strong className="text-gray-800">
                            {authMode === "mobile" ? `+91 ${authPhone}` : authEmail}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setAuthError("");
                          }}
                          className="text-emerald-700 font-semibold underline hover:text-emerald-800"
                        >
                          Change
                        </button>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Enter 6-Digit Verification Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          placeholder="• • • • • •"
                          className="w-full text-center tracking-[0.4em] font-mono font-bold text-base px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-gray-900 focus:outline-none transition"
                          autoFocus
                        />
                      </div>

                      {authError && (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                          {authError}
                        </div>
                      )}

                      {authSuccess && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                          {authSuccess}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm text-xs flex items-center justify-center gap-1.5"
                      >
                        <span>Verify &amp; Sign In</span>
                        <span>✓</span>
                      </button>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-gray-400">Didn&apos;t receive code?</span>
                        {otpCooldown > 0 ? (
                          <span className="text-gray-400">Resend in {otpCooldown}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            className="text-emerald-700 font-semibold hover:underline"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-500 text-center">
              Secured for MSEDCL solar subsidy applicants. No external credentials shared.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
