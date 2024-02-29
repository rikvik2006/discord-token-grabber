import { createBrowser } from "./services/createBrowser";

const main = () => {
    createBrowser()
}

try {
    main();
} catch (err) {
    console.log(err);
}