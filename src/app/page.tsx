"use client"
import Body from "@/components/Body/page";
import Header from "@/components/Header/page";
import FooterNav from "@/components/FooterNav/page";
import {useState} from "react";

export default function Home() {
    const [header,setheader] = useState({

    })
  return (
      <div style={{ height: "100vh",display: "flex", flexDirection: "column" }}>
          <div style={{flex: "0.08",background:"light-blue",border:"2px solid gray", borderRadius:"8px",margin:"8px"}}>
              <Header/>
          </div>
          <div className="flex-1 overflow-auto mb-5">
              <Body/>
          </div>
          <FooterNav/>
      </div>
  );
}
