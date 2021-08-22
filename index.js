var inputdate = document.querySelector("#inputDate");
var btn = document.querySelector("#btncheck");
var output = document.querySelector("#output");
function reverseString(str) {
  var charList = str.split("");
  var reversedList = charList.reverse();
  var reversedString = reversedList.join("");
  //console.log("reverse",reversedString)
  return reversedString;
}
function checkPalindrome(value) {
  var reverse = reverseString(value);
  //console.log ("check plindrome",reverse,value)
  return value === reverse;
}

function getDateAsString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getAllDateFormate(date) {
  var datestr = getDateAsString(date);
  var ddmmyyyy = datestr.day + datestr.month + datestr.year;
  var mmddyyyy = datestr.month + datestr.day + datestr.year;
  var yyyyddmm = datestr.year + datestr.month + datestr.day;
  var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2);
  var mmddyy = datestr.month + datestr.day + datestr.year.slice(-2);
  var yyddmm = datestr.year.slice(-2) + datestr.month + datestr.day;
  return [ddmmyyyy, mmddyyyy, yyyyddmm, ddmmyy, mmddyy, yyddmm];
}
function checkPalindromeForAllDateFormate(date) {
  var listOfPalindrome = getAllDateFormate(date);
  var isPalindrome = false;
  for (var i = 0; i < listOfPalindrome.length; i++) {
    if (checkPalindrome(listOfPalindrome[i])) {
      console.log(listOfPalindrome[i]);
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return true;
  } else if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  var date = {
    day: day,
    month: month,
    year: year,
  };
  return date;
}
function getPreviousDate(date) {
  var day = date.day - 1;
  // console.log(day);
  var month = date.month;
  // console.log(month);
  var year = date.year;
  // console.log(year);
  var maxNoDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (date.month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month = date.month - 1;
      // console.log(month);
      day = maxNoDays[month];
      // console.log(day);
    }
  }
  if (month < 1) {
    month = 12;
    year = date.year - 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);
  while (1) {
    ctr++;
    var flag = checkPalindromeForAllDateFormate(nextDate);
    if (flag) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}
function getPreviousPalindromeDate(date) {
  var ctr = 0;
  var PreviousDate = getPreviousDate(date);
  while (1) {
    ctr++;
    var flag = checkPalindromeForAllDateFormate(PreviousDate);
    if (flag) {
      break;
    }
    PreviousDate = getPreviousDate(PreviousDate);
  }
  return [ctr, PreviousDate];
}

//var date = { day: 1, month: 1, year: 1999 };
//console.log(checkPalindromeForAllDateFormate(date));
//console.log(getAllDateFormate(date));
//console.log(getNextPalindromeDate(date));
//console.log(getPreviousPalindromeDate(date))
//console.log(checkPalindrome("aabbaad"))
//console.log(getPreviousDate(date));
function showMissedDays(date) {
  var future = getNextPalindromeDate(date);
  var past = getPreviousPalindromeDate(date);
  if (future[0] < past[0]) {
    return future;
  } else {
    return past;
  }
}
function clickHandler() {
  console.log("click", inputdate.value);
  bdayStr = inputdate.value;
  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    if (checkPalindromeForAllDateFormate(date)) {
      output.innerHTML = "🥳🎇✨🎊yaayyy your birthday is palindrome";
    } else {
      console.log(":(missed");
      console.log(showMissedDays(date));
      var [ctr, nextDate] = showMissedDays(date);
      output.innerText = `The palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!🎃`;
    }
  }
}
btn.addEventListener("click", clickHandler);
