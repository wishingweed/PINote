var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Course = new Schema({
    course_id: String,
    title:String,
    contact_person:String,
    description:String,
    category:String,
    details:[String],
    owner:String,
    catelog:String,
    catelog2:String,
    product:String,
    version:String,
    attachments:[{name:String,
    	 filename:String,
    	 url:String
    	}],
    creationdate:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Course',Course,'Courses');


/* courses


,
wo




endof courses
*/