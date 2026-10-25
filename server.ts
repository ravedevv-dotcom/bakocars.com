/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHOWROOM_FLEET_SUMMARY = [
  '- 2020 Mercedes-Benz S63 AMG Sedan (Flagship) | Price: Inquire for Price | Mileage: 18,200 mi | Interior: Designo Exclusive Black Nappa Leather | Duty Paid | Stock #BC-000',
  '- 2020 Mercedes-Benz S450 4MATIC | Price: ₦138,000,000 | Mileage: 24,500 mi | Interior: Macchiato Beige / Magma Grey Nappa | Duty Paid | Stock #BC-001',
  '- 2014 Mercedes-Benz E350 | Price: ₦28,000,000 | Mileage: 61,400 mi | Interior: Silk Beige Leather | Duty Paid | Stock #BC-002',
  '- 2021 Mercedes-Benz AMG GLE 53 Coupe | Price: ₦175,000,000 | Mileage: 19,200 mi | Interior: Classic Red / Black AMG Nappa | Duty Paid | Stock #BC-003',
  '- 2019 Lexus GX 460 Luxury | Price: ₦80,000,000 | Mileage: 39,800 mi | Interior: Sepia Semi-Aniline Leather | Duty Paid | Stock #BC-004',
  '- 2017 Mercedes-Benz GLE 43 AMG 4MATIC | Price: ₦67,000,000 | Mileage: 48,900 mi | Interior: Black / Ginger Beige Leather | Duty Paid | Stock #BC-005',
  '- 2020 BMW X6 xDrive40i M-Sport | Price: ₦125,000,000 | Mileage: 27,300 mi | Interior: Tacora Red Vernasca Leather | Duty Paid | Stock #BC-006',
  '- 2016 BMW X4 xDrive28i | Price: ₦35,000,000 | Mileage: 56,100 mi | Interior: Saddle Brown Nevada Leather | Duty Paid | Stock #BC-007',
  '- 2018 Mercedes-Benz GLC 300 4MATIC | Price: ₦48,500,000 | Mileage: 44,200 mi | Interior: Espresso Brown MB-Tex | Duty Paid | Stock #BC-008',
  '- 2019 Toyota Land Cruiser Prado VX-L | Price: ₦95,000,000 | Mileage: 34,600 mi | Interior: Tonneau Cream Leather | Duty Paid | Stock #BC-010',
  '- 2021 Range Rover Velar R-Dynamic S | Price: ₦112,000,000 | Mileage: 22,100 mi | Interior: Eclipse / Ebony Perforated Grained Leather | Duty Paid | Stock #BC-011',
  '- 2024 Toyota Hilux Adventure 4x4 | Price: ₦92,000,000 | Mileage: 1,800 mi | Interior: Black Perforated Leather | Duty Paid | Stock #BC-014',
  '- 2022 Mercedes-Benz C300 (W206) | Price: ₦98,000,000 | Mileage: 14,500 mi | Interior: Sienna Brown / Black Artico | Duty Paid | Stock #BC-015',
  '- 2021 Lexus RX 350 F-Sport | Price: ₦82,000,000 | Mileage: 26,400 mi | Interior: Circuit Red NuLuxe | Duty Paid | Stock #BC-016',
].join('\n');

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Server-Side Gemini API endpoint for Bako Virtual Chief Concierge
  app.post('/api/concierge', async (req, res) => {
    try {
      const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt : '';
      if (!prompt.trim()) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({ error: 'GEMINI_API_KEY not configured on server' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are the BAKO VIRTUAL CHIEF CONCIERGE for Bako Cars (https://www.bakocars.com), the #1 luxury and exotic car dealership in Abuja, Nigeria.
Showroom Location: 2FWF+FH2, Behind Tsukunda House, Abuja 900103, Nigeria.
Direct Phone / WhatsApp: 0816 733 2017 | 0705 809 9349 (wa.me/2347058099349).
Core Services:
1. Prestige Vehicle Sales (100% Nigeria Customs Duty Paid, authenticated titles).
2. Trade-Ins & Upgrades (Instant same-day physical valuation & equity rollover in Abuja).
3. 40% Off Direct Importation Promo (Sourcing from USA, Canada, Europe & Dubai auctions with 40% discount on procurement/handling fees and express customs clearance).
4. Precision Auto Spa / Detailing Stand (Executive foam hand wash, Nappa leather conditioning, paint correction, and 9H ceramic coating right at our stand behind Tsukunda House).

Respond with authority, warmth, and luxury poise. Understand both standard English and Nigerian English / Pidgin effortlessly. Keep responses concise (2-4 short paragraphs or bullet points) and cite specific cars and Naira (₦) prices from our live Abuja showroom inventory below:
${SHOWROOM_FLEET_SUMMARY}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || '' });
    } catch (err) {
      console.error('Gemini Concierge API error:', err);
      const message = err instanceof Error ? err.message : 'Concierge request failed';
      res.status(500).json({ error: message });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.K_SERVICE);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.use((_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bako Cars server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
