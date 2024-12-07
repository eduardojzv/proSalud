import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../providers/zustand";
import { Filters, Options } from "../helpers/interfaces/workWithUs";

export function useHandleParamChange() {
  const { filters, setJobs, setFilters } = useJobStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParamChange = (key: string, value: any, options = { isMulti: false }) => {
    const { isMulti } = options;

    if (key.includes('.')) {
      // Manejo de claves anidadas (e.g., 'locations.country')
      const [parentKey, childKey] = key.split('.') as [keyof Filters, keyof Filters['locations']];

      const parentValue = filters[parentKey];
      if (typeof parentValue === 'object' && parentValue !== null) {
        //const currentValues = parentValue[childKey] ;
        const currentValues = parentValue[childKey as keyof typeof parentValue] || [];
  
        //const [parentKey, childKey] = key.split('.') as [keyof Filters, string];
        const updatedValues = isMulti
          ? [...new Set([...currentValues, value])] // Agregar si no existe
          : [value]; // Sobrescribir con un único valor

        const updatedNestedFilters = {
          ...parentValue,
          [childKey]: updatedValues,
        };

        const updatedFilters = {
          ...filters,
          [parentKey]: updatedNestedFilters,
          offSet: 0, // Reiniciar el offset
        };

        setFilters(updatedFilters);
        setJobs(updatedFilters);

        // Actualizar la URL
        searchParams.delete(childKey); // Limpiar valores duplicados
        updatedValues.forEach((v) => searchParams.append(childKey, v));
        searchParams.set('page', '1');
      } else {
        console.error(`El valor de "${parentKey}" no es un objeto válido para una clave anidada.`);
      }
    } else if (Array.isArray(filters[key as keyof Filters]) || isMulti) {
      // Manejo de listas (e.g., 'categories')
      const currentValues = searchParams.get(key)?.split(',') || [];
      const updatedValues = isMulti
        ? [...new Set([...currentValues, value])] // Agregar si no existe
        : [value]; // Sobrescribir con un único valor

      const updatedFilters = {
        ...filters,
        [key]: updatedValues,
        offSet: 0,
      };

      setFilters(updatedFilters);
      setJobs(updatedFilters);

      // Actualizar la URL
      searchParams.delete(key);
      updatedValues.forEach((v) => searchParams.append(key, v));
      searchParams.set('page', '1');
    } else {
      // Manejo de claves simples (e.g., 'limit')
      const updatedFilters = {
        ...filters,
        [key]: value,
        offSet: 0,
      };

      setFilters(updatedFilters);
      setJobs(updatedFilters);

      // Actualizar la URL
      searchParams.set(key, value.toString());
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
  };

  const removeParamValue = (key: string, value: string) => {
    if (key.includes(".")) {
      // Manejo de claves anidadas
      const [parentKey, childKey] = key.split(".") as ["locations", keyof Filters["locations"]];
      const parentValue = filters[parentKey]; // Acceso a `locations`
    
      if (parentValue && Array.isArray(parentValue[childKey])) {
        // Remover el valor del array anidado
        const updatedValues = parentValue[childKey].filter((v) => v !== value);
    
        // Actualizar el objeto `locations` completo
        const updatedParent = {
          ...parentValue, // Mantener otras propiedades intactas
          [childKey]: updatedValues.length > 0 ? updatedValues : [], // Si está vacío, dejamos un array vacío
        };
    
        // Actualizar los filtros
        const updatedFilters = {
          ...filters,
          [parentKey]: updatedParent,
        };
    
        setFilters(updatedFilters);
        setJobs(updatedFilters);
    
        // Actualizar la URL
        const existingValues = searchParams.getAll(childKey);
        const updatedURLValues = existingValues.filter((v) => v !== value);
    
        if (updatedURLValues.length > 0) {
          searchParams.delete(childKey);
          updatedURLValues.forEach((val) => searchParams.append(childKey, val));
        } else {
          searchParams.delete(childKey);
        }
    
        setSearchParams(searchParams); // Aplicar cambios en la URL
      } else {
        console.error(`La clave "${childKey}" no es un array o no está definida en "locations".`);
      }
    } else {
      // Manejo de claves simples como `categories`
      const existingValues = filters[key as keyof Filters] as string[];
      if (Array.isArray(existingValues)) {
        // Remover el valor
        const updatedValues = existingValues.filter((v) => v !== value);

        setFilters({...filters,[key]: updatedValues.length > 0 ? updatedValues : []});

        // Actualizar la URL
        const existingURLValues = searchParams.getAll(key);
        const updatedURLValues = existingURLValues.filter((v) => v !== value);

        if (updatedURLValues.length > 0) {
          searchParams.delete(key);
          updatedURLValues.forEach((val) => searchParams.append(key, val));
        } else {
          searchParams.delete(key);
        }

        setSearchParams(searchParams); // Aplicar cambios en la URL
      }
    }
  };
  const validateURL = (key: string, isMulti: boolean): Options['value'][] | null => {
    // Obtener todos los valores de la clave desde la URL
    if (key.includes('.')) {
      // Manejo de claves anidadas (e.g., 'locations.country')
      const [_, childKey] = key.split('.') as [keyof Filters, string];
      const existingValues = searchParams.getAll(childKey);

      if (existingValues.length > 0) {
        if (isMulti) {
          // Devolver todos los valores en un array
          return existingValues;
        } else {
          const firstValue = existingValues[0]; // Tomar el primer valor

          // Limpiar valores duplicados dejando solo el primero
          searchParams.delete(key);
          searchParams.set(key, firstValue);
          setSearchParams(searchParams); // Actualizar la URL

          return [firstValue]; // Devolver el primer valor como array
        }
      }
    }
    // Si no hay valores en la URL para esa clave, devolver null
    return null;
  };


  return { handleParamChange, removeParamValue, validateURL };
}
