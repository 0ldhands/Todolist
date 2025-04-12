import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Button,
  TextField,
  Radio,
} from "@mui/material";
import axios from "axios";

const Todolist = () => {
  const [userDt, setUserDt] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMob] = useState("");
  const [mail, setMail] = useState("");
  const [gender, setGen] = useState("");
  const [address, setAdd] = useState("");
  const [check, setCheck] = useState({
    male: false,
    female: false,
    others: false,
  });

  const [con, setCon] = useState(true);
  const [ids, setId] = useState(null);

  const fetchUserData = async () => {
    try {
      const fetch = await axios.get("http://localhost:8080/Home/todo");
      if (fetch) {
        setUserDt(fetch.data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const clearForm = () => {
    setName("");
    setMob("");
    setMail("");
    setGen("");
    setAdd("");
    setCheck({ male: false, female: false, others: false });
  };

  const handleClick = async () => {
    if (!name || !mobile || !mail || !gender || !address) {
      alert("Please fill all fields");
      return;
    }

    const data = { name, mobile, mail, gender, address };

    try {
      const fetch = await axios.post("http://localhost:8080/Home/todo", data);
      if (fetch) {
        alert(fetch.data.message);
        clearForm();
        fetchUserData();
      }
    } catch (err) {
      console.error("Add error:", err);
      alert("Add failed");
    }
  };

  const radio = (e) => {
    const value = e.target.value;
    setGen(value);
    setCheck({
      male: value === "male",
      female: value === "female",
      others: value === "others",
    });
  };

  const edit = (val) => {
    const d = userDt.find((v) => v.iduser === val);

    setId(d.iduser);
    setName(d.name);
    setMob(d.mobile);
    setMail(d.mail);
    setGen(d.gender);
    setAdd(d.address);
    setCheck({
      male: d.gender === "male",
      female: d.gender === "female",
      others: d.gender === "others",
    });
    setCon(false);
  };

  const update = async () => {
    if (!name || !mobile || !mail || !gender || !address) {
      alert("Please fill all fields");
      return;
    }

    const data = { name, mobile, mail, gender, address };

    try {
      const fetch = await axios.put(
        `http://localhost:8080/Home/todo/${ids}`,
        data
      );

      if (fetch) {
        alert(fetch.data.message);
        setCon(true);
        clearForm();
        fetchUserData();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  const del = async (i) => {
    try {
      const fetch = await axios.delete(`http://localhost:8080/Home/todo/${i}`);
      if (fetch) {
        alert(fetch.data.message);
        fetchUserData();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          fontWeight: 600,
        }}
      >
        User Data
      </Typography>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", margin: "50px" }}
        lg={12}
        xs={12}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={mobile}
                    type="number"
                    onChange={(e) => setMob(e.target.value)}
                    placeholder="Enter mobile"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Enter mail"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={address}
                    onChange={(e) => setAdd(e.target.value)}
                    placeholder="Enter address"
                  />
                </TableCell>
                <TableCell colSpan={3}>
                  <TableRow>
                    <TableCell>
                      Male
                      <Radio
                        value="male"
                        checked={check.male}
                        onClick={radio}
                      />
                    </TableCell>
                    <TableCell>
                      Female
                      <Radio
                        value="female"
                        checked={check.female}
                        onClick={radio}
                      />
                    </TableCell>
                    <TableCell>
                      Others
                      <Radio
                        value="others"
                        checked={check.others}
                        onClick={radio}
                      />
                    </TableCell>
                  </TableRow>
                </TableCell>
                <TableCell>
                  {con ? (
                    <Button variant="contained" onClick={handleClick}>
                      Add
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={update}>
                      Update
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell colSpan={2}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDt?.map((v) => (
                <TableRow key={v.iduser}>
                  <TableCell>{v.iduser}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.mobile}</TableCell>
                  <TableCell>{v.mail}</TableCell>
                  <TableCell>{v.address}</TableCell>
                  <TableCell>{v.gender}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={2}>
                      <Button
                        variant="contained"
                        onClick={() => edit(v.iduser)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => del(v.iduser)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};

export default Todolist;
