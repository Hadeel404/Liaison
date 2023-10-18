
import { User } from "../database/entities/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dataSource from "../database/dataSource.js";
import { Role } from '../database/entities/Role.model.js';



const login = async (email: string, password: string) => {
  try {
    const user = await User.findOneBy({
      email
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
      const token = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.userId
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: "30m"
        }
      );

      return { token, email: user.email, firstName: user.firstName, lastName: user.lastName };
    } else {
      throw ("Invalid Username or password!");
    }
  } catch (error) {
    throw ("Invalid Username or password!");
  }
}
const updateUser = async (user: any, newData: any) => {
  const profile= user
      const {firstName, lastName, email, password} = newData;
      if(firstName){
        profile.firstName = firstName
      }
      if(lastName){
        profile.lastName = lastName
      }
      if(email){
        profile.email = email
      }
      if(password){
        profile.password = password
      }
      return profile.save()
}
const register = async (data: any) => { 
const newUser=new User();
newUser.firstName = data.firstName;
newUser.lastName = data.lastName;
newUser.password = data.password;
newUser.email = data.email;
const newRole=await Role.findOneBy({roleId:1
});

if(newRole)
newUser.roles=[newRole]

return newUser.save()

}



export {
    login,
    register,
    updateUser
}