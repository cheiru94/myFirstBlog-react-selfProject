/* eslint-disable */
import { useState } from "react";
import "./App.css";
import React, { useRef } from "react"; // 🟡input 자동 focus용

/* 리액트를 활용한 블로그 만들기 */
 
function App() {
  /* 🟢변수 - return 밖에 선언 */
  let post = "DESIGNED BT ICHIBAN";

  /* 🟢useState */
  let [글제목, 글제목변경] = useState(["isseymiyake","Saint Laurent","Dior",]);
  let [따봉, 따봉변경] = useState([0,0,0]); // 굳이 함수까지 2개 작성하지 않아도 된다
  let [modal,setModal] = useState(false) // 모달창 상태를 나타내기 위한 state - ( ) 안에 들어가는 형식은 뭐든 상관 없다
  let [title,setTitle] = useState(0)  // UI상태를 나타내기 위한 state
  let [inputValue,setInputValue] = useState('')  // input 값을 저장하기 위한 state
  let [when,setWhen] = useState([]);

  /* 🟡input에 focus */
  const inputRef = useRef(null); // ref를 생성
  const handleFocus = () => {
    inputRef.current.focus(); // input 요소에 focus를 설정
  };


  /* 함수 */

  /* 1. HTML  레이아웃 짤 때는 이렇게 return () 안에 다 짜야한다 */
  /* 2. return 안에는 하나의 태그로 시작해서 하나의 태그로 끝나야 한다, 병렬로 태그 2개 이상 금지 */
  return (
    <div className='App'>


      {/* 블로그 제목 */}
      <div className='my-nav'>
        <h1>Ichiban's Fashion <br/> BLOG</h1>
      </div>


      {/* 🟢버튼 */}
      <button onClick={() => {
          let copy글제목 = [...글제목];
          copy글제목[0] = "Yohji Yamamoto";
          글제목변경(copy글제목);
      }}>글수정</button>

      <button style={{marginLeft:'20px'}} onClick={() => {
          let ccopy글제목Sort = [...글제목];
          ccopy글제목Sort.sort();
          글제목변경(ccopy글제목Sort);
      }}>정렬</button>

      {/* 🟢글목록 3개 , 파워코딩 */}
      {/* <div className='list'> 
        <h4>{글제목[0]} <span onClick={() => { 따봉변경(따봉 + 1); }} > ♥️👍 </span> {따봉} </h4> 
        <p>5월 21일 발행</p>
      </div>
      <div className='list'>
        <h4>{글제목[1]}</h4>
        <p>5월 21일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={()=>{ setModal(!modal)}}>{글제목[2]}</h4>
        <p>5월 21일 발행</p>
      </div> */}

      {/* 🟢map 반복문으로 글목록 생성 */}
      {
        글제목.map((e,i)=>{

          return(
          <div className='list' key={i}>
            {/* <h4 onClick={()=>{ setModal(!modal)}}>{글제목[2]}</h4> */}
            {/* <h4 onClick={()=>{ setModal(!modal)}}>{e}</h4> */}
            <h4 onClick={()=>{ setModal(!modal); setTitle(i)}}>{글제목[i]} 
             <span onClick={(e) => { 
              let copy = [...따봉];
              copy[i] += 1;
              따봉변경(copy);
               e.stopPropagation();}} 
             > ❤️ </span> {따봉[i]} 
            </h4>
            <p>1994-10-01</p>
            <button onClick={()=>{
              let copy글제목 = [...글제목];
              copy글제목.splice(i,1);
              글제목변경(copy글제목);
            }}>삭제</button>
          </div>
          
          )
        })
      }

      {/* 🟢모달창 */}
      {
        modal==true ? <Modal title={title} 글제목={글제목} color='skyblue' 글제목변경={글제목변경} /> : null  
        // 부모 state 받아오기 ⭐
        // 일반 문자도 가능  ' ' 사용
        // 함수도 받아 올 수 있다 (state 함수)
      }                                                                                     
    
      {/*🟢글 발행 input + button */}
      <input
        ref={inputRef} // 🟡ref 속성 추가
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue} // inputValue 상태를 input 요소의 값으로 설정
      />
        

      <button className='btn-create' onClick={(e)=>{
        let copy글제목 = [...글제목];
        copy글제목.unshift(inputValue);

        //글 추가 될 때 마다 따봉개수 저장 수도 증가
        let copy따봉 = [...따봉]
        copy따봉.unshift(0);
        따봉변경(copy따봉);

        //input에 1개 이상의 글자가 입력되어야 글 추가 가능
        !!inputValue ? 글제목변경(copy글제목) : false;
        setInputValue('');

        handleFocus(); // 🟡버튼 클릭 후 input에 focus를 설정
      }}>글 발행</button>


    </div> /* 메인 div 終 */
  );
}

/* 🟢모달 */
function Modal(props) { // props로 부모 state 받아오기 ⭐
  return(
    <div className='modal' style={{background : props.color}}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button 
      //   onClick={()=>{
      //     let copy = [...props.글제목]
      //     copy[0] = '여자코트 추천';
      //     props.글제목변경(copy)
      //   }}
      >글수정</button>
    </div>
  )
}


export default App;
