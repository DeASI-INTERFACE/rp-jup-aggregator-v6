/**
 * UNIQUE CODE IDENTIFIER: RP-DEASI-JUP-2026-0619-001
 * rp-jup-aggregator-v6 Frontend — Richard Patterson (@De-ASI-INTERFACE)
 */
import { Analytics } from '@vercel/analytics/next';
import React from 'react';

export const metadata = {
  title: 'rp-jup-aggregator-v6',
  description: 'Jupiter Aggregator V6 with HTTP 402 Payment Gating',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
