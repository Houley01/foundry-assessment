// =============================
// = File Name: client.tsx     =
// =   Version: 1.0            =
// = Edited by: Ethan Houley   =
// =============================
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import configJSON from '../config.json';
import { Human } from "./customTypes";
import './forms/apiCalls';
import { DeleteHuman, GetHumans, PostHuman, UpdateHuman } from "./forms/apiCalls";

function Client() {
    const [tempHuman, setTempHuman] = useState<Human>({ "id": "", "name": "" });
    // const [isSearch, setIsSearch] = useState(false);
    // ===== EDIT \/ ======
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function editButton(id: string, name: string) {
        console.log("ID: " + id + " name: " + name)
        setTempHuman({
            "id": id, "name": name
        });
        setShow(true);
    }

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        UpdateHuman(tempHuman, configJSON.client);
        window.location.reload();
    }
    // ===== EDIT /\ ======

    // ===== Delete \/ ======
    function DeleteButton(id: string, name: string) {
        setTempHuman({
            "id": id, "name": name
        });
        DeleteHuman(id, name, configJSON.client);
        window.location.reload();
    }
    // ===== Delete /\ ======

    // ===== New Client \/ ======
    const [newHuman, setNewHuman] = useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        PostHuman(newHuman, configJSON.newClient);
        window.location.reload();
    }
    // ===== New Client ======
    // const handleSearch = () => 
    const [searchTable, setSearchTable] = useState<Human[]>([]);


    function filterTable(searchKey: string) {
        var temp: Human[] = [];

        if (searchKey.length === 0) {
            // setIsSearch(false);
            setSearchTable(humanData);
            return
        } else {
            // setIsSearch(true);
            humanData.forEach(element => {
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


    // ===== Client  \/ ======

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [humanData, setHumanData] = useState<Human[]>([]);

    useEffect(() => {
        fetch(configJSON.client)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setHumanData(result); // used as the orgianl source of data
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
                    <label>Add a New Client:
                        <input
                            type="text"
                            value={newHuman}
                            onChange={(e) => setNewHuman(e.target.value)}
                        />
                    </label>
                    <input type="submit" />
                </form>

                {/* // Table  */}
                <div className="ClientTable">
                    <label >Search Client Table: </label>
                    <input type="text" onChange={(e) => filterTable(e.target.value)} />
                    <h1>Client's of BB</h1>
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
                                searchTable.map((human) => (
                                    <tr key={human.id}>
                                        <td> </td>
                                        <td>{human.id} </td>
                                        <td>{human.name} </td>
                                        <td><button onClick={() => editButton(human.id, human.name)} >Edit</button></td>
                                        <td><button onClick={() => DeleteButton(human.id, human.name)} >Delete</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for editing employ information */}
                <Modal show={show} onHide={handleClose} keyboard={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Client</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <p>Update Client Name</p>
                        <form onSubmit={handleEditSubmit}>
                            <input type="text" value={tempHuman.name} onChange={(e) =>
                                setTempHuman({ "id": tempHuman.id, "name": e.target.value })} />
                            <input type="submit" />
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
// ===== Client /\ ======

export default Client;