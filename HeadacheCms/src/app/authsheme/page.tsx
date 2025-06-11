'use client';

import React from "react";

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#fff',
};

const titleStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 20,
};

const h2Style: React.CSSProperties = {
  marginBottom: 20,
  color: '#000',
  fontSize: 28,
  fontWeight: 'bold',
//   borderBottom: '1px dashed #888',
  width: 120,
  textAlign: 'center',
};

const h3Style: React.CSSProperties = {
  margin: 0,
  color: '#222',
  fontSize: 16,
  fontWeight: 'normal',
};

const wrapperStyle: React.CSSProperties = {
  background: '#fff',
  padding: '40px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 40,
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  minWidth: 340,
};

const inputStyle: React.CSSProperties = {
  border: '2px dashed #888',
  borderRadius: 4,
  background: '#fafafa',
  color: '#222',
  width: 500,
  height: 36,
  marginBottom: 0,
  textAlign: 'center',
  fontSize: 16,
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: 10,
  color: 'black',
  background: '#fff',
  border: '2px dashed #222',
  borderRadius: 4,
  cursor: 'pointer',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 0,
};

const errorStyle: React.CSSProperties = {
  color: '#000',
  border: '1px dashed #888',
  borderRadius: 4,
  height: 40,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  marginTop: 0,
  background: '#f9f9f9',
  textAlign: 'center',
};

export default function AuthShemePage() {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <div style={h2Style}>Вход</div>
        {/* <div style={h3Style}>Система управления котентом</div> */}
      </div>
      <div style={wrapperStyle}>
        <div style={inputStyle}>[ Логин ]</div>
        <div style={inputStyle}>[ Пароль ]</div>
        <div style={buttonStyle}>Войти</div>
        {/* <div style={errorStyle}>[ Сообщение об ошибке ]</div> */}
      </div>
    </div>
  );
}
