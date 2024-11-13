import { useEffect, useRef, useState } from "react"
import { MenuDetailsDropdownItems, MenuStructure } from "../../helpers/interfaces/menu"
import styles from './menu.module.css'
import { IconDown } from "../../icons/others/icons";
import { TFunction } from "i18next";
import { NavLink } from "react-router-dom";
interface Props {
    keys: keyof MenuStructure['dropdownItems'];
    values: MenuDetailsDropdownItems[keyof MenuDetailsDropdownItems];
    idx: number;
    t: TFunction<"menu">
    handleMenu: (val: boolean) => void
}
const { active, nav__item, dropdown, dropdown__btn, dropdown__link, dropdown__link__title,chevron, chevron__active } = styles

export default function DropDownMenu({ keys, values, idx, t,handleMenu}: Props) {
    const [state, setState] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLLIElement>(null);
    function handleState() {
        setState(!state)
    }
    function handleBodyClick(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setState(false);
        }
    }

    useEffect(() => {
        document.documentElement.addEventListener('click', handleBodyClick);
        return () => {
            document.documentElement.removeEventListener('click', handleBodyClick);
        };
    }, []);

    return (
        <>
            <li onClick={handleState} ref={dropdownRef}>
                <button
                    className={`${nav__item} ${dropdown__btn}`}
                    data-dropdown={`dropdown${idx}`}
                    aria-haspopup="true"
                    aria-expanded={state}
                    aria-label="browse"
                >
                    {t(`dropdownItems.${keys}.text`)}
                    <IconDown aria-hidden={state} className={`${chevron} ${state ? chevron__active : ""}`} />
                </button>
                <div id={`dropdown${idx}`} className={`${dropdown} ${state ? active : ""}`}>
                    <ul role="menu">
                        {Object.entries(values.subLinks).map(([subKey, subVal]) => (
                            <li role="menuitem" key={subKey}>
                                <NavLink className={`${dropdown__link} disabled__link`} to={subVal.href} onClick={()=>handleMenu(false)}>
                                        <span className={dropdown__link__title}>{t(`dropdownItems.aboutUs.subLinks.${subKey as keyof MenuDetailsDropdownItems['aboutUs']['subLinks']}`)}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        </>
    )
}