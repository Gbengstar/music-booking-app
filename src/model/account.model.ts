import { model, Schema } from 'mongoose';
import { IAccount } from '../interface/account.interface';
import { RolesEnum } from '../dto/role.dto';

const accountSchema = new Schema<IAccount>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: RolesEnum },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;

        return ret;
      },
    },
  }
);

export const AccountModel = model('account', accountSchema);
