import React,{useState,useEffect} from 'react';
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
        border: #FFD252 solid;
        height:50px;
        font-weight:800;
        font-size:16px;
    }
    .true{
        background-color:#FFD252;
    }
    >div{
        height:10px; //누르면 넓어지는건 나중에
        margin-top:10px;
        color:red;
    }
`
function LogIn(){
    //FormData가 잘 전달되는지 확인하기 위함
    const location = useLocation();
    const formData = location.state?.formData;

    const[id,setId]=useState("");
    const[password,setPassword]=useState("");
    const[isValid,setIsValid]=useState(true);
    const[id_error,setIdError]=useState("");
    const[pw_error,setPwError]=useState("");

    const handleChange=(e)=>{
        const{name,value}=e.target;
        if (name==="id"){
            setId(value);
        }else if (name==="password"){
            setPassword(value);
        }
    }
    useEffect(()=>{
        function checkInput(){
            let isValid=true;
            //아이디
            if(id===''){
                setIdError("아이디를 입력해주세요");
                isValid=false;
            }
            else{
                setIdError("");
            }
            //비밀번호
            if(password===''){
                setPwError("비밀번호를 입력해주세요");
                isValid=false;
            }
            else{
                setPwError("");
            }

            setIsValid(isValid);
        } 
        checkInput();
    },)
    useEffect(() => {
        if (formData) {
            console.log('Received Form Data:', formData);
        }
    }, [formData]);
    return(
        <Bg>
            <br/><h2>로그인 페이지</h2>
            <Input>
                <input placeholder='아이디' name="id" value={id} onChange={handleChange}/><br/>{id_error}<br/>
                <input placeholder='비밀번호' name="password" value={password}  onChange={handleChange}/><br/>{pw_error}<br/><br/>
                <input type="button" className={isValid ? 'button true' : 'button'} value="로그인"/>
            </Input>
        </Bg>
    )
}

export default LogIn;