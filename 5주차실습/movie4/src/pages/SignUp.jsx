import React, {useEffect, useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
const Input=styled.form`
    background-color:darkblue;
    position:absolute;
    left:35%;
    top:15%;
    >input{
        width:500px;
        height:33px;
        border-radius:20px;
        border: white solid;
    }
    .button{
        color:black;
        height:45px;
        font-size:15px;
        font-weight:800;
    }
    .true{
        border: #FFD252 solid;
        background-color: #FFD252;
    }
    >div{
        height:10px; //누르면 넓어지는건 나중에
        margin-top:10px;
        color:red;
    }
`
const Login=styled.div`
    color:white;
    display:flex;
    position:relative; 
    left:37%; top:70%; 
    .link{
        color:white;
        text-decoration:none;
        margin-left:60px;
        font-weight:800;
        font-size:17px;
    }
`
function SignUpPage(){

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [age, setAge]=useState("");
    const [password, setPassword]=useState("");
    const [passwordCheck, setPasswordCheck]=useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        // 입력 필드 값 변경 시 해당 상태를 업데이트하고 유효성 검사 수행
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "age") {
            setAge(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "passwordCheck") {
            setPasswordCheck(value);
        }
    };

    const [name_error,setNameError]=useState("");
    const [email_error,setEmailError]=useState("");
    const [age_error,setAgeError]=useState("");
    const [pw_error,setPwError]=useState("");
    const [pwc_error,setPwcError]=useState("");

    const [isValid,setIsValid]=useState(true);

    useEffect(()=>{
        function checkInput(){
            let isValid=true;
            //이름
            if (name===""){
                setNameError("이름을 입력해주세요");
                isValid=false;
            }
            else if(!/^[a-zA-Z가-힣]+$/.test(name)){
                setEmailError("이름은 문자열이어야 합니다");
                isValid=false;
            }
            else
                setNameError("");
            //이메일
            if(email===""){
                setEmailError("이메일을 입력해주세요");
                isValid=false;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                setEmailError("올바른 이메일 형식이 아닙니다");
                isValid=false;
            }
            else
                setEmailError("");
            //나이
            if(age===""){
                setAgeError("나이를 입력해주세요");
                isValid=false;
            }
            else if(isNaN(Number(age))){
                setAgeError("숫자로 입력해야 합니다");
                isValid=false;
            } 
            else if(age<0){
                setAgeError("양수로 입력해야 합니다");
                isValid=false;
            }
            else if(!Number.isInteger(Number(age))){
                setAgeError("정수로 입력해야 합니다");
                isValid=false;
            }
            else if(age<19){
                setAgeError("19세 이상만 가입 가능 합니다");
                isValid=false;
            }
            else
                setAgeError("");
            //비밀번호
            if(password===""){
                setPwError("비밀번호를 입력하세요");
                isValid=false;
            }
            else if(password.length<4){
                setPwError("최소 4자리 이상이어야 합니다");
                isValid=false;
            }
            else if(password.length>12){
                setPwError("최대 12자리까지 가능합니다");
                isValid=false;
            }
            else if(!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)){
                setPwError("영어, 숫자, 특수문자를 조합하야 합니다");
                isValid=false;
            }
            else
                setPwError("");
            //비밀번호
            if(passwordCheck===""){
                setPwcError("비밀번호를 입력하세요");
                isValid=false;
            }
            else if(passwordCheck!==password){
                setPwcError("비밀번호가 일치하지 않습니다");
                isValid=false;
            }
            else
                setPwcError("");  
            setIsValid(isValid);
        }
        checkInput();
    },[name, email, age, password, passwordCheck])

    /*const formData = {
        name: name,
        email: email,
        age: age,
        password: password,
        passwordCheck: passwordCheck
      };*/  
    
    const navigate = useNavigate();

    function handleSubmit(){
        if(isValid){
            navigate('/LogIn');
        }
    }
    return(
        <Bg>
            <br/><h2>회원가입 페이지</h2>
            <Input>
                <input placeholder="이름을 입력하세요" name="name" value={name} onChange={handleChange} tf={name_error}/><div>{name_error}</div><br/>
                <input placeholder="이메일을 입력하세요" name="email" value={email} onChange={handleChange}/><div>{email_error}</div><br/>
                <input placeholder="나이를 입력하세요" name="age" value={age} onChange={handleChange}/><div>{age_error}</div><br/>
                <input type="password" placeholder="비밀번호를 입력하세요" name="password" onChange={handleChange}/><div>{pw_error}</div><br/>
                <input type="password" placeholder="비밀번호 확인" name="passwordCheck" onChange={handleChange}/><div>{pwc_error}</div><br/><br/>   
                <input type="button" value="제출하기" className={isValid ? 'button true' : 'button'} onClick={handleSubmit}/><br/><br/>
            </Input> 
            <Login>
                <div>이미 아이디가 있으신가요?</div>
                <Link to='LogIn' className="link">로그인 페이지로 이동하기</Link>
            </Login>
        </Bg>
    )
}

export default SignUpPage;