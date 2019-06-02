import {Utils} from "../utils/utils";
import {CheckCodeDelivery} from "./check-code";

const utils = new Utils();
const codes = [
  'DIR2XKSYWD20',
  'DIR2V6NKJPOQ',
  // 'DIR2S4D4KTHD',
  // 'DIR2P6YXYQG3',
  'DIR2B4CUI5P6',
  'DIR2VTHYZFAX',
  'DIR2PHPJOR2K',
  'DIR23AQB3IIO',
  'DIR22KE5V5OZ',
  // 'DIR2MW8IX9RE',
  // 'DIR2EP01SATK',
  // 'DIR2E3R40792',
  // 'DIR2AG6G0AXL',
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
