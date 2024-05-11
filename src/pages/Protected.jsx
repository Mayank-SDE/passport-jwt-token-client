import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
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
      })
      .catch((error) => {
        console.log(error);
        navigate('/login');
      });
  }, []);

  return <div>Protected</div>;
};

export default Protected;
