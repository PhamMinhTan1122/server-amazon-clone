const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re =
                    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                return value.match(re);
            },
            message: 'Ong anh co biet cau truc cua email khong',

        }
    },
    password: {
        required: true,
        type: String,
        
    },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'user',
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;