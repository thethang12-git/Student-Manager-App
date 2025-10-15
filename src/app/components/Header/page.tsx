import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {Button, Stack} from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { HeaderDataType } from "@/type/headerData";
import Link from "next/link";

interface HeaderProps {
  headerData: HeaderDataType[];
  setHeader: React.Dispatch<React.SetStateAction<HeaderDataType[]>>;
}
function Header({headerData,setHeader}:HeaderProps) {
    // const clickHandle = (num:number) : void => {
    //     setHeader(item => 
    //         item.map(itm => itm.id === num? {...itm,count:itm.count+ 1} : itm)
    //     )
    // }

    return (
        <Stack style={{height: "100%", overflowX: "auto", padding: "0 20px"}} direction="horizontal" gap={5}>
            {headerData.map(itm => 
            (
                <Link key={itm.id} href={itm.link} >
                <Button variant="light" size="lg">
                    
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


//