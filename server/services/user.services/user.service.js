const db = require('../../models');

const User = db.user;
const Op = db.Sequelize.Op;

const UserDto = require('../../dtos/user.dtos/user.dto');

class UserService {
    async getUsers(params) {
        const { name, userId } = params;
        if (userId) {
            const user = await User.findByPk(userId);
            const userDto = new UserDto(user);
            return {
                user: userDto
            }
        }
        if (name) {
            const user = await User.findOne({
                where: {
                    name: name
                }
            });
            const userDto = new UserDto(user);
            return {
                user: userDto
            }
        }
        const users = await User.findAll();
        let usersDto = [];
        for (let index = 0; index < users.length; index++) {
            usersDto.push(new UserDto(users[index]));
        }
        return {
            users: usersDto
        }
    }
}

module.exports = new UserService();