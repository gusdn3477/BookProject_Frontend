import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";

export default function RegisterForm() {

    const gogo = useHistory();

    const [usersDatas, setUsersDatas] = useState([]);

    const [values, setValues] = useState({
        ISBN : '',
        productName : '',
        unitPrice : '',
        createdAt : '',
        image : '',
        writer : '',
        stock : '',
    })

    const [guideTxts, setGuideTxts] = useState({
        ISBN : '최대 20자 까지 가능합니다.',
        productName : '최대 20자 까지 가능합니다.',
        stock : '숫자로 입력해 주세요.',
        unitPrice : '숫자로 입력해 주세요.',
        createdAt : '날짜 형식에 맞춰 주세요.',
        image : '',
        writer : '최대 10자까지 입력 가능합니다.'
    });

    const [error, setError] = useState({
        ISBN : '',
        productName : '',
        stock : '',
        unitPrice : '',
        createdAt : '',
        image : '',
        writer : ''
      })

  
      const onTextCheck = () => {
        let ISBNError = ""
        let productNameError = "";
        let stockError = "";
        let unitPriceError = "";
        let createdAtError = "";
        let writerError = "";
    
        setError({
          ISBNError, productNameError, stockError, unitPriceError, createdAtError, writerError
        })
    
        if (ISBNError || productNameError || stockError || unitPriceError || createdAtError || writerError ) return false;
        return true;
      }

    const handleChangeForm = (e) => {
        setValues({ 
            ...values, 
            [e.target.name]: e.target.value 
        });
    }

    const handlePutUserLists = (e) => {
        e.preventDefault();

        const valid = onTextCheck();

        if (!valid) console.error("retry");

        else {
            fetch(`/catalogs-service/catalogs`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ISBN : '',
                    productName : '',
                    stock : '',
                    qty : '',
                    unitPrice : '',
                    createdAt : '',
                    image : '',
                    writer : '',
                }),
            })
            .then(res => res.json())
            .then((res) => {
                if(res.token){
                    localStorage.setItem("token", res.token);
                    gogo.push("/");
                }
                else{
                    alert("입력된 정보를 확인하세요");
                }
            }
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
                                            <h3 className="panel-title">상품 등록</h3>
                                        </button>
                                    </div>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="card-body">
            <div className="myaccount-info-wrapper">
            <form  onSubmit={handlePutUserLists}>
                <div className="account-info-wrapper">
                    <h4>등록할 상품의 정보를 입력해 주세요.</h4>
                </div>
                <div className="row">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>상품 제목</label>
                            <input 
                                type="text"
                                name="productName"
                                value={values.productName}
                                onChange={handleChangeForm}
                                placeholder="상품 제목을 입력해 주세요."
                            />
                        </div>
                    </div>
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>ISBN</label>
                            <input 
                                type="text"
                                name="ISBN"
                                value={values.ISBN}
                                onChange={handleChangeForm}
                                placeholder="ISBN을 입력해 주세요."
                            />
                        </div>
                    </div>
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>재고</label>
                            <input 
                                type="text"
                                name="stock"
                                value={values.stock}
                                onChange={handleChangeForm}
                                placeholder="재고를 입력해 주세요."
                            />
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>가격</label>
                            <input 
                                type="text"
                                name="unitPrice"
                                value={values.unitPrice}
                                onChange={handleChangeForm}
                                placeholder="한 권당 가격을 입력해 주세요."
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>작가</label>
                            <input 
                                type="text"
                                name="writer"
                                value={values.writer}
                                onChange={handleChangeForm}
                                placeholder="작가 이름을 입력해 주세요."
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>이미지</label> {/* 타입 변경 요먕 */}
                            <input 
                                type="text"
                                name="image"
                                value={values.image}
                                onChange={handleChangeForm}
                                placeholder="이미지를 등록해 주세요(선택)"
                            />
                        </div>
                    </div>

                </div>
                
                <div className="billing-back-btn">
                    <div className="billing-btn">
                        <button type="submit">등록</button>
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