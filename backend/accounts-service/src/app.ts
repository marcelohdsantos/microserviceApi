import  express  from "express";
import bodyParser from "body-parser";
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(bodyParser);

app.listen(3000);
console.log('Running on port 3000');
