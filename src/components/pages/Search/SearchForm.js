import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";

export default function RegisterForm() {

    const gogo = useHistory();

    const [usersDatas, setUsersDatas] = useState([]);

    const [values, setValues] = useState({
        ISBN : '',
        productName : '',
        stock : '',
        unitPrice : '',
        createdAt : '',
        image : '',
        writer : '',

        userId: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        name: '',
    })

    const [guideTxts, setGuideTxts] = useState({
        ISBN : '',
        productName : '',
        stock : '',
        unitPrice : '',
        createdAt : '',
        image : '',
        writer : '',
        userGuide : '최대 20자 까지 가능합니다.',
        emailGuide : '이메일 형식에 맞게 작성해 주세요.',
        pwdGuide : '숫자와 문자를 조합해서 최소 8글자는 입력해 주세요.',
        confirmPwdGuide : '한번더 입력해 주세요.',
        nameGuide : '',
        phoneGuide : '. 을 입력하지 말아 주세요.'
    });

    const [error, setError] = useState({
        ISBN : '',
        productName : '',
        stock : '',
        unitPrice : '',
        createdAt : '',
        image : '',
        writer : '',
        userIdError: '',
        emailError: '',
        pwdError: '',
        confirmPwd: '',
        nameError: '',
        phoneError: ''
      })



  const isUserId = userId => {
    const userIdRegex = /^[a-z0-9_!@$%^&*-+=?"]{1,20}$/
    return userIdRegex.test(userId);
  }

  const isEmail = email => {
  const emailRegex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 

    return emailRegex.test(email);
  };

  const isPwd = pass => {
    const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;

    return pwdRegex.test(pass);
  }
  
  const isPhone = phone => {
    const phoneRegex = /^[0-9\b -]{0,13}$/;
    return phoneRegex.test(phone)
  }

  const confirmPassword = (pass, confirmPass) => {
    return pass === confirmPass
  }

      const onTextCheck = () => {
        let userIdError = "";
        let emailError = "";
        let pwdError = "";
        let confirmPwd = "";
        let nameError = "";
        let phoneError = "";
        
    
        if (!isUserId(values.userId)) userIdError = "아이디 형식을 확인 해 주세요.( 한글 불가 )";
        if (!isEmail(values.email)) emailError = "email 형식이 아닙니다.";
        if (!isPwd(values.password)) pwdError = "비밀번호 조건을 만족 할 수 없습니다.";
        if (!confirmPassword(values.password, values.confirmPassword)) confirmPwd = "비밀번호가 일치하지 않습니다.";
        if (values.userId === values.password) pwdError = "아이디를 비밀번호로 사용 할 수 없습니다."; 
        if (!isPhone(values.phone)) phoneError = "휴대폰 형식이 아닙니다.";

        if (values.name.length === 0) nameError = "이름을 입력해주세요.";
    
        //console.log(userIdError, emailError, pwdError, confirmPwd, nameError, phoneError, userTypesError, useConfirmError)
        setError({
          userIdError, emailError, pwdError, confirmPwd, nameError, phoneError
        })
    
        if (userIdError || emailError || pwdError || confirmPwd || nameError || phoneError ) return false;
        return true;
      }

    let process = require('../../../db/myProcess.json');

    useEffect(()=>{
        fetch(`http://${process.IP}:${process.PORT}/users`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setUsersDatas(data);
            console.log(data);
        });
    },[process.IP, process.PORT]);

    const handleChangeForm = (e) => {
        setValues({ 
            ...values, 
            [e.target.name]: e.target.value 
        });
    }

    const handlePutUserLists = (e) => {
        //alert(usersDatas.length);
        //console.log(values);
        e.preventDefault();

        const valid = onTextCheck();

        if (!valid) console.error("retry");

        else {
        
            fetch(`/user-service/users`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id : usersDatas.length + 1,
                    userId: values.userId,
                    pwd: values.password,
                    name: values.name,
                    email: values.email,
                    phone: values.phone
                }),
            }).
            then(
                alert("success"),
                gogo.push('/')
                //window.location.href = '/'

            )
            }
    }

    return(

        <div className="myaccount-area pb-80 pt-100">
            <div className="container">
                <div className="row">
                    <div className="ml-auto mr-auto col-lg-9">
                        <div className="myaccount-wrapper">
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item single-my-account mb-20 card">
                                    <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            <h3 className="panel-title">상품 검색</h3>
                                        </button>
                                    </div>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="card-body">
            <div className="myaccount-info-wrapper">
            <form  onSubmit={handlePutUserLists}>
                <div className="account-info-wrapper">
                    <h4>형식에 맞춰 작성해 주시면 됩니다. (각 폼은 선택사항입니다.)</h4>
                </div>
                <div className="row">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>제목으로 검색</label>
                            <input 
                                type="text"
                                name="productName"
                                value={values.productName}
                                onChange={handleChangeForm}
                                // placeholder="ID를 입력해 주세요."
                            />
                        </div>
                    </div>
                    {
                        error.userIdError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.userIdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.userGuide}</div>
                    }
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>날짜로 검색(2021-02-05 식으로 입력)</label>
                            <div>검색 시작 날짜</div>
                            <input 
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChangeForm}
                            />
                            <div>검색 종료 날짜</div>
                            <input 
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.nameError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.nameError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.nameGuide}</div>
                    }

                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>작가 이름으로 검색</label>
                            <input 
                                type="text"
                                name="writer"
                                value={values.writer}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.nameError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.nameError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.nameGuide}</div>
                    }
                    
                </div>
                
                <div className="billing-back-btn">
                    <div className="billing-btn">
                        <button type="submit">검색하기</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}