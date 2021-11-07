import React, { useEffect, useState } from "react";
import configJSON from '../config.json'
import { Human } from "./customTypes";

function Employee() {

    // function editButton(e) {
    //     ``
    // }

    function newEmpolyee() {

    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [employeesData, setEmployeesData] = useState<Human[]>([]);

    useEffect(() => {
        fetch(configJSON.databaseHost + configJSON.client)
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
            // parent div to hold the ul and li's
            <div className="EmployeeTable">
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
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        );
    }
}
export default Employee;