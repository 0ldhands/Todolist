const DB = require("../DB.js");

const getData = (req, res) => {
  try {
    const query = "SELECT * FROM user";
    DB.query(query, [], (err, result) => {
      if (err) {
        res.status(500).json({ mesage: "internal server error" });
      }

      res.status(200).json({ message: result });
    });
  } catch (error) {
    console.error(`server error ${error}`);
    res.status(500).json({ message: "internal server error" });
  }
};

const postData = (req, res) => {
  const { name, mobile, mail, gender, address } = req.body

  if (!name || !mobile || !mail || !gender || !address) {
    res.status(400).json({ message: "bad request" });
  }

  try {
    const query =
      "INSERT INTO user (name,mobile,mail,gender,address) VALUES (?,?,?,?,?)";
    DB.query(query, [name, mobile, mail, gender, address], (err, result) => {
      if (err) {
        res.status(500).json({ message: "internal server error" });
      }
      if (result.affectedRows === 1) {
        res.status(201).json({ message:'User successfully created'});
      }
    });
  } catch (error) {
    console.error(`internal server error ${error}`);
    res.status(500).json({ message: "internl server error" });
  }
};

const putData=(req,res)=>{
    const {name,mobile,mail,gender,address}=req.body
    const {id}=req.params

    const gen= gender ? gender :"male"

    try {
        const query="UPDATE user SET name=?, mobile=?, mail=?, gender=?,address=? WHERE iduser=?"
        DB.query(query,[name,mobile,mail,gen,address,id],(err,result)=>{

            if(err){
                res.status(500).json({message:"internal DB error"})
            }

            if(result.affectedRows === 1){
                res.status(200).json({message:"user successfully updated"})
            }
             
        })
    } catch (error) {
        res.status(500).json({message:"internal srever error"})
    }
}

const deletData=(req,res)=>{
    const {id}=req.params

    try {
        const query ="DELETE FROM user WHERE iduser=?"
        DB.query(query,[id],(err,result)=>{
            if(err){
                res.status(500).json({message:"internal DB error"})
            }
            if(result.affectedRows === 1){
                res.status(200).json({message:"user deleted sucessfully"})
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internl server error"})
    }
}

module.exports = { getData, postData,putData,deletData };
