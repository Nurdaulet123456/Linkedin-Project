import React, {useState, useCallback} from 'react';
import { IUserLogin } from '../types/interface';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const [data, setData] = useState<IUserLogin>({
    email: '',
    password: '',
  })

  const history = useHistory();

  const login = useCallback((jwt: string, user: object) => {
    localStorage.setItem('user-info', JSON.stringify(user));
    localStorage.setItem('token', jwt)
  }, [])

  const [err, setErr] = useState<String | null>('')

  const handleChange = ({currentTarget: input}: any) => {
    setData({
      ...data,
      [input.name]: input.value
    })
  } 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const url = ''
      const response = await fetch(url)
      const data = response.json();
      console.log(data)

      history.push('/main')
    } catch (error: any) {
      console.log(error)
        setErr(error)
    }
  }

  return {
    data, 
    err,
    handleChange,
    handleSubmit
  }
}

export {useAuth};
