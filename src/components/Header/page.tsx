import {Stack} from "react-bootstrap";
import {FaHouse} from "react-icons/fa6";

function Header() {
    return (
        <Stack style={{height: "100%", overflowX: "auto", padding: "0 20px"}} direction="horizontal" gap={5}>

            <button type="button"
                    style={{borderRadius:"6px"}}
                    className="inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                <FaHouse />
                <span
                    className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                        2
                </span>
            </button>

            <div className="p-2">Second item</div>
            <div className="p-2">Third item</div>
            <div className="p-2">First item</div>
            <div className="p-2">Second item</div>
            <div className="p-2">Third item</div>
            <div className="p-2">First item</div>
            <div className="p-2">Second item</div>
            <div className="p-2">Third item</div>
        </Stack>
    );
}

export default Header;


//