const foodSearch = (apiKey, query, pageNumber, callback) => {

    if(query === "" || apiKey === "") return {};

    const requestBody = {
        "query": query, 
        "pageSize": 10, 
        "pageNumber": pageNumber, 
        "dataType": [
            "Survey (FNDDS)"
        ],
        "sortBy": "dataType.keyword",
        "sortOrder": "asc"
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + apiKey;

    fetch(url, requestOptions)
    .then(r => {
        return r.json();
    })
    .then(r => {
        callback(r);
    })

}

export default foodSearch;
