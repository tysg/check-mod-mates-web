// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
var request = require('request');

// const key = get_token()[0]; // key is constant
//***REMOVED*** = get_token()[1];


const key = "EKCnWpNMgPfzGr9psFhqq"; // key is constant
const token = "F369363B66FAFBCB867FD8979442B1DBEE3E095CB0137617EAD0B3A7E094270BE02C312C78C85508C79F6DCE013441C584ED2A60AFA1B409D2622B056021FD19D7ADEDEF0F29C88468E15F67DF120130848ADC2F32A487FE04E7C086BE55D6A872F362D8DCA21717DA8967215B2E1FD748A29DAECCCDFA75E1E38A791483822200B2F7DAA684054B27435DF8D6548AD23C4018ECAC1F2ABF9CFC423D3B3355D408470C2F731EB9A147E1190776E2F70ED9874D11EEF2E3EB486C56CE495B62617F3F71C3D236B181FD899853215343EF6FEF9D87E8E57035A5A089FE5372A602163E445339452F5B8DC5C48C65C6B7FD";

const module_call = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=" +
    key + "&AuthToken=" +
    token + "&Duration=10&IncludeAllInfo=false";


function getObject(url) {
    var response;
    request(url, function (error, response, body) {
        response = body;
    });
    return response;
}

console.log(getObject(module_call));
// console.log(module_call);