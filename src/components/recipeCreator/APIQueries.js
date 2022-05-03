const foodSearch = (params) => {

    if(params === "") return {};

    //const query = params.query;
    const key = params;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'cheddar cheese' })
    };

    const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + key;

    fetch(url, requestOptions)
    .then(r => {console.log(r.ok)})
    .then(r => {
        console.log(r);
    })
    // .then(response => {console.log(JSON.stringify(response))})

    //const content = JSON.stringify(await response);

    console.log("response");
    // console.log(JSON.stringify(response));
    // const data = response.json();

    return {};

}

export default foodSearch;
