import {onClick} from '../utils';

export default class DateTimeComponent extends window.HTMLElement {
    constructor () {
        super();
        this.months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        }
    }

    connectedCallback () {
        const numRegex = /^\d+$/;
        let timestamp = this.getAttribute("data-datetime");

        //Makes for easier conversion to Date object
        // timestamp = timestamp.replace(/[&\/\\#,\-+()$~%.'":*?<>{}]/g, ' ')
        //                         .replace("st", "")
        //                         .replace("nd", "")
        //                         .replace("rd", "")
        //                         .replace("th", "");


        //Check if it's a UTC Timestamp and convert it to non-string
        if (numRegex.test(timestamp)) {
            timestamp = parseInt(timestamp);
        }

        timestamp = new Date(timestamp);

        let month = this.months[timestamp.getMonth()],
            day = timestamp.getDate(),
            year = timestamp.getFullYear();

        switch(day) {
            case 1:
            case 21:
            case 31 :
                day += "st,";
                break;
            case 2:
            case 22 :
                day += "nd,";
                break;
            case 3:
            case 23 :
                day += "rd,";
                break;
            default:
                day += "th,";
        }

        this.innerText = [month, day, year].join(" ");

        if (this.hasAttribute("include-time")) {
            const ampm = timestamp.getHours() >= 12 ? 'pm' : 'am';
            this.innerText += " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ampm;
        }

    }
}
