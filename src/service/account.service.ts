import { Service } from 'typedi';
import { FilterQuery } from 'mongoose';
import { LoginDto, SignUpDto } from '../dto/account.dto';
import { AccountModel } from '../model/account.model';
import { RolesEnum } from '../dto/role.dto';
import { IAccount } from '../interface/account.interface';
import { compareHashedValue, hashValue } from '../helper/hash-value.helper';
import { signToken } from '../helper/token.helper';

@Service()
export class AccountService {
  async signUpUserAccount(userData: SignUpDto): Promise<IAccount> {
    const userExist = await AccountModel.exists({ email: userData.email });
    if (userExist) {
      throw new Error('User already exist');
    }

    const password = await hashValue(userData.password);

    return AccountModel.create({ ...userData, password });
  }

  private async findOneOrFail(filter: FilterQuery<IAccount>) {
    const account = await AccountModel.findOne(filter);

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }

  async login({ email, password }: LoginDto) {
    const account = await AccountModel.findOne({ email });

    if (!account) {
      throw new Error('Invalid email or password');
    }

    const isValid = await compareHashedValue(password, account.password);

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = await signToken({
      id: account._id.toString(),
      role: account.role,
    });

    delete account.password;

    return { token, account };
  }

  async allUsers() {
    //Paginate user
    return await AccountModel.find({ role: RolesEnum.USER });
  }
}
