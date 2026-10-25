/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { SHOWROOM_VEHICLES } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-Side Gemini API endpoint for Bako Virtual Chief Concierge
  app.post('/api/concierge', async (req, res) => {
    try {
      const { prompt } = req.body as { prompt?: string };
      if (!prompt || !prompt.trim()) {
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

      const fleetSummary = SHOWROOM_VEHICLES.filter((v) => v.status !== 'Sold')
        .map(
          (v) =>
            `- ${v.year} ${v.make} ${v.model} | Price: ${
              v.price > 0 ? '₦' + v.price.toLocaleString('en-US') : 'Inquire for Price'
            } | Mileage: ${v.mileage ? v.mileage.toLocaleString() + ' mi' : 'Low Mileage'} | Interior: ${
              v.interiorColor
            } | Duty Paid | Stock #${v.stockNumber}`
        )
        .join('\n');

      const systemInstruction = `You are the BAKO VIRTUAL CHIEF CONCIERGE for Bako Cars (https://www.bakocars.com), the #1 luxury and exotic car dealership in Abuja, Nigeria.
Showroom Location: 2FWF+FH2, Behind Tsukunda House, Abuja 900103, Nigeria.
Direct Phone / WhatsApp: 0816 733 2017 | 0705 809 9349 (wa.me/2347058099349).
Core Services:
1. Prestige Vehicle Sales (100% Nigeria Customs Duty Paid, authenticated titles).
2. Trade-Ins & Upgrades (Instant same-day physical valuation & equity rollover in Abuja).
3. 40% Off Direct Importation Promo (Sourcing from USA, Canada, Europe & Dubai auctions with 40% discount on procurement/handling fees and express customs clearance).
4. Precision Auto Spa / Detailing Stand (Executive foam hand wash, Nappa leather conditioning, paint correction, and 9H ceramic coating right at our stand behind Tsukunda House).

Respond with authority, warmth, and luxury poise. Understand both standard English and Nigerian English / Pidgin effortlessly. Keep responses concise (2-4 short paragraphs or bullet points) and cite specific cars and Naira (₦) prices from our live Abuja showroom inventory below:
${fleetSummary}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || '' });
    } catch (err: any) {
      console.error('Gemini Concierge API error:', err);
      res.status(500).json({ error: err?.message || 'Concierge request failed' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
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
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bako Cars server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
