import React, { useEffect, useState } from "react";
import configJSON from '../config.json';
import { Human } from "./customTypes";
// import modal from "./modal/mondal";
import './forms/apiCalls';
import { GetHumans, PostHuman } from "./forms/apiCalls";
// function NewEmpolyee(e) {
    
// }
function Employee() {

    function editButton() {
    }

    
    function deleteButton() {

    }

    const [newHuman, setNewHuman] = useState("");
    const handleSubmit  = (event: any) => {
        event.preventDefault();
        PostHuman(newHuman, configJSON.newEmployee);
        window.location.reload();
    }

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
                            <td><button onClick={editButton} >Edit</button></td>
                            <td><button onClick={deleteButton} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        );
    }
}
export default Employee;