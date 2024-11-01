import React, { useState, useRef, useEffect } from 'react'
import { IconClose, IconDown } from '../../../icons/others/icons';
import styles from "./multiSelect.module.css"
import { Filters, Options } from '../../../helpers/interfaces/workWithUs';
import { useJobStore } from '../../../providers/zustand';
import { useSearchParams } from 'react-router-dom';
interface Props {
  isMulti?: boolean;
  fetchData: () => Promise<Options[]>;
  filterType: keyof Filters
}

export default function MultiSelect({ isMulti = false, fetchData, filterType }: Props) {
  const { setJobs, setFilters, filters } = useJobStore();
  const [selectedOptions, setSelectedOptions] = useState<Options[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState<Options[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const toggleOption = (option: Options) => {
    setSelectedOptions(prevSelected => {
      const updatedSelectedOptions = isMulti
        ? [...prevSelected, option]
        : [option];
      setJobs({ [filterType]: updatedSelectedOptions.map(opt => opt.value) })
      return updatedSelectedOptions;
    });
  };

  const removeOption = (option: Options) => {
    setSelectedOptions(prevSelected => {
      const updatedSelectedOptions = prevSelected.filter(item => item.value !== option.value);
      setJobs({ [filterType]: updatedSelectedOptions.map(opt => opt.value) })
      return updatedSelectedOptions;
    });
  };

  const closeDropdown = () => {
    setIsOpen(false)
  }
  const availableOptions = options.filter(option => !selectedOptions.some(selected => selected.value === option.value))
  const filteredOptions = availableOptions.filter(option =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleBodyClick(event: MouseEvent) {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      closeDropdown()
    }
  }
  useEffect(() => {

    const rawValues = searchParams.getAll(filterType);
    if (rawValues[0] !== '' && rawValues.length > 0) {
      const values = rawValues[0].split(',').filter((item) => item.trim() !== '');
      console.log(filterType, values);
      setSelectedOptions(
        values.map((item) => ({ value: item }))
      );
      setFilters({ [filterType]: values })

    }
    // Actualizar la URL con los valores de filters.categories
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(filterType, filters.categories.join(','));
    console.log('updatedParams',updatedParams);
    
    // Aplica los cambios en los parámetros de la URL
    setSearchParams(updatedParams);
  }, [filterType, searchParams, setFilters]);
  useEffect(() => {
    const optionsData = async () => {
      try {
        const data = await fetchData();
        setOptions(data);
      } catch (error) {
        setError('Error');
      } finally {
        setLoading(false);
      }
    };
    optionsData();
    document.documentElement.addEventListener('click', handleBodyClick);
    return () => document.documentElement.removeEventListener('click', handleBodyClick);

  }, [])
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDropdown()
    }
  }

  const handleControlClick = () => {
    setIsOpen(pre => !pre)
    if (isOpen) {
      closeDropdown()
    } else {
      setIsOpen(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }
  return (
    <div className={styles.multiSelectContainer} onKeyDown={handleKeyDown} ref={selectRef}>
      <div
        className={styles.multiSelectControl}
        onClick={handleControlClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="options-listbox"
        tabIndex={0}
      >
        <div className={styles.selectedOptions}>
          {selectedOptions.length === 0 ? (
            <span className={styles.placeholder}>{error ? error : 'Select options'}</span>
          ) : (
            <>
              {selectedOptions.map(option => (
                <span key={option.value} className={styles.selectedOption}>
                  {option.value}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(option)
                    }}
                    aria-label={`Remove ${option.value}`}
                    className={styles.removeButton}
                  >
                    <IconClose width="20px" height="20px" />
                  </button>
                </span>
              ))}
            </>
          )
          }
        </div>
        <span className={styles.arrow}>
          {loading ? <span>Cargando</span> :
            <IconDown aria-hidden={isOpen} className={`${styles.chevron} ${isOpen ? styles.chevron__active : ""}`} />
          }
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-autocomplete="list"
          />
          <ul
            className={styles.optionsList}
            role="listbox"
            id="options-listbox"
            aria-label="Available options"
          >
            {filteredOptions.length === 0 ? (
              <li className={styles.noOptions}>No options found</li>
            ) : (
              filteredOptions.map(option => (
                <li
                  key={option.value}
                  className={styles.option}
                  onClick={() => toggleOption(option)}
                  role="option"
                  aria-selected={selectedOptions.some(selected => selected.value === option.value)}
                >
                  {option.value}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}