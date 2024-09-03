import React, { useState, useRef, useEffect } from 'react'
import { IconClose, IconDown } from '../../../icons/others/icons';
import styles from "./multiSelect.module.css"
import { Options } from '../../../helpers/interfaces/workWithUs';

interface Props {
  isMulti?: boolean;
  options:Options[]
}

export default function MultiSelect({ isMulti = false,options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Options[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const toggleOption = (option: Options) => {
    if (isMulti) {
      setSelectedOptions(prevSelected => [...prevSelected, option])
    } else {
      setSelectedOptions([option])
    }
    setSearchTerm('')
    closeDropdown()
  }

  const removeOption = (option: Options) => {
    setSelectedOptions(prevSelected =>
      prevSelected.filter(item => item.value !== option.value)
    )
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // const availableOptions = isMulti
  //   ? options.filter(option => !selectedOptions.some(selected => selected.value === option.value))
  //   : options
  const availableOptions = options.filter(option => !selectedOptions.some(selected => selected.value === option.value))
  const filteredOptions = availableOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleBodyClick(event: MouseEvent) {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      closeDropdown()
    }
  }
  useEffect(() => {
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
    <div className={styles.multiSelectContainer} onKeyDown={handleKeyDown} ref={selectRef} >
      <div
        className={styles.multiSelectControl}
        onClick={handleControlClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="options-listbox"
        tabIndex={0}
      >
        {selectedOptions.length === 0 ? (
          <span className={styles.placeholder}>Select options...</span>
        ) : (
          isMulti ? (
            <div className={styles.selectedOptions}>
              {selectedOptions.map(option => (
                <span key={option.value} className={styles.selectedOption}>
                  {option.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(option)
                    }}
                    aria-label={`Remove ${option.label}`}
                    className={styles.removeButton}
                  >
                    <IconClose width="20px" height="20px" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className={styles.selectedOption}>
              {selectedOptions[0].label}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeOption(selectedOptions[0])
                }}
                aria-label={`Remove ${selectedOptions[0].label}`}
                className={styles.removeButton}
              >
                <IconClose width="20px" height="20px" />
              </button>

            </span>
          )
        )}
        <span className={styles.arrow}>
          <IconDown aria-hidden={isOpen} className={`${styles.chevron} ${isOpen ? styles.chevron__active : ""}`} />
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
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}