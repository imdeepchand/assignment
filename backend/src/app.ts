import express, { Application, Router, json } from 'express';
import cors from 'cors';
import * as http from 'http';
import { MongoClient, Db } from 'mongodb';
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const { SERVERPORT, DATABASENAME, MONGODBURI} = process.env;
export class App {
  static express?: Application;
  static server: http.Server;
  static mongodb?: Db;
  private client?: MongoClient;
  static peerServer: any;
  dbname: string = DATABASENAME || "test" ;
  port: number = Number(SERVERPORT) || 3000;
  dburl:string = MONGODBURI || "mongodb://127.0.0.1:27017/";
  constructor(options: { apis: { version: string; routers: Router[] }[] }) {
    if (App.express == undefined) {
      App.express = express();
      App.express.use(json());
      App.express.use(cors({
        origin:"*",
        methods: "GET,PUT,POST,PETCH,DELETE",
        allowedHeaders: "Content-Type,Authorization"
      }
      ));
      App.express.use((req, res, next) => {
        console.log('\x1b[32m', `${req.method.toUpperCase()} ${req.path}`);
        next();
      });
      App.express.use('/public', express.static(path.join(__dirname, '../public')));
      for (const api of options.apis) {
        for (const router of api.routers) {
          App.express.use(`/api/${api.version}`, router);
        }
      }
    }
    if (App.mongodb == undefined) {
      this.client = new MongoClient(this.dburl);
    }
  }
  async start() {
    App.server = new http.Server({}, App.express);
    if (this.client) {
      await this.client.connect();
      App.mongodb = this.client.db(this.dbname);
    }
    App.server?.listen(this.port, () => {
      console.log(`server is online http://localhost:${this.port} successfully`);
    });
  }
}