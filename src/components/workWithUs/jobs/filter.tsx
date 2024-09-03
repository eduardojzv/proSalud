import { Options } from '../../../helpers/interfaces/workWithUs'
import MultiSelect from '../../others/multiSelect/multiSelect'
import styles from './filter.module.css'
const {filter}=styles
export default function Filter() {
  const optionsCities: Options[] = [
    { value: 'carmen', label: 'Carmen' },
    { value: 'catedral', label: 'Catedral' },
    { value: 'el roble', label: 'El Roble' },
    { value: 'puntarenas', label: 'Puntarenas' },
    { value: 'quesada', label: 'Quesada' },
    { value: 'santa ana', label: 'Santa Ana' },
  
  ]
  const optionsPositions: Options[] = [
    { value: 'administrativos', label: 'Administrativos' },
    { value: 'operativos', label: 'Operativos' },
    { value: 'tecnicos', label: 'Técnicos' },
    { value: 'jefaturas', label: 'Jefaturas' },
  
  ]
  return (
    <div className={filter}>
      <MultiSelect isMulti={true} options={optionsCities}/>
      <MultiSelect isMulti={false} options={optionsPositions}/>
    </div>
  )
}