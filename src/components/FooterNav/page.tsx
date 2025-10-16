import Button from 'react-bootstrap/Button';
import { FaArrowUp } from "react-icons/fa";
export default function FooterNav() {
    return (
        <>
            <div style={{position:"fixed",width:"100vw",height:"50px",bottom:"0",display:"flex",padding:"8px",justifyContent:"space-between"}}>
                <Button variant="primary">Back</Button>
                <Button variant="primary"> <FaArrowUp /></Button>
            </div>
        </>
    )
}
