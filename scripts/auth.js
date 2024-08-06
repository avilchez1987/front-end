// auth.js
export const getToken = () => {
  
      const userJson = localStorage.getItem('user');
      
      const userObject = JSON.parse(userJson);
 
      return userObject;

};


export const getUid = () => {
    
  const userJson = localStorage.getItem('user');

  const userObject = JSON.parse(userJson);
  const uid = userObject.usuario.uid;
     
  return uid;


  //localStorage.getItem('token');
}


const setToken = (token) => {
  localStorage.setItem('token', token);
};

const removeToken = () => {
  localStorage.removeItem('token');
};


// verificar-logueo.js
//export const baseUrl = 'http://localhost:3000';

//export const baseUrl = 'http://localhost:3001/dev';


//AWS
export const baseUrl = 'https://tsl5r3wjxc.execute-api.us-east-1.amazonaws.com/dev';
