import React, {useState, useCallback} from 'react';
import { IUserLogin } from '../types/interface';
import { useHistory } from 'react-router-dom';
import axios from  'axios'

const useAuth = () => {
  const [loginAuth, setLoginAuth] = useState<IUserLogin>({
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
    setLoginAuth({
      ...loginAuth,
      [input.name]: input.value
    })
  } 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const url: string = 'http://localhost:8080/api/sigin'
      const { data: res } = await axios.post(url, loginAuth);
      console.log(res)
      login(res.token, res.user);
      history.push('/main');
    } catch (error: any) {
      console.log(error)
        setErr(error)
    }
  }

  return {
    loginAuth, 
    err,
    handleChange,
    handleSubmit
  }
}

export {useAuth};
