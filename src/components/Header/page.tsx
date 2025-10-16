"use client"
import { Badge } from "@mui/material";
import {Button, Stack} from "react-bootstrap";
import { HeaderDataType } from "@/type/headerData";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  headerData: HeaderDataType[];
  setHeader:React.Dispatch<React.SetStateAction<HeaderDataType[]>>;
}
function Header({headerData,setHeader}:HeaderProps) {
    const statusHandle = (name:string) :void => {
        setHeader(prev => prev.map(itm =>
            (
            {...itm,isActive : itm.name === name }
            ))
        )
    }
    return (
        <Stack style={{height: "100%", overflowX: "auto", padding: "0 20px"}} direction="horizontal" gap={5}>
            {headerData.map(itm =>
            (
                <Link key={itm.id} href={itm.link} >
                <Button style={itm.isActive ? {marginBottom:'-10px'} : {marginBottom:'0'}} onClick={() => statusHandle(itm.name)} variant={itm.isActive ? 'primary' : 'light'} size="lg">
                    <Badge badgeContent={itm.count} color="primary">
                    {itm.icon}
                    </Badge>
                </Button>
                </Link>
            )
        )}
        </Stack>

    );
}
export default Header;



