import configJSON from '../../config.json';
import { Human, Engagement } from "../customTypes";


async function PostHuman(name: string, url: string) {
    if (!name || name.length !== 0) {
        // const data = JSON.parse("{\"name\": \""+ name +"\"}");
        const data = "{\"name\": \"" + name + "\"}";
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data),
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return -1;
            });
    } else {
        alert("Please enter a name");
        return -1;
    }

} 


function GetHumans() {

    // fetch(configJSON.databaseHost + configJSON.client)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setIsLoaded(true);
    //             setEmployeesData(result);
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             setIsLoaded(true);
    //             setError(error);
    //         }
    //     )
    // return []
}

async function UpdateHuman(data: Human, url: string) {
    if (!data.name || data.name.length !== 0) {
        fetch(url + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return -1;
            });
    } else {
       return -1
    }

} 
//  I could not get the type to function correctly
// async function DeleteHuman(data: Human, url: string) { 
// Instead just pass the idea instead of the human type 
async function DeleteHuman (id: string, name: string, url: string) {
    let isDelete = window.confirm("Are you sure you want to delete: " + name);
    if (isDelete) {
        fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return -1;
            });
    }
}
//  engagments 
// async function GetEngagments() {
//     var temp;
//     fetch(configJSON.engagment)
//         .then(response => response.json())
//         .then(result => console.log(result))
//         .then(result => temp = result)
//         .catch(error => console.log('error', error));
//     return temp; 
// }

async function PostEngagment() {}

async function PutEngagment(data: Engagement) {}

async function EndEngagment(id: string) { 

}


export {
    PostHuman, 
    GetHumans,
    UpdateHuman,
    DeleteHuman,
    // GetEngagments,
    PostEngagment,
    PutEngagment,
    EndEngagment

}
