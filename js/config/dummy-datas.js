const User = require('../../models/user')
const UserType = require('../../models/userType')
const slugField = require('../../helpers/slugify')

async function syncPop() {
    await User.bulkCreate([
        {name : 'Muhammet'}
    ])

    await UserType.bulkCreate({
        name: 'admin'
    })
}

module.exports = syncPop