import "./globals.css";

export const metadata = {
  title: "Amin Najjar | DevSecOps Portfolio",
  description: "DevSecOps, Cloud and IT projects portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
