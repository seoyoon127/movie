import React, { useState }  from 'react'; //
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

    function isLogIn(){
        
    }
    return(
        <div>
            <HeaderContainer >
                <HeaderWrap>
                    <HeaderLeft ><Link className='link' to='/'>UMC Movie</Link></HeaderLeft>
                    <HeaderRight>
                        <ul>
                            <li><Link className={`link ${location.pathname==='/LogIn'?'t':''}`}  to='/LogIn' onClick={isLogIn}>{LogIn}</Link></li>
                            <li><Link className={`link ${location.pathname==='/SignUp'?'t':''}`}  to='/SignUp' >회원가입</Link></li>
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