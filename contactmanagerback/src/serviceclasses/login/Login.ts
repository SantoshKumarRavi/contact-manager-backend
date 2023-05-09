const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../../../models/usermodels");
interface ReqType {
  body: {
    email: String;
    password: String;
  };
}
interface _userObject {
  password: String;
  _id: String;
}
export class Login {
  email: String;
  password: String;
  hashPassword: any;
  salt: any;
  constructor(req: ReqType) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.salt = async (): Promise<Number> => await bcrypt.genSalt(10);
    this.hashPassword = async (): Promise<String> =>
      await bcrypt.hash(this.password, this.salt);
  }
  // public async NewSignup():Promise<_Signup>{
  //     const saveData = await user.create({
  //         email:  this.email ,
  //         password: this.hashPassword,
  //       });
  //     return Promise.resolve({
  //         data:saveData,
  //         message: "You are registered successfully, please Log IN",
  //     })
  // }
  public async generateJWT_token(JWT_SECRET_KEY: String): Promise<any> {
    const existing = await this.UserDetails();
    const token = jwt.sign(
      { email: this.email, id: existing._id },
      JWT_SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );
    return Promise.resolve({
      status: "success",
      message:
        "Welcome!! authentication successful, you are logged in successfully",
      jwt_token: token,
      userid: existing._id,
    });
  }
  public async UserDetails(): Promise<_userObject> {
    const existing = await user.findOne({ email: this.email });
    return Promise.resolve(existing);
  }
  public async BcrptyPassword_Matching(): Promise<Boolean> {
    const existing = await this.UserDetails();
    if(existing?.password){
        const isPasswordMatching = await bcrypt.compare(
            this.password,
            existing?.password
          );
          return Promise.resolve(isPasswordMatching);
    }
    return false
  }
}
