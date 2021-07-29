const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/*
* model/user - 주의사항 
* 회원가입을 할 때에는 name이 꼭 들어가야하지만 로그인할 때는 name이 필요하지 않기 때문에 required로 진행할 필요가 없다.
*/

const userSchema = mongoose.Schema(
    {
        name : {
            type : String
        },  
        email : {
            type : String,
            required : true,
            unique : true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre('save', async function(next){

    try{
        const salt = await bcrypt.genSalt(10)

        const passwordHash = await bcrypt.hash(this.password, salt)

        this.password = passwordHash;

        next();
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword = async function(isInputPassword, cb){

    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema)