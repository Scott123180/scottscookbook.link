const foodSearch = (params, callback) => {

    if(params === "") return {};

    //const query = params.query;
    const key = params;

    const requestBody = {
        "query": 'cheddar cheese', 
        "pageSize": 2, 
        "pageNumber": 1, 
        "dataType": [
            "Foundation",
            "SR Legacy"
        ],
        "sortBy": "dataType.keyword",
        "sortOrder": "asc"
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + key;

    let content = {"empty" : "socks"};

    fetch(url, requestOptions)
    .then(r => {
        console.log(r.ok)
        console.log(r.statusText)

        return r.json();
    })
    .then(r => {
        callback(r);
    })

}

export default foodSearch;
