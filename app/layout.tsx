// app/layout.tsx
import '@/app/globals.css';
import Providers from '@/app/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A full-stack task management app with tRPC, Next.js, and Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
