const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

async function SignUpAdmin(req, res) {
  //get the data from the req
  //validate the data
  //hash the password
  //add the user to the database
  //responde with an account created successfull message if the message
  //if an error occured respond to the client with the error message
  const saltRounds = 10;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
  });
  const { firstName, lastName, email, password, role } = req.body;
  const user = new UserModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
  });

  try {
    await user.save();
  } catch (error) {
    //handle the error
    console.log(error);
    res.status(400).send({ message: 'Invalid user data' });

  }
}


module.exports ={SignUpAdmin}
