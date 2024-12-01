import React, { useState, useRef, useEffect } from 'react';
import { IconClose, IconDown } from '../../../icons/others/icons';
import styles from './multiSelect.module.css';
import { Filters, Options } from '../../../helpers/interfaces/workWithUs';
import { useJobStore } from '../../../providers/zustand';
import { useSearchParams } from 'react-router-dom';

interface Props {
  isMulti?: boolean;
  fetchData: () => Promise<Options[]>;
  filterTypeKey: keyof Filters['locations'] | 'categories'; // Claves de `locations` o `categories`
  filterTypeVal: string; // Etiqueta del filtro (e.g., 'País', 'Provincia')
}

export default function MultiSelect({
  isMulti = false,
  fetchData,
  filterTypeKey,
  filterTypeVal,
}: Props) {
  const { setFilters, filters } = useJobStore();
  const [selectedOptions, setSelectedOptions] = useState<Options[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<Options[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleOption = (option: Options) => {
    // Obtener los valores actuales de la clave
    const currentValues = searchParams.get(filterTypeKey)?.split(",") || [];

    // Agregar el nuevo valor si no está ya presente
    if (!currentValues.includes(option.value.toLowerCase())) {
      currentValues.push(option.value.toLowerCase());
    }

    // Actualizar la URL
    searchParams.set(filterTypeKey, currentValues.join(","));
    setSearchParams(searchParams);

    // Actualizar las opciones seleccionadas
    setSelectedOptions((prevSelected) => {
      const updatedSelectedOptions = isMulti
        ? [...prevSelected, option]
        : [option];
      return updatedSelectedOptions;
    });
  };
  const removeOption = (option: Options) => {
    // Obtener los valores actuales de la clave
    const currentValues = searchParams.get(filterTypeKey)?.split(",") || [];

    // Eliminar el valor
    const updatedValues = currentValues.filter(
      (value) => value !== option.value.toLowerCase()
    );

    // Actualizar la URL
    if (updatedValues.length > 0) {
      searchParams.set(filterTypeKey, updatedValues.join(","));
    } else {
      searchParams.delete(filterTypeKey);
    }
    setSearchParams(searchParams);

    // Actualizar las opciones seleccionadas
    setSelectedOptions((prevSelected) => {
      const updatedSelectedOptions = prevSelected.filter(
        (item) => item.value !== option.value
      );
      return updatedSelectedOptions;
    });
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  const availableOptions = options.filter(
    (option) => !selectedOptions.some((selected) => selected.value === option.value)
  );
  const filteredOptions = availableOptions.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleBodyClick(event: MouseEvent) {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      closeDropdown();
    }
  }

  useEffect(() => {
    const rawValues = searchParams.getAll(filterTypeKey);
    if (rawValues.length > 0) {
      const values = rawValues[0].split(',').filter((item) => item.trim() !== '');
      setSelectedOptions(values.map((item) => ({ value: item })));
      setFilters({ ...filters, [filterTypeKey]: values });
    }
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchData();
        setOptions(data);
      } catch (err) {
        setError('Error al cargar opciones');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
    document.documentElement.addEventListener('click', handleBodyClick);
    return () => {
      document.documentElement.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  const handleControlClick = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div
      className={styles.multiSelectContainer}
      onKeyDown={handleKeyDown}
      ref={selectRef}
    >
      <div
        className={styles.multiSelectControl}
        onClick={handleControlClick}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div className={styles.selectedOptions}>
          {selectedOptions.length === 0 ? (
            <span className={styles.placeholder}>
              {error || `Selecciona ${filterTypeVal}`}
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
          {loading ? (
            <span>Cargando...</span>
          ) : (
            <IconDown
              className={`${styles.chevron} ${isOpen ? styles.chevron__active : ''}`}
            />
          )}
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
