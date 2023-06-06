export const petAPI = async function (type, breed) {
    let apiKey = "live_N2Rbh8S7x7rpr83FuWpXpRL0KScimRnhS9BD7mOAHufWuww7cdTyYBusQDAONUYA";
    try{
        const response = await fetch(`https://api.the${type}api.com/v1/images/search?limit=1&breed_ids=${breed}`,{
            method: 'GET',
            headers: {
                'x-api-key' : apiKey
            }
        });


        if (response.status === 200) {
            const data = await response.json();
            return data[0].url;
        } else {
            throw new Error(response.status)
        }

    } catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }
}




