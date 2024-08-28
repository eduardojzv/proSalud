//spanish
import { esMenu } from "./locales/es/menu/menu"
import { esHome } from "./locales/es/home/home";
import { esFooter } from "./locales/es/footer/footer";
import { esBrands } from "./locales/es/ourBrands/ourBrands";
//english
import { enMenu } from "./locales/en/menu/menu"
import { enHome } from "./locales/en/home/home";
import { enFooter } from "./locales/en/footer/footer";
import { enBrands } from "./locales/en/ourBrands/ourBrands";
const resources = {
    es: {
        menu: esMenu,
        home:esHome,
        ourBrands:esBrands,
        footer:esFooter
    },
    en: {
        menu: enMenu,
        home:enHome,
        ourBrands:enBrands,
        footer:enFooter
    }

}
export default resources;