
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// #region agent log
fetch('http://127.0.0.1:7244/ingest/3fcd50bc-238a-46d3-a424-7b7726ce0fc0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:entry',message:'entry script ran',data:{},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
// #endregion
const rootElement = document.getElementById('root');
// #region agent log
fetch('http://127.0.0.1:7244/ingest/3fcd50bc-238a-46d3-a424-7b7726ce0fc0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:root',message:'root element lookup',data:{hasRoot:!!rootElement},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
// #endregion
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// #region agent log
fetch('http://127.0.0.1:7244/ingest/3fcd50bc-238a-46d3-a424-7b7726ce0fc0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:render',message:'render called',data:{},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
// #endregion
