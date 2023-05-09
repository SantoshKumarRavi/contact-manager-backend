const bcrypt = require("bcryptjs");
const user = require("../../../models/usermodels");
interface ReqType {
  body: {
    email: String;
    password: String;
  };
}
interface _Signup {
  data: any;
  message: String;
}
export class Signup {
  email: String;
  password: String;
  hashPassword: any;
  salt: any;
  constructor(req: ReqType) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.salt = async (): Promise<Number> => await bcrypt.genSalt(10);
    this.hashPassword = async (): Promise<String> =>
      await bcrypt.hash(this.password, await this.salt());
  }
  public async NewSignup(): Promise<_Signup> {
    const hashed = await this.hashPassword();
    const saveData = await user.create({
      email: this.email,
      password: hashed,
    });
    return Promise.resolve({
      data: saveData,
      message: "You are registered successfully, please Log IN",
    });
  }
  public async CheckAlreadyUser(): Promise<boolean> {
    const existing = await user.findOne({ email: this.email });
    return Promise.resolve(existing !== null);
  }
}
