import app, { init } from "./app/index";
import dotenv from "dotenv";

dotenv.config();

const PORT = +process.env.PORT;

init().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
)
