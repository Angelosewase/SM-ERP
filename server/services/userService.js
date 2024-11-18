const { validateAccessToken } = require("../auth/signTokens");
const { SchoolModel, UserModel } = require("../models/Schemas");
const { getUserIdFromToken, getSchoolIdFromToken } = require("../utils/jwt");

function generateTheuserResponse(user) {
  if (!user) {
    console.log("userService.js line 6: " + user);
    return;
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
  if (!school) {
    console.log("userService.js line 27: " + school);
    return;
  }
  return {
    _id: school._id,
    name: school.name,
    address: school.address,
    email: school.email,
    admin: school.admin,
    teachers: school.teachers,
    students: school.students,
    parents: school.Parents,
    classes: school.classes,
    establishedYear: school.establishedYear,
    createdAt: school.createdAt,
    updatedAt: school.updatedAt,
  };
}

async function getAccountDetails(req, res) {
  try {
    const user = await UserModel.findById(req.user.id);
    const school = await SchoolModel.findById(req.user.schoolId);
    const responseUser = generateTheuserResponse(user);
    const schoolResponse = generateTheSchoolRespose(school);

    res.status(200).json({
      message: "accound detaile retrived successfully",
      user: responseUser,
      school: schoolResponse,
    });
  } catch (error) {
    console.log("userService.js line 60: " + error);
    res.status(500).send({ message: "internal server error" });
  }
}

module.exports = {
  generateTheSchoolRespose,
  generateTheuserResponse,
  getAccountDetails,
};
