import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "@/store/provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
        <body>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>
  );
}
