const mongoose = require('mongoose');

let SubjectMatterSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  category:[
    {
      nameCategory: String,
      subjectCategory: [String]
    }
  ],
  date:{
    type: Date,
    default: Date.now
  }
});

let SubjectMatter = mongoose.model('SubjectMatter', SubjectMatterSchema);
module.exports = SubjectMatter;

module.exports.getSubjectMatter = function(callback){
  SubjectMatter.find({}, callback);
}

module.exports.getSubjectMatterByName = function(name, callback){
  let query = {name:name};
  SubjectMatter.findOne(query, callback);
}

module.exports.addSubjectMatter = function(objSubjectMatter, callback){
  let localSubjectMatter = new SubjectMatter(objSubjectMatter);
  localSubjectMatter.save(callback);
}
