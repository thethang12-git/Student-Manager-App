import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterNav from "@/app/components/FooterNav/page";
import HeaderWrapper from "./HeaderWrapper";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ height: "100vh",display: "flex", flexDirection: "column" }}>
          <div style={{flex: "0.08",background:"light-blue",border:"2px solid gray", borderRadius:"8px",margin:"8px"}}>
              <HeaderWrapper/>
          </div>
          <div className="flex-1 overflow-auto mb-5">
              {children}
          </div>
          <FooterNav/>
      </div>
      </body>
      
      
    </html>
  );
}
