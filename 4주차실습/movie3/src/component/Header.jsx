import React ,{useState} from 'react';
import { Link ,useParams } from 'react-router-dom'; 
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
        margin-left:1000px;
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

        
    }
`


export default function Header(){
    const defaultValue='로그인';
    const [logValue, setLogValue]=useState(defaultValue);
    const Log=()=>{
        setLogValue(logValue => logValue === '로그인' ? '로그아웃' : '로그인');
    }
    const {param}=useParams();//노란색 변경할때 사용..?
    return(
        <div>
            <HeaderContainer >
                <HeaderWrap>
                    <HeaderLeft ><Link className='link' to='/'>UMC Movie</Link></HeaderLeft>
                    <HeaderRight>
                        <ul>
                            <li><Link className='link'  to='/' onClick={Log} isActive={true}>{logValue}</Link></li>
                            <li><Link className='link' to='/Popular' Popular isActive={param==='Popular'}>Popular</Link></li>
                            <li><Link className='link' to="/NowPlaying" isActive={param==='NowPlaying'}>Now Playing</Link></li>
                            <li><Link className='link' to="/TopRated" isActive={param==='TopRated'}>Top Rated</Link></li>
                            <li><Link className='link' to="/Upcoming" isActive={param==='Upcoming'}>Upcoming</Link></li>  
                        </ul>
                    </HeaderRight>
                    </HeaderWrap>
            </HeaderContainer>
        </div>
    );
}