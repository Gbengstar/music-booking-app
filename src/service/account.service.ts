import { Service } from 'typedi';
import { FilterQuery } from 'mongoose';
import { LoginDto, SignUpDto } from '../dto/account.dto';
import { AccountModel } from '../model/account.model';
import { RolesEnum } from '../dto/role.dto';
import { IAccount } from '../interface/account.interface';
import { compareHashedValue, hashValue } from '../helper/hash-value.helper';
import { signToken } from '../helper/token.helper';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';

@Service()
export class AccountService {
  async signUpUserAccount(userData: SignUpDto): Promise<IAccount> {
    const userExist = await AccountModel.exists({ email: userData.email });
    if (userExist) {
      throw new CustomError(HttpStatusCode.BAD_REQUEST, 'User already exist');
    }

    const password = await hashValue(userData.password);

    return AccountModel.create({ ...userData, password });
  }

  private async findOneOrFail(filter: FilterQuery<IAccount>) {
    const account = await AccountModel.findOne(filter);

    if (!account) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Account not found');
    }

    return account;
  }

  async login({ email, password }: LoginDto) {
    const account = await AccountModel.findOne({ email });

    if (!account) {
      throw new CustomError(
        HttpStatusCode.UNAUTHENTICATED,
        'Invalid email or password'
      );
    }

    const isValid = await compareHashedValue(password, account.password);

    if (!isValid) {
      throw new CustomError(
        HttpStatusCode.UNAUTHENTICATED,
        'Invalid email or password'
      );
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
    return await AccountModel.find({});
  }
}
