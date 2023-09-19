const res = require("express/lib/response");
const { validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");
const { isEmail } = require("../helpers/booleanValidation");
const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator, tokenVerifier } = require("../helpers/jsonWebToken");

class UserController {
  static async register(req) {
    const {
      username,
      imageUrl,
      email,
      password,
      name,
      bio,
      isActivated,
      isDeactivated,
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.code = 400;
      throw err;
    }

    const accounts = await UserModel.find({
      $or: [{ username }, { email }],
    });

    if (accounts.length != 0) {
      if (accounts[0].username === username) {
        const err = new Error("Username already exists, username: " + username);
        err.code = 400;
        throw err;
      } else if (accounts[0].email === email) {
        const err = new Error("Email already exists, email: " + email);
        err.code = 400;
        throw err;
      }
    }

    // if (account) {
    //   const err = new Error("Username already exist");
    //   err.code = 400;
    //   throw err;
    // } else if (emailRes) {
    //   const err = new Error("Email already exist");
    //   err.code = 400;
    //   throw err;
    // }

    const salt = Math.floor(Math.random() * 10) + 1;
    const encryptedPass = encryptPwd(password, salt);

    const User = new UserModel({
      username,
      imageUrl,
      email,
      password: encryptedPass,
      name,
      salt,
      bio,
      isActivated: isActivated || false,
      isDeactivated: isDeactivated || false,
    });

    const response = await User.save();

    return {
      data: response,
      message: `'${response.username}' was successfully registered`,
    };
  }

  static async login(req) {
    const { username, password } = req.body;

    let response = undefined;
    if (isEmail(username)) {
      response = await UserModel.findOne({
        email: username,
        isDeactivated: false,
      });
    } else {
      response = await UserModel.findOne({
        username,
        isDeactivated: false,
      });
    }

    if (response) {
      if (decryptPwd(password, response.password)) {
        let access_token = tokenGenerator(response);
        return {
          access_token,
          message: "match",
        };
      } else {
        const err = new Error(`doesn't match`);
        err.code = 400;
        throw err;
      }
    } else {
      const err = new Error(`Account Not Found`);
      err.code = 404;
      throw err;
    }
  }

  // static async getUsers(req) {
  //   const limit = +req.query.limit || 10;
  //   const page = +req.query.page || 0;
  //   // const orderBy = req.query.page;

  //   const response = await UserModel.find()
  //     .limit(limit)
  //     .skip(limit * (page - 1))
  //     .sort({
  //       title: "asc",
  //     });
  //   const count = await UserModel.countDocuments();

  //   let result = {
  //     records: [],
  //     pagination: {},
  //   };

  //   result["records"] = response;
  //   result["pagination"] = {
  //     currentPage: page,
  //     totalPages: Math.ceil(count / limit),
  //   };

  //   return result;
  // }

  static async getUser(req) {
    const _id = req.params.id;

    const response = await UserModel.findById(_id);

    if (!response) {
      const err = new Error(`Id not found`);
      err.code = 404;
      throw err;
    } else {
      return response;
    }
  }

  static async updateUser(req) {
    const id = req.params.id;
    const { username, imageUrl, email, password, name, bio } = req.body;

    // let user = await UserModel.findById(id);
    // if (!user) {
    //   const error = new Error(`Id not found`);
    //   error.code = 404;
    //   throw error;
    // } else {
    //   let new_user = user;
    //   new_user["username"] = title;
    //   new_user["imageUrl"] = authorId;
    //   new_user["email"] = images;
    //   new_user["password"] = content;
    //   new_user["bio"] = colaboratorIds;

    //   const response = await new_user.save();
    //   return {
    //     data: response,
    //     message: `'${response.title}' was successfully updated`,
    //   };
    // }
    return "update";
  }

  static async deleteUser(req) {
    const id = req.params.id;
    // const user = await UserModel.findById(id);
    const response = await UserModel.findByIdAndRemove(id);
    if (!response) {
      const error = new Error(`Id not found`);
      error.code = 404;
      throw error;
    } else {
      return { message: `'${response.title}' was successfully deleted` };
    }
  }
}

module.exports = UserController;
