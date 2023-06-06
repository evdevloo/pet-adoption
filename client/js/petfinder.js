import {petAPI} from "./petAPI.js";
import {catDict,dogDict} from "./BreedList.js";

let apiKey = "9HSoonhALyx2axFBKN627rkafBXK9S5RFzDo7ssm5pF8Ch9iny";
let secretKey = "YvGT0E3dwZBQYkTBoDuz6c6qwGJVE7K21hhlA1ZH";


const getToken = async function () {
    try{
        const response = await fetch("https://api.petfinder.com/v2/oauth2/token",{
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


        if (response.status === 200) {
            const data = await response.json();
            return data.access_token;
        }
        throw new Error(response.status)

    } catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }
}

export const getPets= async function(place, limit, type, breed, gender, age) {


    if (place === ".petContainer") {
        document.querySelector('.petContainer').innerHTML= "";
        let loading = document.createElement("h2");
        loading.innerText = "loading";
        loading.style.marginLeft = "auto";
        loading.style.marginRight = "auto";
        document.querySelector('.petContainer').appendChild(loading);

    }

    try{
        const token = await getToken();
        const response = await fetch(`https://api.petfinder.com/v2/animals?limit=${limit}&type=${type}&breed=${breed}&gender=${gender}&age=${age}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded'
            }});
        if (response.status === 200) {
            const data = await response.json();
            await makeCards(place, data, breed);
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }
}
const getType = async function(type) {
    try{
        const token = await getToken();
        const response = await fetch(`https://api.petfinder.com/v2/types/${type}/breeds`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            /*

            data.breeds.forEach(breed => {
                console.log(breed.name);
            })

             */
            //console.log(data);
            return data
        }else {
            throw new Error(response.status);
        }


    } catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }
}

const makeCards = async function(place, data, breed) {
    try {
        if (place === ".petContainer") {
            document.querySelector('.petContainer').innerHTML= "";
        }

        if(data.animals.length === 0){
            let noMatch = document.createElement("h2");
            noMatch.innerText = "Sorry we have no matches";
            noMatch.style.marginLeft = "auto";
            noMatch.style.marginRight = "auto";
            document.querySelector('.petContainer').appendChild(noMatch);
            return;
        }
        for (const pet of data.animals) {
            let petCard = document.createElement("div");
            let petMedia = document.createElement("div");
            let petBody= document.createElement("div");

            petCard.classList.add("petCard");
            if (place === ".cards") {
                petCard.classList.add("swiper-slide");
            }
            petMedia.classList.add("petMedia");
            petBody.classList.add("petBody");

            let img = document.createElement("img");

            let name = document.createElement("h3");
            name.innerText = pet.name.split(" ")[0];

            try {
                img.src = pet.primary_photo_cropped.full;
            } catch {
                if(pet.type === "Cat"){
                    img.src = await petAPI(pet.type,catDict[breed]);
                } else if (pet.type === "Dog"){
                    img.src = await petAPI(pet.type,dogDict[breed]);
                }
            }

            img.alt = "picture of " + pet.name.split(" ")[0] +`(${pet.type})`;

            let a =  document.createElement("a");
            a.href = `./detail.html?$id=${pet.id}`;
            a.classList.add("overlay-link");

            petMedia.appendChild(img);
            petBody.appendChild(name);
            petBody.appendChild(a);
            petCard.appendChild(petMedia);
            petCard.appendChild(petBody);

            document.querySelector(place).appendChild(petCard);
        }



    }catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }

}

export const getPet= async function(id) {

    try{
        const token = await getToken();
        const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded'
            }});
        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            await detailCard(data);
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        console.log(`HTTP error! Status: ${err}`);
    }
}

const detailCard = async function(data) {

    let petCard = document.createElement("div");
    let petMedia = document.createElement("div");
    let petBody = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("h1");
    let petbreed = document.createElement("p");
    let description = document.createElement("p");
    let age = document.createElement("p");
    let gender = document.createElement("p");

    let pet = data.animals;


    try {
        img.src = pet.primary_photo_cropped.full;
    } catch {
        if(pet.type === "Cat"){
            img.src = await petAPI(pet.type,catDict[pet.breed]);
        } else if (pet.type === "Dog"){
            img.src = await petAPI(pet.type,dogDict[pet.breed]);
        }
    }

    img.alt = "picture of " + pet.name.split(" ")[0] +`(${pet.type})`;
    petMedia.appendChild(img);
    petMedia.classList.add("petMedia");


    name.innerText = pet.name.split(" ")[0];
    petBody.appendChild(name);
    petBody.classList.add("petBody");

    petbreed.innerText = pet.description;
    petBody.appendChild(petbreed);

    age.innerText = pet.description;
    petBody.appendChild(age);

    gender.innerText = pet.description;
    petBody.appendChild(gender);

    description.innerText = pet.description;
    petBody.appendChild(description);



    petCard.appendChild(petMedia);
    petCard.appendChild(petBody);

    petCard.classList.add("petCard");

    document.querySelector(".container").appendChild(petCard);
}




