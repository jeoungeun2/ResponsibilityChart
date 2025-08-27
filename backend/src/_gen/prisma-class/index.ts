import { Account as _Account } from './account';
import { User as _User } from './user';
import { VerificationToken as _VerificationToken } from './verification_token';
import { DutyCategory as _DutyCategory } from './duty_category';
import { Duty as _Duty } from './duty';
import { DutyDetail as _DutyDetail } from './duty_detail';
import { Executive as _Executive } from './executive';
import { ExecutiveOrgRegistration as _ExecutiveOrgRegistration } from './executive_org_registration';
import { ExecutiveQualiItem as _ExecutiveQualiItem } from './executive_quali_item';
import { ExecutiveIntegrityItem as _ExecutiveIntegrityItem } from './executive_integrity_item';
import { ExecutiveEvaluation as _ExecutiveEvaluation } from './executive_evaluation';

export namespace PrismaModel {
  export class Account extends _Account {}
  export class User extends _User {}
  export class VerificationToken extends _VerificationToken {}
  export class DutyCategory extends _DutyCategory {}
  export class Duty extends _Duty {}
  export class DutyDetail extends _DutyDetail {}
  export class Executive extends _Executive {}
  export class ExecutiveOrgRegistration extends _ExecutiveOrgRegistration {}
  export class ExecutiveQualiItem extends _ExecutiveQualiItem {}
  export class ExecutiveIntegrityItem extends _ExecutiveIntegrityItem {}
  export class ExecutiveEvaluation extends _ExecutiveEvaluation {}

  export const extraModels = [
    Account,
    User,
    VerificationToken,
    DutyCategory,
    Duty,
    DutyDetail,
    Executive,
    ExecutiveOrgRegistration,
    ExecutiveQualiItem,
    ExecutiveIntegrityItem,
    ExecutiveEvaluation,
  ];
}
