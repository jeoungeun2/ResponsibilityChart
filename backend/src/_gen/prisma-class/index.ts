import { Account as _Account } from './account';
import { User as _User } from './user';
import { VerificationToken as _VerificationToken } from './verification_token';
import { DutyCategory as _DutyCategory } from './duty_category';
import { Duty as _Duty } from './duty';
import { DutyDetail as _DutyDetail } from './duty_detail';

export namespace PrismaModel {
  export class Account extends _Account {}
  export class User extends _User {}
  export class VerificationToken extends _VerificationToken {}
  export class DutyCategory extends _DutyCategory {}
  export class Duty extends _Duty {}
  export class DutyDetail extends _DutyDetail {}

  export const extraModels = [
    Account,
    User,
    VerificationToken,
    DutyCategory,
    Duty,
    DutyDetail,
  ];
}
