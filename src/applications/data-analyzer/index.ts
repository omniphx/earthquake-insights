import express, { Request, Response } from "express";
import { EarthquakeDataGateway } from "../../services/earthquakeDataGateway";
const app = express();
const port = 3000;

app.get("/api/earthquakes", (req: Request, res: Response) => {
  const service = new EarthquakeDataGateway();
  service
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
