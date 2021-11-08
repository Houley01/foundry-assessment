import configJSON from '../../config.json';
import { Human, Engagements } from "../customTypes";


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

function UpdateHumans() {
    
}
export {
    PostHuman, 
    GetHumans,
    UpdateHumans

}