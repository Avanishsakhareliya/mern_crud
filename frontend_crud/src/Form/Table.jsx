// require("../index");

import { useEffect, useState } from "react";
const axios = require('axios');

function Table(props) {

    const [state, setstate] = useState([])

    const dataArray = async () => {
        const result = await axios.get("http://localhost:4000/getdata");
        setstate(result.data)
        console.log("resultof getdata", result);
    }

    console.log("state", state);
    useEffect(() => {
        dataArray()
    }, state)
    // setTimeout(() => {
    //     dataArray()

    // }, 1000);
    // useEffect(()=>{

    // },[])



    async function deletedata(id) {

        // const del = state[id]._id;
        console.log(id);
        const removedata = await axios.delete(`http://localhost:4000/deletedata/${id}`);

        dataArray()

        console.log(removedata);

    }


    // async function updatedata(id) {
    //     console.log("id",id);
    //     const updatedata=await axios.put(`http://localhost:4000/updatedata/${id}`)
    //     console.log("updatedata",updatedata.data);
    //          setUser({
    //              fname:updatedata.data.fname,
    //              lname:updatedata.data.lname,
    //              email:updatedata.data.email,
    //              gender:updatedata.data.gender,
    //              city:updatedata.data.city,

    //          })
    // }



    return (<>

        <center>
            <table class="table" style={{ width: "900px" }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">City</th>
                        <th scope="col">Gender</th>
                    </tr>
                </thead>
                <tbody>


                    {console.log(state)}                      {
                        state.map((item, id) => (
                            <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.city}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <button type="button" class="btn btn-success" onClick={() => props.props(item._id)}>update</button>
                                    <span>  </span>
                                    <button type="button" class="btn btn-danger" onClick={() => deletedata(item._id)}>delete</button><span> </span>
                                </td>
                            </tr>
                        ))
                    }




                </tbody>


            </table>
        </center>



    </>)
}

export default Table;