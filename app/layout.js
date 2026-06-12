export const metadata = {
  title: "Stock Analysis Dashboard",
  description: "AI-powered stock valuation and analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
