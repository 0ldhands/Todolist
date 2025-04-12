const express = require("express");
const router = express.Router();
const { getData, postData,putData,deletData } = require("../controllers/controller.todo");

router.get("/todo", getData);

router.post("/todo", postData);

router.put("/todo/:id",putData);

router.delete("/todo/:id",deletData)

module.exports = router;
