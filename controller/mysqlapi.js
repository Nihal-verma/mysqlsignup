const con = require("../config");
const bcrypt = require("bcrypt");
const hashed = async (password) => {
  return await bcrypt.hash(password, 10);
};
const verifypassword = async (password, dbpassword) => {
  return await bcrypt.compareSync(password, dbpassword);
};
const mysignup = async(req, res) => {
  try {
   
    const mobile = req.body.mobile;
    const password = req.body.password;
    const encryptedPassword = await hashed(password);
   console.log(mobile,password)
    con.query("SELECT * FROM signup WHERE mobile = ?",mobile,(err, result) => {
        if (err) {
          console.log("err>>", err);
          return res.status(500).json({ msg: "Internal server error" });
        }
        if (result.length>0) {
          const confirmpassword = verifypassword(password, result[0].password);
          if (!confirmpassword) {
            return res.status(401).json({ msg: "incorrect password" });
          } else {
            return res.status(200).json({ msg: "sign in successfull" });
          }
        } else {
          con.query("SELECT COUNT(*) AS count FROM signup", (err, result) => {
            if (err) {
              console.log("err>>", err);
              return res.status(500).json({ msg: "Internal server error" });
            }
            const counting = result[0].count
              if (counting >= 5) {
              return res.status(401).json({ msg: "Registration limit reached" });
            } else {
                let data = {
                    mobile: mobile,
                    password: encryptedPassword,
                  };
              con.query("INSERT INTO signup SET ?", data, (err, result) => {
                if (err) {
                  console.log("err>>", err);
                } else {
                  console.log("results>>", result);
                  return res.json({ msg: "data saved", data: data });
                }
              });
            }
          });
        }
      }
    );
  } catch (error) {
    console.log("erro>>", error);
  }
};
module.exports = { mysignup };
