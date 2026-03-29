import './globals.css';
import { cookies } from "next/headers";

import Navigation from './_components/Navigation';
import ScrollToTop from './_components/ScrollToTop';
import { CartProvider } from './_components/CartContext';
import { PreviewStateProvider } from './_components/PreviewStateContext';
import ClientOverlay from './_components/ClientOverlay';
import { WishlistProvider } from './_components/WishlistContext';

import { Toaster } from "react-hot-toast"

import Footer from './_components/Footer';
import SyncGuest from './_components/SyncGuest';
import { createClient } from './_lib/supabase/server';

export const metadata = {
  title: {
    default: "Dressify"
  },
  description: 
  "Ecommerce website for shopping cloth"
}

export default async function RootLayout({ children, params }) {
  const theme = (await cookies()).get("theme")?.value || "light";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" data-theme={theme}>
      <body className="relative min-h-screen mx-auto max-w-[1600px] md2:px-4">
        <CartProvider>
          <PreviewStateProvider>
            <WishlistProvider>

              <ScrollToTop />

              <Navigation params={params} />
              <ClientOverlay />
              <SyncGuest userId={user?.id ?? null} />

              <main className='mx-auto w-full mt-10'>
                { children }
              </main>
              
              <Footer />

            <Toaster 
              postiion="top-center"
              gutter={12}
              containerStyle={{margin: "8px"}}
              toastOptions={{
                success: {
                  duration: 3000
                },
                error: {
                  duration: 5000
                },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'var(--gray-bg)',
                  color: 'var(--gray-text)',
                  marginTop: '3rem',
                }
              }}
            />

            </WishlistProvider>
          </PreviewStateProvider>
        </CartProvider>
      </body>
    </html>
  )
}
