import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StickyActions from '../components/StickyActions';
import { CartProvider } from '../context/CartContext';
import { CompareProvider } from '../context/CompareContext';
import { SettingsProvider } from '../context/SettingsContext';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Nandhas | Industrial Food Machinery & Architectural Interior Panels',
  description: 'Manufacturer of commercial ice cream machines, continuous milk pasteurizers, beverage bottling lines, acoustic charcoal panels, and UV marble PVC sheets.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-600 selection:text-white">
        <AuthProvider>
          <SettingsProvider>
            <CompareProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <StickyActions />
              </CartProvider>
            </CompareProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
