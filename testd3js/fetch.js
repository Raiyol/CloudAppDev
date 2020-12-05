export async function FetchJSON(url) {
    const response = await fetch(url);
    const json_resp = await response.json();
    if(response.status != 200){
        console.log(response);
    }
    else{
        console.log(json_resp);
        return json_resp;
    }
}

// export function FetchJSON();

FetchJSON('http://localhost:3000/');