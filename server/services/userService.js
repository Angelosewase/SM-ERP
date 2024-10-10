const { SchoolModel, UserModel } = require("../models/Schemas");
const { getUserIdFromToken, getSchoolIdFromToken } = require("../utils/jwt");

function generateTheuserResponse(user) {
    if(!user){
        console.log(user)
        return
    }
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    school: user.school,
    role: user.role,
    teacher: user.teacher,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function generateTheSchoolRespose(school) {
    if(!school){
        console.log(school)
        return
    }
  return {
    _id: school._id,
    name: school.name,
    address: school.address,
    email: school.email,
    admin: school.admin,
    teachers: school.teachers,
    students: school.students,
    parents: school.parents,
    classes: school.classes,
    establishedYear: school.establishedYear,
    createdAt: school.createdAt,
    updatedAt: school.updatedAt,
  };
}

async function getAccountDetails(req, res) {
  const token = req.cookies.token;
  const userID = getUserIdFromToken(token);
  const schoolID = getSchoolIdFromToken(token);

  try {
    const user = await UserModel.findOne({ _id: userID });
    const school = await SchoolModel.findOne({ _id: schoolID });
    const responseUser = generateTheuserResponse(user);
    const schoolResponse = generateTheSchoolRespose(school);

    res.status(200).json({
      message: "accound detaile retrived successfully",
      user: responseUser,
      school: schoolResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}

module.exports = {
  generateTheSchoolRespose,
  generateTheuserResponse,
  getAccountDetails,
};
