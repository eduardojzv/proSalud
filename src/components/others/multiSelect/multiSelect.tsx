import { useState, useRef, useEffect } from 'react';
import { IconClose, IconDown } from '../../../icons/others/icons';
import styles from './multiSelect.module.css';
import { Filters, Options } from '../../../helpers/interfaces/workWithUs';
import { useHandleParamChange } from '../../../customHooks/useHandleParamChange';

interface Props {
  isMulti?: boolean;
  fetchData: () => Promise<Options[]>;
  filterTypeKey: `locations.${keyof Filters['locations']}` | 'categories'; // Claves de `locations` o `categories`
  filterTypeVal: string; // Etiqueta del filtro (e.g., 'País', 'Provincia')
}

export default function MultiSelect({
  isMulti = false,
  fetchData,
  filterTypeKey,
  filterTypeVal,
}: Props) {
  const { handleParamChange, removeParamValue, validateURL } = useHandleParamChange();
  const [selectedOptions, setSelectedOptions] = useState<Options[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<Options[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: Options) => {
    if (!selectedOptions.some((selected) => selected.value === option.value)) {
      setSelectedOptions((prev) => isMulti ? [...prev, option] : [option]);
      //terminar de arreglar los params
      handleParamChange(
        filterTypeKey, // Manejo de claves anidadas
        option.value,
        { isMulti }
      );
    }
  };

  const removeOption = (option: Options) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (item) => item.value !== option.value
    );
    setSelectedOptions(updatedSelectedOptions);
    removeParamValue(filterTypeKey, option.value);
  };

  const closeDropdown = () => setIsOpen(false);

  const availableOptions = options.filter(
    (option) => !selectedOptions.some((selected) => selected.value === option.value)
  );
  const filteredOptions = availableOptions.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchData();
        const URLParams = validateURL(filterTypeKey, isMulti);
        if (URLParams) {
          const filteredData = data.filter((item) =>
            Array.isArray(URLParams)
              ? URLParams.some((param) => param.toLowerCase() === item.value.toLowerCase())
              : null
          );
          if (filteredData) {
            setSelectedOptions(filteredData)
          }
        }
        setOptions(data);
      } catch (err) {
        setError('Error al cargar opciones');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();

    const handleBodyClick = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.documentElement.addEventListener('click', handleBodyClick);
    return () =>
      document.documentElement.removeEventListener('click', handleBodyClick);
  }, []);

  return (
    <div className={styles.multiSelectContainer} ref={selectRef}>
      <div
        className={styles.multiSelectControl}
        onClick={() => setIsOpen((prev) => !prev)}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div className={styles.selectedOptions}>
          {selectedOptions.length === 0 ? (
            <span className={styles.placeholder}>
              {loading
                ? <span>Cargando...</span>
                : error
                  ? <span>{error}</span>
                  : <span>{`Selecciona ${filterTypeVal}`}</span>}
            </span>
          ) : (
            selectedOptions.map((option) => (
              <span key={option.value} className={styles.selectedOption}>
                {option.value}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                  className={styles.removeButton}
                >
                  <IconClose width="20px" height="20px" />
                </button>
              </span>
            ))
          )}
        </div>
        <span className={styles.arrow}>
          {!loading && <IconDown width="15px" height="15px" />}
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder={`Buscar ${filterTypeVal}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <li className={styles.noOptions}>No se encontraron opciones</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={styles.option}
                  onClick={() => toggleOption(option)}
                >
                  {option.value}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
