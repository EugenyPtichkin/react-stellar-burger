import useState from 'react';
import Styles from './register.module.css';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui';

const Register = () => {

  const [value, setValue] = useState('eap@example.com')
  const onChange = e => {
    setValue(e.target.value)
  }

return (
  <>
    <div className={Styles.content}>
      <p className={Styles.title}>Вход</p>
      <EmailInput 
        onChange={onChange}
        value= {value}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraclass='mb-2'
      />
    </div>
  </>
)};