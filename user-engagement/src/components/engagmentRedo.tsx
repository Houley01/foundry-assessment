// =============================
// = File Name: client.tsx     =
// =   Version: 1.0            =
// = Edited by: Ethan Houley   =
// =============================
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import configJSON from '../config.json';
import { Engagement, Human, NewEngagement, PreEngagement } from "./customTypes";
import './forms/apiCalls';
import { DeleteHuman, EndEngagment, GetHumanId, GetHumans, PostEngagment, PostHuman, UpdateHuman } from "./forms/apiCalls";

function DisplayEngagement() {
    const [clientList, setClientList] = useState<Human[]>([]);
    const [employeeList, setEmployeeList] = useState<Human[]>([]);
    // Modal CREATE
    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleOpenCreate = () => setShowCreate(true);
    const [createName, setCreateName] = useState("");
    const [createClient, setCreateClient] = useState("");
    const [createEmployee, setCreateEmployee] = useState("");
    const [createDesciption, setCreateDesciption] = useState("");

    // MODAL EDIT
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const [tempEngagement, setTempEngagment] = useState<Engagement>();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [masterData, setMasterData] = useState<Engagement[]>([]);
    const [searchTable, setSearchTable] = useState<Engagement[]>([]);

    function editButton(id: string, name: string) {
        setShowEdit(true);
    }

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        //
        window.location.reload();
    }
    const handleCreateSubmit = (event: any) => {
        event.preventDefault();
        console.log("submited Create");

        // console.log(createName);
        // console.log(createClient);
        // console.log(createEmployee);
        // console.log(createDesciption);

        let data:NewEngagement = {
            "name": createName,
            "client": createClient,
            "employee": createEmployee,
            "description": createDesciption
        }
        PostEngagment(data);
        // window.location.reload();
    }

    // ===== Delete \/ ======
    function DeleteButton(id: string, name: string) {
        // INSERT
        window.location.reload();
    }
    // ===== Delete /\ ======

    // ===== New Client \/ ======
    const [newHuman, setNewHuman] = useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
                // INSERT
        window.location.reload();
    }
    // ===== New Client ======

    function filterTable(searchKey: string) {
        var temp: Engagement[] = [];

        if (searchKey.length === 0) {
            // setIsSearch(false);
            setSearchTable(masterData);
            return
        } else {
            // setIsSearch(true);
            masterData.forEach(element => {
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

    function GetData() {
        

        fetch(configJSON.engagment)
        .then(res=>res.json())
        .then(async res=>{
            return await Promise.all(res.map(async (data: any) => {
                const { client, employee } = data;
                const clientData = await fetch(configJSON.client + client).then(res=>res.json())
                const employeeData = await fetch(configJSON.employee + employee).then(res => res.json())

                data.client = clientData;
                data.employee = employeeData;
                return data;
            }))
            .then((res:any)=>{
                setMasterData(res)
                setSearchTable(res)

            })
        }).then( async () => { 
            return await Promise.all([
                fetch(configJSON.client).then(res => res.json()),
                fetch(configJSON.employee).then(res => res.json())
        ])
        }).then ((res) => {
            setClientList(res[0]);
            setEmployeeList(res[1]);
            setIsLoaded(true)
        })
        
    
    }
    useEffect(() => {
       
       

        GetData();
        
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // console.log(employeeList);
        return (
            <div>
                <button onClick={handleOpenCreate}>Create New Engagement</button>

                {/* // Table  */}
                <div className="ClientTable">
                    <label >Search Table: </label>
                    <input type="text" onChange={(e) => filterTable(e.target.value)} />
                    <h1>Engagements of x</h1>
                    <table>
                        <thead>
                            <tr>
                                <th> </th>
                                {/* <th>ID</th> */}
                                <th>Name</th>
                                <th>Client Name</th>
                                <th>Employee Name</th>
                                <th>description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchTable.map((obj) => (
                                    <tr key={obj.id}>
                                        <td> </td>
                                        {/* <td>{obj.id} </td> */}
                                        <td>{obj.name} </td>
                                        <td>{obj.client.name} </td>
                                        <td>{obj.employee.name} </td>
                                        <td>{obj.description} </td>
                                        <td>{obj.started} </td>
                                        <td>{obj.ended} </td>
                                        <td><button onClick={() => editButton(obj.id, obj.name)} >Edit</button></td>
                                        <td><button onClick={() => DeleteButton(obj.id, obj.name)} >Delete</button></td>
                                        <td><button onClick={() => EndEngagment(obj.id)}>End Engagement</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <Modal show={showEdit} onHide={handleCloseEdit} keyboard={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Engagement</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <p>Update Data</p>
                        <form onSubmit={handleEditSubmit}>
                            {/* <input type="text" value={tempHuman.name} onChange={(e) =>
                                setTempHuman({ "id": tempHuman.id, "name": e.target.value })} />
                            <input type="submit" /> */}
                        </form>
                    </Modal.Body>
                </Modal>

                {/* Modal for Creating Engagement */}
                <Modal show={showCreate} onHide={handleCloseCreate} keyboard={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Engagement</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <form onSubmit={handleCreateSubmit}>
                            <label>Engagement Name: <input type="text" onChange={(e) => setCreateName(e.target.value)}/></label>
                            <br />
                            <label>Client: 
                                <select onChange={(e) => setCreateClient(e.target.value)}>
                                    {clientList.map((elememt) => {
                                        // console.log(elememt)
                                        return <option value={elememt.id}>{elememt.name}</option>
                                    })}
                                </select>  
                            </label>
                            <br />
                            <label>Employee:
                                <select onChange={(e) => setCreateEmployee(e.target.value)}>
                                    {employeeList.map((elememt) => {
                                        // console.log(elememt)
                                        return <option value={elememt.id}>{elememt.name}</option>
                                    })}
                                </select>  
                            </label>
                            <br />
                            <label>Description: </label><br /><textarea onChange={(e) => setCreateDesciption(e.target.value)}></textarea>
                            <br />
                            <button type="submit">Submit</button>
                            <button onClick={handleCloseCreate}>Cancel</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
// ===== Client /\ ======

export default DisplayEngagement;