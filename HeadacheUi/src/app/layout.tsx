import StoreProvider from "@/stores/StoreProvider";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './flags.css';
import { Header } from "@/components/header";
import { PublicEnvScript } from "next-runtime-env";
import type { Metadata } from "next";
import { App } from "./App";

export const metadata: Metadata = {
  title: "UI",
  description: "this is a UI app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <PrimeReactProvider>
          <StoreProvider>
            <App>
              <div className="global_wrapper">
                <Header />
                <div className="content">
                  {children}
                </div>
              </div>
            </App>
          </StoreProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
};
