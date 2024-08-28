import { defaultNS } from "../src/translations/i18n";
import resources from "../src/translations/resources";
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["es"];
  }
}