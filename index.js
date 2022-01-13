const express = require("express");
const { reset } = require("nodemon");
require("./src/db/Conn")
const crud = require("./src/model/struct");
const router = express();
router.use(express.json())
const cors = require("cors");

router.use(cors())


router.post("/adddata", async (req, res) => {
    const { fname, lname, email, city, gender } = req.body

    const cruddata = await crud.create({
        fname,
        lname,
        email,
        city,
        gender
    });
    // console.log("crudata",cruddata);
    const userdata = await cruddata.save();
    //    console.log(userdata);
    res.send(userdata);
})


router.get("/getdata", async (req, res) => {

    const getdata = await crud.find();
    // console.log(getdata);
    res.send(getdata)
})



router.delete("/deletedata/:id", async (req, res) => {

    const deletedata = await crud.findByIdAndDelete(req.params.id)
    console.log("deletedata", deletedata);
    res.send(deletedata)
})

router.put("/updatedata/:id", async (req, res) => {
    const updateuser = await crud.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(updateuser);
    res.send(updateuser);
})

router.listen(4000, () => {
    console.log("port is listing");
})
