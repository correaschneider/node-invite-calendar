const moment = require('moment');
const { sendemail, getIcalObjectInstance } = require('./app');

const sendto = "asdad@to.com.br";
const subject = "Teste de CalDAV";
const htmlbody = "<h1>LOL<h1>";

const starttime = new Date(2021, 09, 09, 09, 00);
const endtime = new Date(2021, 09, 09, 10, 00);
const summary = "Teste de evento";
const description = "Hora do recreio!";
const location = "Mãe Joana";
const url = "https://meet.google.com/asdd-nnew-xwf";
const name = "Eu";
const email = "asdasfsdfsdf@gmail.com";

const {err, value: calendarObj} = getIcalObjectInstance(starttime, endtime, summary, description, location, url, {name ,email});

// console.log(calendarObj);

sendemail(sendto, subject, htmlbody, calendarObj);