async function FetchJSON(url) {
    const response = await fetch(url);
    const json_resp = await response.json();
    if(response.status != 200){
        console.log(response);
    }
    else{
        return json_resp;
    }
}

async function AllPerf(url = "http://localhost:3000/"){
    let perf = {
        deno1 : [],
        deno2 : [],
        deno2no : []
    }
    let mapr = { mr1: 229913, mr2: 12277 };
    console.log(perf, mapr);
    console.log('Start fetching');
    for(i = 1; i <= 2; i++){
        for(j = 1; j <= 8 ; j++){
            console.log(`Deno ${i}, query ${j}`);
            let data = await FetchJSON(`${url}denormalisation${i}/query${j}/perf`);
            console.log(data);
            perf[`deno${i}`].push(data[`query${j}`]);
        }
        console.log(perf[`deno${i}`]);
    }
    perf.deno2no = perf.deno2.map(x => x);
    perf.deno2[0] += mapr.mr1;
    perf.deno2[2] += mapr.mr1;
    perf.deno2[3] += mapr.mr1 + mapr.mr2;
    perf.deno2[6] += mapr.mr1;
    perf.deno2[7] += mapr.mr1 + mapr.mr2;

    console.log(perf);
}


AllPerf();