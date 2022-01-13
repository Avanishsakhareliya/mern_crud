import Table from "./Table";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from '@material-ui/core'
// import result from "../../../src/model/struct";
const axios = require('axios');
function Form() {

    const [err, seterr] = useState({
        e1: "",
        e2: "",
        e3: "",
        errval: false
    })
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        city: "",
        gender: "",

    })

    const [updateuser, setupdateuser] = useState("")
    function validation() {
        user.fname === "" ? seterr((pre) => ({ ...pre, e1: "enter your fname", errval: true })) : seterr((pre) => ({ ...pre, e1: "", errval: false }))
        user.lname === "" ? seterr((pre) => ({ ...pre, e2: "enter your lname", errval: true })) : seterr((pre) => ({ ...pre, e2: "", errval: false }))
        user.email === "" ? seterr((pre) => ({ ...pre, e3: "enter your email", errval: true })) : seterr((pre) => ({ ...pre, e3: "", errval: false }))

    }



    function handlechange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        validation()
    }

    const postdata = async (e) => {

        validation()
        if (err.errval === false) {
            // const obj = {

            //     fname: user.fname,
            //     lname: user.lname,
            //     email: user.email,
            //     gender: user.gender,
            //     city: user.city,
            // }
            // // user.push(obj);
            // console.log("obj", obj);

            console.log(updateuser);
            if (updateuser === "") {
                const result = await axios.post("http://localhost:4000/adddata", user);
            }
            else {
                const update = await axios.put(`http://localhost:4000/updatedata/${updateuser}`, user)
            }

            // console.log("result", result);
            setUser({
                fname: "",
                lname: "",
                email: "",
                city: "",
                gender: ""
            })

            document.getElementById("male").checked = false
            document.getElementById("female").checked = false

        }
        window.location.reload()
    }


    async function updatedata(id) {
        console.log("id", id);
        const updatedata = await axios.put(`http://localhost:4000/updatedata/${id}`)
        console.log("updatedata", updatedata.data);
        setUser({
            fname: updatedata.data.fname,
            lname: updatedata.data.lname,
            email: updatedata.data.email,
            city: updatedata.data.city,
            gender: updatedata.data.city
        })
        if (updatedata.data.gender === "male") {
            document.getElementById("male").checked = true
        }
        else {
            document.getElementById("female").checked = true

        }
        console.log("user", user);
        setupdateuser(id)

    }
    return (

        <>
            <center>
                <form method="post">
                    <div>

                        <TextField id="fname" label="fname" variant="standard" name="fname" onChange={handlechange} value={user.fname} /><span id="fn">{err.e1}  </span>
                        <TextField id="lname" label="lname" variant="standard" name="lname" onChange={handlechange} value={user.lname} /><span id="ln">{err.e2}</span>
                        <br /><br />
                        <TextField id="email" type="emali" label="email" name="email" variant="standard" placeholder="email" onChange={handlechange} value={user.email} /><span id="em">{err.e3}  </span>
                        <br /><br /><br />
                        <div style={{ width: "180px" }}>
                            <select className="form-select" aria-label="Default select example" name="city" onChange={handlechange} value={user.city}>
                                <option >city selected</option>
                                <option value="surat">surat</option>
                                <option value="vadodara">vadodara</option>
                                <option value="rajkot">rajkot</option>
                            </select>
                        </div>
                        <br /><br />

                        <div style={{ width: "100px" }} onChange={handlechange}>
                            <div className="form-check" >
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                                <label className="form-check-label">
                                    Male
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gender" id="female" value="female" />
                                <label class="form-check-label" >
                                    Female
                                </label>
                            </div>
                        </div>
                        <br /><br />



                        <button type="button" class="btn btn-outline-primary" onClick={(e) => postdata(e)}>submit</button>




                    </div>
                </form>
                <br />
                <br />

                <Table props={(id) => updatedata(id)} />

            </center>
        </>


    )










}



export default Form

