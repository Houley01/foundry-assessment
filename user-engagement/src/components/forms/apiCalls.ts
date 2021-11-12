import configJSON from '../../config.json';
import { Human, Engagement, PreEngagement, NewEngagement } from "../customTypes";


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
// let tempJob = {
//     "id": element.id,
//     "name": element.name,
//     "client": tempClient,
//     "employee": tempEmployee,
//     "description": element.description,
//     "started": element.started,
//     "ended": element?.ended
// }

function GetHumans(url: string) {
    let data: Human[] = []
    fetch(url).then(res => res.json()).then((res) => data = data) ;
    return data;
}
function GetHumanId(url: string, id: string) {
    // let data: Human = {"id": "", "name":""};
    return fetch(url+id).then(res => res.json())
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
async function GetEngagements() {
    let temp: PreEngagement[] = [];
    fetch(configJSON.engagment).then((res) => res.json()).then((res) => temp = res);
    return temp; 
}

async function PostEngagment(data: NewEngagement) {
    console.log("POST: ")
    console.table(data);
    fetch(configJSON.engagment, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(resData => {
            console.log('Success:', resData);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

async function PutEngagment(data: Engagement) {
    console.log("PUT: ")
    console.table(data);
}

async function EndEngagment(id: string) { 
    console.log("End Engagement: " + id );
    fetch(configJSON.engagment + id + "/end", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function DeleteEngagement(id: string, name: string) {
    let isDelete = window.confirm("Are you sure you want to delete: " + name);
    if (isDelete) {
        fetch(configJSON.engagment + id, {
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
    window.location.reload();
}


export {
    PostHuman, 
    GetHumans,
    UpdateHuman,
    DeleteHuman,
    GetHumanId,
    GetEngagements,
    PostEngagment,
    PutEngagment,
    EndEngagment,
    DeleteEngagement

}
