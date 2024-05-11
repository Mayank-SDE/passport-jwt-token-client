import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/protected', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/protected');
      })
      .catch((error) => {
        console.log(error);
        navigate('/login');
      });
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(username, password);
    axios
      .post('http://localhost:5000/login', {
        username,
        password,
      })
      .then((user) => {
        console.log(user);
        localStorage.setItem('token', user.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container ">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 items-start mx-auto mt-[10%]  bg-slate-100 rounded-3xl max-w-[320px] p-4 shadow-2xl font-serif"
      >
        <label htmlFor="name">Name</label>
        <input
          className="px-3 py-1 rounded-lg"
          type="text"
          id="name"
          placeholder="Enter your name."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="px-3 py-1 rounded-lg"
          type="password"
          id="password"
          placeholder="Enter your password."
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button
          type="submit"
          className=" bg-green-500 text-slate-100 rounded-full mx-auto my-2 px-3 py-1 hover:scale-110"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
