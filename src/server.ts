import { Express } from "./lib/express";
import http from "http";
const express = new Express();
const serverHttp = http.createServer(express.app);
serverHttp.listen(express.port, function() {
    console.log("Express Server listen: " + express.port);
});
