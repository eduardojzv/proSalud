//spanish
import { esMenu } from "./locales/es/menu/menu"
import { esHome } from "./locales/es/home/home";
import { esFooter } from "./locales/es/footer/footer";
import { esBrands } from "./locales/es/ourBrands/ourBrands";
import { esWorkWithUs } from "./locales/es/workWithUs/workWithUs";
//english
import { enMenu } from "./locales/en/menu/menu"
import { enHome } from "./locales/en/home/home";
import { enFooter } from "./locales/en/footer/footer";
import { enBrands } from "./locales/en/ourBrands/ourBrands";
import { enWorkWithUs } from "./locales/en/workWithUs/workWithUs";
const resources = {
    es: {
        menu: esMenu,
        home:esHome,
        ourBrands:esBrands,
        workWithUs:esWorkWithUs,
        footer:esFooter
    },
    en: {
        menu: enMenu,
        home:enHome,
        ourBrands:enBrands,
        workWithUs:enWorkWithUs,
        footer:enFooter
    }

}
export default resources;