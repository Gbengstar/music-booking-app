import { validate } from './../helper/validator.helper';
import { Request, Response } from 'express';
import {
  loginValidator,
  signUpUserValidator,
} from '../validator/account.validator';
import { Service } from 'typedi';
import { AccountService } from '../service/account.service';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';

@Service()
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  async signUpUser(req: Request, res: Response) {
    const userData = await validate(signUpUserValidator, req.body);
    const account = await this.accountService.signUpUserAccount(userData);

    ResponseHandler.created(res, account);
  }

  async login(req: Request, res: Response) {
    const loginData = await validate(loginValidator, req.body);
    const loginDetail = await this.accountService.login(loginData);

    ResponseHandler.ok(res, loginDetail);
  }

  async allUsers(req: Request, res: Response) {
    const accounts = await this.accountService.allUsers();

    ResponseHandler.ok(res, accounts);
  }
}
