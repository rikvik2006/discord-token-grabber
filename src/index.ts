import { createBrowser } from "./services/createBrowser.js";
import dotenv from "dotenv"

const main = () => {
    dotenv.config()
    createBrowser()
}

try {
    main();
} catch (err) {
    console.log(err);
}