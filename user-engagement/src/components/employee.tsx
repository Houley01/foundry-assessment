import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import configJSON from '../config.json';
import { Human } from "./customTypes";
import './forms/apiCalls';
import { DeleteHuman, GetHumans, PostHuman, UpdateHuman } from "./forms/apiCalls";

function Employee() {
    const [tempHuman, setTempHuman] = useState<Human>({ "id": "", "name": "" });
    // const [isSearch, setIsSearch] = useState(false);
    // ===== EDIT \/ ======
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function editButton(id: string, name: string ) {
        console.log("ID: " + id + " name: " + name)
        setTempHuman({
            "id": id, "name": name
        });     
        setShow(true);
    }

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        UpdateHuman(tempHuman, configJSON.employee);
        window.location.reload();
    }
    // ===== EDIT /\ ======

    // ===== Delete \/ ======
    function DeleteButton(id: string, name: string) {
        setTempHuman({
            "id": id, "name": name
        });

        
        // console.log("id: " + id + "name " + name);
        // console.log(tempHuman);
        // DeleteHuman(tempHuman, configJSON.employee);
        DeleteHuman(id, name, configJSON.employee);
        window.location.reload();
    }
    // ===== Delete /\ ======

    // ===== New Employee \/ ======
    const [newHuman, setNewHuman] = useState("");
    const handleSubmit  = (event: any) => {
        event.preventDefault();
        PostHuman(newHuman, configJSON.newEmployee);
        window.location.reload();
    }
    // ===== New Employee ======
    // const handleSearch = () => 
    const [searchTable, setSearchTable] = useState<Human[]>([]);

    
    function filterTable(searchKey: string) {
        var temp: Human[] = [];
       
        if (searchKey.length === 0) {
            // setIsSearch(false);
            setSearchTable(employeesData);
            return
        } else {
            // setIsSearch(true);
            employeesData.forEach(element => {
                // console.log("Name: "+ element.name + " " + element.name.toLowerCase().includes(searchKey));

                if (element.name.toLowerCase().includes(searchKey)) {
                    temp.push(element);
                    // console.log("FOUND ID: " + element.id + " name: " + element.name)
                }
            });
        }
        // DEBUG::
        // console.log("search key: " + searchKey);
        
        // temp.forEach(element => {
            
        //     console.log("Temp after search:" + element.name);
        // });
        return setSearchTable(temp);
    }
    

    // ===== Employee  \/ ======

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [employeesData, setEmployeesData] = useState<Human[]>([]);
   
    useEffect(() => {
        fetch(configJSON.employee)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setEmployeesData(result); // used as the orgianl source of data
                    setSearchTable(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Enter your name:
                        <input
                            type="text"
                            value={newHuman}
                            onChange={(e) => setNewHuman(e.target.value)}
                        />
                    </label>
                    <input type="submit" />
                </form>

                {/* // Table  */}
                <div className="EmployeeTable">
                    <label >Search table: </label>
                    <input type="text" onChange={(e) => filterTable(e.target.value)}/>
                    <h1>Employee's of BB</h1>
                    <table>
                        <thead>
                            <tr>
                                <th> </th>
                                <th>ID</th>
                                <th>Name</th>
                                <th></th>
                                <th></th>
                            </tr>    
                    </thead>
                    <tbody>
                        { 
                        searchTable.map((employee) => (
                            <tr key={employee.id}>
                                <td> </td>
                                <td>{employee.id} </td>
                                <td>{employee.name} </td>
                                <td><button onClick={() => editButton(employee.id, employee.name)} >Edit</button></td>
                                <td><button onClick={() => DeleteButton(employee.id, employee.name)} >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                {/* Modal for editing employ information */}
                <Modal show={show} onHide={handleClose} keyboard={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
               

                <Modal.Body> 
                    <p>Update Employee Name</p>
                        <form onSubmit={handleEditSubmit}>
                        <input type="text" value={tempHuman.name} onChange={(e) => 
                            setTempHuman({"id": tempHuman.id, "name": e.target.value})}/>
                        <input type="submit" />
                    </form>
                </Modal.Body>
                </Modal>
            </div>
        );
    }
}
    // ===== Employee /\ ======

export default Employee;