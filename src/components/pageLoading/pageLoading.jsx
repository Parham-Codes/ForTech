import { useEffect } from 'react';
import './pageLoading.css'


function PageLoading({ size = 150, color = "#3498db" }) {

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return() => {
      document.body.style.overflow = 'auto'
    }
  } , [])

  const style = {
    width: size,
    height: size,
    border: `${size * 0.12}px solid #ddd`,
    borderTop: `${size * 0.12}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite",

  };

  return <div style={style}></div>;
}


export default PageLoading