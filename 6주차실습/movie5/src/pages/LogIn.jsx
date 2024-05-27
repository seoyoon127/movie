import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styled  from 'styled-components';

const Bg=styled.div`
    position:relative;
    height:95%; width:100%;
    background-color:darkblue;
    >h2{
        position:absolute;
        left:45%;
        color:white;
    }
`
const Input=styled.div`
    position:absolute;
    left:35%;
    top:15%;
    >input{
        width:500px;
        height:30px;
        border-radius:20px;
        border: white solid;
    }
    .button{
        height:45px;
    }
`
function LogIn(){
    //FormData가 잘 전달되는지 확인하기 위함
    const location = useLocation();
    const formData = location.state?.formData;
    useEffect(() => {
        if (formData) {
            console.log('Received Form Data:', formData);
        }
    }, [formData]);
    return(
        <Bg>
            <br/><h2>로그인 페이지</h2>
            <Input>
                <input placeholder='아이디'/><br/><br/>
                <input placeholder='비밀번호'/><br/><br/><br/>
                <input type="button" className='button' value="로그인"/>
            </Input>
        </Bg>
    )
}

export default LogIn;