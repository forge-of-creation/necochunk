import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan = require("morgan");
import helmet from "helmet";
import axios from "axios";

dotenv.config({ path: "./.env.local", override: true });

const indexRoot = express();
const httpStatusCodes = axios.HttpStatusCode;

indexRoot.use(
  cors(),
  morgan("dev"), 
  express.json(),
  helmet({
    crossOriginEmbedderPolicy: true, // ? Don't know much about it.
    strictTransportSecurity: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
  })
);

class IndexDirective {
  // * Directs all the methods.
  listenInitialRequest(req: Request, res: Response) {
    res.status(httpStatusCodes.Ok).json({
      message: "Hello World",
    });
  }
}

//* Divert all the paths
class IndexExecutive extends IndexDirective {
  DivertRequiredPaths() {
    indexRoot.get("/", this.listenInitialRequest);
  }
}

// ! IMPORTANT: Execute the diverted routes path
const indexExecutive = new IndexExecutive();
indexExecutive.DivertRequiredPaths(); // ? Divert the required paths

// * Listen to the server
const ListenToTheServer = () => {
  try {
    indexRoot.listen(process.env.port, () => {
      console.log(`🥙👌 Running [${process.env.port}]`);
    });
  } catch (error: Object | any) {
    console.log(`[❌🤧] Vancho, Kuch Gadbad Hai! ${error.message}`);
  }
};

ListenToTheServer();
