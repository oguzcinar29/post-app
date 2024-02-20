import React from "react";
import { useData } from "./Context/DataContext";
import CartItems from "./Cart/CartItems";
import PrintItems from "./PrintItems";

export default function PrintableComponent() {
  const { total, backendCart } = useData();
  return (
    <div className="print-container">
      <div className="print-box">
        <h1>LOGO</h1>
        <div className="print-info">
          <div className="box">
            <h6>Tax deep info:</h6>
            <p>Unwrapped</p>
            <p>Fake Street 123</p>
            <p>San Javier</p>
            <p>CA 1234</p>
          </div>
          <div className="box">
            <h6>Tax</h6>
            <p>The Boring Company</p>
            <p>Tesla Street 007</p>
            <p>Frisco</p>
            <p>CA 0000</p>
          </div>
          <div className="box">
            <h6>Tax number</h6>
            <p>00044</p>
            <h6>Date of Issue</h6>
            <p>2022-11-21</p>
          </div>
          <div className="box">
            <h6>Terms</h6>
            <p>0 Days</p>
            <h6>Due</h6>
            <p>00.00.00</p>
          </div>
        </div>
        <div className="print-arr">
          <div className="title">
            <h5>Image</h5>
            <h5>Type</h5>
            <h5>Price</h5>
            <h5>Count</h5>
            <h5>Total</h5>
          </div>
          {backendCart.map((item, i) => {
            return <PrintItems key={i} {...item} />;
          })}
        </div>
        <div className="smaller">
          <div className="total-area">
            <div className="box">
              <b>Total </b>
              <p>${total}</p>
            </div>
            <div className="box">
              <b>Tax %8</b>
              <p>${(total * 8) / 100}</p>
            </div>
          </div>
          <hr></hr>
          <div className="big-total">
            <h4>Big Total </h4>
            <h3>${(total + (total * 8) / 100).toFixed(2)}</h3>
          </div>
        </div>
        <p>
          Ödeme koşullari 14 gündür. Paketlenmemiş Borçlarin Geç Ödenmesi Yasasi
          0000'e göre, serbest çalisanlarin bu süreden sonra borclarin
          ödenmemesi durumunda 00.00 gecikme ücreti talep etme hakkina sahip
          olduklarini ve bu noktada bu ücrete ek olarak yeni bir fatura
          sunulacagini lütfen unutmayin. Revize faturanin 14 gün içinde
          ödenmemesi durumunda, vadesi geçmiş hesaba ek faiz ve %8 yasal oran
          arti %0,5 Bank of England tabani olmak üzere toplam %8,5
          uygulanacaktir. Taraflar Kanun hükümleri disinda sözleşme yapamazlar.
        </p>
      </div>
    </div>
  );
}
