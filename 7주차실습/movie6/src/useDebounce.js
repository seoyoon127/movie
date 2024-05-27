import {useState,useEffect} from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay); //딜레이 시간 후 decounceValue 초기화
  
      return () => {
        clearTimeout(timer);
      }; //searxch 변경 시점에 clearTimeout을 해줘야함
    }, [value,delay]);
  
      return debouncedValue;
    }
export default useDebounce;