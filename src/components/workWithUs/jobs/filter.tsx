import { fetchContriessData, fetchPositionsData } from '../../../api/workWithUs/jobsData';
import { Filters, Options } from '../../../helpers/interfaces/workWithUs';
import Limit from '../../others/limit/limit';
import MultiSelect from '../../others/multiSelect/multiSelect';
import styles from './filter.module.css';

const { filter, filter__limit, filter__multi__select } = styles;

export default function Filter() {
  // Interfaz para las opciones de filtros
  interface FilterOption {
    isMulti: boolean;
    fetchDataFunc: () => Promise<Options[]>; // Cambiado a Promise porque probablemente fetch retorna una promesa
    filterTypeKey: keyof Filters['locations'];
    filterTypeVal:string;
  }
  const filterTypes: Pick<Filters, 'locations'> = {
    locations: {
      country: "País",
      province: "Provincia",
      canton: "Cantón",
    },
  };
  // Opciones de filtros
  const filtersOptions: FilterOption[] = [
    //primero por localizaciones
    {
      isMulti: true,
      fetchDataFunc: fetchContriessData,
      filterTypeKey:'country',
      filterTypeVal:filterTypes.locations.country
    },
  ];

  return (
    <div className={filter}>
      {/* MultiSelect Filters */}
      <div className={filter__multi__select}>
        {filtersOptions.map((filterOption, index) => (
          <MultiSelect
            key={index}
            isMulti={filterOption.isMulti}
            fetchData={filterOption.fetchDataFunc}
            filterTypeKey={filterOption.filterTypeKey}
            filterTypeVal={filterOption.filterTypeVal}
          />
        ))}
      </div>

      {/* Limit Component */}
      <div className={filter__limit}>
        <Limit />
      </div>
    </div>
  );
}
