import { Model, Schema, SchemaOptions, model } from 'mongoose';
import { IUserDocument } from './user.interface';
import { compare, hash } from 'bcrypt';

const userOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.password;
      return ret;
    },
  },
};

export const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
      min: 8,
      max: 30,
    },
    isAdmin: { type: Boolean, default: false },

    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    gender: { type: String, default: 'unknow' },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
  },
  userOptions,
);

const SALT_ROUND = 10;

userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as IUserDocument).password!;
  return compare(password, hashedPassword);
};

userSchema.methods.hashedPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'users');
export { UserModel };