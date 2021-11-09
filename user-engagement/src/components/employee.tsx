import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import configJSON from '../config.json';
import { Human } from "./customTypes";
import './forms/apiCalls';
import { GetHumans, PostHuman, UpdateHuman } from "./forms/apiCalls";
// function NewEmpolyee(e) {
    
// }
function Employee() {

    // ===== EDIT \/ ======
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [editHuman, setEditHuman] = useState<Human>({ "id": "", "name": "" });

    function editButton(id: string, name: string ) {
        console.log("ID: " + id + " name: " + name)
        setEditHuman({
            "id": id, "name": name
        });
        setShow(true);
    }

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        UpdateHuman(editHuman, configJSON.databaseHost + configJSON.employee);
        // window.location.reload();
    }
    // ===== EDIT /\ ======

    // ===== Delete \/ ======
    function deleteButton() {

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

    // ===== Employee  \/ ======

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [employeesData, setEmployeesData] = useState<Human[]>([]);
   
    useEffect(() => {
        fetch(configJSON.databaseHost + configJSON.employee)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setEmployeesData(result);
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
                    {/* <button onClick={NewEmpolyee}>Add new employee</button> */}
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
                        {employeesData.map((employee) => (
                            <tr key={employee.id}>
                                <td> </td>
                                <td>{employee.id} </td>
                                <td>{employee.name} </td>
                                <td><button onClick={() => editButton(employee.id, employee.name)} >Edit</button></td>
                                <td><button onClick={deleteButton} >Delete</button></td>
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
                        <input type="text" value={editHuman.name} onChange={(e) => 
                            setEditHuman({"id": editHuman.id, "name": e.target.value})}/>
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