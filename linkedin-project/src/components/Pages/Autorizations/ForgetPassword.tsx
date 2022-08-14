import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

const ForgetPassword: React.FC = () => {

    const [forget, setForget] = useState({
        email: '',
        textChange: 'Submit'
    })

    const { email, textChange } = forget;

    const handleChange = (text: any) => (e: React.FormEvent<HTMLInputElement>) => {
        setForget({ ...forget, [text]: (e.target as any).value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email) {
            setForget({ ...forget, textChange: 'Submiting' });

            axios
                .put('http://localhost:8080/api/forgetPasswords', {
                    email
                })
                .then(res => {
                    setForget({
                        ...forget,
                        email: ''
                    })

                    toast.success(`Please check your email`);
                })
                .catch(err => {
                    console.log(err.response)
                      toast.error(err.response.data.error);
                });
        } else {
            toast.error('Please fill all fields');
        }
    }

  return (
    <>
    <ToastContainer />
      <div className="main sigin">
        <div className="container">
          <div className="sigin__inner">
            <div className="sigin__content">
              <h1 className="sigin__title" style={{textAlign: 'center'}}>Forget Password</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>           
              <div className="email">
                <input
                  id="email"
                  type={"email"}
                  className="input"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={handleChange('email')}
                />
              </div>
              <button className="button" type="submit">Send</button>
            </form>


          </div>
            <div className="registration__link" style={{textAlign: "right"}}>
            <Link to={"/"}>Sigin</Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
