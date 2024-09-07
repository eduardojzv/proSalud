import { fetchLocationsData, fetchPositionsData } from '../../../api/workWithUs/jobsData'
import Limit from '../../others/limit/limit'
import MultiSelect from '../../others/multiSelect/multiSelect'
import styles from './filter.module.css'
const { filter, filter__limit, filter__multi__select } = styles
export default function Filter() {
  return (
    <div className={filter}>
      <div className={filter__multi__select}>
        <MultiSelect isMulti={true} fetchData={fetchLocationsData} filterType={'locations'} />
        <MultiSelect isMulti={true} fetchData={fetchPositionsData} filterType={'categories'} />
      </div>
      <div className={filter__limit}  >
        <Limit />
      </div>
    </div>
  )
}