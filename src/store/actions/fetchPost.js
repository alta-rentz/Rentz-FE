import axios from 'axios';

export const fetchPost = () => {
  return (dispatch) => {
    axios.get("https://rentz-id.site/products") //server link dari backend
    .then(({data}) => {
      dispatch(setPost(data))
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

export const setPost = (payload) => {
  return  {
    type: 'SET_POST',
    payload,
  }
} 