//  this file contains the utilities used by the system

// import { DateObject  } from '../classes/dateClass.js';


window.Utils = {
   // creates the lists.
   createListSection(taskData) {
      var tasksList = "";
      // create the html lists for the popup
      tasks[taskData].forEach(element => {     
         tasksList += `<br><strong class="taskTitle">${element.title}:</strong><br>`;
         element.tasks.forEach(tasks => {
            let checkBoxTag = tasks.replace(/\s/g, '');
            let className = element.title.replace(/\s/g, '');
            tasksList += `<input type="checkbox" class="${className}" id="${checkBoxTag}_ID" value="${checkBoxTag}">
                           <label class = "taskList">${tasks}</label><br>`; 
            //console.log(checkBoxTag);  
            //$(`"#${checkBoxTag}_ID"`).attr("checked", true);
         })
      })
      return tasksList;
   },

   // create a date format yyyymmdd from a new date command
   dateFormat_yyyymmdd(date) {
      const year = date.getFullYear();
      const protoMonth = date.getMonth();
      var day = date.getDate();

      var month = protoMonth + 1;

      if (month < 10) { month = `0${month}`}
      if (day < 10)   { day = `0${day}`}

      return `${year}${month}${day}`;   
   },

   /////////////// create yyyy-mm-dd formate /////////////////////////////
   formateDate(date) {
      const year = date.getFullYear();
      const protoMonth = date.getMonth();
      var day = date.getDate();

      var month = protoMonth + 1;

      if (month < 10) { month = `0${month}`}
      if (day < 10)   { day = `0${day}`}

      return `${year}-${month}-${day}`;
   },

   // get info from the date string
   deconstructDateID(date) {

      const yearPart  = date.substring(5, 9);
      const monthPart = date.substring(9, 11);
      const dayPart   = date.substring(11, 13);

      const deconDate = new Date(yearPart, (monthPart-1), dayPart);
      const monthDays = new DateObject;

      const weekDayNumber = deconDate.getDay();

      //get week number
      const weekNumber = monthDays.getWeekNumber(yearPart,monthPart,dayPart);

      //Days in Previous, Current and Next Month
      const numYearPart   = parseInt(yearPart);
      const numMonthPart  = parseInt(monthPart);
      const daysPrevMonth = monthDays.dayInMonth(numYearPart, (numMonthPart-2));
      const daysThisMonth = monthDays.dayInMonth(numYearPart, (numMonthPart-1));
      const daysNextMonth = monthDays.dayInMonth(numYearPart, (numMonthPart+0));

      const dateSunday = dayPart - weekDayNumber;
      
      return [dateSunday, yearPart, monthPart, dayPart, daysPrevMonth, daysThisMonth, daysNextMonth, weekNumber];
   },

   // creates an new div, adds a className, appends to another div
   addDiv(className, classAppendTo ) {
      $("<div>")
      .addClass(className)
      .appendTo(classAppendTo);    
   },

   // creates an new div, adds a className, prepends something, appends to another div
   addDivPre(className, prependStuff, classAppendTo ) {
      $("<div>")
      .addClass(className)
      .prepend(prependStuff) 
      .appendTo(classAppendTo);    
   },

   // creates an new div, adds a className, prepends something, adds ID, appends to another div
   addDivPreId(className, prependStuff, classAppendTo, IdName ) {
      $("<div>")
      .addClass(className)
      .prepend(prependStuff)
      .attr('id', IdName) 
      .appendTo(classAppendTo);    
   },

   //////////////// creates an new div, adds a className, adds ID, appends to another div
   addDivId(className, classAppendTo, IdName ) {
      $("<div>")
      .addClass(className)
      .attr('id', IdName) 
      .appendTo(classAppendTo);    
   },
   //////////////
   addDivPreIdData(className, prependStuff, classAppendTo, IdName, data1, data2 ) {
      $("<div>")
      .addClass(className)
      .prepend(prependStuff)
      .attr('id', IdName) 
      .appendTo(classAppendTo)
      .attr('data-scope1', data1)
      .attr('data-scope2', data2);
   },

   //creates a checkbox or radio box
   createInput(type, id, name, value, text, classAppendTo){

      const htmlText = `<input type="${type}" id="${id}" name ="${name}" value="${value}">
                        <label for="${id}">${text}</label><br> `;
      $(htmlText).appendTo(classAppendTo);
   },

   /////////// create a text box
   createTextBox (className, defaultValue,  classAppendTo, IdName) {
         $("<input>")
         .addClass(className)
         .attr(`placeholder`, defaultValue)
         .attr(`id`, IdName)
         .appendTo(classAppendTo);
   },


   //////////////
   createDPList (name, classAppendTo) {
      $("<Select>")
      .attr('name', name)
      .append(OptionalValues('stuff'))  
      .appendTo(classAppendTo)
   },

   ///////  select statement  ///////////////////////////////
   createSelect (className, IdName, classAppendTo){
      $("<select>")
         .addClass(className)
         .attr(`id`, IdName)
         .appendTo(classAppendTo);
   },

   createOption(className, classAppendTo, optionValue, text) {
      $("<option>")
         .attr('value', optionValue)
         .text(text)
         .addClass(className)
         .appendTo(classAppendTo);   
   },

   //////////////
   OptionalValues (optionValues){
      const OptionValues = `<option value ="test">${optionValues}`
      return OptionValues;
   },

   // Creates an <li>, adds class, text, data-id, and appends
   addShipItem(className, text, appendTo, shipId) {
      $("<li>")
      .addClass(className)
      .text(text)
      .attr('data-id', shipId) // Essential for the DB update!
      .appendTo(appendTo);    
   },

   //////////////// creates the date information used by other functions //////////////
   getDateInfo(date) {

      // get the date information
      const dateNumberArray = deconstructDateID(date);
      // dateNumberArray[0]  = date Sunday
      // dateNumberArray[1]  = year Part
      // dateNumberArray[2]  = month Part
      // dateNumberArray[3]  = day Part
      // dateNumberArray[4]  = days in Previous Month
      // dateNumberArray[5]  = days in Current Month
      // dateNumberArray[6]  = days in Next Month
      // dateNumberArray[7]  = week number 

      // create a new date object
      const newDate = new DateObject;   

      // get the month name s
      const monthNamePre = newDate.monthNames[parseInt(dateNumberArray[2]-2)];
      const monthNamecurr = newDate.monthNames[parseInt(dateNumberArray[2]-1)];
      const monthNameNext = newDate.monthNames[parseInt(dateNumberArray[2])];

      // get the week day names
      const dayNames = newDate.dayNames;

      // get the day numbers 
      const dayNumberArray = [];

      let monthtype = '0';

      for (let i = 0; i < 7; i++) {     
         let date = i+dateNumberArray[0];

         // get the day number, if statements compensate for a week where the month changes

         //numbers below 1
         if  (date < 1) {
            var dateNumberLabel = dateNumberArray[4] + date;
            monthtype = 1;
         }  
         //numbers above month length
         else if (date > dateNumberArray[5]) { 
            dateNumberLabel = date - dateNumberArray[5];
            monthtype = 2;
         } 
         else {  
            dateNumberLabel = date;
            monthName = monthNamecurr;
            }      
         dayNumberArray.push(dateNumberLabel);
      }

      switch(monthtype){
         case 0: var monthName = monthNamecurr; break;
         case 1: var monthName = `${monthNamePre} - ${monthNamecurr}`;; break;
         case 2: var monthName = `${monthNamecurr} - ${monthNameNext}`; ; break;
      }
      
      const ordinal = `${dayNumberArray[0]}${newDate.oridinalSuffix(dayNumberArray[0])}`;  

      return [monthName,dayNames,dayNumberArray,dateNumberArray,ordinal];
   },

   ////////////// creates time array /////////////////////////////////////
   createTimeArray(start, end, duration) {   

         var x  = times.substring(0,2);
         var y  = times.substring(2,4);
         var z  = times.substring(4,6);
         var k2 = times.substring(6);    
      
      const timeArray = [];
      for(let i = start; i < end; i++){  // hours
         for(let j = 0; j < k2; j++){  // minutes
            switch(j){
            case 0: var k = '00'; break;    
            case 1: var k = x; break;
            case 2: var k = y; break;
            case 3: var k = z; break;
            }
            if (i < 10){
               var times = `0${i}${k}`;
            } else {
               var times = `${i}${k}`;
            }
            timeArray.push(times)                     
         } 

         if (end < 10){
            var times = `0${end}00`;
         } else {
            var times = `${end}00`;
         }
         timeArray.push(times)
      }  
      return timeArray;
   },
   
   // create a date in the format - Sunday January 5th 2025 - from the input 2025-01-05  
   dateTitle(date) {
      const dateInfo = date.split('-',3);
   
      const newDateTitle = new DateObject;
      const monthName = newDateTitle.monthNames[parseInt(dateInfo[1]-1)];
      const ordianlDayTitle = newDateTitle.oridinalSuffix(parseInt(dateInfo[2]));

      return `Sunday ${monthName} ${parseInt(dateInfo[2])}${ordianlDayTitle}, ${dateInfo[0]}`;   
   },

   // add ordinal suffixes to numbers
   oridinalSuffix(n){
      return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
   },

   // find if the number is odd
   isOdd(num) { 
      return num % 2;
   },

   //////////////////////////////   Utilities to save and retrive from local storage   ////////////////////////////////////
   getFromLocalStorage(localStorageArrayName) {
      return JSON.parse(localStorage.getItem(localStorageArrayName)) || [];   
   },

   saveToLocalStorage(localStorageArrayName, inputArray) {
      localStorage.setItem(localStorageArrayName, JSON.stringify(inputArray));
   }
}

Object.assign(window, window.Utils || {});