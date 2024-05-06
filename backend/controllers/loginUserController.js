const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { email, password } = req.body 
    console.log(req.body)

    User.findOne({ email: email }).then((user) => {
        // console.log({email: email,passwrod:user.password})
        // console.log(bcrypt.hash(password));
        console.log(user);
        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    // req.session.userId = user._id
                    // res.redirect('/')
                     res.status(200).json({ message: 'Logged in successfully',userDate:user });
                } else {
                    // req.flash('passworderror', 'Incorrect Password')
                    // res.redirect('/Login')
                    return res.status(404).json({ message: 'User of Email not found' });
                    // const warpper = document.querySelector('.warpper');
                    // warpper.classList.remove('active');
                }
            })
        } else {
            
            return res.status(401).json({ message: 'Invalid credentials' });
            // req.flash('emailerror', 'Email does not exist')
            // res.redirect('/Login')
        }
    })
}