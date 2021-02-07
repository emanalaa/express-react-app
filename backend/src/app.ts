import express from 'express';
import routes from './routes/routes'

const cors = require('cors');
const app = express();
const fileupload = require("express-fileupload");

app.use(fileupload());
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use(routes);

const port = 8080;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
