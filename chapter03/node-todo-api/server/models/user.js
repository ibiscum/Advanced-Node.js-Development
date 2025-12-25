import { model } from 'mongoose';

var User = model('User', {
   email: {
         type: String,
         required: true,
         trim: true,
         minlength: 1
   }
});

export default {User};
