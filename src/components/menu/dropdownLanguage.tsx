import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'

import styles from './menu.module.css'
import { IconCheck, IconDown } from "../../icons/others/icons";
import { languages } from "../../helpers/languages/languages";
const { active, nav__item, dropdown__language, dropdown__btn, dropdown__link__title, chevron, chevron__active,dropdown__item} = styles
export default function DropDownLanguage() {
    const { i18n } = useTranslation('menu');
    const [state, setState] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const navigatorLanguage=navigator.language.substring(0,2);
    
    function handleState() {
        setState(!state)
    }
    function handleBodyClick(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setState(false);
        }
    }
    function selectLang(lang:string) {
        i18n.changeLanguage(lang);
    }
    useEffect(() => {
        // i18n.changeLanguage(i18n.language||navigatorLanguage);
        document.documentElement.addEventListener('click', handleBodyClick);
        return () => {
            document.documentElement.removeEventListener('click', handleBodyClick);
        };
    }, []);

    return (
        <div onClick={handleState} ref={dropdownRef}>
        <button
            className={`${nav__item} ${dropdown__btn}`}
            data-dropdown={`dropdown`}
            aria-haspopup="true"
            aria-expanded={state}
            aria-label="browse"
        >
           <span>{i18n.language}</span>
            <IconDown aria-hidden={state} className={`${chevron} ${state?chevron__active:""}`}/>
        </button>
        <div id={`dropdown`} className={`${dropdown__language} ${state ? active : ""}`}>
            <ul role="menu">
                {languages.map((lan) => (
                    <li role="menuitem" key={lan} className={dropdown__item} onClick={()=>selectLang(lan)}>
                        <span className={dropdown__link__title}>{lan}</span>
                        {i18n.language===lan &&
                        <IconCheck width="15px" height="15px"/>
                        }
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}