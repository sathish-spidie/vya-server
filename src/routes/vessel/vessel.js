import "../../../config/config";
import express from "express";

import Vessel from "../../model/Vessel";
import { VESSEL_PRT_ID } from "../../model/Vessel/vesselPID";

const router = express.Router();

const config = global.gConfig;

const _c_central_db = config.db_config.central_db;

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const startkey = req.query.startkey;
  const endkey = req.query.endkey;
  const database = _c_evito_db;

  if (startkey && !endkey) {
    await Vessel.getAll(res, VYA_PRODUCT_PRT_ID, database, limit, startkey);
  } else if (startkey && endkey) {
    await Vessel.getAll(
      res,
      VYA_PRODUCT_PRT_ID,
      database,
      limit,
      startkey,
      endkey
    );
  } else {
    await Vessel.getAll(res, VYA_PRODUCT_PRT_ID, database, limit);
  }
});

// To get the product by id
router.get("/:id", async (req, res) => {
  // const accessList = ["ADMIN"];
  const database = _c_evito_db;

  const id = req.params.id;
  const key = `${VYA_PRODUCT_PRT_ID}::${id}`;

  await Vessel.getById(res, key, VYA_PRODUCT_PRT_ID, database);
});

router.post("/vessel", async (req, res) => {
  const payload = req.user;
  const database = payload.cid;

  let data = {};
  // populating data from request body
  for (let [key, value] of Object.entries(req.body)) {
    data[key] = value;
  }

  const extData = Object.assign({}, data, {
    userId: payload.userId,
    cid: payload.cid,
  });

  await Vessel.create(res, payload, extData, VESSEL_PRT_ID, database);
});

router.get("/vessel", async (req, res) => {
  const payload = req.user;
  const limit = req.query.limit ? req.query.limit : "25";
  const startkey = req.query.startkey;
  const endkey = req.query.endkey;
  const database = payload.cid;

  if (startkey && !endkey) {
    await Vessel.getAll(res, VESSEL_PRT_ID, database, limit, startkey);
  } else if (startkey && endkey) {
    await Vessel.getAll(res, VESSEL_PRT_ID, database, limit, startkey, endkey);
  } else {
    await Vessel.getAll(res, VESSEL_PRT_ID, database, limit);
  }
});

router.get("/vessel/:id", async (req, res) => {
  const payload = req.user;

  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.getById(res, key, VESSEL_PRT_ID, database);
});

router.put("/vessel/:id", async (req, res) => {
  const payload = req.user;

  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.modById(res, req, key, VESSEL_PRT_ID, database);
});

router.delete("/vessel/:id", async (req, res) => {
  const payload = req.user;
  const database = _c_central_db;

  const id = req.params.id;
  const key = `${VESSEL_PRT_ID}::${id}`;

  await Vessel.delById(res, payload, key, VESSEL_PRT_ID, database);
});

export default router;
