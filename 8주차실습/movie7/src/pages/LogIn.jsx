import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled  from 'styled-components';

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
const Input=styled.div`
    margin-top:50px;
    >input{
        width:450px;
        height:30px;
        border-radius:20px;
        border: white solid;
        color:${props=>props.tf?'red':''};
    }
    .button{
        height:50px;
        font-weight:800;
        font-size:16px;
    }
    .true{
        border: #FFD252 solid;
        background-color:#FFD252;
    }
    >div{
        height:10px; 
        margin-top:10px;
        color:red;
    }
    @media (min-width: 768px) { 
      >input{
        width:500px;
    }
`
function LogIn(){

    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[isValid,setIsValid]=useState(true);
    const[username_error,setUsernameError]=useState("");
    const[pw_error,setPwError]=useState("");

    const handleChange=(e)=>{
        const{name,value}=e.target;
        if (name==="username"){
            setUsername(value);
        }else if (name==="password"){
            setPassword(value);
        }
    }
    useEffect(()=>{
        function checkInput(){
            let isValid=true;
            //아이디
            if(username===''){
                setUsernameError("아이디를 입력해주세요");
                isValid=false;
            }
            else{
                setUsernameError("");
            }
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
        setIsValid(isValid);
        }
        checkInput();
    },[username, password,isValid])

    const navigate=useNavigate();
    const formData = {
        username: username,
        password: password
    };

    const handleSubmit = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer token',
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                //유효한 토큰일 시 정보를 전달받음
                localStorage.getItem("token",formData);
            } 
        
        } catch (error) {
        console.error('Error fetching user profile:', error);
    }
    // 유효한 토큰을 가져와서 사용합니다.
    //const token = localStorage.getItem('token'); // 로그인 시 저장한 토큰
        try { 
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.status === 200) {
                alert("로그인되었습니다!");
                localStorage.setItem("id",username);
                localStorage.setItem("pw",password);
                navigate('/');
            } else {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("로그인에 실패했습니다. 다시 시도해주세요.");
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }
    
    
    return(
        <Bg>
            <Box>
                <br/><h2>로그인 페이지</h2>
                <Input>
                    <input placeholder='아이디' name="username" value={username} onChange={handleChange}/><br/><div>{username_error}</div><br/>
                    <input type="password" placeholder='비밀번호' name="password" value={password}  onChange={handleChange}/><br/><div>{pw_error}</div><br/><br/>
                    <input type="button" className={isValid ? 'button true' : 'button'} onClick={handleSubmit} value="로그인"/>
                </Input>
            </Box>
        </Bg>
    )
}

export default LogIn;