import React, {useState} from "react";
import configJSON from '../../config.json';
import { Human } from "../customTypes";
import './forms/apiCalls';

function TableControler(val: number) {
    const [search, setSearch] = useState();
    const [searchTable, setSearchTable] = useState<Human[]>([]);
    function SearchTable(key: string) {}

    function EmpTable () {
        return (
            <div> <p>emp table</p></div>
        )
    }   
    if (search === 0) {
        return <EmpTable/>
    } else if (search === 1) {
        return <EmpTable />
    } 

    return (
        <div></div>
    )
}

export default TableControler
