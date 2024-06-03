import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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

    const handleSubmit = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
    
            if (response.status === 200) {
                // 서버로부터 받은 사용자 정보(data)를 활용하여 필요한 작업을 수행합니다.
                console.log('User profile:', data);
                navigate('/LogIn');
            } else if (response.status === 404) {
                console.error('User not found');
            } else {
                console.error('Failed to fetch user profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
    
    // 유효한 토큰을 가져와서 사용합니다.
    //const token = localStorage.getItem('token'); // 로그인 시 저장한 토큰
    
    
    return(
        <Bg>
            <br/><h2>로그인 페이지</h2>
            <Input>
                <input placeholder='아이디' name="username" value={username} onChange={handleChange}/><br/><div>{username_error}</div><br/>
                <input type="password" placeholder='비밀번호' name="password" value={password}  onChange={handleChange}/><br/><div>{pw_error}</div><br/><br/>
                <input type="button" className={isValid ? 'button true' : 'button'} onClick={handleSubmit} value="로그인"/>
            </Input>
        </Bg>
    )
}

export default LogIn;