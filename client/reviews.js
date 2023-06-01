export const data = async function() {
    let res = await fetch("http://localhost:3000/");

    if (res.ok) {
        let json = await res.json();

        json.data.forEach((element) => {
            console.log(element);
            let review = document.createElement("div");
            let comment = document.createElement("p");
            let rating = document.createElement("p");
            let h3 = document.createElement("h3");
            let h4 = document.createElement("h4");
            h3.innerText = element.firstName + " " + element.lastName;
            h4.innerText = new Date(element.createdAt).toDateString();
            comment.innerText = element.comment;
            rating.innerText = element.rating;

            review.appendChild(h3);
            review.appendChild(h4);
            review.appendChild(comment);
            review.appendChild(rating);

            document.querySelector('#eventBox').appendChild(review);
        });
    }
}