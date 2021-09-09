const ical = require('ical-generator');
const ics = require('ics');
const nodemailer = require("nodemailer");
const { formatISO, addHours } = require("date-fns");

function getIcalObjectInstance(starttime, endtime, summary, description, location, url, organizer, attendees)
{
    // const cal = ical({ domain: "mytestwebsite.com", name: 'My test calendar event' });

    // cal.createEvent({
    //     start: starttime,         // eg : moment()
    //     end: endtime,             // eg : moment(1,'days')
    //     summary: summary,         // 'Summary of your event'
    //     description: description, // 'More description'
    //     location: location,       // 'Delhi'
    //     url: url,                 // 'event url'
    //     organizer: {              // 'organizer details'
    //         name: name,
    //         email: email
    //     },
    // });

    // return cal;

    const event = {
        start: [2021, 9, 9, 9, 0],
        duration: { hours: 2, minutes: 30 },
        title: 'Bolder Boulder',
        description: 'Annual 10-kilometer run in Boulder, Colorado',
        location: 'Folsom Field, University of Colorado (finish line)',
        url: 'http://www.bolderboulder.com/',
        geo: { lat: 40.0095, lon: 105.2669 },
        categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: organizer,
        // attendees: [
        //     { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
        //     { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
        // ]
    }

    return ics.createEvent(event)

}

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "SET_SENDER",
        pass: "SET_PASS_SENDER"
    }
});

function sendemail(sendto, subject, htmlbody, calendarObj = null)
{
    const now = formatISO(new Date, { format: 'basic' }).replace('Z', '')
    const nowMore1Hour = formatISO(addHours(new Date, 1), { format: 'basic' }).replace('Z', '')

    /**/
    const content = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART;VALUE=DATE:${nowMore1Hour}
DTEND;VALUE=DATE:${nowMore1Hour}
DTSTAMP:${now}
ORGANIZER;CN=asdasdsfsd@gmail.com:mailto:asdasdsfsd@gmail.com
UID:0unftvt5es4ncaudiah3b3jahq@google.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE
 ;CN=asdasdsfsd@gmail.com;X-NUM-GUESTS=0:mailto:asdasdsfsd@gmail.c
 om
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=
 TRUE;CN=asdadasdsa@outroemail.com.br;X-NUM-GUESTS=0:mailto:asdadasdsa@outroemail.com.br
X-MICROSOFT-CDO-OWNERAPPTID:-2075593018
CREATED:${now}
DESCRIPTION:-::~:~::~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~
 :~:~:~:~:~:~:~:~::~:~::-\nNão edite esta seção da descrição.\n\nVisualize o
 seu evento em https://calendar.google.com/calendar/event?action=VIEW&eid=M
 asdasdsdfsdff98df79d87fa98f7a8f79a78f9s8f79s&tok=
 as0d9f80as9df80asf
 lNGRkYzVmNTIzYTY&ctz=America%2FSao_Paulo&hl=pt_BR&es=1.\n-::~:~::~:~:~:~:~:
 ~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~::~:~::-
LAST-MODIFIED:${now}
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Teste
TRANSP:TRANSPARENT
END:VEVENT
END:VCALENDAR`

    console.log(content);
/**/

/*

    const content = `BEGIN:VCALENDAR
PRODID:-//sebbo.net//ical-generator//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART;VALUE=DATE:20211009T090000Z
DTEND;VALUE=DATE::20211009T100000Z
DTSTAMP:20210908T231219Z
ORGANIZER;CN=aosijdoasijd@gmail.com:mailto:aosijdoasijd@gmail.com
UID:10772e9d-0dac-431e-be0d-676ba60de708
X-MICROSOFT-CDO-OWNERAPPTID:-2075593018
SEQUENCE:0
SUMMARY:Teste de evento
LOCATION:Mãe Joana
DESCRIPTION:Hora do recreio!
URL;VALUE=URI:https://meet.google.com/sddg-nnew-xwf
END:VEVENT
END:VCALENDAR`
*/

    // console.log(calendarObj);

    mailOptions = {
        to: sendto,
        subject: subject,
        text: 'Please see the attached appointment',
        
        // Funciona no Google, menos no outlook
        // alternatives: [
        //     {
        //         contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
        //         content: new Buffer(calendarObj.toString())
        //     }
        // ]

        alternatives: [
            {
                contentType: 'text/calendar',
                content: new Buffer(content)
            }
        ]
        
        // Funciona no Google, menos no outlook
        // icalEvent: {
        //     filename: 'invitation.vcs',
        //     method: 'REQUEST',
        //     content: calendarObj.toString()
        // }
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " , response);
        }
    });
}

module.exports = {
    sendemail,
    getIcalObjectInstance
};