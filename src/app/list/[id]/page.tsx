"use client";
import {useParams} from "next/navigation";
import {useEffect} from "react";

function List() {
    const routeParams = useParams();
    useEffect(() => {

    }, []);
    return (
        <>
            <div>
                xin chào, đây là trang params {routeParams.id}
            </div>
        </>
    )
}

export default List