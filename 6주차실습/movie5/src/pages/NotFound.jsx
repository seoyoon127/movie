import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Bg=styled.div`
    position:relative;
    height:95%;
    width:100%;
    background-color:darkblue;
`
const Div=styled.div`
    position:absolute;
    top:40%; left:40%; 
    text-align:center;
    color:white;
    .s1{
        font-size:40px;
        font-weight:700;
    }
    .link{
        color:white;
        font-size:25px;
        text-decoration: none;  
    }
`
export default function NotFound(){
    return(
        <Bg>
            <Div>
                <div className="s1">Oops!</div><br />
                <div>예상치 못한 에러가 발생했습니다;</div><br />
                <div><b><i>Not Found</i></b></div><br />
                <Link to='/' className="link">메인으로 이동하기</Link>
            </Div>
        </Bg>
    )
}