import axios from "axios";

const getToken = () => {
  const tokenKey = localStorage.getItem("tokenKey");
  const token = localStorage.getItem(tokenKey);
  return token;
};
const removeToken = () => {
  const tokenKey = localStorage.getItem("tokenKey");
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("tokenKey");
};

const fetchData = async () => {
  const token = getToken();
  const data = {};
  try {
    const result = await axios.get("http://localhost:8000/api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // result = await result.json();
    data["status"] = result.status;
    data["data"] = result.data.data;
    return data
    // .then(data => data.json())
    //   .then((data) => {
    //   console.log(data);
    //   if(data.detail && data.detail == "Incorrect authentication credentials."){
    //     const tokenKey = localStorage.getItem('tokenKey');
    //     removeToken();
    //   }
    //   else{
    //     history.push({pathname: '/profile', state: { data: data.data }})
    //   }
    //   console.log("then block");
    // }).catch((e) => {
    //     console.error(e);
    //     console.log("hgfytfdyt");
    //     const tokenKey = localStorage.getItem('tokenKey');
    //     removeToken();
    //   });
  } catch (err) {
    console.error(err);
    data["status"] = err.response.status
    data["data"] = err.response.data && (err.response.data.detail || "Invalid token")
    console.log({err:err.response})
    const tokenKey = localStorage.getItem("tokenKey");
    removeToken();
    return data
  } 
};

export default { getToken, removeToken, fetchData };
