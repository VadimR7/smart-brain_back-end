
const handleSignin = (db, bcrypt) => (req, res) => {
    const { password, email } = req.body
    if (!email || !password) {
        return res.status(400).json('incorrect form submision')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid){
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('unable to get user')
            }
        })
        .catch(err => res.status(400).json('wrong email or password'))
}

module.exports = {
    handleSignin
}