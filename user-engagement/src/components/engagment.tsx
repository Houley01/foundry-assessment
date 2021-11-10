import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import configJSON from '../config.json';
import { Human, PreEngagement, Engagement } from "./customTypes";
import './forms/apiCalls';
import { DeleteHuman, GetHumans, PostHuman, UpdateHuman } from "./forms/apiCalls";

function DisplayEngagement() {
    const [tempEngagmement, setTempEngagmement] = useState<Engagement>();
    // const [isSearch, setIsSearch] = useState(false);
    // ===== EDIT \/ ======
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [engagementData, setEngagementData] = useState<Engagement[]>([]); // final Eng
    const [tempEngagementData, setTempEngagementData] = useState<PreEngagement[]>([]);

    function editButton(id: string, name: string) {
        // console.log("ID: " + id + " name: " + name)
        // setTempHuman({
        //     "id": id, "name": name
        // });
        // setShow(true);
    }

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        // UpdateHuman(tempHuman, configJSON.employee);
        window.location.reload();
    }
    // ===== EDIT /\ ======

    // ===== Delete \/ ======
    function DeleteButton(id: string, name: string) {
        // setTempHuman({
        //     "id": id, "name": name
        // });


        // console.log("id: " + id + "name " + name);
        // console.log(tempHuman);
        // DeleteHuman(tempHuman, configJSON.employee);
        DeleteHuman(id, name, configJSON.employee);
        window.location.reload();
    }
    // ===== Delete /\ ======

    // ===== New Employee \/ ======
    const [newHuman, setNewHuman] = useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // PostHuman(newHuman, configJSON.newEmployee);
        window.location.reload();
    }
    // ===== New Employee /\ ======

    // const handleSearch = () => 
    const [searchTable, setSearchTable] = useState<Engagement[]>([]);


    function filterTable(searchKey: string) {
        var temp: Engagement[] = [];

        if (searchKey.length === 0) {
            // setIsSearch(false);
            setSearchTable(engagementData);
            return
        } else {
            // setIsSearch(true);
            engagementData.forEach(element => {
                // console.log("Name: "+ element.name + " " + element.name.toLowerCase().includes(searchKey));

                if (element.name.toLowerCase().includes(searchKey)) {
                    temp.push(element);
                    // console.log("FOUND ID: " + element.id + " name: " + element.name)
                }
            });
        }
        return setSearchTable(temp);
    }


    // ===== Employee  \/ ======

   
    useEffect(() => {
        fetch(configJSON.engagment)
            .then(res => res.text())
            .then(
                (result) => {
                    setIsLoaded(true);
                    // setTempEngagementData(result);
                    // console.log(result);
                    ColletData(result);
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
                <div className="Table">
                    <label >Search table: </label>
                    <input type="text" onChange={(e) => filterTable(e.target.value)} />
                    <h1>Engaements's with BB</h1>
                    <table>
                        <thead>
                            <tr>
                                <th> </th>
                                <th>ID</th>
                                <th>Name</th>
                                {/* <th>Client</th>
                                <th>Employee</th> */}
                                <th>Desciption</th>
                                <th>Started</th>
                                <th>Ended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchTable.map((obj) => (
                                    <tr key={obj.id}>
                                        <td> </td>
                                        <td>{obj.id} </td>
                                        <td>{obj.name} </td>
                                        {/* <td>{obj.client.name} </td>
                                        <td>{obj.employee.name} </td> */}
                                        <td>{obj.description} </td>
                                        <td>{obj.started} </td>
                                        <td>{obj.ended} </td>
                                        <td><button onClick={() => editButton(obj.id, obj.name)} >Edit</button></td>
                                        <td><button onClick={() => DeleteButton(obj.id, obj.name)} >Delete</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for editing employ information */}
                {/* <Modal show={show} onHide={handleClose} keyboard={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <p>Update Engagement</p>
                        <form onSubmit={handleEditSubmit}>
                            <input type="text" value={tempHuman.name} onChange={(e) =>
                                setTempHuman({ "id": tempHuman.id, "name": e.target.value })} />
                            <input type="submit" />
                        </form>
                    </Modal.Body>
                </Modal> */}
            </div>
        );
    }
    
    // Collect data for employee and Client
    function ColletData(data: string) {
        let tempClient: Human, tempEmployee: Human, tempEngagement: Engagement;
        console.log(JSON.parse(data));
        let jsonData: PreEngagement[] = JSON.parse(data);
        jsonData.forEach(element => {
            // console.log(element.client);
        //     // Promise.all([
            fetch(configJSON.client + element.client).then(value => value.json().then(value => tempClient = value));
            fetch(configJSON.client + element.client).then(value => value.json().then(value => tempEmployee = value));
            
            tempEngagement = {
                "id": element.id,
                "name": element.name,
                "client": tempClient,
                "employee": tempEmployee,
                "description": element.description,
                "started": element.started,
                "ended": element?.ended
            }
            setSearchTable([...searchTable, tempEngagement]);
            setEngagementData([...engagementData, tempEngagement]);
        });
    }
}

// ===== Employee /\ ======

export default DisplayEngagement;