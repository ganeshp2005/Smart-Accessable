/**
 * ReturnWise AI - Analysis Engine & API Service
 * Handles compatibility evaluation against customer requirements and bridges to external backend if configured.
 */

import { sampleProducts } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Evaluates product specifications against explicit customer requirements.
 * Produces structured match score, categorized checks, risk explanation, and alternative recommendations.
 */
export function analyzeProductLocally(product, requirements) {
  const matched = [];
  const mismatched = [];
  const unknownSpecs = [];
  let scorePoints = 0;
  let totalPoints = 0;

  // 1. Budget check
  if (requirements.maxBudget && Number(requirements.maxBudget) > 0) {
    totalPoints += 25;
    const maxBudget = Number(requirements.maxBudget);
    if (product.price <= maxBudget) {
      scorePoints += 25;
      matched.push({
        title: "Budget Requirement",
        detail: `Product price ($${product.price}) is within your maximum budget of $${maxBudget}.`,
        severity: "success"
      });
    } else {
      const overBy = product.price - maxBudget;
      mismatched.push({
        title: "Budget Overrun",
        detail: `Product price ($${product.price}) exceeds your budget of $${maxBudget} by $${overBy}. High return risk due to buyer remorse.`,
        severity: "error",
        impact: "Cost Mismatch"
      });
    }
  }

  // 2. RAM check (applicable to Laptops and Smartphones)
  if (requirements.minRam && Number(requirements.minRam) > 0) {
    totalPoints += 25;
    const reqRam = Number(requirements.minRam);
    const prodRam = product.specifications?.ram;
    if (prodRam !== undefined) {
      if (prodRam >= reqRam) {
        scorePoints += 25;
        matched.push({
          title: "Memory (RAM)",
          detail: `Has ${prodRam}GB RAM (exceeds or meets your requirement of ${reqRam}GB).`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "Insufficient RAM",
          detail: `Equipped with ${prodRam}GB RAM, which is below your minimum requirement of ${reqRam}GB. Will cause performance bottlenecks under intended workload.`,
          severity: "error",
          impact: "Performance Bottleneck"
        });
      }
    } else {
      unknownSpecs.push({
        title: "RAM Specification",
        detail: "RAM capacity is not explicitly verified for this product category."
      });
    }
  }

  // 3. Storage check
  if (requirements.minStorage && Number(requirements.minStorage) > 0) {
    totalPoints += 20;
    const reqStorage = Number(requirements.minStorage);
    const prodStorage = product.specifications?.storage;
    if (prodStorage !== undefined) {
      if (prodStorage >= reqStorage) {
        scorePoints += 20;
        matched.push({
          title: "Storage Capacity",
          detail: `Internal storage of ${prodStorage}GB meets or exceeds your requested ${reqStorage}GB.`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "Storage Space Deficit",
          detail: `Only ${prodStorage}GB internal storage available vs your requirement of ${reqStorage}GB. You may quickly run out of room.`,
          severity: "warning",
          impact: "Capacity Constraint"
        });
      }
    } else {
      unknownSpecs.push({
        title: "Storage Capacity",
        detail: "Internal storage is unverified or not applicable."
      });
    }
  }

  // 4. Battery life check
  if (requirements.minBattery && Number(requirements.minBattery) > 0) {
    totalPoints += 15;
    const reqBattery = Number(requirements.minBattery);
    const prodBattery = product.specifications?.batteryLifeHours;
    if (prodBattery !== undefined && prodBattery > 0) {
      if (prodBattery >= reqBattery) {
        scorePoints += 15;
        matched.push({
          title: "Battery Endurance",
          detail: `Rated for ~${prodBattery} hours, meeting your need of at least ${reqBattery} hours.`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "Subpar Battery Endurance",
          detail: `Rated for ~${prodBattery} hours, failing your target of ${reqBattery} hours. Frequent charging required.`,
          severity: "warning",
          impact: "Portability Constraint"
        });
      }
    } else {
      unknownSpecs.push({
        title: "Battery Endurance Hours",
        detail: "Manufacturer did not report standardized battery run hours (common on passive audio or desktop gear)."
      });
    }
  }

  // 5. Intended Use and Feature keywords analysis
  const combinedNeeds = `${requirements.intendedUse || ''} ${requirements.mustHaveFeatures || ''}`.toLowerCase();
  
  if (combinedNeeds.trim().length > 0) {
    totalPoints += 15;
    let keywordScore = 0;

    // Check GPU / ML / Gaming need
    if (combinedNeeds.includes("machine learning") || combinedNeeds.includes("gaming") || combinedNeeds.includes("cuda") || combinedNeeds.includes("3d")) {
      const gpu = (product.specifications?.gpu || "").toLowerCase();
      if (gpu.includes("rtx") || gpu.includes("nvidia") || gpu.includes("dedicated")) {
        keywordScore += 15;
        matched.push({
          title: "Intended Workload: AI / 3D / Gaming",
          detail: `Equipped with dedicated accelerator (${product.specifications.gpu}) optimized for parallel computation and rendering.`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "GPU Acceleration Missing",
          detail: `Your intended use requires intensive ML/Gaming compute, but this device only provides integrated graphics (${product.specifications?.gpu || 'Standard GPU'}). High return risk if purchased for heavy training or AAA gaming.`,
          severity: "error",
          impact: "Hardware Incompatibility"
        });
      }
    } 
    // Check Noise Cancellation / Commuting need
    else if (combinedNeeds.includes("noise cancel") || combinedNeeds.includes("anc") || combinedNeeds.includes("airplane") || combinedNeeds.includes("travel")) {
      const anc = (product.specifications?.anc || "").toLowerCase();
      if (anc.includes("anc") || anc.includes("hybrid") || anc.includes("adaptive")) {
        keywordScore += 15;
        matched.push({
          title: "Noise Cancellation for Commute/Travel",
          detail: `Includes active noise cancellation (${product.specifications.anc}) suitable for noisy environments.`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "Lacks Active Noise Cancellation",
          detail: "Open-back or passive design lacks active noise suppression required for transit and travel.",
          severity: "error",
          impact: "Feature Absent"
        });
      }
    }
    // Check Water resistance / Workout need
    else if (combinedNeeds.includes("gym") || combinedNeeds.includes("workout") || combinedNeeds.includes("sweat") || combinedNeeds.includes("waterproof")) {
      const water = (product.specifications?.waterResistance || "").toLowerCase();
      if (water.includes("ip67") || water.includes("ip68") || water.includes("ipx7") || water.includes("waterproof")) {
        keywordScore += 15;
        matched.push({
          title: "Durability & Water Resistance",
          detail: `Equipped with certified water resistance rating (${product.specifications.waterResistance}) safe for sports and moisture.`,
          severity: "success"
        });
      } else {
        mismatched.push({
          title: "Not Certified for Sweat/Water",
          detail: "Lacks robust IP water ingress certification; moisture or sweat could void warranty or damage internal drivers.",
          severity: "warning",
          impact: "Durability Risk"
        });
      }
    } else {
      // General match
      keywordScore += 15;
      matched.push({
        title: "Intended Use Alignment",
        detail: `Matches general productivity and entertainment guidelines for "${requirements.intendedUse || 'General Use'}".`,
        severity: "success"
      });
    }

    scorePoints += keywordScore;
  }

  // Calculate final percentage score
  const finalScore = totalPoints > 0 ? Math.round((scorePoints / totalPoints) * 100) : 85;

  // Generate AI Explanation
  let explanation = "";
  if (finalScore >= 80) {
    explanation = `The ${product.name} is a high-confidence match (${finalScore}%) for your criteria. Its core hardware specs satisfy your operational needs, and the price point respects your financial parameters. The risk of return due to capability mismatch is minimal.`;
  } else if (finalScore >= 50) {
    explanation = `The ${product.name} presents moderate purchase risks (${finalScore}% compatibility). While several criteria align, notable deficits were flagged in ${mismatched.map(m => m.title).join(", ")}. If these trade-offs compromise your daily workflow, returns are historically probable.`;
  } else {
    explanation = `High Return Risk Alert (${finalScore}% compatibility): The ${product.name} fails to satisfy critical prerequisites for your designated use case. Specific issues include: ${mismatched.map(m => m.detail).join(" ")} We strongly advise evaluating the tailored alternatives below before checking out.`;
  }

  // Find 2 or more better alternatives in the same category
  const alternatives = sampleProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .map(alt => {
      // Calculate alternative's score with the same requirements
      let altPoints = 0;
      let altTotal = 0;

      if (requirements.maxBudget && Number(requirements.maxBudget) > 0) {
        altTotal += 25;
        if (alt.price <= Number(requirements.maxBudget)) altPoints += 25;
      }
      if (requirements.minRam && Number(requirements.minRam) > 0 && alt.specifications?.ram) {
        altTotal += 25;
        if (alt.specifications.ram >= Number(requirements.minRam)) altPoints += 25;
      }
      if (requirements.minStorage && Number(requirements.minStorage) > 0 && alt.specifications?.storage) {
        altTotal += 20;
        if (alt.specifications.storage >= Number(requirements.minStorage)) altPoints += 20;
      }
      if (requirements.minBattery && Number(requirements.minBattery) > 0 && alt.specifications?.batteryLifeHours) {
        altTotal += 15;
        if (alt.specifications.batteryLifeHours >= Number(requirements.minBattery)) altPoints += 15;
      }

      const altScore = altTotal > 0 ? Math.round((altPoints / altTotal) * 100) : 88;

      // Identify why this alternative may be a better fit
      const reasons = [];
      if (alt.price < product.price) {
        reasons.push(`Saves $${product.price - alt.price} compared to ${product.name}`);
      }
      if ((alt.specifications?.ram || 0) > (product.specifications?.ram || 0)) {
        reasons.push(`Offers more RAM (${alt.specifications.ram}GB vs ${product.specifications.ram || 'N/A'}GB)`);
      }
      if ((alt.specifications?.batteryLifeHours || 0) > (product.specifications?.batteryLifeHours || 0)) {
        reasons.push(`Longer battery endurance (~${alt.specifications.batteryLifeHours} hrs)`);
      }
      if (alt.specifications?.gpu && alt.specifications.gpu.includes("RTX")) {
        reasons.push("Dedicated Nvidia GPU with hardware tensor cores for ML & Gaming");
      }
      if (alt.specifications?.waterResistance && alt.specifications.waterResistance.includes("IP")) {
        reasons.push(`Rugged certification: ${alt.specifications.waterResistance}`);
      }
      if (reasons.length === 0) {
        reasons.push("Balanced alternative tailored to standard category benchmarks.");
      }

      return {
        ...alt,
        matchScore: altScore,
        reasons
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return {
    productId: product.id,
    productName: product.name,
    productCategory: product.category,
    productPrice: product.price,
    productImage: product.image,
    matchScore: finalScore,
    matchedRequirements: matched,
    mismatchedRequirements: mismatched,
    unknownSpecifications: unknownSpecs,
    explanation,
    alternatives,
    evaluatedAt: new Date().toISOString(),
    isDemoData: true
  };
}

/**
 * Public API client interface with fallback to local mock engine.
 */
export const api = {
  // Fetch all products
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend unavailable; use mock data
    }
    return sampleProducts;
  },

  // Fetch product by ID
  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend unavailable; use mock data
    }
    const found = sampleProducts.find(p => p.id === id);
    if (!found) throw new Error(`Product with ID "${id}" was not found.`);
    return found;
  },

  // Analyze product against customer requirements
  async analyzeProduct(product, requirements) {
    try {
      const res = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, requirements }),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend unavailable; calculate with deterministic mock engine
    }
    return analyzeProductLocally(product, requirements);
  },

  // Send question to AI Assistant
  async askAssistant(message, context = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to intelligent local AI assistant simulator
    }

    // Local simulated assistant intelligence
    const query = message.toLowerCase();
    let reply = "";

    if (query.includes("ram") || query.includes("machine learning") || query.includes("ml")) {
      reply = "For local Machine Learning workflows (like fine-tuning PyTorch models or running Ollama/LLMs locally), 16GB is the bare minimum, but 32GB DDR5 alongside a dedicated NVIDIA RTX GPU (with at least 8GB VRAM) is strongly recommended. Integrated Intel/Iris Xe graphics will struggle with CUDA tensor operations.";
    } else if (query.includes("budget") || query.includes("cheap") || query.includes("affordable") || query.includes("price")) {
      reply = "If you're keeping costs strictly down, the SwiftAir 13 ($599) offers the highest value for productivity/schoolwork, while the PixelCraft Zen 8a ($499) delivers flagship-tier photography under $500 without premium markups.";
    } else if (query.includes("why") && (query.includes("not match") || query.includes("mismatch") || query.includes("fail"))) {
      reply = "Products typically fail compatibility checks due to 3 primary return catalysts: 1) Overspending your stated budget ceiling, 2) Insufficient memory/storage causing unresponsiveness under heavy apps, or 3) Lacking purpose-specific hardware like active noise cancellation or high-TGP dedicated graphics.";
    } else if (query.includes("verify") || query.includes("spec") || query.includes("check")) {
      reply = "Before placing an order on Amazon, always verify: 1) Thermal limits and fan noise under sustained load, 2) Whether RAM is soldered or user-upgradable, and 3) Return window & restocking policies for open-box electronics.";
    } else if (query.includes("alternative") || query.includes("better")) {
      reply = "You can view matched alternatives directly on the 'Alternative Products' page. Our engine sorts alternatives by highest requirement match score, pinpointing where competitors surpass the original item in battery life, compute, or price savings.";
    } else {
      reply = `Thank you for asking! Amazon Alexa+ analyzes customer requirements against product hardware to prevent return friction. If you are comparing specific items like laptops, phones, or audio gear, let me know your target budget and must-have features!`;
    }

    return {
      reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: "Amazon Alexa+ Engine (Simulated)",
      suggestions: [
        "Why does this product not match my requirements?",
        "Which alternative is better for my budget?",
        "Does this product have enough RAM for machine learning?",
        "Which important specification should I verify before buying?"
      ]
    };
  }
};
