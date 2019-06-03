import {Utils} from "../utils/utils";
import {CheckCodeDelivery} from "./check-code";

const utils = new Utils();
const codes = [
  'DIR240S7KIZB',
  'DIR2ZC4K23NB',
  'DIR2UASONTR6',
  'DIR2TC49KDZ9',
  'DIR2136EXWAE',
  'DIR2SSYBVXOG',
  'DIR2O5NDDWGS',
  'DIR283W9OAMP',
  'DIR210F4JYY6',
  'DIR2UQKTROFV',
  'DIR2ENGFOJZ8',
  'DIR294XMO0R0',
  'DIR2Y7KX2HIB',
  'DIR2XKSYWD20',
  'DIR2V6NKJPOQ',
  'DIR2QAAVDCVN',
  'DIR2VTHYZFAX',
  'DIR2PHPJOR2K',
  'DIR23AQB3IIO',
  'DIR22KE5V5OZ',
  'DIR23425MZS1',
  'DIR2Y2501UGE',
  'DIR2WNCG33AG',
  'DIR2HJVQWZ45',
  'DIR2FGRUGZVZ',
  'DIR21HKDNNZ1',
  'DIR2FPUIK60K',
];

(async () => {
  if (utils.getArg("checkCode")) {
    const checkCode = new CheckCodeDelivery();
    await checkCode.checkPromo(codes);
  }
})();
