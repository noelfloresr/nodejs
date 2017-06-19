const mongoose = require('mongoose');

let StudentSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    lowercase: true
  }
});

let Students = mongoose.model('Students', StudentSchema);
module.exports = Students;

//Get all Students
module.exports.getStudents = function(callback){
  Students.find({}, callback);
};

//Get student by his/her id
module.exports.getStudentById = function(id, callback){
  //same as:
  //Students.findById(id).exec(callback);
  //Students.findById(id, function (err, adventure) {});
  Students.findById(id, callback)
}

//Create a new student
module.exports.addStudent = function(objStudent, callback){
  //in order to use the method save
  //you have to create a local instance of Students
  let localStudent = new Students(objStudent);

  //A shortcode without validation and so on is the method
  //Students.create(objStudent, callback);
  localStudent.save(callback);
}

//Update an student
module.exports.updateStudent = function(id, objStudent, options, callback){
  let query = {_id: id};
  let updatedObject = {
    name: objStudent.name,
    lastName: objStudent.lastName,
    email: objStudent.email
  }
  Students.findOneAndUpdate(query, updatedObject, options, callback);
}
