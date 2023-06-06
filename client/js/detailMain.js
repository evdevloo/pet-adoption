import {getPet} from "./petfinder.js";

(async function () {
    await getPet(window.location.href.split("=")[1])

})()