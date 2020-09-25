import "../../../config/config";
import express from "express";

import Vessel from "../../model/Vessel";
import { VESSEL_PRT_ID } from "../../model/Vessel/vesselPID";

const router = express.Router();

const config = global.gConfig;

const _c_central_db = config.db_config.central_db;

router.post("/vessel", async (req, res) => {
  const payload = req.user;
  const database = payload.cid;

  let data = {};
  // populating data from request body
  for (let [key, value] of Object.entries(req.body)) {
    data[key] = value;
  }

  const extData = Object.assign({}, data, {
    some: "some extended data",
  });

  await Vessel.create(res, payload, extData, VESSEL_PRT_ID, database);
});

router.get("/vessel", async (req, res) => {
  const database = _c_evito_db;
  try {
    return await Vessel.getAll(res, VYA_PRODUCT_PRT_ID, database);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const database = _c_evito_db;

  const id = req.params.id;
  const key = `${VYA_PRODUCT_PRT_ID}::${id}`;

  await Vessel.getById(res, key, VYA_PRODUCT_PRT_ID, database);
});

router.get("/vessel/:id", async (req, res) => {
  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.getById(res, key, VESSEL_PRT_ID, database);
});

router.put("/vessel/:id", async (req, res) => {
  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.modById(res, req, key, VESSEL_PRT_ID, database);
});

router.delete("/vessel/:id", async (req, res) => {
  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.delById(res, payload, key, VESSEL_PRT_ID, database);
});

export default router;
