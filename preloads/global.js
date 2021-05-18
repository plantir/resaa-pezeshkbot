/** @type {import('lodash')} */
const _ = use("lodash");
const View = use("View");
const Drive = use("Drive");
const moment = use("moment-jalaali");
function persianDigit(number) {
  if (number || number === 0) {
    return number.toString().replace(/\d+/g, function (digit) {
      var enDigitArr = [],
        peDigitArr = [];
      for (var i = 0; i < digit.length; i++) {
        enDigitArr.push(digit.charCodeAt(i));
      }
      for (var j = 0; j < enDigitArr.length; j++) {
        peDigitArr.push(
          String.fromCharCode(
            enDigitArr[j] + (!!number && number === true ? 1584 : 1728)
          )
        );
      }
      return peDigitArr.join("");
    });
  } else {
    return number;
  }
}
function toCurrency(number, n, x, s, c) {
  n = n || 0;
  number = number || 0;
  number = number.toString();
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")";
  let formatted_number = number.replace(new RegExp(re, "g"), "$&" + (s || ","));
  return formatted_number;
}
function persianDate(value, format,inputFormat, locale) {
  let time = value;
  if (locale) {
    moment.locale(locale);
  }
  try {
    time = moment(value, inputFormat).format(format || "jYYYY/jM/jD");
  } catch (error) {}
  return time;
}
var numToPersian = (function() {
  /**
   *
   * @type {string}
   */
  spliter = ' و ';

  /**
   *
   * @type {string}
   */
  zero = 'صفر';

  /**
   *
   * @type {*[]}
   */
  Letters = [
    ['', 'یك', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    [
      'ده',
      'یازده',
      'دوازده',
      'سیزده',
      'چهارده',
      'پانزده',
      'شانزده',
      'هفده',
      'هجده',
      'نوزده',
      'بیست'
    ],
    ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    [
      '',
      'یكصد',
      'دویست',
      'سیصد',
      'چهارصد',
      'پانصد',
      'ششصد',
      'هفتصد',
      'هشتصد',
      'نهصد'
    ],
    [
      '',
      ' هزار ',
      ' میلیون ',
      ' میلیارد ',
      ' بیلیون ',
      ' بیلیارد ',
      ' تریلیون ',
      ' تریلیارد ',
      ' کوآدریلیون ',
      ' کادریلیارد ',
      ' کوینتیلیون ',
      ' کوانتینیارد ',
      ' سکستیلیون ',
      ' سکستیلیارد ',
      ' سپتیلیون ',
      ' سپتیلیارد ',
      ' اکتیلیون ',
      ' اکتیلیارد ',
      ' نانیلیون ',
      ' نانیلیارد ',
      ' دسیلیون ',
      ' دسیلیارد '
    ]
  ];

  /**
   * Clear number and split to 3th sections
   * @param {*} num
   */
  function PrepareNumber(num) {
    if (typeof num === 'number') {
      num = num.toString();
    }
    NumberLength = num.length % 3;
    if (NumberLength === 1) {
      num = '00' + num;
    } else if (NumberLength === 2) {
      num = '0' + num;
    }
    //Explode to array
    return num.replace(/\d{3}(?=\d)/g, '$&*').split('*');
  }

  /**
   * Convert 3 numbers into letter
   * @param {*} num
   */
  function ThreeNumbersToLetter(num) {
    //return zero
    if (parseInt(num) === 0) {
      return '';
    }
    parsedInt = parseInt(num);
    if (parsedInt < 10) {
      return Letters[0][parsedInt];
    }
    if (parsedInt <= 20) {
      return Letters[1][parsedInt - 10];
    }
    if (parsedInt < 100) {
      one = parsedInt % 10;
      ten = (parsedInt - one) / 10;
      if (one > 0) {
        return Letters[2][ten] + spliter + Letters[0][one];
      }
      return Letters[2][ten];
    }
    one = parsedInt % 10;
    hundreds = (parsedInt - (parsedInt % 100)) / 100;
    ten = (parsedInt - (hundreds * 100 + one)) / 10;
    out = [Letters[3][hundreds]];
    SecendPart = ten * 10 + one;
    if (SecendPart > 0) {
      if (SecendPart < 10) {
        out.push(Letters[0][SecendPart]);
      } else if (SecendPart <= 20) {
        out.push(Letters[1][SecendPart - 10]);
      } else {
        out.push(Letters[2][ten]);
        if (one > 0) {
          out.push(Letters[0][one]);
        }
      }
    }
    return out.join(spliter);
  }

  /**
   * Main function
   */
  return function(num) {
    //return zero
    if (parseInt(num) === 0) {
      return zero;
    }
    if (num.length > 66) {
      return 'خارج از محدوده';
    }
    //Split to sections
    SplitedNumber = PrepareNumber(num);

    //Fetch Sections and convert
    funcout = [];
    SplitLength = SplitedNumber.length;
    for (i = 0; i < SplitLength; i++) {
      SectionTitle = Letters[4][SplitLength - (i + 1)];
      converted = ThreeNumbersToLetter(SplitedNumber[i]);
      if (converted !== '') {
        funcout.push(converted + SectionTitle);
      }
    }
    return funcout.join(spliter);
  };
})();
View.global('numToPersian', numToPersian);
View.global("persianDigit", persianDigit);
View.global("currency", toCurrency);
View.global("sumBy", _.sumBy);
View.global("persianDate", persianDate);
View.global("convertToArray", (value) => {
  return Object.values(value);
});
