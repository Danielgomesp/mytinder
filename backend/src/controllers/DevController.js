const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
    
        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and: [     // dizendo para o Mongo pra operar em "&" e não em "or". Ou seja, tem que atender aos 3 filtros.
                { _id: { $ne: user } },  //Not Equal
                { _id: { $nin: loggedDev.likes } },  //Not In
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })
        return res.json(users);
    },
    async store(req, res) {
        const { username } = req.body;

        //Does this user already exist on my database?
        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return res.json(userExists);
        }
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url } = response.data; //desestruturação de response.data
        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar_url
        });
        return res.json(dev);
    }
}