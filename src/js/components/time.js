import {onClick} from '../utils';

export default class TimeComponent extends window.HTMLElement {
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
        const inputFormat = this.getAttribute("inputFormat");
        let timestamp = this.innerText;

        //Makes for easier conversion to Date object
        timestamp = timestamp.replace(/[&\/\\#,\-+()$~%.'":*?<>{}]/g, ' ')
                                .replace("st", "")
                                .replace("nd", "")
                                .replace("rd", "")
                                .replace("th", "");
        console.log(timestamp);

        timestamp = timestamp.split(" ");
        timestamp = timestamp.filter((e) => { return e !== ""});

        //Check if it's a UTC Timestamp and convert it to non-string
        if (!isNaN(timestamp)) {
            if (timestamp.length === 1) {
                timestamp = parseInt(timestamp[0])
            }
        }

        if (inputFormat) {
            let temp = timestamp[0];
            timestamp[0] = timestamp[1];
            timestamp[1] = temp;
        }

        console.log(timestamp);

        // First 3
        if (timestamp.length > 1) {
            timestamp = timestamp.slice(0, 3).join(" ");
        }

        timestamp = new Date(timestamp);

        console.log(timestamp instanceof Date);

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

    }
}
