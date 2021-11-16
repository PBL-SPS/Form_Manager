const DepartmentService = require("../services/DepartmentService");

exports.createDepartment = async (req, res, next) => {
  try {
    let deptData = req.body;
    let departmentId = await DepartmentService.createDepartment(deptData);

    res.json({
      message: "Department created successfully",
      data: {
        id: departmentId,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    let depData = await DepartmentService.getDepartment();

    res.json({
      data: depData,
    });
  } catch (error) {
    return next(error);
  }
};
