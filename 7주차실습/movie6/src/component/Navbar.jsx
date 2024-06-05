import React, { useEffect, useState }  from 'react'; 
import { Link ,useLocation } from 'react-router-dom'; 
import styled from 'styled-components';

const HeaderContainer = styled.div`
    background-color: rgb(40, 40, 83);
`;
const HeaderWrap=styled.div`
    height:40px;
    margin-left:20px;
    display: flex;
    align-items: center;
`
const HeaderLeft=styled.div`
    display: flex;
    .link{
        color:white;
        text-decoration: none; /*밑줄 없앰*/      
    }
`
const HeaderRight=styled.div`
    display: flex;
    position:absolute;
    right:0px;
    ul{
        display: flex;
        left:40%;
    }
    ul>li{
        padding:5px;
        margin-right: 14px;
        list-style-type:none;
    }
    ul>li>.link{
        color:white;
        text-decoration: none; /*밑줄 없앰*/ 
        &:hover{
            font-size:18px;
            cursor:pointer; /*손모양 커서*/
        }
        &.t{
            color:#FFD252;
        }   
    }
`


export default function Header(){
    
    const location=useLocation();
    const [LogIn,setLogIn]=useState('로그인');
    const [SignUp,setSignUp]=useState('회원가입');
    const[LogInLink,setLogInLink]=useState('/LogIn');

    useEffect(()=>{
        const storedId = localStorage.getItem("id");
        if (storedId){ //로그인 되었을 떄(localStorage에 id가 있을 때)
            setSignUp('');
            setLogIn('로그아웃');
            setLogInLink('/');
        } else {
            setSignUp('회원가입');
            setLogIn('로그인');
            setLogInLink('/LogIn');
          }
    },[location])
    useEffect(() => {
        const handleStorageChange = () => {
          const storedId = localStorage.getItem("id");
          if (storedId) {
            setSignUp('');
            setLogIn('로그아웃');
            setLogInLink('/');
          } else {
            setSignUp('회원가입');
            setLogIn('로그인');
            setLogInLink('/LogIn');
          }
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);
    function isLogIn(){
        if(LogIn==='로그아웃'){ //로그아웃 버튼 눌렀을 때
            localStorage.removeItem("id"); //토큰 제거
            localStorage.removeItem("pw");
            setSignUp('회원가입');
            setLogIn('로그인');
            setLogInLink('/LogIn');
            window.dispatchEvent(new Event("storage")); //storage이벤트 발생시킴
        }
        else{
            setSignUp('');
            setLogIn('로그아웃');
            setLogInLink('/');
        }
    }
    return(
        <div>
            <HeaderContainer >
                <HeaderWrap>
                    <HeaderLeft ><Link className='link' to='/'>UMC Movie</Link></HeaderLeft>
                    <HeaderRight>
                        <ul>
                            <li><Link className={`link ${location.pathname==='/SignUp'?'t':''}`}  to='/SignUp' >{SignUp}</Link></li>
                            <li><Link className={`link ${location.pathname==='/LogIn'?'t':''}`}  to={LogInLink} onClick={isLogIn}>{LogIn}</Link></li>
                            <li><Link className={`link ${location.pathname==='/Popular'?'t':''}`} to='/Popular'>Popular</Link></li>
                            <li><Link className={`link ${location.pathname==='/NowPlaying'?'t':''}`} to="/NowPlaying" >Now Playing</Link></li>
                            <li><Link className={`link ${location.pathname==='/TopRated'?'t':''}`} to="/TopRated" >Top Rated</Link></li>
                            <li><Link className={`link ${location.pathname==='/Upcoming'?'t':''}`} to="/Upcoming" >Upcoming</Link></li>  
                        </ul>
                    </HeaderRight>
                    </HeaderWrap>
            </HeaderContainer>
        </div>
    );
}