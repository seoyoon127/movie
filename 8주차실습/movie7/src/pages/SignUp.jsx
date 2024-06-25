import React, { useEffect, useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Bg=styled.div`
    height:100%; width:100%;
    background-color:darkblue;
    display: flex;
    justify-content: center; 
`
const Box=styled.div`
    >h2{
        color:white;
        text-align: center;
    }   
`
const Input=styled.form`
    background-color:darkblue;
    position:absolute;
    top:15%;
    >input{
        width:400px;
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
        height:10px; 
        margin-top:5px;
        color:red;
    }
    @media (min-width: 768px) { 
      >input{
        width:500px;
    }
    }
`
const Login=styled.div`
    color:white;
    display:flex;
    position:relative; 
    top:67%; 
    .link{
        color:white;
        text-decoration:none;
        margin-left:30px;
        font-weight:800;
        font-size:17px;
    }
    @media (min-width: 768px) { 
      .link{
        margin-left:60px;
    }
`
function SignUpPage(){

    const [name, setName]=useState("");
    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [age, setAge]=useState("");
    const [password, setPassword]=useState("");
    const [passwordCheck, setPasswordCheck]=useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        // 입력 필드 값 변경 시 해당 상태를 업데이트하고 유효성 검사 수행
        if (name === "name") {
            setName(value);
        }else if (name === "username") {
            setUsername(value);
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

    const formData = {
        name: name,
        email: email,
        age: age,
        username: username,
        password: password,
        passwordCheck: passwordCheck
    };
    const navigate = useNavigate();


    
    const handleSubmit =async () => {
        try { 
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',//현재 전송하는 데이터 타입
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.status === 201) {
                alert("가입되었습니다!");
                localStorage.setItem("token",formData);
                localStorage.setItem("id",username);
                navigate('/login');
            } else {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }
    const [isValid,setIsValid]=useState(true);
    useEffect(()=>{
        function checkInput(){
            let isValid=true;
            if (name==="")
                isValid=false;
            if (username==="")
                isValid=false;
            if (email==="")
                isValid=false;
            if (age==="")
                isValid=false;
            if (password==="")
                isValid=false;
            if (passwordCheck==="")
                isValid=false;
            setIsValid(isValid);
        }
        checkInput();
    });

    return(
        <Bg>
            <Box>
                <h2>회원가입 페이지</h2>
                <Input>
                    <input placeholder="이름을 입력하세요" name="name" value={name} onChange={handleChange}/><div></div><br/>
                    <input placeholder="아이디를 입력하세요" name="username" value={username} onChange={handleChange} /><div></div><br/>
                    <input placeholder="이메일을 입력하세요" name="email" value={email} onChange={handleChange}/><div></div><br/>
                    <input placeholder="나이를 입력하세요" name="age" value={age} onChange={handleChange}/><div></div><br/>
                    <input type="password" placeholder="비밀번호를 입력하세요" name="password" onChange={handleChange}/><div></div><br/>
                    <input type="password" placeholder="비밀번호 확인" name="passwordCheck" onChange={handleChange}/><div></div><br/><br/>   
                    <input type="button" value="제출하기" className={isValid?"button true":"button"} onClick={handleSubmit}/><br/><br/>
                </Input> 
                <Login>
                    <div>이미 아이디가 있으신가요?</div>
                    <Link to='/LogIn' className="link">로그인 페이지로 이동하기</Link>
                </Login>
            </Box>
        </Bg>
    )
}
export default SignUpPage;