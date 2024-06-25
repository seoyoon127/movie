import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaBars } from "react-icons/fa"
import styled from 'styled-components';

const SideWrap = styled.div`
    z-index:1;
    position:absolute;
    top: 0;
    right:0;
    background-color: rgb(40, 50, 103);
    text-align:left;
    width:100%;
    height:100%;
    color:white;
    font-size:18px;
    .header{
        display:flex;
        height:40px;
        line-height:40px;
        background-color: rgb(40, 40, 83);
        .umc{
            margin-left:25px;
            color:white;
            text-align:left;
            text-decoration: none; /*밑줄 없앰*/ 
            &:hover{
                color:#FFD252;
                font-size:18px;
                cursor:pointer; /*손모양 커서*/
            }
        }
        .faBar{
            position:absolute;
            right:15px;
        }
    }
`;

const HeaderRight=styled.div`
    ul{
        left:40%;
    }
    ul>li{
        padding:5px;
        list-style-type:none;
    }
    ul>li>*{
        color:white;
        text-align:left;
        text-decoration: none; /*밑줄 없앰*/ 
        &:hover{
            color:#FFD252;
            font-size:18px;
            cursor:pointer; /*손모양 커서*/
        }
`
const SideBar=({isOpen,closeSidebar})=>{
    return(
        <div>
            <SideWrap isOpen={isOpen}>
                <div className='header'>
                    <Link className='umc' to='/'onClick={closeSidebar}>UMC Movie</Link>
                    <div className='faBar'onClick={closeSidebar}><FaBars /></div> 
                </div>
                <HeaderRight>
                        <ul>
                            <li><Link  to='/SignUp'onClick={closeSidebar} >SignUp</Link></li>
                            <li><Link  to='/Popular'onClick={closeSidebar}>Popular</Link></li>
                            <li><Link  to='/NowPlaying'onClick={closeSidebar} >Now Playing</Link></li>
                            <li><Link  to='/TopRated'onClick={closeSidebar} >Top Rated</Link></li>
                            <li><Link  to='/Upcoming'onClick={closeSidebar} >Upcoming</Link></li>  
                        </ul>
                </HeaderRight>
            </SideWrap>
        </div>

    );
}
export default SideBar;