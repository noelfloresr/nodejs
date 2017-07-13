const express = require('express');
const router = express.Router();

//call the model for students
const Students = require('../models/students');

// path: /api/students/
router.get('/', function(req, res){
  Students.getStudents(function(err, students){
    if(err){
      console.log(err);
      res.json({success: false, msg:err});
    }else{
      res.json({'students': students});
    }
  })
});

router.get('/:id', function(req, res){
  let id = req.params.id;
  Students.getStudentById(id, function(err, student){
    if(err){
      throw err;
    }else{
      res.json({"student": student});
    }
  })
});

router.post('/', function(req, res){
  let student = new Students({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.emal,

  });
  Students.addStudent(student, function(err, student){
    if(err){
      throw err;
    }
    res.json({"student": student});
  })
});

router.put('/enrollment/:id', function(req, res){
  let id = req.params.id;
  let enrollment = {
      year: req.body.year,
      schoolGrade: req.body.schoolGrade
  };

  Students.addEnrollment(id, enrollment, {new:true}, function(err, student){
    if(err){
      console.log('sfsf');
      res.json({success: false, msg:err});
    }
    res.json({"student": student});
  })
});

router.put('/:id', function(req, res){
  let id = req.params.id;
  let student = req.body;
  //findOneAndUpdate(query, doc or object, options, callback);
  //options(new:True =  return the modified document rather than the original. defaults to false)
  Students.updateStudent(id, student, {new:true}, function(err, student){
    if(err){
      throw err;
    }
    res.json({"student": student});
  })
});

module.exports = router;
