import React from "react";

export const Modal = ({ handleClose, handleSumit, show, children }) => (
  <div className={show ? "modal display-block" : "modal display-none"}>
    <section className='modal-main'>
      {children}
      <div>
        <button onClick={handleSumit}>Сохранить</button>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </section>
  </div>
);
