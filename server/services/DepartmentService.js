const Department = require("../daos/Department");

exports.createDepartment = async (deptData) => {
  let departmentId = await Department.create(deptData);
  return departmentId;
};

exports.getDepartment = async () => {
  let departmentData = await Department.get();
  return departmentData;
};
