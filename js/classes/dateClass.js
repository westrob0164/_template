

class DateObject { 

    constructor() {
        this.monthNames    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthNamesAbb = ["Jan.","Feb.","Mar.","Apr.","May","June","Jul.","Aug.","Sept.","Oct.", "Nov.","Dec."]
        this.dayNames      = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.dayNamesAbb   = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];       
    }

    firstDay(year, month){ return (new Date(year, month)).getDay();  }

    dayInMonth(year, month){ return (new Date(year, month + 1, 0)).getDate();  }

    oridinalSuffix(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

    // getWeekNumber(year, month, day) { return new Date(year,month-1, day).getWeek(); }

    getWeekNumber(year, month, day) {
        const d = new Date(Date.UTC(year, month - 1, day));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

  
    createDateTitle(date){
        
        //deconstruct the date id tag
        const yearPart = date.substr(5,4);
        const monthPart = parseInt(date.substr(9,2));
        const dayPart = parseInt(date.substr(11,2));   

        const weekNumber = new Date(yearPart, monthPart-1, dayPart).getWeek();

        //console.log("year part", yearPart, "month part", monthPart, "day part", dayPart)

        //console.log("the week number is ", weekNumber);

        // get the name of the day of the week
        const dayofWeekName = new Date(yearPart, [monthPart-1], dayPart);

        // add the ordinal suffux
        const OrdinalDay = `${dayPart}${this.oridinalSuffix(dayPart)}`;

        return [`${this.dayNames[dayofWeekName.getDay()]}, ${this.monthNames[monthPart-1]} ${OrdinalDay}, ${yearPart}`,
                 dayofWeekName.getDay(), 
                 weekNumber,
                 [yearPart, monthPart, dayPart]
                ];
    }    
}

window.DateObject = DateObject;


