import "./globals.css";


export const metadata = {
  title: "Service Board",
  description: "Mini Service Request Board"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}