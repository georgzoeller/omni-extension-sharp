var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../../../node_modules/jsonata/jsonata.js
var require_jsonata = __commonJS({
  "../../../../../node_modules/jsonata/jsonata.js"(exports, module) {
    (function(f2) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f2();
      } else if (typeof define === "function" && define.amd) {
        define([], f2);
      } else {
        var g2;
        if (typeof window !== "undefined") {
          g2 = window;
        } else if (typeof global !== "undefined") {
          g2 = global;
        } else if (typeof self !== "undefined") {
          g2 = self;
        } else {
          g2 = this;
        }
        g2.jsonata = f2();
      }
    })(function() {
      var define2, module2, exports2;
      return function() {
        function r2(e, n, t) {
          function o(i2, f2) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c2 = "function" == typeof __require && __require;
                if (!f2 && c2)
                  return c2(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p2 = n[i2] = { exports: {} };
              e[i2][0].call(p2.exports, function(r3) {
                var n2 = e[i2][1][r3];
                return o(n2 || r3);
              }, p2, p2.exports, r2, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r2;
      }()({ 1: [function(require2, module3, exports3) {
        const utils = require2("./utils");
        const dateTime = function() {
          "use strict";
          const stringToArray = utils.stringToArray;
          const few = [
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen"
          ];
          const ordinals = [
            "Zeroth",
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
            "Tenth",
            "Eleventh",
            "Twelfth",
            "Thirteenth",
            "Fourteenth",
            "Fifteenth",
            "Sixteenth",
            "Seventeenth",
            "Eighteenth",
            "Nineteenth"
          ];
          const decades = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety", "Hundred"];
          const magnitudes = ["Thousand", "Million", "Billion", "Trillion"];
          function numberToWords(value, ordinal) {
            var lookup = function(num, prev, ord) {
              var words2 = "";
              if (num <= 19) {
                words2 = (prev ? " and " : "") + (ord ? ordinals[num] : few[num]);
              } else if (num < 100) {
                const tens = Math.floor(num / 10);
                const remainder = num % 10;
                words2 = (prev ? " and " : "") + decades[tens - 2];
                if (remainder > 0) {
                  words2 += "-" + lookup(remainder, false, ord);
                } else if (ord) {
                  words2 = words2.substring(0, words2.length - 1) + "ieth";
                }
              } else if (num < 1e3) {
                const hundreds = Math.floor(num / 100);
                const remainder = num % 100;
                words2 = (prev ? ", " : "") + few[hundreds] + " Hundred";
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              } else {
                var mag = Math.floor(Math.log10(num) / 3);
                if (mag > magnitudes.length) {
                  mag = magnitudes.length;
                }
                const factor = Math.pow(10, mag * 3);
                const mant = Math.floor(num / factor);
                const remainder = num - mant * factor;
                words2 = (prev ? ", " : "") + lookup(mant, false, false) + " " + magnitudes[mag - 1];
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              }
              return words2;
            };
            var words = lookup(value, false, ordinal);
            return words;
          }
          const wordValues = {};
          few.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          ordinals.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          decades.forEach(function(word, index) {
            const lword = word.toLowerCase();
            wordValues[lword] = (index + 2) * 10;
            wordValues[lword.substring(0, word.length - 1) + "ieth"] = wordValues[lword];
          });
          wordValues.hundredth = 100;
          magnitudes.forEach(function(word, index) {
            const lword = word.toLowerCase();
            const val = Math.pow(10, (index + 1) * 3);
            wordValues[lword] = val;
            wordValues[lword + "th"] = val;
          });
          function wordsToNumber(text2) {
            const parts = text2.split(/,\s|\sand\s|[\s\\-]/);
            const values = parts.map((part) => wordValues[part]);
            let segs = [0];
            values.forEach((value) => {
              if (value < 100) {
                let top = segs.pop();
                if (top >= 1e3) {
                  segs.push(top);
                  top = 0;
                }
                segs.push(top + value);
              } else {
                segs.push(segs.pop() * value);
              }
            });
            const result = segs.reduce((a, b2) => a + b2, 0);
            return result;
          }
          const romanNumerals = [
            [1e3, "m"],
            [900, "cm"],
            [500, "d"],
            [400, "cd"],
            [100, "c"],
            [90, "xc"],
            [50, "l"],
            [40, "xl"],
            [10, "x"],
            [9, "ix"],
            [5, "v"],
            [4, "iv"],
            [1, "i"]
          ];
          const romanValues = { "M": 1e3, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 };
          function decimalToRoman(value) {
            for (var index = 0; index < romanNumerals.length; index++) {
              const numeral = romanNumerals[index];
              if (value >= numeral[0]) {
                return numeral[1] + decimalToRoman(value - numeral[0]);
              }
            }
            return "";
          }
          function romanToDecimal(roman) {
            var decimal = 0;
            var max = 1;
            for (var i = roman.length - 1; i >= 0; i--) {
              const digit = roman[i];
              const value = romanValues[digit];
              if (value < max) {
                decimal -= value;
              } else {
                max = value;
                decimal += value;
              }
            }
            return decimal;
          }
          function decimalToLetters(value, aChar) {
            var letters = [];
            var aCode = aChar.charCodeAt(0);
            while (value > 0) {
              letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
              value = Math.floor((value - 1) / 26);
            }
            return letters.join("");
          }
          function lettersToDecimal(letters, aChar) {
            var aCode = aChar.charCodeAt(0);
            var decimal = 0;
            for (var i = 0; i < letters.length; i++) {
              decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
            }
            return decimal;
          }
          function formatInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            value = Math.floor(value);
            const format = analyseIntegerPicture(picture);
            return _formatInteger(value, format);
          }
          const formats = {
            DECIMAL: "decimal",
            LETTERS: "letters",
            ROMAN: "roman",
            WORDS: "words",
            SEQUENCE: "sequence"
          };
          const tcase = {
            UPPER: "upper",
            LOWER: "lower",
            TITLE: "title"
          };
          function _formatInteger(value, format) {
            let formattedInteger;
            const negative = value < 0;
            value = Math.abs(value);
            switch (format.primary) {
              case formats.LETTERS:
                formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? "A" : "a");
                break;
              case formats.ROMAN:
                formattedInteger = decimalToRoman(value);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                }
                break;
              case formats.WORDS:
                formattedInteger = numberToWords(value, format.ordinal);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                } else if (format.case === tcase.LOWER) {
                  formattedInteger = formattedInteger.toLowerCase();
                }
                break;
              case formats.DECIMAL:
                formattedInteger = "" + value;
                var padLength = format.mandatoryDigits - formattedInteger.length;
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join("0");
                  formattedInteger = padding + formattedInteger;
                }
                if (format.zeroCode !== 48) {
                  formattedInteger = stringToArray(formattedInteger).map((code) => {
                    return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 48);
                  }).join("");
                }
                if (format.regular) {
                  const n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
                  for (let ii = n; ii > 0; ii--) {
                    const pos = formattedInteger.length - ii * format.groupingSeparators.position;
                    formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
                  }
                } else {
                  format.groupingSeparators.reverse().forEach((separator) => {
                    const pos = formattedInteger.length - separator.position;
                    formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
                  });
                }
                if (format.ordinal) {
                  var suffix123 = { "1": "st", "2": "nd", "3": "rd" };
                  var lastDigit = formattedInteger[formattedInteger.length - 1];
                  var suffix = suffix123[lastDigit];
                  if (!suffix || formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === "1") {
                    suffix = "th";
                  }
                  formattedInteger = formattedInteger + suffix;
                }
                break;
              case formats.SEQUENCE:
                throw {
                  code: "D3130",
                  value: format.token
                };
            }
            if (negative) {
              formattedInteger = "-" + formattedInteger;
            }
            return formattedInteger;
          }
          const decimalGroups = [48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296];
          function analyseIntegerPicture(picture) {
            const format = {
              type: "integer",
              primary: formats.DECIMAL,
              case: tcase.LOWER,
              ordinal: false
            };
            let primaryFormat, formatModifier;
            const semicolon = picture.lastIndexOf(";");
            if (semicolon === -1) {
              primaryFormat = picture;
            } else {
              primaryFormat = picture.substring(0, semicolon);
              formatModifier = picture.substring(semicolon + 1);
              if (formatModifier[0] === "o") {
                format.ordinal = true;
              }
            }
            switch (primaryFormat) {
              case "A":
                format.case = tcase.UPPER;
              case "a":
                format.primary = formats.LETTERS;
                break;
              case "I":
                format.case = tcase.UPPER;
              case "i":
                format.primary = formats.ROMAN;
                break;
              case "W":
                format.case = tcase.UPPER;
                format.primary = formats.WORDS;
                break;
              case "Ww":
                format.case = tcase.TITLE;
                format.primary = formats.WORDS;
                break;
              case "w":
                format.primary = formats.WORDS;
                break;
              default: {
                let zeroCode = null;
                let mandatoryDigits = 0;
                let optionalDigits = 0;
                let groupingSeparators = [];
                let separatorPosition = 0;
                const formatCodepoints = stringToArray(primaryFormat).map((c2) => c2.codePointAt(0)).reverse();
                formatCodepoints.forEach((codePoint) => {
                  let digit = false;
                  for (let ii = 0; ii < decimalGroups.length; ii++) {
                    const group = decimalGroups[ii];
                    if (codePoint >= group && codePoint <= group + 9) {
                      digit = true;
                      mandatoryDigits++;
                      separatorPosition++;
                      if (zeroCode === null) {
                        zeroCode = group;
                      } else if (group !== zeroCode) {
                        throw {
                          code: "D3131"
                        };
                      }
                      break;
                    }
                  }
                  if (!digit) {
                    if (codePoint === 35) {
                      separatorPosition++;
                      optionalDigits++;
                    } else {
                      groupingSeparators.push({
                        position: separatorPosition,
                        character: String.fromCodePoint(codePoint)
                      });
                    }
                  }
                });
                if (mandatoryDigits > 0) {
                  format.primary = formats.DECIMAL;
                  format.zeroCode = zeroCode;
                  format.mandatoryDigits = mandatoryDigits;
                  format.optionalDigits = optionalDigits;
                  const regularRepeat = function(separators) {
                    if (separators.length === 0) {
                      return 0;
                    }
                    const sepChar = separators[0].character;
                    for (let ii = 1; ii < separators.length; ii++) {
                      if (separators[ii].character !== sepChar) {
                        return 0;
                      }
                    }
                    const indexes = separators.map((separator) => separator.position);
                    const gcd = function(a, b2) {
                      return b2 === 0 ? a : gcd(b2, a % b2);
                    };
                    const factor = indexes.reduce(gcd);
                    for (let index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  const regular = regularRepeat(groupingSeparators);
                  if (regular > 0) {
                    format.regular = true;
                    format.groupingSeparators = {
                      position: regular,
                      character: groupingSeparators[0].character
                    };
                  } else {
                    format.regular = false;
                    format.groupingSeparators = groupingSeparators;
                  }
                } else {
                  format.primary = formats.SEQUENCE;
                  format.token = primaryFormat;
                }
              }
            }
            return format;
          }
          const defaultPresentationModifiers = {
            Y: "1",
            M: "1",
            D: "1",
            d: "1",
            F: "n",
            W: "1",
            w: "1",
            X: "1",
            x: "1",
            H: "1",
            h: "1",
            P: "n",
            m: "01",
            s: "01",
            f: "1",
            Z: "01:01",
            z: "01:01",
            C: "n",
            E: "n"
          };
          function analyseDateTimePicture(picture) {
            var spec = [];
            const format = {
              type: "datetime",
              parts: spec
            };
            const addLiteral = function(start2, end) {
              if (end > start2) {
                let literal = picture.substring(start2, end);
                literal = literal.split("]]").join("]");
                spec.push({ type: "literal", value: literal });
              }
            };
            var start = 0, pos = 0;
            while (pos < picture.length) {
              if (picture.charAt(pos) === "[") {
                if (picture.charAt(pos + 1) === "[") {
                  addLiteral(start, pos);
                  spec.push({ type: "literal", value: "[" });
                  pos += 2;
                  start = pos;
                  continue;
                }
                addLiteral(start, pos);
                start = pos;
                pos = picture.indexOf("]", start);
                if (pos === -1) {
                  throw {
                    code: "D3135"
                  };
                }
                let marker = picture.substring(start + 1, pos);
                marker = marker.split(/\s+/).join("");
                var def = {
                  type: "marker",
                  component: marker.charAt(0)
                  // 1. The component specifier is always present and is always a single letter.
                };
                var comma = marker.lastIndexOf(",");
                var presMod;
                if (comma !== -1) {
                  const widthMod = marker.substring(comma + 1);
                  const dash = widthMod.indexOf("-");
                  let min, max;
                  const parseWidth = function(wm) {
                    if (typeof wm === "undefined" || wm === "*") {
                      return void 0;
                    } else {
                      return parseInt(wm);
                    }
                  };
                  if (dash === -1) {
                    min = widthMod;
                  } else {
                    min = widthMod.substring(0, dash);
                    max = widthMod.substring(dash + 1);
                  }
                  const widthDef = {
                    min: parseWidth(min),
                    max: parseWidth(max)
                  };
                  def.width = widthDef;
                  presMod = marker.substring(1, comma);
                } else {
                  presMod = marker.substring(1);
                }
                if (presMod.length === 1) {
                  def.presentation1 = presMod;
                } else if (presMod.length > 1) {
                  var lastChar = presMod.charAt(presMod.length - 1);
                  if ("atco".indexOf(lastChar) !== -1) {
                    def.presentation2 = lastChar;
                    if (lastChar === "o") {
                      def.ordinal = true;
                    }
                    def.presentation1 = presMod.substring(0, presMod.length - 1);
                  } else {
                    def.presentation1 = presMod;
                  }
                } else {
                  def.presentation1 = defaultPresentationModifiers[def.component];
                }
                if (typeof def.presentation1 === "undefined") {
                  throw {
                    code: "D3132",
                    value: def.component
                  };
                }
                if (def.presentation1[0] === "n") {
                  def.names = tcase.LOWER;
                } else if (def.presentation1[0] === "N") {
                  if (def.presentation1[1] === "n") {
                    def.names = tcase.TITLE;
                  } else {
                    def.names = tcase.UPPER;
                  }
                } else if ("YMDdFWwXxHhmsf".indexOf(def.component) !== -1) {
                  var integerPattern = def.presentation1;
                  if (def.presentation2) {
                    integerPattern += ";" + def.presentation2;
                  }
                  def.integerFormat = analyseIntegerPicture(integerPattern);
                  if (def.width && def.width.min !== void 0) {
                    if (def.integerFormat.mandatoryDigits < def.width.min) {
                      def.integerFormat.mandatoryDigits = def.width.min;
                    }
                  }
                  if ("YMD".indexOf(def.component) !== -1) {
                    def.n = -1;
                    if (def.width && def.width.max !== void 0) {
                      def.n = def.width.max;
                      def.integerFormat.mandatoryDigits = def.n;
                    } else {
                      var w2 = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
                      if (w2 >= 2) {
                        def.n = w2;
                      }
                    }
                  }
                }
                if (def.component === "Z" || def.component === "z") {
                  def.integerFormat = analyseIntegerPicture(def.presentation1);
                }
                spec.push(def);
                start = pos + 1;
              }
              pos++;
            }
            addLiteral(start, pos);
            return format;
          }
          const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const millisInADay = 1e3 * 60 * 60 * 24;
          const startOfFirstWeek = function(ym) {
            const jan1 = Date.UTC(ym.year, ym.month);
            var dayOfJan1 = new Date(jan1).getUTCDay();
            if (dayOfJan1 === 0) {
              dayOfJan1 = 7;
            }
            return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
          };
          const yearMonth = function(year, month) {
            return {
              year,
              month,
              nextMonth: function() {
                return month === 11 ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
              },
              previousMonth: function() {
                return month === 0 ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
              },
              nextYear: function() {
                return yearMonth(year + 1, month);
              },
              previousYear: function() {
                return yearMonth(year - 1, month);
              }
            };
          };
          const deltaWeeks = function(start, end) {
            return (end - start) / (millisInADay * 7) + 1;
          };
          const getDateTimeFragment = (date, component) => {
            let componentValue;
            switch (component) {
              case "Y":
                componentValue = date.getUTCFullYear();
                break;
              case "M":
                componentValue = date.getUTCMonth() + 1;
                break;
              case "D":
                componentValue = date.getUTCDate();
                break;
              case "d": {
                const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                const firstJan = Date.UTC(date.getUTCFullYear(), 0);
                componentValue = (today - firstJan) / millisInADay + 1;
                break;
              }
              case "F":
                componentValue = date.getUTCDay();
                if (componentValue === 0) {
                  componentValue = 7;
                }
                break;
              case "W": {
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfWeek1 = startOfFirstWeek(thisYear);
                const today = Date.UTC(thisYear.year, date.getUTCMonth(), date.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 52) {
                  const startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
                  if (today >= startOfFollowingYear) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
                  week = deltaWeeks(startOfPreviousYear, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "w": {
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfWeek1 = startOfFirstWeek(thisMonth);
                const today = Date.UTC(thisMonth.year, thisMonth.month, date.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 4) {
                  const startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
                  if (today >= startOfFollowingMonth) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
                  week = deltaWeeks(startOfPreviousMonth, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "X": {
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfISOYear = startOfFirstWeek(thisYear);
                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
                const now = date.getTime();
                if (now < startOfISOYear) {
                  componentValue = thisYear.year - 1;
                } else if (now >= endOfISOYear) {
                  componentValue = thisYear.year + 1;
                } else {
                  componentValue = thisYear.year;
                }
                break;
              }
              case "x": {
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfISOMonth = startOfFirstWeek(thisMonth);
                const nextMonth = thisMonth.nextMonth();
                const endOfISOMonth = startOfFirstWeek(nextMonth);
                const now = date.getTime();
                if (now < startOfISOMonth) {
                  componentValue = thisMonth.previousMonth().month + 1;
                } else if (now >= endOfISOMonth) {
                  componentValue = nextMonth.month + 1;
                } else {
                  componentValue = thisMonth.month + 1;
                }
                break;
              }
              case "H":
                componentValue = date.getUTCHours();
                break;
              case "h":
                componentValue = date.getUTCHours();
                componentValue = componentValue % 12;
                if (componentValue === 0) {
                  componentValue = 12;
                }
                break;
              case "P":
                componentValue = date.getUTCHours() >= 12 ? "pm" : "am";
                break;
              case "m":
                componentValue = date.getUTCMinutes();
                break;
              case "s":
                componentValue = date.getUTCSeconds();
                break;
              case "f":
                componentValue = date.getUTCMilliseconds();
                break;
              case "Z":
              case "z":
                break;
              case "C":
                componentValue = "ISO";
                break;
              case "E":
                componentValue = "ISO";
                break;
            }
            return componentValue;
          };
          let iso8601Spec = null;
          function formatDateTime(millis, picture, timezone) {
            var offsetHours = 0;
            var offsetMinutes = 0;
            if (typeof timezone !== "undefined") {
              const offset = parseInt(timezone);
              offsetHours = Math.floor(offset / 100);
              offsetMinutes = offset % 100;
            }
            var formatComponent = function(date, markerSpec) {
              var componentValue = getDateTimeFragment(date, markerSpec.component);
              if ("YMDdFWwXxHhms".indexOf(markerSpec.component) !== -1) {
                if (markerSpec.component === "Y") {
                  if (markerSpec.n !== -1) {
                    componentValue = componentValue % Math.pow(10, markerSpec.n);
                  }
                }
                if (markerSpec.names) {
                  if (markerSpec.component === "M" || markerSpec.component === "x") {
                    componentValue = months[componentValue - 1];
                  } else if (markerSpec.component === "F") {
                    componentValue = days[componentValue];
                  } else {
                    throw {
                      code: "D3133",
                      value: markerSpec.component
                    };
                  }
                  if (markerSpec.names === tcase.UPPER) {
                    componentValue = componentValue.toUpperCase();
                  } else if (markerSpec.names === tcase.LOWER) {
                    componentValue = componentValue.toLowerCase();
                  }
                  if (markerSpec.width && componentValue.length > markerSpec.width.max) {
                    componentValue = componentValue.substring(0, markerSpec.width.max);
                  }
                } else {
                  componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
                }
              } else if (markerSpec.component === "f") {
                componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
              } else if (markerSpec.component === "Z" || markerSpec.component === "z") {
                const offset = offsetHours * 100 + offsetMinutes;
                if (markerSpec.integerFormat.regular) {
                  componentValue = _formatInteger(offset, markerSpec.integerFormat);
                } else {
                  const numDigits = markerSpec.integerFormat.mandatoryDigits;
                  if (numDigits === 1 || numDigits === 2) {
                    componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
                    if (offsetMinutes !== 0) {
                      componentValue += ":" + formatInteger(offsetMinutes, "00");
                    }
                  } else if (numDigits === 3 || numDigits === 4) {
                    componentValue = _formatInteger(offset, markerSpec.integerFormat);
                  } else {
                    throw {
                      code: "D3134",
                      value: numDigits
                    };
                  }
                }
                if (offset >= 0) {
                  componentValue = "+" + componentValue;
                }
                if (markerSpec.component === "z") {
                  componentValue = "GMT" + componentValue;
                }
                if (offset === 0 && markerSpec.presentation2 === "t") {
                  componentValue = "Z";
                }
              }
              return componentValue;
            };
            let formatSpec;
            if (typeof picture === "undefined") {
              if (iso8601Spec === null) {
                iso8601Spec = analyseDateTimePicture("[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001][Z01:01t]");
              }
              formatSpec = iso8601Spec;
            } else {
              formatSpec = analyseDateTimePicture(picture);
            }
            const offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1e3;
            const dateTime2 = new Date(millis + offsetMillis);
            let result = "";
            formatSpec.parts.forEach(function(part) {
              if (part.type === "literal") {
                result += part.value;
              } else {
                result += formatComponent(dateTime2, part);
              }
            });
            return result;
          }
          function generateRegex(formatSpec) {
            var matcher = {};
            if (formatSpec.type === "datetime") {
              matcher.type = "datetime";
              matcher.parts = formatSpec.parts.map(function(part) {
                var res = {};
                if (part.type === "literal") {
                  res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                } else if (part.component === "Z" || part.component === "z") {
                  let separator;
                  if (!Array.isArray(part.integerFormat.groupingSeparators)) {
                    separator = part.integerFormat.groupingSeparators;
                  }
                  res.regex = "";
                  if (part.component === "z") {
                    res.regex = "GMT";
                  }
                  res.regex += "[-+][0-9]+";
                  if (separator) {
                    res.regex += separator.character + "[0-9]+";
                  }
                  res.parse = function(value) {
                    if (part.component === "z") {
                      value = value.substring(3);
                    }
                    let offsetHours = 0, offsetMinutes = 0;
                    if (separator) {
                      offsetHours = Number.parseInt(value.substring(0, value.indexOf(separator.character)));
                      offsetMinutes = Number.parseInt(value.substring(value.indexOf(separator.character) + 1));
                    } else {
                      const numdigits = value.length - 1;
                      if (numdigits <= 2) {
                        offsetHours = Number.parseInt(value);
                      } else {
                        offsetHours = Number.parseInt(value.substring(0, 3));
                        offsetMinutes = Number.parseInt(value.substring(3));
                      }
                    }
                    return offsetHours * 60 + offsetMinutes;
                  };
                } else if (part.integerFormat) {
                  part.integerFormat.n = part.n;
                  res = generateRegex(part.integerFormat);
                } else {
                  res.regex = "[a-zA-Z]+";
                  var lookup = {};
                  if (part.component === "M" || part.component === "x") {
                    months.forEach(function(name, index) {
                      if (part.width && part.width.max) {
                        lookup[name.substring(0, part.width.max)] = index + 1;
                      } else {
                        lookup[name] = index + 1;
                      }
                    });
                  } else if (part.component === "F") {
                    days.forEach(function(name, index) {
                      if (index > 0) {
                        if (part.width && part.width.max) {
                          lookup[name.substring(0, part.width.max)] = index;
                        } else {
                          lookup[name] = index;
                        }
                      }
                    });
                  } else if (part.component === "P") {
                    lookup = { "am": 0, "AM": 0, "pm": 1, "PM": 1 };
                  } else {
                    throw {
                      code: "D3133",
                      value: part.component
                    };
                  }
                  res.parse = function(value) {
                    return lookup[value];
                  };
                }
                res.component = part.component;
                return res;
              });
            } else {
              matcher.type = "integer";
              const isUpper = formatSpec.case === tcase.UPPER;
              let occurrences;
              if (formatSpec.n && formatSpec.n > 0) {
                if (formatSpec.optionalDigits === 0) {
                  occurrences = `{${formatSpec.n}}`;
                } else {
                  occurrences = `{${formatSpec.n - formatSpec.optionalDigits},${formatSpec.n}}`;
                }
              } else {
                occurrences = "+";
              }
              switch (formatSpec.primary) {
                case formats.LETTERS:
                  matcher.regex = isUpper ? "[A-Z]+" : "[a-z]+";
                  matcher.parse = function(value) {
                    return lettersToDecimal(value, isUpper ? "A" : "a");
                  };
                  break;
                case formats.ROMAN:
                  matcher.regex = isUpper ? "[MDCLXVI]+" : "[mdclxvi]+";
                  matcher.parse = function(value) {
                    return romanToDecimal(isUpper ? value : value.toUpperCase());
                  };
                  break;
                case formats.WORDS:
                  matcher.regex = "(?:" + Object.keys(wordValues).concat("and", "[\\-, ]").join("|") + ")+";
                  matcher.parse = function(value) {
                    return wordsToNumber(value.toLowerCase());
                  };
                  break;
                case formats.DECIMAL:
                  matcher.regex = `[0-9]${occurrences}`;
                  if (formatSpec.ordinal) {
                    matcher.regex += "(?:th|st|nd|rd)";
                  }
                  matcher.parse = function(value) {
                    let digits = value;
                    if (formatSpec.ordinal) {
                      digits = value.substring(0, value.length - 2);
                    }
                    if (formatSpec.regular) {
                      digits = digits.split(",").join("");
                    } else {
                      formatSpec.groupingSeparators.forEach((sep2) => {
                        digits = digits.split(sep2.character).join("");
                      });
                    }
                    if (formatSpec.zeroCode !== 48) {
                      digits = digits.split("").map((char) => String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 48)).join("");
                    }
                    return parseInt(digits);
                  };
                  break;
                case formats.SEQUENCE:
                  throw {
                    code: "D3130",
                    value: formatSpec.token
                  };
              }
            }
            return matcher;
          }
          function parseInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            const formatSpec = analyseIntegerPicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const result = matchSpec.parse(value);
            return result;
          }
          function parseDateTime(timestamp, picture) {
            const formatSpec = analyseDateTimePicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const fullRegex = "^" + matchSpec.parts.map((part) => "(" + part.regex + ")").join("") + "$";
            const matcher = new RegExp(fullRegex, "i");
            var info = matcher.exec(timestamp);
            if (info !== null) {
              const dmA = 161;
              const dmB = 130;
              const dmC = 84;
              const dmD = 72;
              const tmA = 23;
              const tmB = 47;
              const components = {};
              for (let i = 1; i < info.length; i++) {
                const mpart = matchSpec.parts[i - 1];
                if (mpart.parse) {
                  components[mpart.component] = mpart.parse(info[i]);
                }
              }
              if (Object.getOwnPropertyNames(components).length === 0) {
                return void 0;
              }
              let mask = 0;
              const shift = (bit) => {
                mask <<= 1;
                mask += bit ? 1 : 0;
              };
              const isType = (type) => {
                return !(~type & mask) && !!(type & mask);
              };
              "YXMxWwdD".split("").forEach((part) => shift(components[part]));
              const dateA = isType(dmA);
              const dateB = !dateA && isType(dmB);
              const dateC = isType(dmC);
              const dateD = !dateC && isType(dmD);
              mask = 0;
              "PHhmsf".split("").forEach((part) => shift(components[part]));
              const timeA = isType(tmA);
              const timeB = !timeA && isType(tmB);
              const dateComps = dateB ? "YD" : dateC ? "XxwF" : dateD ? "XWF" : "YMD";
              const timeComps = timeB ? "Phmsf" : "Hmsf";
              const comps = dateComps + timeComps;
              const now = this.environment.timestamp;
              let startSpecified = false;
              let endSpecified = false;
              comps.split("").forEach((part) => {
                if (typeof components[part] === "undefined") {
                  if (startSpecified) {
                    components[part] = "MDd".indexOf(part) !== -1 ? 1 : 0;
                    endSpecified = true;
                  } else {
                    components[part] = getDateTimeFragment(now, part);
                  }
                } else {
                  startSpecified = true;
                  if (endSpecified) {
                    throw {
                      code: "D3136"
                    };
                  }
                }
              });
              if (components.M > 0) {
                components.M -= 1;
              } else {
                components.M = 0;
              }
              if (dateB) {
                const firstJan = Date.UTC(components.Y, 0);
                const offsetMillis = (components.d - 1) * 1e3 * 60 * 60 * 24;
                const derivedDate = new Date(firstJan + offsetMillis);
                components.M = derivedDate.getUTCMonth();
                components.D = derivedDate.getUTCDate();
              }
              if (dateC) {
                throw {
                  code: "D3136"
                };
              }
              if (dateD) {
                throw {
                  code: "D3136"
                };
              }
              if (timeB) {
                components.H = components.h === 12 ? 0 : components.h;
                if (components.P === 1) {
                  components.H += 12;
                }
              }
              var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
              if (components.Z || components.z) {
                millis -= (components.Z || components.z) * 60 * 1e3;
              }
              return millis;
            }
          }
          var iso8601regex = new RegExp("^\\d{4}(-[01]\\d)*(-[0-3]\\d)*(T[0-2]\\d:[0-5]\\d:[0-5]\\d)*(\\.\\d+)?([+-][0-2]\\d:?[0-5]\\d|Z)?$");
          function toMillis(timestamp, picture) {
            if (typeof timestamp === "undefined") {
              return void 0;
            }
            if (typeof picture === "undefined") {
              if (!iso8601regex.test(timestamp)) {
                throw {
                  stack: new Error().stack,
                  code: "D3110",
                  value: timestamp
                };
              }
              return Date.parse(timestamp);
            } else {
              return parseDateTime.call(this, timestamp, picture);
            }
          }
          function fromMillis(millis, picture, timezone) {
            if (typeof millis === "undefined") {
              return void 0;
            }
            return formatDateTime.call(this, millis, picture, timezone);
          }
          return {
            formatInteger,
            parseInteger,
            fromMillis,
            toMillis
          };
        }();
        module3.exports = dateTime;
      }, { "./utils": 6 }], 2: [function(require2, module3, exports3) {
        (function(global2) {
          (function() {
            var utils = require2("./utils");
            const functions = (() => {
              "use strict";
              var isNumeric = utils.isNumeric;
              var isArrayOfStrings = utils.isArrayOfStrings;
              var isArrayOfNumbers = utils.isArrayOfNumbers;
              var createSequence = utils.createSequence;
              var isSequence = utils.isSequence;
              var isFunction = utils.isFunction;
              var isLambda = utils.isLambda;
              var isPromise = utils.isPromise;
              var getFunctionArity = utils.getFunctionArity;
              var deepEquals = utils.isDeepEqual;
              var stringToArray = utils.stringToArray;
              function sum(args) {
                if (typeof args === "undefined") {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total;
              }
              function count(args) {
                if (typeof args === "undefined") {
                  return 0;
                }
                return args.length;
              }
              function max(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.max.apply(Math, args);
              }
              function min(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.min.apply(Math, args);
              }
              function average(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total / args.length;
              }
              function string(arg, prettify = false) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var str;
                if (typeof arg === "string") {
                  str = arg;
                } else if (isFunction(arg)) {
                  str = "";
                } else if (typeof arg === "number" && !isFinite(arg)) {
                  throw {
                    code: "D3001",
                    value: arg,
                    stack: new Error().stack
                  };
                } else {
                  var space = prettify ? 2 : 0;
                  if (Array.isArray(arg) && arg.outerWrapper) {
                    arg = arg[0];
                  }
                  str = JSON.stringify(arg, function(key, val) {
                    return typeof val !== "undefined" && val !== null && val.toPrecision && isNumeric(val) ? Number(val.toPrecision(15)) : val && isFunction(val) ? "" : val;
                  }, space);
                }
                return str;
              }
              function substring(str, start, length2) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var strArray = stringToArray(str);
                var strLength = strArray.length;
                if (strLength + start < 0) {
                  start = 0;
                }
                if (typeof length2 !== "undefined") {
                  if (length2 <= 0) {
                    return "";
                  }
                  var end = start >= 0 ? start + length2 : strLength + start + length2;
                  return strArray.slice(start, end).join("");
                }
                return strArray.slice(start).join("");
              }
              function substringBefore(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(0, pos);
                } else {
                  return str;
                }
              }
              function substringAfter(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(pos + chars.length);
                } else {
                  return str;
                }
              }
              function lowercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toLowerCase();
              }
              function uppercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toUpperCase();
              }
              function length(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return stringToArray(str).length;
              }
              function trim(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result = str.replace(/[ \t\n\r]+/gm, " ");
                if (result.charAt(0) === " ") {
                  result = result.substring(1);
                }
                if (result.charAt(result.length - 1) === " ") {
                  result = result.substring(0, result.length - 1);
                }
                return result;
              }
              function pad(str, width, char) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (typeof char === "undefined" || char.length === 0) {
                  char = " ";
                }
                var result;
                var padLength = Math.abs(width) - length(str);
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join(char);
                  if (char.length > 1) {
                    padding = substring(padding, 0, padLength);
                  }
                  if (width > 0) {
                    result = str + padding;
                  } else {
                    result = padding + str;
                  }
                } else {
                  result = str;
                }
                return result;
              }
              async function evaluateMatcher(matcher, str) {
                var result = matcher.apply(this, [str]);
                if (isPromise(result)) {
                  result = await result;
                }
                if (result && !(typeof result.start === "number" || result.end === "number" || Array.isArray(result.groups) || isFunction(result.next))) {
                  throw {
                    code: "T1010",
                    stack: new Error().stack
                  };
                }
                return result;
              }
              async function contains(str, token) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result;
                if (typeof token === "string") {
                  result = str.indexOf(token) !== -1;
                } else {
                  var matches = await evaluateMatcher(token, str);
                  result = typeof matches !== "undefined";
                }
                return result;
              }
              async function match(str, regex2, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    stack: new Error().stack,
                    value: limit,
                    code: "D3040",
                    index: 3
                  };
                }
                var result = createSequence();
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  var matches = await evaluateMatcher(regex2, str);
                  if (typeof matches !== "undefined") {
                    while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                      result.push({
                        match: matches.match,
                        index: matches.start,
                        groups: matches.groups
                      });
                      matches = await evaluateMatcher(matches.next);
                      count2++;
                    }
                  }
                }
                return result;
              }
              async function replace(str, pattern, replacement, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var self2 = this;
                if (pattern === "") {
                  throw {
                    code: "D3010",
                    stack: new Error().stack,
                    value: pattern,
                    index: 2
                  };
                }
                if (limit < 0) {
                  throw {
                    code: "D3011",
                    stack: new Error().stack,
                    value: limit,
                    index: 4
                  };
                }
                var replacer;
                if (typeof replacement === "string") {
                  replacer = function(regexMatch) {
                    var substitute = "";
                    var position2 = 0;
                    var index2 = replacement.indexOf("$", position2);
                    while (index2 !== -1 && position2 < replacement.length) {
                      substitute += replacement.substring(position2, index2);
                      position2 = index2 + 1;
                      var dollarVal = replacement.charAt(position2);
                      if (dollarVal === "$") {
                        substitute += "$";
                        position2++;
                      } else if (dollarVal === "0") {
                        substitute += regexMatch.match;
                        position2++;
                      } else {
                        var maxDigits;
                        if (regexMatch.groups.length === 0) {
                          maxDigits = 1;
                        } else {
                          maxDigits = Math.floor(Math.log(regexMatch.groups.length) * Math.LOG10E) + 1;
                        }
                        index2 = parseInt(replacement.substring(position2, position2 + maxDigits), 10);
                        if (maxDigits > 1 && index2 > regexMatch.groups.length) {
                          index2 = parseInt(replacement.substring(position2, position2 + maxDigits - 1), 10);
                        }
                        if (!isNaN(index2)) {
                          if (regexMatch.groups.length > 0) {
                            var submatch = regexMatch.groups[index2 - 1];
                            if (typeof submatch !== "undefined") {
                              substitute += submatch;
                            }
                          }
                          position2 += index2.toString().length;
                        } else {
                          substitute += "$";
                        }
                      }
                      index2 = replacement.indexOf("$", position2);
                    }
                    substitute += replacement.substring(position2);
                    return substitute;
                  };
                } else {
                  replacer = replacement;
                }
                var result = "";
                var position = 0;
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  if (typeof pattern === "string") {
                    var index = str.indexOf(pattern, position);
                    while (index !== -1 && (typeof limit === "undefined" || count2 < limit)) {
                      result += str.substring(position, index);
                      result += replacement;
                      position = index + pattern.length;
                      count2++;
                      index = str.indexOf(pattern, position);
                    }
                    result += str.substring(position);
                  } else {
                    var matches = await evaluateMatcher(pattern, str);
                    if (typeof matches !== "undefined") {
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result += str.substring(position, matches.start);
                        var replacedWith = replacer.apply(self2, [matches]);
                        if (isPromise(replacedWith)) {
                          replacedWith = await replacedWith;
                        }
                        if (typeof replacedWith === "string") {
                          result += replacedWith;
                        } else {
                          throw {
                            code: "D3012",
                            stack: new Error().stack,
                            value: replacedWith
                          };
                        }
                        position = matches.start + matches.match.length;
                        count2++;
                        matches = await evaluateMatcher(matches.next);
                      }
                      result += str.substring(position);
                    } else {
                      result = str;
                    }
                  }
                } else {
                  result = str;
                }
                return result;
              }
              function base64encode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var btoa = typeof window !== "undefined" ? (
                  /* istanbul ignore next */
                  window.btoa
                ) : function(str2) {
                  return new global2.Buffer.from(str2, "binary").toString("base64");
                };
                return btoa(str);
              }
              function base64decode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var atob = typeof window !== "undefined" ? (
                  /* istanbul ignore next */
                  window.atob
                ) : function(str2) {
                  return new global2.Buffer.from(str2, "base64").toString("binary");
                };
                return atob(str);
              }
              function encodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function encodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrl"
                  };
                }
                return returnVal;
              }
              function decodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function decodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrl"
                  };
                }
                return returnVal;
              }
              async function split(str, separator, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    code: "D3020",
                    stack: new Error().stack,
                    value: limit,
                    index: 3
                  };
                }
                var result = [];
                if (typeof limit === "undefined" || limit > 0) {
                  if (typeof separator === "string") {
                    result = str.split(separator, limit);
                  } else {
                    var count2 = 0;
                    var matches = await evaluateMatcher(separator, str);
                    if (typeof matches !== "undefined") {
                      var start = 0;
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result.push(str.substring(start, matches.start));
                        start = matches.end;
                        matches = await evaluateMatcher(matches.next);
                        count2++;
                      }
                      if (typeof limit === "undefined" || count2 < limit) {
                        result.push(str.substring(start));
                      }
                    } else {
                      result.push(str);
                    }
                  }
                }
                return result;
              }
              function join(strs, separator) {
                if (typeof strs === "undefined") {
                  return void 0;
                }
                if (typeof separator === "undefined") {
                  separator = "";
                }
                return strs.join(separator);
              }
              function formatNumber(value, picture, options2) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                var defaults = {
                  "decimal-separator": ".",
                  "grouping-separator": ",",
                  "exponent-separator": "e",
                  "infinity": "Infinity",
                  "minus-sign": "-",
                  "NaN": "NaN",
                  "percent": "%",
                  "per-mille": "\u2030",
                  "zero-digit": "0",
                  "digit": "#",
                  "pattern-separator": ";"
                };
                var properties = defaults;
                if (typeof options2 !== "undefined") {
                  Object.keys(options2).forEach(function(key) {
                    properties[key] = options2[key];
                  });
                }
                var decimalDigitFamily = [];
                var zeroCharCode = properties["zero-digit"].charCodeAt(0);
                for (var ii = zeroCharCode; ii < zeroCharCode + 10; ii++) {
                  decimalDigitFamily.push(String.fromCharCode(ii));
                }
                var activeChars = decimalDigitFamily.concat([properties["decimal-separator"], properties["exponent-separator"], properties["grouping-separator"], properties.digit, properties["pattern-separator"]]);
                var subPictures = picture.split(properties["pattern-separator"]);
                if (subPictures.length > 2) {
                  throw {
                    code: "D3080",
                    stack: new Error().stack
                  };
                }
                var splitParts = function(subpicture) {
                  var prefix = function() {
                    var ch;
                    for (var ii2 = 0; ii2 < subpicture.length; ii2++) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(0, ii2);
                      }
                    }
                  }();
                  var suffix = function() {
                    var ch;
                    for (var ii2 = subpicture.length - 1; ii2 >= 0; ii2--) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(ii2 + 1);
                      }
                    }
                  }();
                  var activePart = subpicture.substring(prefix.length, subpicture.length - suffix.length);
                  var mantissaPart, exponentPart, integerPart, fractionalPart;
                  var exponentPosition = subpicture.indexOf(properties["exponent-separator"], prefix.length);
                  if (exponentPosition === -1 || exponentPosition > subpicture.length - suffix.length) {
                    mantissaPart = activePart;
                    exponentPart = void 0;
                  } else {
                    mantissaPart = activePart.substring(0, exponentPosition);
                    exponentPart = activePart.substring(exponentPosition + 1);
                  }
                  var decimalPosition = mantissaPart.indexOf(properties["decimal-separator"]);
                  if (decimalPosition === -1) {
                    integerPart = mantissaPart;
                    fractionalPart = suffix;
                  } else {
                    integerPart = mantissaPart.substring(0, decimalPosition);
                    fractionalPart = mantissaPart.substring(decimalPosition + 1);
                  }
                  return {
                    prefix,
                    suffix,
                    activePart,
                    mantissaPart,
                    exponentPart,
                    integerPart,
                    fractionalPart,
                    subpicture
                  };
                };
                var validate = function(parts2) {
                  var error2;
                  var ii2;
                  var subpicture = parts2.subpicture;
                  var decimalPos2 = subpicture.indexOf(properties["decimal-separator"]);
                  if (decimalPos2 !== subpicture.lastIndexOf(properties["decimal-separator"])) {
                    error2 = "D3081";
                  }
                  if (subpicture.indexOf(properties.percent) !== subpicture.lastIndexOf(properties.percent)) {
                    error2 = "D3082";
                  }
                  if (subpicture.indexOf(properties["per-mille"]) !== subpicture.lastIndexOf(properties["per-mille"])) {
                    error2 = "D3083";
                  }
                  if (subpicture.indexOf(properties.percent) !== -1 && subpicture.indexOf(properties["per-mille"]) !== -1) {
                    error2 = "D3084";
                  }
                  var valid = false;
                  for (ii2 = 0; ii2 < parts2.mantissaPart.length; ii2++) {
                    var ch = parts2.mantissaPart.charAt(ii2);
                    if (decimalDigitFamily.indexOf(ch) !== -1 || ch === properties.digit) {
                      valid = true;
                      break;
                    }
                  }
                  if (!valid) {
                    error2 = "D3085";
                  }
                  var charTypes = parts2.activePart.split("").map(function(char) {
                    return activeChars.indexOf(char) === -1 ? "p" : "a";
                  }).join("");
                  if (charTypes.indexOf("p") !== -1) {
                    error2 = "D3086";
                  }
                  if (decimalPos2 !== -1) {
                    if (subpicture.charAt(decimalPos2 - 1) === properties["grouping-separator"] || subpicture.charAt(decimalPos2 + 1) === properties["grouping-separator"]) {
                      error2 = "D3087";
                    }
                  } else if (parts2.integerPart.charAt(parts2.integerPart.length - 1) === properties["grouping-separator"]) {
                    error2 = "D3088";
                  }
                  if (subpicture.indexOf(properties["grouping-separator"] + properties["grouping-separator"]) !== -1) {
                    error2 = "D3089";
                  }
                  var optionalDigitPos = parts2.integerPart.indexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.integerPart.substring(0, optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3090";
                  }
                  optionalDigitPos = parts2.fractionalPart.lastIndexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.fractionalPart.substring(optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3091";
                  }
                  var exponentExists = typeof parts2.exponentPart === "string";
                  if (exponentExists && parts2.exponentPart.length > 0 && (subpicture.indexOf(properties.percent) !== -1 || subpicture.indexOf(properties["per-mille"]) !== -1)) {
                    error2 = "D3092";
                  }
                  if (exponentExists && (parts2.exponentPart.length === 0 || parts2.exponentPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) === -1;
                  }).length > 0)) {
                    error2 = "D3093";
                  }
                  if (error2) {
                    throw {
                      code: error2,
                      stack: new Error().stack
                    };
                  }
                };
                var analyse = function(parts2) {
                  var getGroupingPositions = function(part, toLeft) {
                    var positions = [];
                    var groupingPosition = part.indexOf(properties["grouping-separator"]);
                    while (groupingPosition !== -1) {
                      var charsToTheRight = (toLeft ? part.substring(0, groupingPosition) : part.substring(groupingPosition)).split("").filter(function(char) {
                        return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                      }).length;
                      positions.push(charsToTheRight);
                      groupingPosition = parts2.integerPart.indexOf(properties["grouping-separator"], groupingPosition + 1);
                    }
                    return positions;
                  };
                  var integerPartGroupingPositions = getGroupingPositions(parts2.integerPart);
                  var regular = function(indexes) {
                    if (indexes.length === 0) {
                      return 0;
                    }
                    var gcd = function(a, b2) {
                      return b2 === 0 ? a : gcd(b2, a % b2);
                    };
                    var factor = indexes.reduce(gcd);
                    for (var index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  var regularGrouping = regular(integerPartGroupingPositions);
                  var fractionalPartGroupingPositions = getGroupingPositions(parts2.fractionalPart, true);
                  var minimumIntegerPartSize = parts2.integerPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var scalingFactor = minimumIntegerPartSize;
                  var fractionalPartArray = parts2.fractionalPart.split("");
                  var minimumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var maximumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                  }).length;
                  var exponentPresent = typeof parts2.exponentPart === "string";
                  if (minimumIntegerPartSize === 0 && maximumFactionalPartSize === 0) {
                    if (exponentPresent) {
                      minimumFactionalPartSize = 1;
                      maximumFactionalPartSize = 1;
                    } else {
                      minimumIntegerPartSize = 1;
                    }
                  }
                  if (exponentPresent && minimumIntegerPartSize === 0 && parts2.integerPart.indexOf(properties.digit) !== -1) {
                    minimumIntegerPartSize = 1;
                  }
                  if (minimumIntegerPartSize === 0 && minimumFactionalPartSize === 0) {
                    minimumFactionalPartSize = 1;
                  }
                  var minimumExponentSize = 0;
                  if (exponentPresent) {
                    minimumExponentSize = parts2.exponentPart.split("").filter(function(char) {
                      return decimalDigitFamily.indexOf(char) !== -1;
                    }).length;
                  }
                  return {
                    integerPartGroupingPositions,
                    regularGrouping,
                    minimumIntegerPartSize,
                    scalingFactor,
                    prefix: parts2.prefix,
                    fractionalPartGroupingPositions,
                    minimumFactionalPartSize,
                    maximumFactionalPartSize,
                    minimumExponentSize,
                    suffix: parts2.suffix,
                    picture: parts2.subpicture
                  };
                };
                var parts = subPictures.map(splitParts);
                parts.forEach(validate);
                var variables = parts.map(analyse);
                var minus_sign = properties["minus-sign"];
                var zero_digit = properties["zero-digit"];
                var decimal_separator = properties["decimal-separator"];
                var grouping_separator = properties["grouping-separator"];
                if (variables.length === 1) {
                  variables.push(JSON.parse(JSON.stringify(variables[0])));
                  variables[1].prefix = minus_sign + variables[1].prefix;
                }
                var pic;
                if (value >= 0) {
                  pic = variables[0];
                } else {
                  pic = variables[1];
                }
                var adjustedNumber;
                if (pic.picture.indexOf(properties.percent) !== -1) {
                  adjustedNumber = value * 100;
                } else if (pic.picture.indexOf(properties["per-mille"]) !== -1) {
                  adjustedNumber = value * 1e3;
                } else {
                  adjustedNumber = value;
                }
                var mantissa, exponent;
                if (pic.minimumExponentSize === 0) {
                  mantissa = adjustedNumber;
                } else {
                  var maxMantissa = Math.pow(10, pic.scalingFactor);
                  var minMantissa = Math.pow(10, pic.scalingFactor - 1);
                  mantissa = adjustedNumber;
                  exponent = 0;
                  while (mantissa < minMantissa) {
                    mantissa *= 10;
                    exponent -= 1;
                  }
                  while (mantissa > maxMantissa) {
                    mantissa /= 10;
                    exponent += 1;
                  }
                }
                var roundedNumber = round(mantissa, pic.maximumFactionalPartSize);
                var makeString = function(value2, dp) {
                  var str = Math.abs(value2).toFixed(dp);
                  if (zero_digit !== "0") {
                    str = str.split("").map(function(digit) {
                      if (digit >= "0" && digit <= "9") {
                        return decimalDigitFamily[digit.charCodeAt(0) - 48];
                      } else {
                        return digit;
                      }
                    }).join("");
                  }
                  return str;
                };
                var stringValue = makeString(roundedNumber, pic.maximumFactionalPartSize);
                var decimalPos = stringValue.indexOf(".");
                if (decimalPos === -1) {
                  stringValue = stringValue + decimal_separator;
                } else {
                  stringValue = stringValue.replace(".", decimal_separator);
                }
                while (stringValue.charAt(0) === zero_digit) {
                  stringValue = stringValue.substring(1);
                }
                while (stringValue.charAt(stringValue.length - 1) === zero_digit) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                var padLeft = pic.minimumIntegerPartSize - decimalPos;
                var padRight = pic.minimumFactionalPartSize - (stringValue.length - decimalPos - 1);
                stringValue = (padLeft > 0 ? new Array(padLeft + 1).join(zero_digit) : "") + stringValue;
                stringValue = stringValue + (padRight > 0 ? new Array(padRight + 1).join(zero_digit) : "");
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.regularGrouping > 0) {
                  var groupCount = Math.floor((decimalPos - 1) / pic.regularGrouping);
                  for (var group = 1; group <= groupCount; group++) {
                    stringValue = [stringValue.slice(0, decimalPos - group * pic.regularGrouping), grouping_separator, stringValue.slice(decimalPos - group * pic.regularGrouping)].join("");
                  }
                } else {
                  pic.integerPartGroupingPositions.forEach(function(pos) {
                    stringValue = [stringValue.slice(0, decimalPos - pos), grouping_separator, stringValue.slice(decimalPos - pos)].join("");
                    decimalPos++;
                  });
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                pic.fractionalPartGroupingPositions.forEach(function(pos) {
                  stringValue = [stringValue.slice(0, pos + decimalPos + 1), grouping_separator, stringValue.slice(pos + decimalPos + 1)].join("");
                });
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.picture.indexOf(decimal_separator) === -1 || decimalPos === stringValue.length - 1) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                if (typeof exponent !== "undefined") {
                  var stringExponent = makeString(exponent, 0);
                  padLeft = pic.minimumExponentSize - stringExponent.length;
                  if (padLeft > 0) {
                    stringExponent = new Array(padLeft + 1).join(zero_digit) + stringExponent;
                  }
                  stringValue = stringValue + properties["exponent-separator"] + (exponent < 0 ? minus_sign : "") + stringExponent;
                }
                stringValue = pic.prefix + stringValue + pic.suffix;
                return stringValue;
              }
              function formatBase(value, radix) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                value = round(value);
                if (typeof radix === "undefined") {
                  radix = 10;
                } else {
                  radix = round(radix);
                }
                if (radix < 2 || radix > 36) {
                  throw {
                    code: "D3100",
                    stack: new Error().stack,
                    value: radix
                  };
                }
                var result = value.toString(radix);
                return result;
              }
              function number(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (typeof arg === "number") {
                  result = arg;
                } else if (typeof arg === "string" && /^-?[0-9]+(\.[0-9]+)?([Ee][-+]?[0-9]+)?$/.test(arg) && !isNaN(parseFloat(arg)) && isFinite(arg)) {
                  result = parseFloat(arg);
                } else if (typeof arg === "string" && /^(0[xX][0-9A-Fa-f]+)|(0[oO][0-7]+)|(0[bB][0-1]+)$/.test(arg)) {
                  result = Number(arg);
                } else if (arg === true) {
                  result = 1;
                } else if (arg === false) {
                  result = 0;
                } else {
                  throw {
                    code: "D3030",
                    value: arg,
                    stack: new Error().stack,
                    index: 1
                  };
                }
                return result;
              }
              function abs(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.abs(arg);
                return result;
              }
              function floor(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.floor(arg);
                return result;
              }
              function ceil(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.ceil(arg);
                return result;
              }
              function round(arg, precision) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (precision) {
                  var value = arg.toString().split("e");
                  arg = +(value[0] + "e" + (value[1] ? +value[1] + precision : precision));
                }
                result = Math.round(arg);
                var diff = result - arg;
                if (Math.abs(diff) === 0.5 && Math.abs(result % 2) === 1) {
                  result = result - 1;
                }
                if (precision) {
                  value = result.toString().split("e");
                  result = +(value[0] + "e" + (value[1] ? +value[1] - precision : -precision));
                }
                if (Object.is(result, -0)) {
                  result = 0;
                }
                return result;
              }
              function sqrt(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (arg < 0) {
                  throw {
                    stack: new Error().stack,
                    code: "D3060",
                    index: 1,
                    value: arg
                  };
                }
                result = Math.sqrt(arg);
                return result;
              }
              function power(arg, exp) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.pow(arg, exp);
                if (!isFinite(result)) {
                  throw {
                    stack: new Error().stack,
                    code: "D3061",
                    index: 1,
                    value: arg,
                    exp
                  };
                }
                return result;
              }
              function random() {
                return Math.random();
              }
              function boolean(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = false;
                if (Array.isArray(arg)) {
                  if (arg.length === 1) {
                    result = boolean(arg[0]);
                  } else if (arg.length > 1) {
                    var trues = arg.filter(function(val) {
                      return boolean(val);
                    });
                    result = trues.length > 0;
                  }
                } else if (typeof arg === "string") {
                  if (arg.length > 0) {
                    result = true;
                  }
                } else if (isNumeric(arg)) {
                  if (arg !== 0) {
                    result = true;
                  }
                } else if (arg !== null && typeof arg === "object") {
                  if (Object.keys(arg).length > 0) {
                    result = true;
                  }
                } else if (typeof arg === "boolean" && arg === true) {
                  result = true;
                }
                return result;
              }
              function not(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                return !boolean(arg);
              }
              function hofFuncArgs(func, arg1, arg2, arg3) {
                var func_args = [arg1];
                var length2 = getFunctionArity(func);
                if (length2 >= 2) {
                  func_args.push(arg2);
                }
                if (length2 >= 3) {
                  func_args.push(arg3);
                }
                return func_args;
              }
              async function map(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var func_args = hofFuncArgs(func, arr[i], i, arr);
                  var res = await func.apply(this, func_args);
                  if (typeof res !== "undefined") {
                    result.push(res);
                  }
                }
                return result;
              }
              async function filter(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var func_args = hofFuncArgs(func, entry, i, arr);
                  var res = await func.apply(this, func_args);
                  if (boolean(res)) {
                    result.push(entry);
                  }
                }
                return result;
              }
              async function single(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var hasFoundMatch = false;
                var result;
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var positiveResult = true;
                  if (typeof func !== "undefined") {
                    var func_args = hofFuncArgs(func, entry, i, arr);
                    var res = await func.apply(this, func_args);
                    positiveResult = boolean(res);
                  }
                  if (positiveResult) {
                    if (!hasFoundMatch) {
                      result = entry;
                      hasFoundMatch = true;
                    } else {
                      throw {
                        stack: new Error().stack,
                        code: "D3138",
                        index: i
                      };
                    }
                  }
                }
                if (!hasFoundMatch) {
                  throw {
                    stack: new Error().stack,
                    code: "D3139"
                  };
                }
                return result;
              }
              function zip() {
                var result = [];
                var args = Array.prototype.slice.call(arguments);
                var length2 = Math.min.apply(Math, args.map(function(arg) {
                  if (Array.isArray(arg)) {
                    return arg.length;
                  }
                  return 0;
                }));
                for (var i = 0; i < length2; i++) {
                  var tuple = args.map((arg) => {
                    return arg[i];
                  });
                  result.push(tuple);
                }
                return result;
              }
              async function foldLeft(sequence, func, init2) {
                if (typeof sequence === "undefined") {
                  return void 0;
                }
                var result;
                var arity = getFunctionArity(func);
                if (arity < 2) {
                  throw {
                    stack: new Error().stack,
                    code: "D3050",
                    index: 1
                  };
                }
                var index;
                if (typeof init2 === "undefined" && sequence.length > 0) {
                  result = sequence[0];
                  index = 1;
                } else {
                  result = init2;
                  index = 0;
                }
                while (index < sequence.length) {
                  var args = [result, sequence[index]];
                  if (arity >= 3) {
                    args.push(index);
                  }
                  if (arity >= 4) {
                    args.push(sequence);
                  }
                  result = await func.apply(this, args);
                  index++;
                }
                return result;
              }
              function keys2(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  var merge2 = {};
                  arg.forEach(function(item) {
                    var allkeys = keys2(item);
                    allkeys.forEach(function(key) {
                      merge2[key] = true;
                    });
                  });
                  result = keys2(merge2);
                } else if (arg !== null && typeof arg === "object" && !isLambda(arg)) {
                  Object.keys(arg).forEach((key) => result.push(key));
                }
                return result;
              }
              function lookup(input, key) {
                var result;
                if (Array.isArray(input)) {
                  result = createSequence();
                  for (var ii = 0; ii < input.length; ii++) {
                    var res = lookup(input[ii], key);
                    if (typeof res !== "undefined") {
                      if (Array.isArray(res)) {
                        res.forEach((val) => result.push(val));
                      } else {
                        result.push(res);
                      }
                    }
                  }
                } else if (input !== null && typeof input === "object") {
                  result = input[key];
                }
                return result;
              }
              function append(arg1, arg2) {
                if (typeof arg1 === "undefined") {
                  return arg2;
                }
                if (typeof arg2 === "undefined") {
                  return arg1;
                }
                if (!Array.isArray(arg1)) {
                  arg1 = createSequence(arg1);
                }
                if (!Array.isArray(arg2)) {
                  arg2 = [arg2];
                }
                return arg1.concat(arg2);
              }
              function exists(arg) {
                if (typeof arg === "undefined") {
                  return false;
                } else {
                  return true;
                }
              }
              function spread(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  arg.forEach(function(item) {
                    result = append(result, spread(item));
                  });
                } else if (arg !== null && typeof arg === "object" && !isLambda(arg)) {
                  for (var key in arg) {
                    var obj = {};
                    obj[key] = arg[key];
                    result.push(obj);
                  }
                } else {
                  result = arg;
                }
                return result;
              }
              function merge(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = {};
                arg.forEach(function(obj) {
                  for (var prop in obj) {
                    result[prop] = obj[prop];
                  }
                });
                return result;
              }
              function reverse(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var length2 = arr.length;
                var result = new Array(length2);
                for (var i = 0; i < length2; i++) {
                  result[length2 - i - 1] = arr[i];
                }
                return result;
              }
              async function each(obj, func) {
                var result = createSequence();
                for (var key in obj) {
                  var func_args = hofFuncArgs(func, obj[key], key, obj);
                  var val = await func.apply(this, func_args);
                  if (typeof val !== "undefined") {
                    result.push(val);
                  }
                }
                return result;
              }
              function error(message) {
                throw {
                  code: "D3137",
                  stack: new Error().stack,
                  message: message || "$error() function evaluated"
                };
              }
              function assert(condition, message) {
                if (!condition) {
                  throw {
                    code: "D3141",
                    stack: new Error().stack,
                    message: message || "$assert() statement failed"
                  };
                }
                return void 0;
              }
              function type(value) {
                if (value === void 0) {
                  return void 0;
                }
                if (value === null) {
                  return "null";
                }
                if (isNumeric(value)) {
                  return "number";
                }
                if (typeof value === "string") {
                  return "string";
                }
                if (typeof value === "boolean") {
                  return "boolean";
                }
                if (Array.isArray(value)) {
                  return "array";
                }
                if (isFunction(value)) {
                  return "function";
                }
                return "object";
              }
              async function sort(arr, comparator) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var comp;
                if (typeof comparator === "undefined") {
                  if (!isArrayOfNumbers(arr) && !isArrayOfStrings(arr)) {
                    throw {
                      stack: new Error().stack,
                      code: "D3070",
                      index: 1
                    };
                  }
                  comp = async function(a, b2) {
                    return a > b2;
                  };
                } else {
                  comp = comparator;
                }
                var merge2 = async function(l2, r2) {
                  var merge_iter = async function(result2, left, right) {
                    if (left.length === 0) {
                      Array.prototype.push.apply(result2, right);
                    } else if (right.length === 0) {
                      Array.prototype.push.apply(result2, left);
                    } else if (await comp(left[0], right[0])) {
                      result2.push(right[0]);
                      await merge_iter(result2, left, right.slice(1));
                    } else {
                      result2.push(left[0]);
                      await merge_iter(result2, left.slice(1), right);
                    }
                  };
                  var merged = [];
                  await merge_iter(merged, l2, r2);
                  return merged;
                };
                var msort = async function(array) {
                  if (!Array.isArray(array) || array.length <= 1) {
                    return array;
                  } else {
                    var middle = Math.floor(array.length / 2);
                    var left = array.slice(0, middle);
                    var right = array.slice(middle);
                    left = await msort(left);
                    right = await msort(right);
                    return await merge2(left, right);
                  }
                };
                var result = await msort(arr);
                return result;
              }
              function shuffle(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var result = new Array(arr.length);
                for (var i = 0; i < arr.length; i++) {
                  var j2 = Math.floor(Math.random() * (i + 1));
                  if (i !== j2) {
                    result[i] = result[j2];
                  }
                  result[j2] = arr[i];
                }
                return result;
              }
              function distinct(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (!Array.isArray(arr) || arr.length <= 1) {
                  return arr;
                }
                var results = isSequence(arr) ? createSequence() : [];
                for (var ii = 0; ii < arr.length; ii++) {
                  var value = arr[ii];
                  var includes = false;
                  for (var jj = 0; jj < results.length; jj++) {
                    if (deepEquals(value, results[jj])) {
                      includes = true;
                      break;
                    }
                  }
                  if (!includes) {
                    results.push(value);
                  }
                }
                return results;
              }
              async function sift(arg, func) {
                var result = {};
                for (var item in arg) {
                  var entry = arg[item];
                  var func_args = hofFuncArgs(func, entry, item, arg);
                  var res = await func.apply(this, func_args);
                  if (boolean(res)) {
                    result[item] = entry;
                  }
                }
                if (Object.keys(result).length === 0) {
                  result = void 0;
                }
                return result;
              }
              return {
                sum,
                count,
                max,
                min,
                average,
                string,
                substring,
                substringBefore,
                substringAfter,
                lowercase,
                uppercase,
                length,
                trim,
                pad,
                match,
                contains,
                replace,
                split,
                join,
                formatNumber,
                formatBase,
                number,
                floor,
                ceil,
                round,
                abs,
                sqrt,
                power,
                random,
                boolean,
                not,
                map,
                zip,
                filter,
                single,
                foldLeft,
                sift,
                keys: keys2,
                lookup,
                append,
                exists,
                spread,
                merge,
                reverse,
                each,
                error,
                assert,
                type,
                sort,
                shuffle,
                distinct,
                base64encode,
                base64decode,
                encodeUrlComponent,
                encodeUrl,
                decodeUrlComponent,
                decodeUrl
              };
            })();
            module3.exports = functions;
          }).call(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./utils": 6 }], 3: [function(require2, module3, exports3) {
        var datetime = require2("./datetime");
        var fn = require2("./functions");
        var utils = require2("./utils");
        var parser = require2("./parser");
        var parseSignature = require2("./signature");
        var jsonata = function() {
          "use strict";
          var isNumeric = utils.isNumeric;
          var isArrayOfStrings = utils.isArrayOfStrings;
          var isArrayOfNumbers = utils.isArrayOfNumbers;
          var createSequence = utils.createSequence;
          var isSequence = utils.isSequence;
          var isFunction = utils.isFunction;
          var isLambda = utils.isLambda;
          var isIterable = utils.isIterable;
          var isPromise = utils.isPromise;
          var getFunctionArity = utils.getFunctionArity;
          var isDeepEqual = utils.isDeepEqual;
          var staticFrame = createFrame(null);
          async function evaluate(expr, input, environment) {
            var result;
            var entryCallback = environment.lookup("__evaluate_entry");
            if (entryCallback) {
              await entryCallback(expr, input, environment);
            }
            switch (expr.type) {
              case "path":
                result = await evaluatePath(expr, input, environment);
                break;
              case "binary":
                result = await evaluateBinary(expr, input, environment);
                break;
              case "unary":
                result = await evaluateUnary(expr, input, environment);
                break;
              case "name":
                result = evaluateName(expr, input, environment);
                break;
              case "string":
              case "number":
              case "value":
                result = evaluateLiteral(expr, input, environment);
                break;
              case "wildcard":
                result = evaluateWildcard(expr, input, environment);
                break;
              case "descendant":
                result = evaluateDescendants(expr, input, environment);
                break;
              case "parent":
                result = environment.lookup(expr.slot.label);
                break;
              case "condition":
                result = await evaluateCondition(expr, input, environment);
                break;
              case "block":
                result = await evaluateBlock(expr, input, environment);
                break;
              case "bind":
                result = await evaluateBindExpression(expr, input, environment);
                break;
              case "regex":
                result = evaluateRegex(expr, input, environment);
                break;
              case "function":
                result = await evaluateFunction(expr, input, environment);
                break;
              case "variable":
                result = evaluateVariable(expr, input, environment);
                break;
              case "lambda":
                result = evaluateLambda(expr, input, environment);
                break;
              case "partial":
                result = await evaluatePartialApplication(expr, input, environment);
                break;
              case "apply":
                result = await evaluateApplyExpression(expr, input, environment);
                break;
              case "transform":
                result = evaluateTransformExpression(expr, input, environment);
                break;
            }
            if (Object.prototype.hasOwnProperty.call(expr, "predicate")) {
              for (var ii = 0; ii < expr.predicate.length; ii++) {
                result = await evaluateFilter(expr.predicate[ii].expr, result, environment);
              }
            }
            if (expr.type !== "path" && Object.prototype.hasOwnProperty.call(expr, "group")) {
              result = await evaluateGroupExpression(expr.group, result, environment);
            }
            var exitCallback = environment.lookup("__evaluate_exit");
            if (exitCallback) {
              await exitCallback(expr, input, environment, result);
            }
            if (result && isSequence(result) && !result.tupleStream) {
              if (expr.keepArray) {
                result.keepSingleton = true;
              }
              if (result.length === 0) {
                result = void 0;
              } else if (result.length === 1) {
                result = result.keepSingleton ? result : result[0];
              }
            }
            return result;
          }
          async function evaluatePath(expr, input, environment) {
            var inputSequence;
            if (Array.isArray(input) && expr.steps[0].type !== "variable") {
              inputSequence = input;
            } else {
              inputSequence = createSequence(input);
            }
            var resultSequence;
            var isTupleStream = false;
            var tupleBindings = void 0;
            for (var ii = 0; ii < expr.steps.length; ii++) {
              var step = expr.steps[ii];
              if (step.tuple) {
                isTupleStream = true;
              }
              if (ii === 0 && step.consarray) {
                resultSequence = await evaluate(step, inputSequence, environment);
              } else {
                if (isTupleStream) {
                  tupleBindings = await evaluateTupleStep(step, inputSequence, tupleBindings, environment);
                } else {
                  resultSequence = await evaluateStep(step, inputSequence, environment, ii === expr.steps.length - 1);
                }
              }
              if (!isTupleStream && (typeof resultSequence === "undefined" || resultSequence.length === 0)) {
                break;
              }
              if (typeof step.focus === "undefined") {
                inputSequence = resultSequence;
              }
            }
            if (isTupleStream) {
              if (expr.tuple) {
                resultSequence = tupleBindings;
              } else {
                resultSequence = createSequence();
                for (ii = 0; ii < tupleBindings.length; ii++) {
                  resultSequence.push(tupleBindings[ii]["@"]);
                }
              }
            }
            if (expr.keepSingletonArray) {
              if (Array.isArray(resultSequence) && resultSequence.cons && !resultSequence.sequence) {
                resultSequence = createSequence(resultSequence);
              }
              resultSequence.keepSingleton = true;
            }
            if (expr.hasOwnProperty("group")) {
              resultSequence = await evaluateGroupExpression(expr.group, isTupleStream ? tupleBindings : resultSequence, environment);
            }
            return resultSequence;
          }
          function createFrameFromTuple(environment, tuple) {
            var frame = createFrame(environment);
            for (const prop in tuple) {
              frame.bind(prop, tuple[prop]);
            }
            return frame;
          }
          async function evaluateStep(expr, input, environment, lastStep) {
            var result;
            if (expr.type === "sort") {
              result = await evaluateSortExpression(expr, input, environment);
              if (expr.stages) {
                result = await evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            for (var ii = 0; ii < input.length; ii++) {
              var res = await evaluate(expr, input[ii], environment);
              if (expr.stages) {
                for (var ss = 0; ss < expr.stages.length; ss++) {
                  res = await evaluateFilter(expr.stages[ss].expr, res, environment);
                }
              }
              if (typeof res !== "undefined") {
                result.push(res);
              }
            }
            var resultSequence = createSequence();
            if (lastStep && result.length === 1 && Array.isArray(result[0]) && !isSequence(result[0])) {
              resultSequence = result[0];
            } else {
              result.forEach(function(res2) {
                if (!Array.isArray(res2) || res2.cons) {
                  resultSequence.push(res2);
                } else {
                  res2.forEach((val) => resultSequence.push(val));
                }
              });
            }
            return resultSequence;
          }
          async function evaluateStages(stages, input, environment) {
            var result = input;
            for (var ss = 0; ss < stages.length; ss++) {
              var stage = stages[ss];
              switch (stage.type) {
                case "filter":
                  result = await evaluateFilter(stage.expr, result, environment);
                  break;
                case "index":
                  for (var ee = 0; ee < result.length; ee++) {
                    var tuple = result[ee];
                    tuple[stage.value] = ee;
                  }
                  break;
              }
            }
            return result;
          }
          async function evaluateTupleStep(expr, input, tupleBindings, environment) {
            var result;
            if (expr.type === "sort") {
              if (tupleBindings) {
                result = await evaluateSortExpression(expr, tupleBindings, environment);
              } else {
                var sorted = await evaluateSortExpression(expr, input, environment);
                result = createSequence();
                result.tupleStream = true;
                for (var ss = 0; ss < sorted.length; ss++) {
                  var tuple = { "@": sorted[ss] };
                  tuple[expr.index] = ss;
                  result.push(tuple);
                }
              }
              if (expr.stages) {
                result = await evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            result.tupleStream = true;
            var stepEnv = environment;
            if (tupleBindings === void 0) {
              tupleBindings = input.map((item) => {
                return { "@": item };
              });
            }
            for (var ee = 0; ee < tupleBindings.length; ee++) {
              stepEnv = createFrameFromTuple(environment, tupleBindings[ee]);
              var res = await evaluate(expr, tupleBindings[ee]["@"], stepEnv);
              if (typeof res !== "undefined") {
                if (!Array.isArray(res)) {
                  res = [res];
                }
                for (var bb = 0; bb < res.length; bb++) {
                  tuple = {};
                  Object.assign(tuple, tupleBindings[ee]);
                  if (res.tupleStream) {
                    Object.assign(tuple, res[bb]);
                  } else {
                    if (expr.focus) {
                      tuple[expr.focus] = res[bb];
                      tuple["@"] = tupleBindings[ee]["@"];
                    } else {
                      tuple["@"] = res[bb];
                    }
                    if (expr.index) {
                      tuple[expr.index] = bb;
                    }
                    if (expr.ancestor) {
                      tuple[expr.ancestor.label] = tupleBindings[ee]["@"];
                    }
                  }
                  result.push(tuple);
                }
              }
            }
            if (expr.stages) {
              result = await evaluateStages(expr.stages, result, environment);
            }
            return result;
          }
          async function evaluateFilter(predicate, input, environment) {
            var results = createSequence();
            if (input && input.tupleStream) {
              results.tupleStream = true;
            }
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (predicate.type === "number") {
              var index = Math.floor(predicate.value);
              if (index < 0) {
                index = input.length + index;
              }
              var item = input[index];
              if (typeof item !== "undefined") {
                if (Array.isArray(item)) {
                  results = item;
                } else {
                  results.push(item);
                }
              }
            } else {
              for (index = 0; index < input.length; index++) {
                var item = input[index];
                var context = item;
                var env3 = environment;
                if (input.tupleStream) {
                  context = item["@"];
                  env3 = createFrameFromTuple(environment, item);
                }
                var res = await evaluate(predicate, context, env3);
                if (isNumeric(res)) {
                  res = [res];
                }
                if (isArrayOfNumbers(res)) {
                  res.forEach(function(ires) {
                    var ii = Math.floor(ires);
                    if (ii < 0) {
                      ii = input.length + ii;
                    }
                    if (ii === index) {
                      results.push(item);
                    }
                  });
                } else if (fn.boolean(res)) {
                  results.push(item);
                }
              }
            }
            return results;
          }
          async function evaluateBinary(expr, input, environment) {
            var result;
            var lhs = await evaluate(expr.lhs, input, environment);
            var op = expr.value;
            var evalrhs = async () => await evaluate(expr.rhs, input, environment);
            if (op === "and" || op === "or") {
              try {
                return await evaluateBooleanExpression(lhs, evalrhs, op);
              } catch (err) {
                err.position = expr.position;
                err.token = op;
                throw err;
              }
            }
            var rhs = await evalrhs();
            try {
              switch (op) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                  result = evaluateNumericExpression(lhs, rhs, op);
                  break;
                case "=":
                case "!=":
                  result = evaluateEqualityExpression(lhs, rhs, op);
                  break;
                case "<":
                case "<=":
                case ">":
                case ">=":
                  result = evaluateComparisonExpression(lhs, rhs, op);
                  break;
                case "&":
                  result = evaluateStringConcat(lhs, rhs);
                  break;
                case "..":
                  result = evaluateRangeExpression(lhs, rhs);
                  break;
                case "in":
                  result = evaluateIncludesExpression(lhs, rhs);
                  break;
              }
            } catch (err) {
              err.position = expr.position;
              err.token = op;
              throw err;
            }
            return result;
          }
          async function evaluateUnary(expr, input, environment) {
            var result;
            switch (expr.value) {
              case "-":
                result = await evaluate(expr.expression, input, environment);
                if (typeof result === "undefined") {
                  result = void 0;
                } else if (isNumeric(result)) {
                  result = -result;
                } else {
                  throw {
                    code: "D1002",
                    stack: new Error().stack,
                    position: expr.position,
                    token: expr.value,
                    value: result
                  };
                }
                break;
              case "[":
                result = [];
                let generators = await Promise.all(expr.expressions.map(async (item2, idx) => {
                  environment.isParallelCall = idx > 0;
                  return [item2, await evaluate(item2, input, environment)];
                }));
                for (let generator of generators) {
                  var [item, value] = generator;
                  if (typeof value !== "undefined") {
                    if (item.value === "[") {
                      result.push(value);
                    } else {
                      result = fn.append(result, value);
                    }
                  }
                }
                if (expr.consarray) {
                  Object.defineProperty(result, "cons", {
                    enumerable: false,
                    configurable: false,
                    value: true
                  });
                }
                break;
              case "{":
                result = await evaluateGroupExpression(expr, input, environment);
                break;
            }
            return result;
          }
          function evaluateName(expr, input, environment) {
            return fn.lookup(input, expr.value);
          }
          function evaluateLiteral(expr) {
            return expr.value;
          }
          function evaluateWildcard(expr, input) {
            var results = createSequence();
            if (Array.isArray(input) && input.outerWrapper && input.length > 0) {
              input = input[0];
            }
            if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key) {
                var value = input[key];
                if (Array.isArray(value)) {
                  value = flatten(value);
                  results = fn.append(results, value);
                } else {
                  results.push(value);
                }
              });
            }
            return results;
          }
          function flatten(arg, flattened) {
            if (typeof flattened === "undefined") {
              flattened = [];
            }
            if (Array.isArray(arg)) {
              arg.forEach(function(item) {
                flatten(item, flattened);
              });
            } else {
              flattened.push(arg);
            }
            return flattened;
          }
          function evaluateDescendants(expr, input) {
            var result;
            var resultSequence = createSequence();
            if (typeof input !== "undefined") {
              recurseDescendants(input, resultSequence);
              if (resultSequence.length === 1) {
                result = resultSequence[0];
              } else {
                result = resultSequence;
              }
            }
            return result;
          }
          function recurseDescendants(input, results) {
            if (!Array.isArray(input)) {
              results.push(input);
            }
            if (Array.isArray(input)) {
              input.forEach(function(member) {
                recurseDescendants(member, results);
              });
            } else if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key) {
                recurseDescendants(input[key], results);
              });
            }
          }
          function evaluateNumericExpression(lhs, rhs, op) {
            var result;
            if (typeof lhs !== "undefined" && !isNumeric(lhs)) {
              throw {
                code: "T2001",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !isNumeric(rhs)) {
              throw {
                code: "T2002",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            switch (op) {
              case "+":
                result = lhs + rhs;
                break;
              case "-":
                result = lhs - rhs;
                break;
              case "*":
                result = lhs * rhs;
                break;
              case "/":
                result = lhs / rhs;
                break;
              case "%":
                result = lhs % rhs;
                break;
            }
            return result;
          }
          function evaluateEqualityExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            if (ltype === "undefined" || rtype === "undefined") {
              return false;
            }
            switch (op) {
              case "=":
                result = isDeepEqual(lhs, rhs);
                break;
              case "!=":
                result = !isDeepEqual(lhs, rhs);
                break;
            }
            return result;
          }
          function evaluateComparisonExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            var lcomparable = ltype === "undefined" || ltype === "string" || ltype === "number";
            var rcomparable = rtype === "undefined" || rtype === "string" || rtype === "number";
            if (!lcomparable || !rcomparable) {
              throw {
                code: "T2010",
                stack: new Error().stack,
                value: !(ltype === "string" || ltype === "number") ? lhs : rhs
              };
            }
            if (ltype === "undefined" || rtype === "undefined") {
              return void 0;
            }
            if (ltype !== rtype) {
              throw {
                code: "T2009",
                stack: new Error().stack,
                value: lhs,
                value2: rhs
              };
            }
            switch (op) {
              case "<":
                result = lhs < rhs;
                break;
              case "<=":
                result = lhs <= rhs;
                break;
              case ">":
                result = lhs > rhs;
                break;
              case ">=":
                result = lhs >= rhs;
                break;
            }
            return result;
          }
          function evaluateIncludesExpression(lhs, rhs) {
            var result = false;
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return false;
            }
            if (!Array.isArray(rhs)) {
              rhs = [rhs];
            }
            for (var i = 0; i < rhs.length; i++) {
              if (rhs[i] === lhs) {
                result = true;
                break;
              }
            }
            return result;
          }
          async function evaluateBooleanExpression(lhs, evalrhs, op) {
            var result;
            var lBool = boolize(lhs);
            switch (op) {
              case "and":
                result = lBool && boolize(await evalrhs());
                break;
              case "or":
                result = lBool || boolize(await evalrhs());
                break;
            }
            return result;
          }
          function boolize(value) {
            var booledValue = fn.boolean(value);
            return typeof booledValue === "undefined" ? false : booledValue;
          }
          function evaluateStringConcat(lhs, rhs) {
            var result;
            var lstr = "";
            var rstr = "";
            if (typeof lhs !== "undefined") {
              lstr = fn.string(lhs);
            }
            if (typeof rhs !== "undefined") {
              rstr = fn.string(rhs);
            }
            result = lstr.concat(rstr);
            return result;
          }
          async function evaluateGroupExpression(expr, input, environment) {
            var result = {};
            var groups = {};
            var reduce = input && input.tupleStream ? true : false;
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (input.length === 0) {
              input.push(void 0);
            }
            for (var itemIndex = 0; itemIndex < input.length; itemIndex++) {
              var item = input[itemIndex];
              var env3 = reduce ? createFrameFromTuple(environment, item) : environment;
              for (var pairIndex = 0; pairIndex < expr.lhs.length; pairIndex++) {
                var pair = expr.lhs[pairIndex];
                var key = await evaluate(pair[0], reduce ? item["@"] : item, env3);
                if (typeof key !== "string" && key !== void 0) {
                  throw {
                    code: "T1003",
                    stack: new Error().stack,
                    position: expr.position,
                    value: key
                  };
                }
                if (key !== void 0) {
                  var entry = { data: item, exprIndex: pairIndex };
                  if (groups.hasOwnProperty(key)) {
                    if (groups[key].exprIndex !== pairIndex) {
                      throw {
                        code: "D1009",
                        stack: new Error().stack,
                        position: expr.position,
                        value: key
                      };
                    }
                    groups[key].data = fn.append(groups[key].data, item);
                  } else {
                    groups[key] = entry;
                  }
                }
              }
            }
            let generators = await Promise.all(Object.keys(groups).map(async (key2, idx) => {
              let entry2 = groups[key2];
              var context = entry2.data;
              var env4 = environment;
              if (reduce) {
                var tuple = reduceTupleStream(entry2.data);
                context = tuple["@"];
                delete tuple["@"];
                env4 = createFrameFromTuple(environment, tuple);
              }
              environment.isParallelCall = idx > 0;
              return [key2, await evaluate(expr.lhs[entry2.exprIndex][1], context, env4)];
            }));
            for (let generator of generators) {
              var [key, value] = await generator;
              if (typeof value !== "undefined") {
                result[key] = value;
              }
            }
            return result;
          }
          function reduceTupleStream(tupleStream) {
            if (!Array.isArray(tupleStream)) {
              return tupleStream;
            }
            var result = {};
            Object.assign(result, tupleStream[0]);
            for (var ii = 1; ii < tupleStream.length; ii++) {
              for (const prop in tupleStream[ii]) {
                result[prop] = fn.append(result[prop], tupleStream[ii][prop]);
              }
            }
            return result;
          }
          function evaluateRangeExpression(lhs, rhs) {
            var result;
            if (typeof lhs !== "undefined" && !Number.isInteger(lhs)) {
              throw {
                code: "T2003",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !Number.isInteger(rhs)) {
              throw {
                code: "T2004",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            if (lhs > rhs) {
              return result;
            }
            var size = rhs - lhs + 1;
            if (size > 1e7) {
              throw {
                code: "D2014",
                stack: new Error().stack,
                value: size
              };
            }
            result = new Array(size);
            for (var item = lhs, index = 0; item <= rhs; item++, index++) {
              result[index] = item;
            }
            result.sequence = true;
            return result;
          }
          async function evaluateBindExpression(expr, input, environment) {
            var value = await evaluate(expr.rhs, input, environment);
            environment.bind(expr.lhs.value, value);
            return value;
          }
          async function evaluateCondition(expr, input, environment) {
            var result;
            var condition = await evaluate(expr.condition, input, environment);
            if (fn.boolean(condition)) {
              result = await evaluate(expr.then, input, environment);
            } else if (typeof expr.else !== "undefined") {
              result = await evaluate(expr.else, input, environment);
            }
            return result;
          }
          async function evaluateBlock(expr, input, environment) {
            var result;
            var frame = createFrame(environment);
            for (var ii = 0; ii < expr.expressions.length; ii++) {
              result = await evaluate(expr.expressions[ii], input, frame);
            }
            return result;
          }
          function evaluateRegex(expr) {
            var re = new jsonata2.RegexEngine(expr.value);
            var closure = function(str, fromIndex) {
              var result;
              re.lastIndex = fromIndex || 0;
              var match = re.exec(str);
              if (match !== null) {
                result = {
                  match: match[0],
                  start: match.index,
                  end: match.index + match[0].length,
                  groups: []
                };
                if (match.length > 1) {
                  for (var i = 1; i < match.length; i++) {
                    result.groups.push(match[i]);
                  }
                }
                result.next = function() {
                  if (re.lastIndex >= str.length) {
                    return void 0;
                  } else {
                    var next = closure(str, re.lastIndex);
                    if (next && next.match === "") {
                      throw {
                        code: "D1004",
                        stack: new Error().stack,
                        position: expr.position,
                        value: expr.value.source
                      };
                    }
                    return next;
                  }
                };
              }
              return result;
            };
            return closure;
          }
          function evaluateVariable(expr, input, environment) {
            var result;
            if (expr.value === "") {
              result = input && input.outerWrapper ? input[0] : input;
            } else {
              result = environment.lookup(expr.value);
            }
            return result;
          }
          async function evaluateSortExpression(expr, input, environment) {
            var result;
            var lhs = input;
            var isTupleSort = input.tupleStream ? true : false;
            var comparator = async function(a, b2) {
              var comp = 0;
              for (var index = 0; comp === 0 && index < expr.terms.length; index++) {
                var term = expr.terms[index];
                var context = a;
                var env3 = environment;
                if (isTupleSort) {
                  context = a["@"];
                  env3 = createFrameFromTuple(environment, a);
                }
                var aa = await evaluate(term.expression, context, env3);
                context = b2;
                env3 = environment;
                if (isTupleSort) {
                  context = b2["@"];
                  env3 = createFrameFromTuple(environment, b2);
                }
                var bb = await evaluate(term.expression, context, env3);
                var atype = typeof aa;
                var btype = typeof bb;
                if (atype === "undefined") {
                  comp = btype === "undefined" ? 0 : 1;
                  continue;
                }
                if (btype === "undefined") {
                  comp = -1;
                  continue;
                }
                if (!(atype === "string" || atype === "number") || !(btype === "string" || btype === "number")) {
                  throw {
                    code: "T2008",
                    stack: new Error().stack,
                    position: expr.position,
                    value: !(atype === "string" || atype === "number") ? aa : bb
                  };
                }
                if (atype !== btype) {
                  throw {
                    code: "T2007",
                    stack: new Error().stack,
                    position: expr.position,
                    value: aa,
                    value2: bb
                  };
                }
                if (aa === bb) {
                  continue;
                } else if (aa < bb) {
                  comp = -1;
                } else {
                  comp = 1;
                }
                if (term.descending === true) {
                  comp = -comp;
                }
              }
              return comp === 1;
            };
            var focus = {
              environment,
              input
            };
            result = await fn.sort.apply(focus, [lhs, comparator]);
            return result;
          }
          function evaluateTransformExpression(expr, input, environment) {
            var transformer = async function(obj) {
              if (typeof obj === "undefined") {
                return void 0;
              }
              var cloneFunction = environment.lookup("clone");
              if (!isFunction(cloneFunction)) {
                throw {
                  code: "T2013",
                  stack: new Error().stack,
                  position: expr.position
                };
              }
              var result = await apply(cloneFunction, [obj], null, environment);
              var matches = await evaluate(expr.pattern, result, environment);
              if (typeof matches !== "undefined") {
                if (!Array.isArray(matches)) {
                  matches = [matches];
                }
                for (var ii = 0; ii < matches.length; ii++) {
                  var match = matches[ii];
                  var update = await evaluate(expr.update, match, environment);
                  var updateType = typeof update;
                  if (updateType !== "undefined") {
                    if (updateType !== "object" || update === null || Array.isArray(update)) {
                      throw {
                        code: "T2011",
                        stack: new Error().stack,
                        position: expr.update.position,
                        value: update
                      };
                    }
                    for (var prop in update) {
                      match[prop] = update[prop];
                    }
                  }
                  if (typeof expr.delete !== "undefined") {
                    var deletions = await evaluate(expr.delete, match, environment);
                    if (typeof deletions !== "undefined") {
                      var val = deletions;
                      if (!Array.isArray(deletions)) {
                        deletions = [deletions];
                      }
                      if (!isArrayOfStrings(deletions)) {
                        throw {
                          code: "T2012",
                          stack: new Error().stack,
                          position: expr.delete.position,
                          value: val
                        };
                      }
                      for (var jj = 0; jj < deletions.length; jj++) {
                        if (typeof match === "object" && match !== null) {
                          delete match[deletions[jj]];
                        }
                      }
                    }
                  }
                }
              }
              return result;
            };
            return defineFunction(transformer, "<(oa):o>");
          }
          var chainAST = parser("function($f, $g) { function($x){ $g($f($x)) } }");
          async function evaluateApplyExpression(expr, input, environment) {
            var result;
            var lhs = await evaluate(expr.lhs, input, environment);
            if (expr.rhs.type === "function") {
              result = await evaluateFunction(expr.rhs, input, environment, { context: lhs });
            } else {
              var func = await evaluate(expr.rhs, input, environment);
              if (!isFunction(func)) {
                throw {
                  code: "T2006",
                  stack: new Error().stack,
                  position: expr.position,
                  value: func
                };
              }
              if (isFunction(lhs)) {
                var chain = await evaluate(chainAST, null, environment);
                result = await apply(chain, [lhs, func], null, environment);
              } else {
                result = await apply(func, [lhs], null, environment);
              }
            }
            return result;
          }
          async function evaluateFunction(expr, input, environment, applyto) {
            var result;
            var proc = await evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1005",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            var evaluatedArgs = [];
            if (typeof applyto !== "undefined") {
              evaluatedArgs.push(applyto.context);
            }
            for (var jj = 0; jj < expr.arguments.length; jj++) {
              const arg = await evaluate(expr.arguments[jj], input, environment);
              if (isFunction(arg)) {
                const closure = async function(...params) {
                  return await apply(arg, params, null, environment);
                };
                closure.arity = getFunctionArity(arg);
                evaluatedArgs.push(closure);
              } else {
                evaluatedArgs.push(arg);
              }
            }
            var procName = expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value;
            try {
              if (typeof proc === "object") {
                proc.token = procName;
                proc.position = expr.position;
              }
              result = await apply(proc, evaluatedArgs, input, environment);
            } catch (err) {
              if (!err.position) {
                err.position = expr.position;
              }
              if (!err.token) {
                err.token = procName;
              }
              throw err;
            }
            return result;
          }
          async function apply(proc, args, input, environment) {
            var result;
            result = await applyInner(proc, args, input, environment);
            while (isLambda(result) && result.thunk === true) {
              var next = await evaluate(result.body.procedure, result.input, result.environment);
              if (result.body.procedure.type === "variable") {
                next.token = result.body.procedure.value;
              }
              next.position = result.body.procedure.position;
              var evaluatedArgs = [];
              for (var ii = 0; ii < result.body.arguments.length; ii++) {
                evaluatedArgs.push(await evaluate(result.body.arguments[ii], result.input, result.environment));
              }
              result = await applyInner(next, evaluatedArgs, input, environment);
            }
            return result;
          }
          async function applyInner(proc, args, input, environment) {
            var result;
            try {
              var validatedArgs = args;
              if (proc) {
                validatedArgs = validateArguments(proc.signature, args, input);
              }
              if (isLambda(proc)) {
                result = await applyProcedure(proc, validatedArgs);
              } else if (proc && proc._jsonata_function === true) {
                var focus = {
                  environment,
                  input
                };
                result = proc.implementation.apply(focus, validatedArgs);
                if (isIterable(result)) {
                  result = result.next().value;
                }
                if (isPromise(result)) {
                  result = await result;
                }
              } else if (typeof proc === "function") {
                result = proc.apply(input, validatedArgs);
                if (isPromise(result)) {
                  result = await result;
                }
              } else {
                throw {
                  code: "T1006",
                  stack: new Error().stack
                };
              }
            } catch (err) {
              if (proc) {
                if (typeof err.token == "undefined" && typeof proc.token !== "undefined") {
                  err.token = proc.token;
                }
                err.position = proc.position;
              }
              throw err;
            }
            return result;
          }
          function evaluateLambda(expr, input, environment) {
            var procedure = {
              _jsonata_lambda: true,
              input,
              environment,
              arguments: expr.arguments,
              signature: expr.signature,
              body: expr.body
            };
            if (expr.thunk === true) {
              procedure.thunk = true;
            }
            procedure.apply = async function(self2, args) {
              return await apply(procedure, args, input, !!self2 ? self2.environment : environment);
            };
            return procedure;
          }
          async function evaluatePartialApplication(expr, input, environment) {
            var result;
            var evaluatedArgs = [];
            for (var ii = 0; ii < expr.arguments.length; ii++) {
              var arg = expr.arguments[ii];
              if (arg.type === "operator" && arg.value === "?") {
                evaluatedArgs.push(arg);
              } else {
                evaluatedArgs.push(await evaluate(arg, input, environment));
              }
            }
            var proc = await evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1007",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            if (isLambda(proc)) {
              result = partialApplyProcedure(proc, evaluatedArgs);
            } else if (proc && proc._jsonata_function === true) {
              result = partialApplyNativeFunction(proc.implementation, evaluatedArgs);
            } else if (typeof proc === "function") {
              result = partialApplyNativeFunction(proc, evaluatedArgs);
            } else {
              throw {
                code: "T1008",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value
              };
            }
            return result;
          }
          function validateArguments(signature, args, context) {
            if (typeof signature === "undefined") {
              return args;
            }
            var validatedArgs = signature.validate(args, context);
            return validatedArgs;
          }
          async function applyProcedure(proc, args) {
            var result;
            var env3 = createFrame(proc.environment);
            proc.arguments.forEach(function(param, index) {
              env3.bind(param.value, args[index]);
            });
            if (typeof proc.body === "function") {
              result = await applyNativeFunction(proc.body, env3);
            } else {
              result = await evaluate(proc.body, proc.input, env3);
            }
            return result;
          }
          function partialApplyProcedure(proc, args) {
            var env3 = createFrame(proc.environment);
            var unboundArgs = [];
            proc.arguments.forEach(function(param, index) {
              var arg = args[index];
              if (arg && arg.type === "operator" && arg.value === "?") {
                unboundArgs.push(param);
              } else {
                env3.bind(param.value, arg);
              }
            });
            var procedure = {
              _jsonata_lambda: true,
              input: proc.input,
              environment: env3,
              arguments: unboundArgs,
              body: proc.body
            };
            return procedure;
          }
          function partialApplyNativeFunction(native, args) {
            var sigArgs = getNativeFunctionArguments(native);
            sigArgs = sigArgs.map(function(sigArg) {
              return "$" + sigArg.trim();
            });
            var body = "function(" + sigArgs.join(", ") + "){ _ }";
            var bodyAST = parser(body);
            bodyAST.body = native;
            var partial = partialApplyProcedure(bodyAST, args);
            return partial;
          }
          async function applyNativeFunction(proc, env3) {
            var sigArgs = getNativeFunctionArguments(proc);
            var args = sigArgs.map(function(sigArg) {
              return env3.lookup(sigArg.trim());
            });
            var focus = {
              environment: env3
            };
            var result = proc.apply(focus, args);
            if (isPromise(result)) {
              result = await result;
            }
            return result;
          }
          function getNativeFunctionArguments(func) {
            var signature = func.toString();
            var sigParens = /\(([^)]*)\)/.exec(signature)[1];
            var sigArgs = sigParens.split(",");
            return sigArgs;
          }
          function defineFunction(func, signature) {
            var definition = {
              _jsonata_function: true,
              implementation: func
            };
            if (typeof signature !== "undefined") {
              definition.signature = parseSignature(signature);
            }
            return definition;
          }
          async function functionEval(expr, focus) {
            if (typeof expr === "undefined") {
              return void 0;
            }
            var input = this.input;
            if (typeof focus !== "undefined") {
              input = focus;
              if (Array.isArray(input) && !isSequence(input)) {
                input = createSequence(input);
                input.outerWrapper = true;
              }
            }
            try {
              var ast = parser(expr, false);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3120",
                value: err.message,
                error: err
              };
            }
            try {
              var result = await evaluate(ast, input, this.environment);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3121",
                value: err.message,
                error: err
              };
            }
            return result;
          }
          function functionClone(arg) {
            if (typeof arg === "undefined") {
              return void 0;
            }
            return JSON.parse(fn.string(arg));
          }
          function createFrame(enclosingEnvironment) {
            var bindings = {};
            return {
              bind: function(name, value) {
                bindings[name] = value;
              },
              lookup: function(name) {
                var value;
                if (bindings.hasOwnProperty(name)) {
                  value = bindings[name];
                } else if (enclosingEnvironment) {
                  value = enclosingEnvironment.lookup(name);
                }
                return value;
              },
              timestamp: enclosingEnvironment ? enclosingEnvironment.timestamp : null,
              async: enclosingEnvironment ? enclosingEnvironment.async : false,
              isParallelCall: enclosingEnvironment ? enclosingEnvironment.isParallelCall : false,
              global: enclosingEnvironment ? enclosingEnvironment.global : {
                ancestry: [null]
              }
            };
          }
          staticFrame.bind("sum", defineFunction(fn.sum, "<a<n>:n>"));
          staticFrame.bind("count", defineFunction(fn.count, "<a:n>"));
          staticFrame.bind("max", defineFunction(fn.max, "<a<n>:n>"));
          staticFrame.bind("min", defineFunction(fn.min, "<a<n>:n>"));
          staticFrame.bind("average", defineFunction(fn.average, "<a<n>:n>"));
          staticFrame.bind("string", defineFunction(fn.string, "<x-b?:s>"));
          staticFrame.bind("substring", defineFunction(fn.substring, "<s-nn?:s>"));
          staticFrame.bind("substringBefore", defineFunction(fn.substringBefore, "<s-s:s>"));
          staticFrame.bind("substringAfter", defineFunction(fn.substringAfter, "<s-s:s>"));
          staticFrame.bind("lowercase", defineFunction(fn.lowercase, "<s-:s>"));
          staticFrame.bind("uppercase", defineFunction(fn.uppercase, "<s-:s>"));
          staticFrame.bind("length", defineFunction(fn.length, "<s-:n>"));
          staticFrame.bind("trim", defineFunction(fn.trim, "<s-:s>"));
          staticFrame.bind("pad", defineFunction(fn.pad, "<s-ns?:s>"));
          staticFrame.bind("match", defineFunction(fn.match, "<s-f<s:o>n?:a<o>>"));
          staticFrame.bind("contains", defineFunction(fn.contains, "<s-(sf):b>"));
          staticFrame.bind("replace", defineFunction(fn.replace, "<s-(sf)(sf)n?:s>"));
          staticFrame.bind("split", defineFunction(fn.split, "<s-(sf)n?:a<s>>"));
          staticFrame.bind("join", defineFunction(fn.join, "<a<s>s?:s>"));
          staticFrame.bind("formatNumber", defineFunction(fn.formatNumber, "<n-so?:s>"));
          staticFrame.bind("formatBase", defineFunction(fn.formatBase, "<n-n?:s>"));
          staticFrame.bind("formatInteger", defineFunction(datetime.formatInteger, "<n-s:s>"));
          staticFrame.bind("parseInteger", defineFunction(datetime.parseInteger, "<s-s:n>"));
          staticFrame.bind("number", defineFunction(fn.number, "<(nsb)-:n>"));
          staticFrame.bind("floor", defineFunction(fn.floor, "<n-:n>"));
          staticFrame.bind("ceil", defineFunction(fn.ceil, "<n-:n>"));
          staticFrame.bind("round", defineFunction(fn.round, "<n-n?:n>"));
          staticFrame.bind("abs", defineFunction(fn.abs, "<n-:n>"));
          staticFrame.bind("sqrt", defineFunction(fn.sqrt, "<n-:n>"));
          staticFrame.bind("power", defineFunction(fn.power, "<n-n:n>"));
          staticFrame.bind("random", defineFunction(fn.random, "<:n>"));
          staticFrame.bind("boolean", defineFunction(fn.boolean, "<x-:b>"));
          staticFrame.bind("not", defineFunction(fn.not, "<x-:b>"));
          staticFrame.bind("map", defineFunction(fn.map, "<af>"));
          staticFrame.bind("zip", defineFunction(fn.zip, "<a+>"));
          staticFrame.bind("filter", defineFunction(fn.filter, "<af>"));
          staticFrame.bind("single", defineFunction(fn.single, "<af?>"));
          staticFrame.bind("reduce", defineFunction(fn.foldLeft, "<afj?:j>"));
          staticFrame.bind("sift", defineFunction(fn.sift, "<o-f?:o>"));
          staticFrame.bind("keys", defineFunction(fn.keys, "<x-:a<s>>"));
          staticFrame.bind("lookup", defineFunction(fn.lookup, "<x-s:x>"));
          staticFrame.bind("append", defineFunction(fn.append, "<xx:a>"));
          staticFrame.bind("exists", defineFunction(fn.exists, "<x:b>"));
          staticFrame.bind("spread", defineFunction(fn.spread, "<x-:a<o>>"));
          staticFrame.bind("merge", defineFunction(fn.merge, "<a<o>:o>"));
          staticFrame.bind("reverse", defineFunction(fn.reverse, "<a:a>"));
          staticFrame.bind("each", defineFunction(fn.each, "<o-f:a>"));
          staticFrame.bind("error", defineFunction(fn.error, "<s?:x>"));
          staticFrame.bind("assert", defineFunction(fn.assert, "<bs?:x>"));
          staticFrame.bind("type", defineFunction(fn.type, "<x:s>"));
          staticFrame.bind("sort", defineFunction(fn.sort, "<af?:a>"));
          staticFrame.bind("shuffle", defineFunction(fn.shuffle, "<a:a>"));
          staticFrame.bind("distinct", defineFunction(fn.distinct, "<x:x>"));
          staticFrame.bind("base64encode", defineFunction(fn.base64encode, "<s-:s>"));
          staticFrame.bind("base64decode", defineFunction(fn.base64decode, "<s-:s>"));
          staticFrame.bind("encodeUrlComponent", defineFunction(fn.encodeUrlComponent, "<s-:s>"));
          staticFrame.bind("encodeUrl", defineFunction(fn.encodeUrl, "<s-:s>"));
          staticFrame.bind("decodeUrlComponent", defineFunction(fn.decodeUrlComponent, "<s-:s>"));
          staticFrame.bind("decodeUrl", defineFunction(fn.decodeUrl, "<s-:s>"));
          staticFrame.bind("eval", defineFunction(functionEval, "<sx?:x>"));
          staticFrame.bind("toMillis", defineFunction(datetime.toMillis, "<s-s?:n>"));
          staticFrame.bind("fromMillis", defineFunction(datetime.fromMillis, "<n-s?s?:s>"));
          staticFrame.bind("clone", defineFunction(functionClone, "<(oa)-:o>"));
          var errorCodes = {
            "S0101": "String literal must be terminated by a matching quote",
            "S0102": "Number out of range: {{token}}",
            "S0103": "Unsupported escape sequence: \\{{token}}",
            "S0104": "The escape sequence \\u must be followed by 4 hex digits",
            "S0105": "Quoted property name must be terminated with a backquote (`)",
            "S0106": "Comment has no closing tag",
            "S0201": "Syntax error: {{token}}",
            "S0202": "Expected {{value}}, got {{token}}",
            "S0203": "Expected {{value}} before end of expression",
            "S0204": "Unknown operator: {{token}}",
            "S0205": "Unexpected token: {{token}}",
            "S0206": "Unknown expression type: {{token}}",
            "S0207": "Unexpected end of expression",
            "S0208": "Parameter {{value}} of function definition must be a variable name (start with $)",
            "S0209": "A predicate cannot follow a grouping expression in a step",
            "S0210": "Each step can only have one grouping expression",
            "S0211": "The symbol {{token}} cannot be used as a unary operator",
            "S0212": "The left side of := must be a variable name (start with $)",
            "S0213": "The literal value {{value}} cannot be used as a step within a path expression",
            "S0214": "The right side of {{token}} must be a variable name (start with $)",
            "S0215": "A context variable binding must precede any predicates on a step",
            "S0216": "A context variable binding must precede the 'order-by' clause on a step",
            "S0217": "The object representing the 'parent' cannot be derived from this expression",
            "S0301": "Empty regular expressions are not allowed",
            "S0302": "No terminating / in regular expression",
            "S0402": "Choice groups containing parameterized types are not supported",
            "S0401": "Type parameters can only be applied to functions and arrays",
            "S0500": "Attempted to evaluate an expression containing syntax error(s)",
            "T0410": "Argument {{index}} of function {{token}} does not match function signature",
            "T0411": "Context value is not a compatible type with argument {{index}} of function {{token}}",
            "T0412": "Argument {{index}} of function {{token}} must be an array of {{type}}",
            "D1001": "Number out of range: {{value}}",
            "D1002": "Cannot negate a non-numeric value: {{value}}",
            "T1003": "Key in object structure must evaluate to a string; got: {{value}}",
            "D1004": "Regular expression matches zero length string",
            "T1005": "Attempted to invoke a non-function. Did you mean ${{{token}}}?",
            "T1006": "Attempted to invoke a non-function",
            "T1007": "Attempted to partially apply a non-function. Did you mean ${{{token}}}?",
            "T1008": "Attempted to partially apply a non-function",
            "D1009": "Multiple key definitions evaluate to same key: {{value}}",
            "T1010": "The matcher function argument passed to function {{token}} does not return the correct object structure",
            "T2001": "The left side of the {{token}} operator must evaluate to a number",
            "T2002": "The right side of the {{token}} operator must evaluate to a number",
            "T2003": "The left side of the range operator (..) must evaluate to an integer",
            "T2004": "The right side of the range operator (..) must evaluate to an integer",
            "D2005": "The left side of := must be a variable name (start with $)",
            // defunct - replaced by S0212 parser error
            "T2006": "The right side of the function application operator ~> must be a function",
            "T2007": "Type mismatch when comparing values {{value}} and {{value2}} in order-by clause",
            "T2008": "The expressions within an order-by clause must evaluate to numeric or string values",
            "T2009": "The values {{value}} and {{value2}} either side of operator {{token}} must be of the same data type",
            "T2010": "The expressions either side of operator {{token}} must evaluate to numeric or string values",
            "T2011": "The insert/update clause of the transform expression must evaluate to an object: {{value}}",
            "T2012": "The delete clause of the transform expression must evaluate to a string or array of strings: {{value}}",
            "T2013": "The transform expression clones the input object using the $clone() function.  This has been overridden in the current scope by a non-function.",
            "D2014": "The size of the sequence allocated by the range operator (..) must not exceed 1e6.  Attempted to allocate {{value}}.",
            "D3001": "Attempting to invoke string function on Infinity or NaN",
            "D3010": "Second argument of replace function cannot be an empty string",
            "D3011": "Fourth argument of replace function must evaluate to a positive number",
            "D3012": "Attempted to replace a matched string with a non-string value",
            "D3020": "Third argument of split function must evaluate to a positive number",
            "D3030": "Unable to cast value to a number: {{value}}",
            "D3040": "Third argument of match function must evaluate to a positive number",
            "D3050": "The second argument of reduce function must be a function with at least two arguments",
            "D3060": "The sqrt function cannot be applied to a negative number: {{value}}",
            "D3061": "The power function has resulted in a value that cannot be represented as a JSON number: base={{value}}, exponent={{exp}}",
            "D3070": "The single argument form of the sort function can only be applied to an array of strings or an array of numbers.  Use the second argument to specify a comparison function",
            "D3080": "The picture string must only contain a maximum of two sub-pictures",
            "D3081": "The sub-picture must not contain more than one instance of the 'decimal-separator' character",
            "D3082": "The sub-picture must not contain more than one instance of the 'percent' character",
            "D3083": "The sub-picture must not contain more than one instance of the 'per-mille' character",
            "D3084": "The sub-picture must not contain both a 'percent' and a 'per-mille' character",
            "D3085": "The mantissa part of a sub-picture must contain at least one character that is either an 'optional digit character' or a member of the 'decimal digit family'",
            "D3086": "The sub-picture must not contain a passive character that is preceded by an active character and that is followed by another active character",
            "D3087": "The sub-picture must not contain a 'grouping-separator' character that appears adjacent to a 'decimal-separator' character",
            "D3088": "The sub-picture must not contain a 'grouping-separator' at the end of the integer part",
            "D3089": "The sub-picture must not contain two adjacent instances of the 'grouping-separator' character",
            "D3090": "The integer part of the sub-picture must not contain a member of the 'decimal digit family' that is followed by an instance of the 'optional digit character'",
            "D3091": "The fractional part of the sub-picture must not contain an instance of the 'optional digit character' that is followed by a member of the 'decimal digit family'",
            "D3092": "A sub-picture that contains a 'percent' or 'per-mille' character must not contain a character treated as an 'exponent-separator'",
            "D3093": "The exponent part of the sub-picture must comprise only of one or more characters that are members of the 'decimal digit family'",
            "D3100": "The radix of the formatBase function must be between 2 and 36.  It was given {{value}}",
            "D3110": "The argument of the toMillis function must be an ISO 8601 formatted timestamp. Given {{value}}",
            "D3120": "Syntax error in expression passed to function eval: {{value}}",
            "D3121": "Dynamic error evaluating the expression passed to function eval: {{value}}",
            "D3130": "Formatting or parsing an integer as a sequence starting with {{value}} is not supported by this implementation",
            "D3131": "In a decimal digit pattern, all digits must be from the same decimal group",
            "D3132": "Unknown component specifier {{value}} in date/time picture string",
            "D3133": "The 'name' modifier can only be applied to months and days in the date/time picture string, not {{value}}",
            "D3134": "The timezone integer format specifier cannot have more than four digits",
            "D3135": "No matching closing bracket ']' in date/time picture string",
            "D3136": "The date/time picture string is missing specifiers required to parse the timestamp",
            "D3137": "{{{message}}}",
            "D3138": "The $single() function expected exactly 1 matching result.  Instead it matched more.",
            "D3139": "The $single() function expected exactly 1 matching result.  Instead it matched 0.",
            "D3140": "Malformed URL passed to ${{{functionName}}}(): {{value}}",
            "D3141": "{{{message}}}"
          };
          function populateMessage(err) {
            var template = errorCodes[err.code];
            if (typeof template !== "undefined") {
              var message = template.replace(/\{\{\{([^}]+)}}}/g, function() {
                return err[arguments[1]];
              });
              message = message.replace(/\{\{([^}]+)}}/g, function() {
                return JSON.stringify(err[arguments[1]]);
              });
              err.message = message;
            }
          }
          function jsonata2(expr, options2) {
            var ast;
            var errors;
            try {
              ast = parser(expr, options2 && options2.recover);
              errors = ast.errors;
              delete ast.errors;
            } catch (err) {
              populateMessage(err);
              throw err;
            }
            var environment = createFrame(staticFrame);
            var timestamp = /* @__PURE__ */ new Date();
            environment.bind("now", defineFunction(function(picture, timezone) {
              return datetime.fromMillis(timestamp.getTime(), picture, timezone);
            }, "<s?s?:s>"));
            environment.bind("millis", defineFunction(function() {
              return timestamp.getTime();
            }, "<:n>"));
            if (options2 && options2.RegexEngine) {
              jsonata2.RegexEngine = options2.RegexEngine;
            } else {
              jsonata2.RegexEngine = RegExp;
            }
            return {
              evaluate: async function(input, bindings, callback) {
                if (typeof errors !== "undefined") {
                  var err = {
                    code: "S0500",
                    position: 0
                  };
                  populateMessage(err);
                  throw err;
                }
                if (typeof bindings !== "undefined") {
                  var exec_env;
                  exec_env = createFrame(environment);
                  for (var v2 in bindings) {
                    exec_env.bind(v2, bindings[v2]);
                  }
                } else {
                  exec_env = environment;
                }
                exec_env.bind("$", input);
                timestamp = /* @__PURE__ */ new Date();
                exec_env.timestamp = timestamp;
                if (Array.isArray(input) && !isSequence(input)) {
                  input = createSequence(input);
                  input.outerWrapper = true;
                }
                var it;
                try {
                  it = await evaluate(ast, input, exec_env);
                  if (typeof callback === "function") {
                    callback(null, it);
                  }
                  return it;
                } catch (err2) {
                  populateMessage(err2);
                  throw err2;
                }
              },
              assign: function(name, value) {
                environment.bind(name, value);
              },
              registerFunction: function(name, implementation, signature) {
                var func = defineFunction(implementation, signature);
                environment.bind(name, func);
              },
              ast: function() {
                return ast;
              },
              errors: function() {
                return errors;
              }
            };
          }
          jsonata2.parser = parser;
          return jsonata2;
        }();
        module3.exports = jsonata;
      }, { "./datetime": 1, "./functions": 2, "./parser": 4, "./signature": 5, "./utils": 6 }], 4: [function(require2, module3, exports3) {
        var parseSignature = require2("./signature");
        const parser = (() => {
          "use strict";
          var operators = {
            ".": 75,
            "[": 80,
            "]": 0,
            "{": 70,
            "}": 0,
            "(": 80,
            ")": 0,
            ",": 0,
            "@": 80,
            "#": 80,
            ";": 80,
            ":": 80,
            "?": 20,
            "+": 50,
            "-": 50,
            "*": 60,
            "/": 60,
            "%": 60,
            "|": 20,
            "=": 40,
            "<": 40,
            ">": 40,
            "^": 40,
            "**": 60,
            "..": 20,
            ":=": 10,
            "!=": 40,
            "<=": 40,
            ">=": 40,
            "~>": 40,
            "and": 30,
            "or": 25,
            "in": 40,
            "&": 50,
            "!": 0,
            // not an operator, but needed as a stop character for name tokens
            "~": 0
            // not an operator, but needed as a stop character for name tokens
          };
          var escapes = {
            // JSON string escape sequences - see json.org
            '"': '"',
            "\\": "\\",
            "/": "/",
            "b": "\b",
            "f": "\f",
            "n": "\n",
            "r": "\r",
            "t": "	"
          };
          var tokenizer = function(path) {
            var position = 0;
            var length = path.length;
            var create = function(type, value) {
              var obj = { type, value, position };
              return obj;
            };
            var scanRegex = function() {
              var start = position;
              var depth = 0;
              var pattern;
              var flags;
              var isClosingSlash = function(position2) {
                if (path.charAt(position2) === "/" && depth === 0) {
                  var backslashCount = 0;
                  while (path.charAt(position2 - (backslashCount + 1)) === "\\") {
                    backslashCount++;
                  }
                  if (backslashCount % 2 === 0) {
                    return true;
                  }
                }
                return false;
              };
              while (position < length) {
                var currentChar = path.charAt(position);
                if (isClosingSlash(position)) {
                  pattern = path.substring(start, position);
                  if (pattern === "") {
                    throw {
                      code: "S0301",
                      stack: new Error().stack,
                      position
                    };
                  }
                  position++;
                  currentChar = path.charAt(position);
                  start = position;
                  while (currentChar === "i" || currentChar === "m") {
                    position++;
                    currentChar = path.charAt(position);
                  }
                  flags = path.substring(start, position) + "g";
                  return new RegExp(pattern, flags);
                }
                if ((currentChar === "(" || currentChar === "[" || currentChar === "{") && path.charAt(position - 1) !== "\\") {
                  depth++;
                }
                if ((currentChar === ")" || currentChar === "]" || currentChar === "}") && path.charAt(position - 1) !== "\\") {
                  depth--;
                }
                position++;
              }
              throw {
                code: "S0302",
                stack: new Error().stack,
                position
              };
            };
            var next = function(prefix) {
              if (position >= length)
                return null;
              var currentChar = path.charAt(position);
              while (position < length && " 	\n\r\v".indexOf(currentChar) > -1) {
                position++;
                currentChar = path.charAt(position);
              }
              if (currentChar === "/" && path.charAt(position + 1) === "*") {
                var commentStart = position;
                position += 2;
                currentChar = path.charAt(position);
                while (!(currentChar === "*" && path.charAt(position + 1) === "/")) {
                  currentChar = path.charAt(++position);
                  if (position >= length) {
                    throw {
                      code: "S0106",
                      stack: new Error().stack,
                      position: commentStart
                    };
                  }
                }
                position += 2;
                currentChar = path.charAt(position);
                return next(prefix);
              }
              if (prefix !== true && currentChar === "/") {
                position++;
                return create("regex", scanRegex());
              }
              if (currentChar === "." && path.charAt(position + 1) === ".") {
                position += 2;
                return create("operator", "..");
              }
              if (currentChar === ":" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ":=");
              }
              if (currentChar === "!" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "!=");
              }
              if (currentChar === ">" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ">=");
              }
              if (currentChar === "<" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "<=");
              }
              if (currentChar === "*" && path.charAt(position + 1) === "*") {
                position += 2;
                return create("operator", "**");
              }
              if (currentChar === "~" && path.charAt(position + 1) === ">") {
                position += 2;
                return create("operator", "~>");
              }
              if (Object.prototype.hasOwnProperty.call(operators, currentChar)) {
                position++;
                return create("operator", currentChar);
              }
              if (currentChar === '"' || currentChar === "'") {
                var quoteType = currentChar;
                position++;
                var qstr = "";
                while (position < length) {
                  currentChar = path.charAt(position);
                  if (currentChar === "\\") {
                    position++;
                    currentChar = path.charAt(position);
                    if (Object.prototype.hasOwnProperty.call(escapes, currentChar)) {
                      qstr += escapes[currentChar];
                    } else if (currentChar === "u") {
                      var octets = path.substr(position + 1, 4);
                      if (/^[0-9a-fA-F]+$/.test(octets)) {
                        var codepoint = parseInt(octets, 16);
                        qstr += String.fromCharCode(codepoint);
                        position += 4;
                      } else {
                        throw {
                          code: "S0104",
                          stack: new Error().stack,
                          position
                        };
                      }
                    } else {
                      throw {
                        code: "S0103",
                        stack: new Error().stack,
                        position,
                        token: currentChar
                      };
                    }
                  } else if (currentChar === quoteType) {
                    position++;
                    return create("string", qstr);
                  } else {
                    qstr += currentChar;
                  }
                  position++;
                }
                throw {
                  code: "S0101",
                  stack: new Error().stack,
                  position
                };
              }
              var numregex = /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?/;
              var match = numregex.exec(path.substring(position));
              if (match !== null) {
                var num = parseFloat(match[0]);
                if (!isNaN(num) && isFinite(num)) {
                  position += match[0].length;
                  return create("number", num);
                } else {
                  throw {
                    code: "S0102",
                    stack: new Error().stack,
                    position,
                    token: match[0]
                  };
                }
              }
              var name;
              if (currentChar === "`") {
                position++;
                var end = path.indexOf("`", position);
                if (end !== -1) {
                  name = path.substring(position, end);
                  position = end + 1;
                  return create("name", name);
                }
                position = length;
                throw {
                  code: "S0105",
                  stack: new Error().stack,
                  position
                };
              }
              var i = position;
              var ch;
              for (; ; ) {
                ch = path.charAt(i);
                if (i === length || " 	\n\r\v".indexOf(ch) > -1 || Object.prototype.hasOwnProperty.call(operators, ch)) {
                  if (path.charAt(position) === "$") {
                    name = path.substring(position + 1, i);
                    position = i;
                    return create("variable", name);
                  } else {
                    name = path.substring(position, i);
                    position = i;
                    switch (name) {
                      case "or":
                      case "in":
                      case "and":
                        return create("operator", name);
                      case "true":
                        return create("value", true);
                      case "false":
                        return create("value", false);
                      case "null":
                        return create("value", null);
                      default:
                        if (position === length && name === "") {
                          return null;
                        }
                        return create("name", name);
                    }
                  }
                } else {
                  i++;
                }
              }
            };
            return next;
          };
          var parser2 = function(source, recover) {
            var node;
            var lexer;
            var symbol_table = {};
            var errors = [];
            var remainingTokens = function() {
              var remaining = [];
              if (node.id !== "(end)") {
                remaining.push({ type: node.type, value: node.value, position: node.position });
              }
              var nxt = lexer();
              while (nxt !== null) {
                remaining.push(nxt);
                nxt = lexer();
              }
              return remaining;
            };
            var base_symbol = {
              nud: function() {
                var err2 = {
                  code: "S0211",
                  token: this.value,
                  position: this.position
                };
                if (recover) {
                  err2.remaining = remainingTokens();
                  err2.type = "error";
                  errors.push(err2);
                  return err2;
                } else {
                  err2.stack = new Error().stack;
                  throw err2;
                }
              }
            };
            var symbol2 = function(id, bp) {
              var s3 = symbol_table[id];
              bp = bp || 0;
              if (s3) {
                if (bp >= s3.lbp) {
                  s3.lbp = bp;
                }
              } else {
                s3 = Object.create(base_symbol);
                s3.id = s3.value = id;
                s3.lbp = bp;
                symbol_table[id] = s3;
              }
              return s3;
            };
            var handleError = function(err2) {
              if (recover) {
                err2.remaining = remainingTokens();
                errors.push(err2);
                var symbol3 = symbol_table["(error)"];
                node = Object.create(symbol3);
                node.error = err2;
                node.type = "(error)";
                return node;
              } else {
                err2.stack = new Error().stack;
                throw err2;
              }
            };
            var advance = function(id, infix2) {
              if (id && node.id !== id) {
                var code;
                if (node.id === "(end)") {
                  code = "S0203";
                } else {
                  code = "S0202";
                }
                var err2 = {
                  code,
                  position: node.position,
                  token: node.value,
                  value: id
                };
                return handleError(err2);
              }
              var next_token = lexer(infix2);
              if (next_token === null) {
                node = symbol_table["(end)"];
                node.position = source.length;
                return node;
              }
              var value = next_token.value;
              var type = next_token.type;
              var symbol3;
              switch (type) {
                case "name":
                case "variable":
                  symbol3 = symbol_table["(name)"];
                  break;
                case "operator":
                  symbol3 = symbol_table[value];
                  if (!symbol3) {
                    return handleError({
                      code: "S0204",
                      stack: new Error().stack,
                      position: next_token.position,
                      token: value
                    });
                  }
                  break;
                case "string":
                case "number":
                case "value":
                  symbol3 = symbol_table["(literal)"];
                  break;
                case "regex":
                  type = "regex";
                  symbol3 = symbol_table["(regex)"];
                  break;
                default:
                  return handleError({
                    code: "S0205",
                    stack: new Error().stack,
                    position: next_token.position,
                    token: value
                  });
              }
              node = Object.create(symbol3);
              node.value = value;
              node.type = type;
              node.position = next_token.position;
              return node;
            };
            var expression = function(rbp) {
              var left;
              var t = node;
              advance(null, true);
              left = t.nud();
              while (rbp < node.lbp) {
                t = node;
                advance();
                left = t.led(left);
              }
              return left;
            };
            var terminal = function(id) {
              var s3 = symbol2(id, 0);
              s3.nud = function() {
                return this;
              };
            };
            var infix = function(id, bp, led) {
              var bindingPower = bp || operators[id];
              var s3 = symbol2(id, bindingPower);
              s3.led = led || function(left) {
                this.lhs = left;
                this.rhs = expression(bindingPower);
                this.type = "binary";
                return this;
              };
              return s3;
            };
            var infixr = function(id, bp, led) {
              var s3 = symbol2(id, bp);
              s3.led = led;
              return s3;
            };
            var prefix = function(id, nud) {
              var s3 = symbol2(id);
              s3.nud = nud || function() {
                this.expression = expression(70);
                this.type = "unary";
                return this;
              };
              return s3;
            };
            terminal("(end)");
            terminal("(name)");
            terminal("(literal)");
            terminal("(regex)");
            symbol2(":");
            symbol2(";");
            symbol2(",");
            symbol2(")");
            symbol2("]");
            symbol2("}");
            symbol2("..");
            infix(".");
            infix("+");
            infix("-");
            infix("*");
            infix("/");
            infix("%");
            infix("=");
            infix("<");
            infix(">");
            infix("!=");
            infix("<=");
            infix(">=");
            infix("&");
            infix("and");
            infix("or");
            infix("in");
            terminal("and");
            terminal("or");
            terminal("in");
            prefix("-");
            infix("~>");
            infixr("(error)", 10, function(left) {
              this.lhs = left;
              this.error = node.error;
              this.remaining = remainingTokens();
              this.type = "error";
              return this;
            });
            prefix("*", function() {
              this.type = "wildcard";
              return this;
            });
            prefix("**", function() {
              this.type = "descendant";
              return this;
            });
            prefix("%", function() {
              this.type = "parent";
              return this;
            });
            infix("(", operators["("], function(left) {
              this.procedure = left;
              this.type = "function";
              this.arguments = [];
              if (node.id !== ")") {
                for (; ; ) {
                  if (node.type === "operator" && node.id === "?") {
                    this.type = "partial";
                    this.arguments.push(node);
                    advance("?");
                  } else {
                    this.arguments.push(expression(0));
                  }
                  if (node.id !== ",")
                    break;
                  advance(",");
                }
              }
              advance(")", true);
              if (left.type === "name" && (left.value === "function" || left.value === "\u03BB")) {
                this.arguments.forEach(function(arg, index) {
                  if (arg.type !== "variable") {
                    return handleError({
                      code: "S0208",
                      stack: new Error().stack,
                      position: arg.position,
                      token: arg.value,
                      value: index + 1
                    });
                  }
                });
                this.type = "lambda";
                if (node.id === "<") {
                  var sigPos = node.position;
                  var depth = 1;
                  var sig = "<";
                  while (depth > 0 && node.id !== "{" && node.id !== "(end)") {
                    var tok = advance();
                    if (tok.id === ">") {
                      depth--;
                    } else if (tok.id === "<") {
                      depth++;
                    }
                    sig += tok.value;
                  }
                  advance(">");
                  try {
                    this.signature = parseSignature(sig);
                  } catch (err2) {
                    err2.position = sigPos + err2.offset;
                    return handleError(err2);
                  }
                }
                advance("{");
                this.body = expression(0);
                advance("}");
              }
              return this;
            });
            prefix("(", function() {
              var expressions = [];
              while (node.id !== ")") {
                expressions.push(expression(0));
                if (node.id !== ";") {
                  break;
                }
                advance(";");
              }
              advance(")", true);
              this.type = "block";
              this.expressions = expressions;
              return this;
            });
            prefix("[", function() {
              var a = [];
              if (node.id !== "]") {
                for (; ; ) {
                  var item = expression(0);
                  if (node.id === "..") {
                    var range = { type: "binary", value: "..", position: node.position, lhs: item };
                    advance("..");
                    range.rhs = expression(0);
                    item = range;
                  }
                  a.push(item);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("]", true);
              this.expressions = a;
              this.type = "unary";
              return this;
            });
            infix("[", operators["["], function(left) {
              if (node.id === "]") {
                var step = left;
                while (step && step.type === "binary" && step.value === "[") {
                  step = step.lhs;
                }
                step.keepArray = true;
                advance("]");
                return left;
              } else {
                this.lhs = left;
                this.rhs = expression(operators["]"]);
                this.type = "binary";
                advance("]", true);
                return this;
              }
            });
            infix("^", operators["^"], function(left) {
              advance("(");
              var terms = [];
              for (; ; ) {
                var term = {
                  descending: false
                };
                if (node.id === "<") {
                  advance("<");
                } else if (node.id === ">") {
                  term.descending = true;
                  advance(">");
                } else {
                }
                term.expression = expression(0);
                terms.push(term);
                if (node.id !== ",") {
                  break;
                }
                advance(",");
              }
              advance(")");
              this.lhs = left;
              this.rhs = terms;
              this.type = "binary";
              return this;
            });
            var objectParser = function(left) {
              var a = [];
              if (node.id !== "}") {
                for (; ; ) {
                  var n = expression(0);
                  advance(":");
                  var v2 = expression(0);
                  a.push([n, v2]);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("}", true);
              if (typeof left === "undefined") {
                this.lhs = a;
                this.type = "unary";
              } else {
                this.lhs = left;
                this.rhs = a;
                this.type = "binary";
              }
              return this;
            };
            prefix("{", objectParser);
            infix("{", operators["{"], objectParser);
            infixr(":=", operators[":="], function(left) {
              if (left.type !== "variable") {
                return handleError({
                  code: "S0212",
                  stack: new Error().stack,
                  position: left.position,
                  token: left.value
                });
              }
              this.lhs = left;
              this.rhs = expression(operators[":="] - 1);
              this.type = "binary";
              return this;
            });
            infix("@", operators["@"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["@"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "@"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("#", operators["#"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["#"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "#"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("?", operators["?"], function(left) {
              this.type = "condition";
              this.condition = left;
              this.then = expression(0);
              if (node.id === ":") {
                advance(":");
                this.else = expression(0);
              }
              return this;
            });
            prefix("|", function() {
              this.type = "transform";
              this.pattern = expression(0);
              advance("|");
              this.update = expression(0);
              if (node.id === ",") {
                advance(",");
                this.delete = expression(0);
              }
              advance("|");
              return this;
            });
            var tailCallOptimize = function(expr2) {
              var result;
              if (expr2.type === "function" && !expr2.predicate) {
                var thunk = { type: "lambda", thunk: true, arguments: [], position: expr2.position };
                thunk.body = expr2;
                result = thunk;
              } else if (expr2.type === "condition") {
                expr2.then = tailCallOptimize(expr2.then);
                if (typeof expr2.else !== "undefined") {
                  expr2.else = tailCallOptimize(expr2.else);
                }
                result = expr2;
              } else if (expr2.type === "block") {
                var length = expr2.expressions.length;
                if (length > 0) {
                  expr2.expressions[length - 1] = tailCallOptimize(expr2.expressions[length - 1]);
                }
                result = expr2;
              } else {
                result = expr2;
              }
              return result;
            };
            var ancestorLabel = 0;
            var ancestorIndex = 0;
            var ancestry = [];
            var seekParent = function(node2, slot) {
              switch (node2.type) {
                case "name":
                case "wildcard":
                  slot.level--;
                  if (slot.level === 0) {
                    if (typeof node2.ancestor === "undefined") {
                      node2.ancestor = slot;
                    } else {
                      ancestry[slot.index].slot.label = node2.ancestor.label;
                      node2.ancestor = slot;
                    }
                    node2.tuple = true;
                  }
                  break;
                case "parent":
                  slot.level++;
                  break;
                case "block":
                  if (node2.expressions.length > 0) {
                    node2.tuple = true;
                    slot = seekParent(node2.expressions[node2.expressions.length - 1], slot);
                  }
                  break;
                case "path":
                  node2.tuple = true;
                  var index = node2.steps.length - 1;
                  slot = seekParent(node2.steps[index--], slot);
                  while (slot.level > 0 && index >= 0) {
                    slot = seekParent(node2.steps[index--], slot);
                  }
                  break;
                default:
                  throw {
                    code: "S0217",
                    token: node2.type,
                    position: node2.position
                  };
              }
              return slot;
            };
            var pushAncestry = function(result, value) {
              if (typeof value.seekingParent !== "undefined" || value.type === "parent") {
                var slots = typeof value.seekingParent !== "undefined" ? value.seekingParent : [];
                if (value.type === "parent") {
                  slots.push(value.slot);
                }
                if (typeof result.seekingParent === "undefined") {
                  result.seekingParent = slots;
                } else {
                  Array.prototype.push.apply(result.seekingParent, slots);
                }
              }
            };
            var resolveAncestry = function(path) {
              var index = path.steps.length - 1;
              var laststep = path.steps[index];
              var slots = typeof laststep.seekingParent !== "undefined" ? laststep.seekingParent : [];
              if (laststep.type === "parent") {
                slots.push(laststep.slot);
              }
              for (var is = 0; is < slots.length; is++) {
                var slot = slots[is];
                index = path.steps.length - 2;
                while (slot.level > 0) {
                  if (index < 0) {
                    if (typeof path.seekingParent === "undefined") {
                      path.seekingParent = [slot];
                    } else {
                      path.seekingParent.push(slot);
                    }
                    break;
                  }
                  var step = path.steps[index--];
                  while (index >= 0 && step.focus && path.steps[index].focus) {
                    step = path.steps[index--];
                  }
                  slot = seekParent(step, slot);
                }
              }
            };
            var processAST = function(expr2) {
              var result;
              switch (expr2.type) {
                case "binary":
                  switch (expr2.value) {
                    case ".":
                      var lstep = processAST(expr2.lhs);
                      if (lstep.type === "path") {
                        result = lstep;
                      } else {
                        result = { type: "path", steps: [lstep] };
                      }
                      if (lstep.type === "parent") {
                        result.seekingParent = [lstep.slot];
                      }
                      var rest = processAST(expr2.rhs);
                      if (rest.type === "function" && rest.procedure.type === "path" && rest.procedure.steps.length === 1 && rest.procedure.steps[0].type === "name" && result.steps[result.steps.length - 1].type === "function") {
                        result.steps[result.steps.length - 1].nextFunction = rest.procedure.steps[0].value;
                      }
                      if (rest.type === "path") {
                        Array.prototype.push.apply(result.steps, rest.steps);
                      } else {
                        if (typeof rest.predicate !== "undefined") {
                          rest.stages = rest.predicate;
                          delete rest.predicate;
                        }
                        result.steps.push(rest);
                      }
                      result.steps.filter(function(step2) {
                        if (step2.type === "number" || step2.type === "value") {
                          throw {
                            code: "S0213",
                            stack: new Error().stack,
                            position: step2.position,
                            value: step2.value
                          };
                        }
                        return step2.type === "string";
                      }).forEach(function(lit) {
                        lit.type = "name";
                      });
                      if (result.steps.filter(function(step2) {
                        return step2.keepArray === true;
                      }).length > 0) {
                        result.keepSingletonArray = true;
                      }
                      var firststep = result.steps[0];
                      if (firststep.type === "unary" && firststep.value === "[") {
                        firststep.consarray = true;
                      }
                      var laststep = result.steps[result.steps.length - 1];
                      if (laststep.type === "unary" && laststep.value === "[") {
                        laststep.consarray = true;
                      }
                      resolveAncestry(result);
                      break;
                    case "[":
                      result = processAST(expr2.lhs);
                      var step = result;
                      var type = "predicate";
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                        type = "stages";
                      }
                      if (typeof step.group !== "undefined") {
                        throw {
                          code: "S0209",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (typeof step[type] === "undefined") {
                        step[type] = [];
                      }
                      var predicate = processAST(expr2.rhs);
                      if (typeof predicate.seekingParent !== "undefined") {
                        predicate.seekingParent.forEach((slot) => {
                          if (slot.level === 1) {
                            seekParent(step, slot);
                          } else {
                            slot.level--;
                          }
                        });
                        pushAncestry(step, predicate);
                      }
                      step[type].push({ type: "filter", expr: predicate, position: expr2.position });
                      break;
                    case "{":
                      result = processAST(expr2.lhs);
                      if (typeof result.group !== "undefined") {
                        throw {
                          code: "S0210",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      result.group = {
                        lhs: expr2.rhs.map(function(pair) {
                          return [processAST(pair[0]), processAST(pair[1])];
                        }),
                        position: expr2.position
                      };
                      break;
                    case "^":
                      result = processAST(expr2.lhs);
                      if (result.type !== "path") {
                        result = { type: "path", steps: [result] };
                      }
                      var sortStep = { type: "sort", position: expr2.position };
                      sortStep.terms = expr2.rhs.map(function(terms) {
                        var expression2 = processAST(terms.expression);
                        pushAncestry(sortStep, expression2);
                        return {
                          descending: terms.descending,
                          expression: expression2
                        };
                      });
                      result.steps.push(sortStep);
                      resolveAncestry(result);
                      break;
                    case ":=":
                      result = { type: "bind", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.rhs);
                      break;
                    case "@":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      }
                      if (typeof step.stages !== "undefined" || typeof step.predicate !== "undefined") {
                        throw {
                          code: "S0215",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (step.type === "sort") {
                        throw {
                          code: "S0216",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (expr2.keepArray) {
                        step.keepArray = true;
                      }
                      step.focus = expr2.rhs.value;
                      step.tuple = true;
                      break;
                    case "#":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      } else {
                        result = { type: "path", steps: [result] };
                        if (typeof step.predicate !== "undefined") {
                          step.stages = step.predicate;
                          delete step.predicate;
                        }
                      }
                      if (typeof step.stages === "undefined") {
                        step.index = expr2.rhs.value;
                      } else {
                        step.stages.push({ type: "index", value: expr2.rhs.value, position: expr2.position });
                      }
                      step.tuple = true;
                      break;
                    case "~>":
                      result = { type: "apply", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      break;
                    default:
                      result = { type: expr2.type, value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.lhs);
                      pushAncestry(result, result.rhs);
                  }
                  break;
                case "unary":
                  result = { type: expr2.type, value: expr2.value, position: expr2.position };
                  if (expr2.value === "[") {
                    result.expressions = expr2.expressions.map(function(item) {
                      var value = processAST(item);
                      pushAncestry(result, value);
                      return value;
                    });
                  } else if (expr2.value === "{") {
                    result.lhs = expr2.lhs.map(function(pair) {
                      var key = processAST(pair[0]);
                      pushAncestry(result, key);
                      var value = processAST(pair[1]);
                      pushAncestry(result, value);
                      return [key, value];
                    });
                  } else {
                    result.expression = processAST(expr2.expression);
                    if (expr2.value === "-" && result.expression.type === "number") {
                      result = result.expression;
                      result.value = -result.value;
                    } else {
                      pushAncestry(result, result.expression);
                    }
                  }
                  break;
                case "function":
                case "partial":
                  result = { type: expr2.type, name: expr2.name, value: expr2.value, position: expr2.position };
                  result.arguments = expr2.arguments.map(function(arg) {
                    var argAST = processAST(arg);
                    pushAncestry(result, argAST);
                    return argAST;
                  });
                  result.procedure = processAST(expr2.procedure);
                  break;
                case "lambda":
                  result = {
                    type: expr2.type,
                    arguments: expr2.arguments,
                    signature: expr2.signature,
                    position: expr2.position
                  };
                  var body = processAST(expr2.body);
                  result.body = tailCallOptimize(body);
                  break;
                case "condition":
                  result = { type: expr2.type, position: expr2.position };
                  result.condition = processAST(expr2.condition);
                  pushAncestry(result, result.condition);
                  result.then = processAST(expr2.then);
                  pushAncestry(result, result.then);
                  if (typeof expr2.else !== "undefined") {
                    result.else = processAST(expr2.else);
                    pushAncestry(result, result.else);
                  }
                  break;
                case "transform":
                  result = { type: expr2.type, position: expr2.position };
                  result.pattern = processAST(expr2.pattern);
                  result.update = processAST(expr2.update);
                  if (typeof expr2.delete !== "undefined") {
                    result.delete = processAST(expr2.delete);
                  }
                  break;
                case "block":
                  result = { type: expr2.type, position: expr2.position };
                  result.expressions = expr2.expressions.map(function(item) {
                    var part = processAST(item);
                    pushAncestry(result, part);
                    if (part.consarray || part.type === "path" && part.steps[0].consarray) {
                      result.consarray = true;
                    }
                    return part;
                  });
                  break;
                case "name":
                  result = { type: "path", steps: [expr2] };
                  if (expr2.keepArray) {
                    result.keepSingletonArray = true;
                  }
                  break;
                case "parent":
                  result = { type: "parent", slot: { label: "!" + ancestorLabel++, level: 1, index: ancestorIndex++ } };
                  ancestry.push(result);
                  break;
                case "string":
                case "number":
                case "value":
                case "wildcard":
                case "descendant":
                case "variable":
                case "regex":
                  result = expr2;
                  break;
                case "operator":
                  if (expr2.value === "and" || expr2.value === "or" || expr2.value === "in") {
                    expr2.type = "name";
                    result = processAST(expr2);
                  } else if (expr2.value === "?") {
                    result = expr2;
                  } else {
                    throw {
                      code: "S0201",
                      stack: new Error().stack,
                      position: expr2.position,
                      token: expr2.value
                    };
                  }
                  break;
                case "error":
                  result = expr2;
                  if (expr2.lhs) {
                    result = processAST(expr2.lhs);
                  }
                  break;
                default:
                  var code = "S0206";
                  if (expr2.id === "(end)") {
                    code = "S0207";
                  }
                  var err2 = {
                    code,
                    position: expr2.position,
                    token: expr2.value
                  };
                  if (recover) {
                    errors.push(err2);
                    return { type: "error", error: err2 };
                  } else {
                    err2.stack = new Error().stack;
                    throw err2;
                  }
              }
              if (expr2.keepArray) {
                result.keepArray = true;
              }
              return result;
            };
            lexer = tokenizer(source);
            advance();
            var expr = expression(0);
            if (node.id !== "(end)") {
              var err = {
                code: "S0201",
                position: node.position,
                token: node.value
              };
              handleError(err);
            }
            expr = processAST(expr);
            if (expr.type === "parent" || typeof expr.seekingParent !== "undefined") {
              throw {
                code: "S0217",
                token: expr.type,
                position: expr.position
              };
            }
            if (errors.length > 0) {
              expr.errors = errors;
            }
            return expr;
          };
          return parser2;
        })();
        module3.exports = parser;
      }, { "./signature": 5 }], 5: [function(require2, module3, exports3) {
        var utils = require2("./utils");
        const signature = (() => {
          "use strict";
          var arraySignatureMapping = {
            "a": "arrays",
            "b": "booleans",
            "f": "functions",
            "n": "numbers",
            "o": "objects",
            "s": "strings"
          };
          function parseSignature(signature2) {
            var position = 1;
            var params = [];
            var param = {};
            var prevParam = param;
            while (position < signature2.length) {
              var symbol2 = signature2.charAt(position);
              if (symbol2 === ":") {
                break;
              }
              var next = function() {
                params.push(param);
                prevParam = param;
                param = {};
              };
              var findClosingBracket = function(str, start, openSymbol, closeSymbol) {
                var depth = 1;
                var position2 = start;
                while (position2 < str.length) {
                  position2++;
                  symbol2 = str.charAt(position2);
                  if (symbol2 === closeSymbol) {
                    depth--;
                    if (depth === 0) {
                      break;
                    }
                  } else if (symbol2 === openSymbol) {
                    depth++;
                  }
                }
                return position2;
              };
              switch (symbol2) {
                case "s":
                case "n":
                case "b":
                case "l":
                case "o":
                  param.regex = "[" + symbol2 + "m]";
                  param.type = symbol2;
                  next();
                  break;
                case "a":
                  param.regex = "[asnblfom]";
                  param.type = symbol2;
                  param.array = true;
                  next();
                  break;
                case "f":
                  param.regex = "f";
                  param.type = symbol2;
                  next();
                  break;
                case "j":
                  param.regex = "[asnblom]";
                  param.type = symbol2;
                  next();
                  break;
                case "x":
                  param.regex = "[asnblfom]";
                  param.type = symbol2;
                  next();
                  break;
                case "-":
                  prevParam.context = true;
                  prevParam.contextRegex = new RegExp(prevParam.regex);
                  prevParam.regex += "?";
                  break;
                case "?":
                case "+":
                  prevParam.regex += symbol2;
                  break;
                case "(":
                  var endParen = findClosingBracket(signature2, position, "(", ")");
                  var choice = signature2.substring(position + 1, endParen);
                  if (choice.indexOf("<") === -1) {
                    param.regex = "[" + choice + "m]";
                  } else {
                    throw {
                      code: "S0402",
                      stack: new Error().stack,
                      value: choice,
                      offset: position
                    };
                  }
                  param.type = "(" + choice + ")";
                  position = endParen;
                  next();
                  break;
                case "<":
                  if (prevParam.type === "a" || prevParam.type === "f") {
                    var endPos = findClosingBracket(signature2, position, "<", ">");
                    prevParam.subtype = signature2.substring(position + 1, endPos);
                    position = endPos;
                  } else {
                    throw {
                      code: "S0401",
                      stack: new Error().stack,
                      value: prevParam.type,
                      offset: position
                    };
                  }
                  break;
              }
              position++;
            }
            var regexStr = "^" + params.map(function(param2) {
              return "(" + param2.regex + ")";
            }).join("") + "$";
            var regex2 = new RegExp(regexStr);
            var getSymbol = function(value) {
              var symbol3;
              if (utils.isFunction(value)) {
                symbol3 = "f";
              } else {
                var type = typeof value;
                switch (type) {
                  case "string":
                    symbol3 = "s";
                    break;
                  case "number":
                    symbol3 = "n";
                    break;
                  case "boolean":
                    symbol3 = "b";
                    break;
                  case "object":
                    if (value === null) {
                      symbol3 = "l";
                    } else if (Array.isArray(value)) {
                      symbol3 = "a";
                    } else {
                      symbol3 = "o";
                    }
                    break;
                  case "undefined":
                  default:
                    symbol3 = "m";
                }
              }
              return symbol3;
            };
            var throwValidationError = function(badArgs, badSig) {
              var partialPattern = "^";
              var goodTo = 0;
              for (var index = 0; index < params.length; index++) {
                partialPattern += params[index].regex;
                var match = badSig.match(partialPattern);
                if (match === null) {
                  throw {
                    code: "T0410",
                    stack: new Error().stack,
                    value: badArgs[goodTo],
                    index: goodTo + 1
                  };
                }
                goodTo = match[0].length;
              }
              throw {
                code: "T0410",
                stack: new Error().stack,
                value: badArgs[goodTo],
                index: goodTo + 1
              };
            };
            return {
              definition: signature2,
              validate: function(args, context) {
                var suppliedSig = "";
                args.forEach(function(arg) {
                  suppliedSig += getSymbol(arg);
                });
                var isValid = regex2.exec(suppliedSig);
                if (isValid) {
                  var validatedArgs = [];
                  var argIndex = 0;
                  params.forEach(function(param2, index) {
                    var arg = args[argIndex];
                    var match = isValid[index + 1];
                    if (match === "") {
                      if (param2.context && param2.contextRegex) {
                        var contextType = getSymbol(context);
                        if (param2.contextRegex.test(contextType)) {
                          validatedArgs.push(context);
                        } else {
                          throw {
                            code: "T0411",
                            stack: new Error().stack,
                            value: context,
                            index: argIndex + 1
                          };
                        }
                      } else {
                        validatedArgs.push(arg);
                        argIndex++;
                      }
                    } else {
                      match.split("").forEach(function(single) {
                        if (param2.type === "a") {
                          if (single === "m") {
                            arg = void 0;
                          } else {
                            arg = args[argIndex];
                            var arrayOK = true;
                            if (typeof param2.subtype !== "undefined") {
                              if (single !== "a" && match !== param2.subtype) {
                                arrayOK = false;
                              } else if (single === "a") {
                                if (arg.length > 0) {
                                  var itemType = getSymbol(arg[0]);
                                  if (itemType !== param2.subtype.charAt(0)) {
                                    arrayOK = false;
                                  } else {
                                    var differentItems = arg.filter(function(val) {
                                      return getSymbol(val) !== itemType;
                                    });
                                    arrayOK = differentItems.length === 0;
                                  }
                                }
                              }
                            }
                            if (!arrayOK) {
                              throw {
                                code: "T0412",
                                stack: new Error().stack,
                                value: arg,
                                index: argIndex + 1,
                                type: arraySignatureMapping[param2.subtype]
                              };
                            }
                            if (single !== "a") {
                              arg = [arg];
                            }
                          }
                          validatedArgs.push(arg);
                          argIndex++;
                        } else {
                          validatedArgs.push(arg);
                          argIndex++;
                        }
                      });
                    }
                  });
                  return validatedArgs;
                }
                throwValidationError(args, suppliedSig);
              }
            };
          }
          return parseSignature;
        })();
        module3.exports = signature;
      }, { "./utils": 6 }], 6: [function(require2, module3, exports3) {
        const utils = (() => {
          "use strict";
          function isNumeric(n) {
            var isNum = false;
            if (typeof n === "number") {
              isNum = !isNaN(n);
              if (isNum && !isFinite(n)) {
                throw {
                  code: "D1001",
                  value: n,
                  stack: new Error().stack
                };
              }
            }
            return isNum;
          }
          function isArrayOfStrings(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return typeof item !== "string";
              }).length === 0;
            }
            return result;
          }
          function isArrayOfNumbers(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return !isNumeric(item);
              }).length === 0;
            }
            return result;
          }
          function createSequence() {
            var sequence = [];
            sequence.sequence = true;
            if (arguments.length === 1) {
              sequence.push(arguments[0]);
            }
            return sequence;
          }
          function isSequence(value) {
            return value.sequence === true && Array.isArray(value);
          }
          function isFunction(arg) {
            return arg && (arg._jsonata_function === true || arg._jsonata_lambda === true) || typeof arg === "function";
          }
          function getFunctionArity(func) {
            var arity = typeof func.arity === "number" ? func.arity : typeof func.implementation === "function" ? func.implementation.length : typeof func.length === "number" ? func.length : func.arguments.length;
            return arity;
          }
          function isLambda(arg) {
            return arg && arg._jsonata_lambda === true;
          }
          var iteratorSymbol = (typeof Symbol === "function" ? Symbol : {}).iterator || "@@iterator";
          function isIterable(arg) {
            return typeof arg === "object" && arg !== null && iteratorSymbol in arg && "next" in arg && typeof arg.next === "function";
          }
          function isDeepEqual(lhs, rhs) {
            if (lhs === rhs) {
              return true;
            }
            if (typeof lhs === "object" && typeof rhs === "object" && lhs !== null && rhs !== null) {
              if (Array.isArray(lhs) && Array.isArray(rhs)) {
                if (lhs.length !== rhs.length) {
                  return false;
                }
                for (var ii = 0; ii < lhs.length; ii++) {
                  if (!isDeepEqual(lhs[ii], rhs[ii])) {
                    return false;
                  }
                }
                return true;
              }
              var lkeys = Object.getOwnPropertyNames(lhs);
              var rkeys = Object.getOwnPropertyNames(rhs);
              if (lkeys.length !== rkeys.length) {
                return false;
              }
              lkeys = lkeys.sort();
              rkeys = rkeys.sort();
              for (ii = 0; ii < lkeys.length; ii++) {
                if (lkeys[ii] !== rkeys[ii]) {
                  return false;
                }
              }
              for (ii = 0; ii < lkeys.length; ii++) {
                var key = lkeys[ii];
                if (!isDeepEqual(lhs[key], rhs[key])) {
                  return false;
                }
              }
              return true;
            }
            return false;
          }
          function isPromise(arg) {
            return typeof arg === "object" && arg !== null && "then" in arg && typeof arg.then === "function";
          }
          function stringToArray(str) {
            var arr = [];
            for (let char of str) {
              arr.push(char);
            }
            return arr;
          }
          return {
            isNumeric,
            isArrayOfStrings,
            isArrayOfNumbers,
            createSequence,
            isSequence,
            isFunction,
            isLambda,
            isIterable,
            getFunctionArity,
            isDeepEqual,
            stringToArray,
            isPromise
          };
        })();
        module3.exports = utils;
      }, {}] }, {}, [3])(3);
    });
  }
});

// ../../../../mercs_rete/lib/index.js
var import_jsonata = __toESM(require_jsonata(), 1);
import { formatWithOptions } from "util";
import { sep } from "path";
import * as tty from "tty";
import { stdin, stdout } from "process";
import f from "readline";
import { WriteStream } from "tty";
import require$$0 from "tty";
import process$1 from "process";
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_rete_common = __commonJS2({
  "../../node_modules/rete/build/rete.common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ownKeys(object, enumerableOnly) {
      var keys2 = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys2.push.apply(keys2, symbols);
      }
      return keys2;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _regeneratorRuntime() {
      _regeneratorRuntime = function() {
        return exports2;
      };
      var exports2 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define2(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        }), obj[key];
      }
      try {
        define2({}, "");
      } catch (err) {
        define2 = function(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self2, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context2(tryLocsList || []);
        return generator._invoke = function(innerFn2, self3, context2) {
          var state = "suspendedStart";
          return function(method, arg) {
            if ("executing" === state)
              throw new Error("Generator is already running");
            if ("completed" === state) {
              if ("throw" === method)
                throw arg;
              return doneResult();
            }
            for (context2.method = method, context2.arg = arg; ; ) {
              var delegate = context2.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context2);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel)
                    continue;
                  return delegateResult;
                }
              }
              if ("next" === context2.method)
                context2.sent = context2._sent = context2.arg;
              else if ("throw" === context2.method) {
                if ("suspendedStart" === state)
                  throw state = "completed", context2.arg;
                context2.dispatchException(context2.arg);
              } else
                "return" === context2.method && context2.abrupt("return", context2.arg);
              state = "executing";
              var record = tryCatch(innerFn2, self3, context2);
              if ("normal" === record.type) {
                if (state = context2.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
                  continue;
                return {
                  value: record.arg,
                  done: context2.done
                };
              }
              "throw" === record.type && (state = "completed", context2.method = "throw", context2.arg = record.arg);
            }
          };
        }(innerFn, self2, context), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports2.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var IteratorPrototype = {};
      define2(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define2(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg, value = result.value;
            return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        this._invoke = function(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (void 0 === method) {
          if (context.delegate = null, "throw" === context.method) {
            if (delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method))
              return ContinueSentinel;
            context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }
          return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type)
          return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context2(tryLocsList) {
        this.tryEntries = [{
          tryLoc: "root"
        }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod)
            return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next)
            return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next2() {
              for (; ++i < iterable.length; )
                if (hasOwn.call(iterable, i))
                  return next2.value = iterable[i], next2.done = false, next2;
              return next2.value = void 0, next2.done = true, next2;
            };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: void 0,
          done: true
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, define2(Gp, "constructor", GeneratorFunctionPrototype), define2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define2(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports2.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports2.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define2(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
      }, exports2.awrap = function(arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define2(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      }), exports2.AsyncIterator = AsyncIterator, exports2.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
        return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define2(Gp, toStringTagSymbol, "Generator"), define2(Gp, iteratorSymbol, function() {
        return this;
      }), define2(Gp, "toString", function() {
        return "[object Generator]";
      }), exports2.keys = function(object) {
        var keys2 = [];
        for (var key in object)
          keys2.push(key);
        return keys2.reverse(), function next() {
          for (; keys2.length; ) {
            var key2 = keys2.pop();
            if (key2 in object)
              return next.value = key2, next.done = false, next;
          }
          return next.done = true, next;
        };
      }, exports2.values = values, Context2.prototype = {
        constructor: Context2,
        reset: function(skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
            for (var name in this)
              "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
        },
        stop: function() {
          this.done = true;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type)
            throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function(exception) {
          if (this.done)
            throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i], record = entry.completion;
            if ("root" === entry.tryLoc)
              return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc)
                  return handle(entry.catchLoc, true);
                if (this.prev < entry.finallyLoc)
                  return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc)
                  return handle(entry.catchLoc, true);
              } else {
                if (!hasFinally)
                  throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc)
                  return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function(record, afterLoc) {
          if ("throw" === record.type)
            throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc)
              return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
          }
        },
        catch: function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc
          }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
        }
      }, exports2;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      Object.defineProperty(subClass, "prototype", {
        writable: false
      });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p2) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p3) {
        o2.__proto__ = p3;
        return o2;
      };
      return _setPrototypeOf(o, p2);
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function _get() {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get.bind();
      } else {
        _get = function _get2(target, property, receiver) {
          var base = _superPropBase(target, property);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.get) {
            return desc.get.call(arguments.length < 3 ? target : receiver);
          }
          return desc.value;
        };
      }
      return _get.apply(this, arguments);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function() {
          };
          return {
            s: F,
            n: function() {
              if (i >= o.length)
                return {
                  done: true
                };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function(e) {
              throw e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return {
        s: function() {
          it = it.call(o);
        },
        n: function() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function(e) {
          didErr = true;
          err = e;
        },
        f: function() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        }
      };
    }
    var Component$1 = /* @__PURE__ */ _createClass(function Component3(name) {
      _classCallCheck(this, Component3);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "data", {});
      _defineProperty(this, "engine", null);
      this.name = name;
    });
    var Node2 = /* @__PURE__ */ function() {
      function Node3(name) {
        _classCallCheck(this, Node3);
        _defineProperty(this, "name", void 0);
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "position", [0, 0]);
        _defineProperty(this, "inputs", /* @__PURE__ */ new Map());
        _defineProperty(this, "outputs", /* @__PURE__ */ new Map());
        _defineProperty(this, "controls", /* @__PURE__ */ new Map());
        _defineProperty(this, "data", {});
        _defineProperty(this, "meta", {});
        this.name = name;
        this.id = Node3.incrementId();
      }
      _createClass(Node3, [{
        key: "_add",
        value: function _add(list, item, prop) {
          if (list.has(item.key))
            throw new Error("Item with key '".concat(item.key, "' already been added to the node"));
          if (item[prop] !== null)
            throw new Error("Item has already been added to some node");
          item[prop] = this;
          list.set(item.key, item);
        }
      }, {
        key: "addControl",
        value: function addControl(control) {
          this._add(this.controls, control, "parent");
          return this;
        }
      }, {
        key: "removeControl",
        value: function removeControl(control) {
          control.parent = null;
          this.controls["delete"](control.key);
        }
      }, {
        key: "addInput",
        value: function addInput(input) {
          this._add(this.inputs, input, "node");
          return this;
        }
      }, {
        key: "removeInput",
        value: function removeInput(input) {
          input.removeConnections();
          input.node = null;
          this.inputs["delete"](input.key);
        }
      }, {
        key: "addOutput",
        value: function addOutput(output) {
          this._add(this.outputs, output, "node");
          return this;
        }
      }, {
        key: "removeOutput",
        value: function removeOutput(output) {
          output.removeConnections();
          output.node = null;
          this.outputs["delete"](output.key);
        }
      }, {
        key: "setMeta",
        value: function setMeta(meta) {
          this.meta = meta;
          return this;
        }
      }, {
        key: "getConnections",
        value: function getConnections() {
          var ios = [].concat(_toConsumableArray(this.inputs.values()), _toConsumableArray(this.outputs.values()));
          var connections = ios.reduce(function(arr, io) {
            return [].concat(_toConsumableArray(arr), _toConsumableArray(io.connections));
          }, []);
          return connections;
        }
      }, {
        key: "update",
        value: function update() {
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          var reduceIO = function reduceIO2(list) {
            return Array.from(list).reduce(function(obj, _ref) {
              var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], io = _ref2[1];
              obj[key] = io.toJSON();
              return obj;
            }, {});
          };
          return {
            "id": this.id,
            "data": this.data,
            "inputs": reduceIO(this.inputs),
            "outputs": reduceIO(this.outputs),
            "position": this.position,
            "name": this.name
          };
        }
      }], [{
        key: "incrementId",
        value: function incrementId() {
          if (!this.latestId)
            this.latestId = 1;
          else
            this.latestId++;
          return this.latestId;
        }
      }, {
        key: "resetId",
        value: function resetId() {
          this.latestId = 0;
        }
      }, {
        key: "fromJSON",
        value: function fromJSON(json) {
          var node = new Node3(json.name);
          var _json$position = _slicedToArray(json.position, 2), x = _json$position[0], y = _json$position[1];
          node.id = json.id;
          node.data = json.data;
          node.position = [x, y];
          node.name = json.name;
          Node3.latestId = Math.max(node.id, Node3.latestId);
          return node;
        }
      }]);
      return Node3;
    }();
    _defineProperty(Node2, "latestId", 0);
    var Component2 = /* @__PURE__ */ function(_ComponentWorker) {
      _inherits(Component3, _ComponentWorker);
      var _super = _createSuper(Component3);
      function Component3(name) {
        var _this;
        _classCallCheck(this, Component3);
        _this = _super.call(this, name);
        _defineProperty(_assertThisInitialized(_this), "editor", null);
        _defineProperty(_assertThisInitialized(_this), "data", {});
        return _this;
      }
      _createClass(Component3, [{
        key: "build",
        value: function() {
          var _build = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(node) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.builder(node);
                  case 2:
                    return _context.abrupt("return", node);
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function build(_x) {
            return _build.apply(this, arguments);
          }
          return build;
        }()
      }, {
        key: "createNode",
        value: function() {
          var _createNode = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
            var data, node, _args2 = arguments;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    data = _args2.length > 0 && _args2[0] !== void 0 ? _args2[0] : {};
                    node = new Node2(this.name);
                    node.data = data;
                    _context2.next = 5;
                    return this.build(node);
                  case 5:
                    return _context2.abrupt("return", node);
                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
          function createNode() {
            return _createNode.apply(this, arguments);
          }
          return createNode;
        }()
      }]);
      return Component3;
    }(Component$1);
    var Connection = /* @__PURE__ */ function() {
      function Connection2(output, input) {
        _classCallCheck(this, Connection2);
        _defineProperty(this, "output", void 0);
        _defineProperty(this, "input", void 0);
        _defineProperty(this, "data", {});
        this.output = output;
        this.input = input;
        this.data = {};
        this.input.addConnection(this);
      }
      _createClass(Connection2, [{
        key: "remove",
        value: function remove() {
          this.input.removeConnection(this);
          this.output.removeConnection(this);
        }
      }]);
      return Connection2;
    }();
    var Control = /* @__PURE__ */ function() {
      function Control2(key) {
        _classCallCheck(this, Control2);
        _defineProperty(this, "key", void 0);
        _defineProperty(this, "data", {});
        _defineProperty(this, "parent", null);
        if (this.constructor === Control2)
          throw new TypeError("Can not construct abstract class");
        if (!key)
          throw new Error("The key parameter is missing in super() of Control ");
        this.key = key;
      }
      _createClass(Control2, [{
        key: "getNode",
        value: function getNode() {
          if (this.parent === null)
            throw new Error("Control isn't added to Node/Input");
          if (this.parent instanceof Node2)
            return this.parent;
          if (!this.parent.node)
            throw new Error("Control hasn't be added to Input or Node");
          return this.parent.node;
        }
      }, {
        key: "getData",
        value: function getData(key) {
          return this.getNode().data[key];
        }
      }, {
        key: "putData",
        value: function putData(key, data) {
          this.getNode().data[key] = data;
        }
      }]);
      return Control2;
    }();
    var Emitter = /* @__PURE__ */ function() {
      function Emitter2(events) {
        _classCallCheck(this, Emitter2);
        _defineProperty(this, "events", {});
        _defineProperty(this, "silent", false);
        this.events = events instanceof Emitter2 ? events.events : events.handlers;
      }
      _createClass(Emitter2, [{
        key: "on",
        value: function on(names, handler) {
          var _this = this;
          var events = names instanceof Array ? names : names.split(" ");
          events.forEach(function(name) {
            if (!_this.events[name])
              throw new Error("The event ".concat(name, " does not exist"));
            _this.events[name].push(handler);
          });
          return this;
        }
      }, {
        key: "trigger",
        value: function trigger(name) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (!(name in this.events))
            throw new Error("The event ".concat(String(name), " cannot be triggered"));
          return this.events[name].reduce(function(r2, e) {
            return e(params) !== false && r2;
          }, true);
        }
      }, {
        key: "bind",
        value: function bind(name) {
          if (this.events[name])
            throw new Error("The event ".concat(name, " is already bound"));
          this.events[name] = [];
        }
      }, {
        key: "exist",
        value: function exist(name) {
          return Array.isArray(this.events[name]);
        }
      }]);
      return Emitter2;
    }();
    var IO = /* @__PURE__ */ function() {
      function IO2(key, name, socket, multiConns) {
        _classCallCheck(this, IO2);
        _defineProperty(this, "node", null);
        _defineProperty(this, "multipleConnections", void 0);
        _defineProperty(this, "connections", []);
        _defineProperty(this, "key", void 0);
        _defineProperty(this, "name", void 0);
        _defineProperty(this, "socket", void 0);
        this.node = null;
        this.multipleConnections = multiConns;
        this.connections = [];
        this.key = key;
        this.name = name;
        this.socket = socket;
      }
      _createClass(IO2, [{
        key: "removeConnection",
        value: function removeConnection(connection) {
          this.connections.splice(this.connections.indexOf(connection), 1);
        }
      }, {
        key: "removeConnections",
        value: function removeConnections() {
          var _this = this;
          this.connections.forEach(function(connection) {
            return _this.removeConnection(connection);
          });
        }
      }]);
      return IO2;
    }();
    var Input2 = /* @__PURE__ */ function(_IO) {
      _inherits(Input3, _IO);
      var _super = _createSuper(Input3);
      function Input3(key, title, socket) {
        var _this;
        var multiConns = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        _classCallCheck(this, Input3);
        _this = _super.call(this, key, title, socket, multiConns);
        _defineProperty(_assertThisInitialized(_this), "control", null);
        return _this;
      }
      _createClass(Input3, [{
        key: "hasConnection",
        value: function hasConnection() {
          return this.connections.length > 0;
        }
      }, {
        key: "addConnection",
        value: function addConnection(connection) {
          if (!this.multipleConnections && this.hasConnection())
            throw new Error("Multiple connections not allowed");
          this.connections.push(connection);
        }
      }, {
        key: "addControl",
        value: function addControl(control) {
          this.control = control;
          control.parent = this;
        }
      }, {
        key: "showControl",
        value: function showControl() {
          return !this.hasConnection() && this.control !== null;
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return {
            "connections": this.connections.map(function(c2) {
              if (!c2.output.node)
                throw new Error("Node not added to Output");
              return {
                node: c2.output.node.id,
                output: c2.output.key,
                data: c2.data
              };
            })
          };
        }
      }]);
      return Input3;
    }(IO);
    var Validator = /* @__PURE__ */ function() {
      function Validator2() {
        _classCallCheck(this, Validator2);
      }
      _createClass(Validator2, null, [{
        key: "isValidData",
        value: function isValidData(data) {
          return typeof data.id === "string" && this.isValidId(data.id) && data.nodes instanceof Object && !(data.nodes instanceof Array);
        }
      }, {
        key: "isValidId",
        value: function isValidId(id) {
          return /^[\w-]{3,}@[0-9]+\.[0-9]+\.[0-9]+$/.test(id);
        }
      }, {
        key: "validate",
        value: function validate(id, data) {
          var id1 = id.split("@");
          var id2 = data.id.split("@");
          var msg = [];
          if (!this.isValidData(data))
            msg.push("Data is not suitable");
          if (id !== data.id)
            msg.push("IDs not equal");
          if (id1[0] !== id2[0])
            msg.push("Names don't match");
          if (id1[1] !== id2[1])
            msg.push("Versions don't match");
          return {
            success: Boolean(!msg.length),
            msg: msg.join(". ")
          };
        }
      }]);
      return Validator2;
    }();
    var Context = /* @__PURE__ */ function(_Emitter) {
      _inherits(Context2, _Emitter);
      var _super = _createSuper(Context2);
      function Context2(id, events) {
        var _this;
        _classCallCheck(this, Context2);
        _this = _super.call(this, events);
        _defineProperty(_assertThisInitialized(_this), "id", void 0);
        _defineProperty(_assertThisInitialized(_this), "plugins", void 0);
        _defineProperty(_assertThisInitialized(_this), "components", void 0);
        if (!Validator.isValidId(id))
          throw new Error("ID should be valid to name@0.1.0 format");
        _this.id = id;
        _this.plugins = /* @__PURE__ */ new Map();
        _this.components = /* @__PURE__ */ new Map();
        return _this;
      }
      _createClass(Context2, [{
        key: "use",
        value: function use(plugin, options2) {
          if (plugin.name && this.plugins.has(plugin.name))
            throw new Error("Plugin ".concat(plugin.name, " already in use"));
          plugin.install(this, options2 || {});
          this.plugins.set(plugin.name, options2);
        }
      }, {
        key: "register",
        value: function register(component) {
          if (this.components.has(component.name))
            throw new Error("Component ".concat(component.name, " already registered"));
          this.components.set(component.name, component);
          this.trigger("componentregister", component);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.trigger("destroy");
        }
      }]);
      return Context2;
    }(Emitter);
    function listenWindow(event, handler) {
      window.addEventListener(event, handler);
      return function() {
        window.removeEventListener(event, handler);
      };
    }
    function getOffset(el, offsetParentEl) {
      var searchDepth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 8;
      var x = el.offsetLeft;
      var y = el.offsetTop;
      var parent = el.offsetParent;
      while (parent && parent !== offsetParentEl && searchDepth > 0) {
        searchDepth--;
        x += parent.offsetLeft;
        y += parent.offsetTop;
        parent = parent.offsetParent;
      }
      return {
        x,
        y
      };
    }
    var Drag = /* @__PURE__ */ function() {
      function Drag2(el) {
        var onTranslate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function(_x, _y, _e) {
        };
        var onStart = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(_e) {
        };
        var onDrag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function(_e) {
        };
        _classCallCheck(this, Drag2);
        this.onTranslate = onTranslate;
        this.onStart = onStart;
        this.onDrag = onDrag;
        _defineProperty(this, "pointerStart", void 0);
        _defineProperty(this, "el", void 0);
        _defineProperty(this, "destroy", void 0);
        this.pointerStart = null;
        this.el = el;
        this.el.style.touchAction = "none";
        this.el.addEventListener("pointerdown", this.down.bind(this));
        var destroyMove = listenWindow("pointermove", this.move.bind(this));
        var destroyUp = listenWindow("pointerup", this.up.bind(this));
        this.destroy = function() {
          destroyMove();
          destroyUp();
        };
      }
      _createClass(Drag2, [{
        key: "down",
        value: function down(e) {
          if (e.pointerType === "mouse" && e.button !== 0)
            return;
          e.stopPropagation();
          this.pointerStart = [e.pageX, e.pageY];
          this.onStart(e);
        }
      }, {
        key: "move",
        value: function move(e) {
          if (!this.pointerStart)
            return;
          e.preventDefault();
          var _ref = [e.pageX, e.pageY], x = _ref[0], y = _ref[1];
          var delta = [x - this.pointerStart[0], y - this.pointerStart[1]];
          var zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;
          this.onTranslate(delta[0] / zoom, delta[1] / zoom, e);
        }
      }, {
        key: "up",
        value: function up(e) {
          if (!this.pointerStart)
            return;
          this.pointerStart = null;
          this.onDrag(e);
        }
      }]);
      return Drag2;
    }();
    var Zoom = /* @__PURE__ */ function() {
      function Zoom2(container, el, intensity, onzoom) {
        _classCallCheck(this, Zoom2);
        _defineProperty(this, "el", void 0);
        _defineProperty(this, "intensity", void 0);
        _defineProperty(this, "onzoom", void 0);
        _defineProperty(this, "previous", null);
        _defineProperty(this, "pointers", []);
        _defineProperty(this, "destroy", void 0);
        this.el = el;
        this.intensity = intensity;
        this.onzoom = onzoom;
        container.addEventListener("wheel", this.wheel.bind(this));
        container.addEventListener("pointerdown", this.down.bind(this));
        container.addEventListener("dblclick", this.dblclick.bind(this));
        var destroyMove = listenWindow("pointermove", this.move.bind(this));
        var destroyUp = listenWindow("pointerup", this.end.bind(this));
        var destroyCancel = listenWindow("pointercancel", this.end.bind(this));
        this.destroy = function() {
          destroyMove();
          destroyUp();
          destroyCancel();
        };
      }
      _createClass(Zoom2, [{
        key: "translating",
        get: function get() {
          return this.pointers.length >= 2;
        }
      }, {
        key: "wheel",
        value: function wheel(e) {
          e.preventDefault();
          var rect = this.el.getBoundingClientRect();
          var isNegative = e.deltaY < 0;
          var delta = isNegative ? this.intensity : -this.intensity;
          var ox = (rect.left - e.clientX) * delta;
          var oy = (rect.top - e.clientY) * delta;
          this.onzoom(delta, ox, oy, "wheel");
        }
      }, {
        key: "touches",
        value: function touches() {
          var e = {
            touches: this.pointers
          };
          var _ref = [e.touches[0].clientX, e.touches[0].clientY], x1 = _ref[0], y1 = _ref[1];
          var _ref2 = [e.touches[1].clientX, e.touches[1].clientY], x2 = _ref2[0], y2 = _ref2[1];
          var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
          return {
            cx: (x1 + x2) / 2,
            cy: (y1 + y2) / 2,
            distance
          };
        }
      }, {
        key: "down",
        value: function down(e) {
          this.pointers.push(e);
        }
      }, {
        key: "move",
        value: function move(e) {
          this.pointers = this.pointers.map(function(p2) {
            return p2.pointerId === e.pointerId ? e : p2;
          });
          if (!this.translating)
            return;
          var rect = this.el.getBoundingClientRect();
          var _this$touches = this.touches(), cx = _this$touches.cx, cy = _this$touches.cy, distance = _this$touches.distance;
          if (this.previous !== null) {
            var delta = distance / this.previous.distance - 1;
            var ox = (rect.left - cx) * delta;
            var oy = (rect.top - cy) * delta;
            this.onzoom(delta, ox - (this.previous.cx - cx), oy - (this.previous.cy - cy), "touch");
          }
          this.previous = {
            cx,
            cy,
            distance
          };
        }
      }, {
        key: "end",
        value: function end(e) {
          this.previous = null;
          this.pointers = this.pointers.filter(function(p2) {
            return p2.pointerId !== e.pointerId;
          });
        }
      }, {
        key: "dblclick",
        value: function dblclick(e) {
          e.preventDefault();
          var rect = this.el.getBoundingClientRect();
          var delta = 4 * this.intensity;
          var ox = (rect.left - e.clientX) * delta;
          var oy = (rect.top - e.clientY) * delta;
          this.onzoom(delta, ox, oy, "dblclick");
        }
      }]);
      return Zoom2;
    }();
    var Area = /* @__PURE__ */ function(_Emitter) {
      _inherits(Area2, _Emitter);
      var _super = _createSuper(Area2);
      function Area2(container, emitter) {
        var _this;
        _classCallCheck(this, Area2);
        _this = _super.call(this, emitter);
        _defineProperty(_assertThisInitialized(_this), "el", void 0);
        _defineProperty(_assertThisInitialized(_this), "container", void 0);
        _defineProperty(_assertThisInitialized(_this), "transform", {
          k: 1,
          x: 0,
          y: 0
        });
        _defineProperty(_assertThisInitialized(_this), "mouse", {
          x: 0,
          y: 0
        });
        _defineProperty(_assertThisInitialized(_this), "_startPosition", null);
        _defineProperty(_assertThisInitialized(_this), "_zoom", void 0);
        _defineProperty(_assertThisInitialized(_this), "_drag", void 0);
        var el = _this.el = document.createElement("div");
        _this.container = container;
        el.style.transformOrigin = "0 0";
        _this._zoom = new Zoom(container, el, 0.1, _this.onZoom.bind(_assertThisInitialized(_this)));
        _this._drag = new Drag(container, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onStart.bind(_assertThisInitialized(_this)));
        emitter.on("destroy", function() {
          _this._zoom.destroy();
          _this._drag.destroy();
        });
        _this.container.addEventListener("pointermove", _this.pointermove.bind(_assertThisInitialized(_this)));
        _this.update();
        return _this;
      }
      _createClass(Area2, [{
        key: "update",
        value: function update() {
          var t = this.transform;
          this.el.style.transform = "translate(".concat(t.x, "px, ").concat(t.y, "px) scale(").concat(t.k, ")");
        }
      }, {
        key: "pointermove",
        value: function pointermove(e) {
          var clientX = e.clientX, clientY = e.clientY;
          var rect = this.el.getBoundingClientRect();
          var x = clientX - rect.left;
          var y = clientY - rect.top;
          var k = this.transform.k;
          this.mouse = {
            x: x / k,
            y: y / k
          };
          this.trigger("mousemove", _objectSpread2({}, this.mouse));
        }
      }, {
        key: "onStart",
        value: function onStart() {
          this._startPosition = _objectSpread2({}, this.transform);
        }
      }, {
        key: "onTranslate",
        value: function onTranslate(dx, dy) {
          if (this._zoom.translating)
            return;
          if (this._startPosition)
            this.translate(this._startPosition.x + dx, this._startPosition.y + dy);
        }
      }, {
        key: "onZoom",
        value: function onZoom(delta, ox, oy, source) {
          this.zoom(this.transform.k * (1 + delta), ox, oy, source);
          this.update();
        }
      }, {
        key: "translate",
        value: function translate(x, y) {
          var params = {
            transform: this.transform,
            x,
            y
          };
          if (!this.trigger("translate", params))
            return;
          this.transform.x = params.x;
          this.transform.y = params.y;
          this.update();
          this.trigger("translated");
        }
      }, {
        key: "zoom",
        value: function zoom(_zoom) {
          var ox = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var oy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var source = arguments.length > 3 ? arguments[3] : void 0;
          var k = this.transform.k;
          var params = {
            transform: this.transform,
            zoom: _zoom,
            source
          };
          if (!this.trigger("zoom", params))
            return;
          var d = (k - params.zoom) / (k - _zoom || 1);
          this.transform.k = params.zoom || 1;
          this.transform.x += ox * d;
          this.transform.y += oy * d;
          this.update();
          this.trigger("zoomed", {
            source
          });
        }
      }, {
        key: "appendChild",
        value: function appendChild(el) {
          this.el.appendChild(el);
        }
      }, {
        key: "removeChild",
        value: function removeChild(el) {
          this.el.removeChild(el);
        }
      }]);
      return Area2;
    }(Emitter);
    var ConnectionView = /* @__PURE__ */ function(_Emitter) {
      _inherits(ConnectionView2, _Emitter);
      var _super = _createSuper(ConnectionView2);
      function ConnectionView2(connection, inputNode, outputNode, emitter) {
        var _this;
        _classCallCheck(this, ConnectionView2);
        _this = _super.call(this, emitter);
        _defineProperty(_assertThisInitialized(_this), "connection", void 0);
        _defineProperty(_assertThisInitialized(_this), "inputNode", void 0);
        _defineProperty(_assertThisInitialized(_this), "outputNode", void 0);
        _defineProperty(_assertThisInitialized(_this), "el", void 0);
        _this.connection = connection;
        _this.inputNode = inputNode;
        _this.outputNode = outputNode;
        _this.el = document.createElement("div");
        _this.el.style.position = "absolute";
        _this.el.style.zIndex = "-1";
        _this.trigger("renderconnection", {
          el: _this.el,
          connection: _this.connection,
          points: _this.getPoints()
        });
        return _this;
      }
      _createClass(ConnectionView2, [{
        key: "getPoints",
        value: function getPoints() {
          var _this$connection = this.connection, input = _this$connection.input, output = _this$connection.output;
          if (this.inputNode.hasSocket(input) && this.outputNode.hasSocket(output)) {
            var _this$outputNode$getS = this.outputNode.getSocketPosition(output), _this$outputNode$getS2 = _slicedToArray(_this$outputNode$getS, 2), x1 = _this$outputNode$getS2[0], y1 = _this$outputNode$getS2[1];
            var _this$inputNode$getSo = this.inputNode.getSocketPosition(input), _this$inputNode$getSo2 = _slicedToArray(_this$inputNode$getSo, 2), x2 = _this$inputNode$getSo2[0], y2 = _this$inputNode$getSo2[1];
            return [x1, y1, x2, y2];
          }
          return [0, 0, 0, 0];
        }
      }, {
        key: "update",
        value: function update() {
          this.trigger("updateconnection", {
            el: this.el,
            connection: this.connection,
            points: this.getPoints()
          });
        }
      }]);
      return ConnectionView2;
    }(Emitter);
    var ControlView = /* @__PURE__ */ function(_Emitter) {
      _inherits(ControlView2, _Emitter);
      var _super = _createSuper(ControlView2);
      function ControlView2(el, control, emitter) {
        var _this;
        _classCallCheck(this, ControlView2);
        _this = _super.call(this, emitter);
        _this.trigger("rendercontrol", {
          el,
          control
        });
        return _this;
      }
      return _createClass(ControlView2);
    }(Emitter);
    var SocketView = /* @__PURE__ */ function(_Emitter) {
      _inherits(SocketView2, _Emitter);
      var _super = _createSuper(SocketView2);
      function SocketView2(el, type, io, node, emitter) {
        var _this$trigger;
        var _this;
        _classCallCheck(this, SocketView2);
        _this = _super.call(this, emitter);
        _defineProperty(_assertThisInitialized(_this), "el", void 0);
        _defineProperty(_assertThisInitialized(_this), "type", void 0);
        _defineProperty(_assertThisInitialized(_this), "io", void 0);
        _defineProperty(_assertThisInitialized(_this), "node", void 0);
        _this.el = el;
        _this.type = type;
        _this.io = io;
        _this.node = node;
        _this.trigger("rendersocket", (_this$trigger = {
          el
        }, _defineProperty(_this$trigger, type, _this.io), _defineProperty(_this$trigger, "socket", io.socket), _this$trigger));
        return _this;
      }
      _createClass(SocketView2, [{
        key: "getPosition",
        value: function getPosition(_ref, nodeViewEl) {
          var position = _ref.position;
          var el = this.el;
          var _getOffset = getOffset(el, nodeViewEl), x = _getOffset.x, y = _getOffset.y;
          return [position[0] + x + el.offsetWidth / 2, position[1] + y + el.offsetHeight / 2];
        }
      }]);
      return SocketView2;
    }(Emitter);
    var NodeView = /* @__PURE__ */ function(_Emitter) {
      _inherits(NodeView2, _Emitter);
      var _super = _createSuper(NodeView2);
      function NodeView2(node, component, emitter) {
        var _this;
        _classCallCheck(this, NodeView2);
        _this = _super.call(this, emitter);
        _defineProperty(_assertThisInitialized(_this), "node", void 0);
        _defineProperty(_assertThisInitialized(_this), "component", void 0);
        _defineProperty(_assertThisInitialized(_this), "sockets", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "controls", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "el", void 0);
        _defineProperty(_assertThisInitialized(_this), "_startPosition", []);
        _defineProperty(_assertThisInitialized(_this), "_drag", void 0);
        _this.node = node;
        _this.component = component;
        _this.el = document.createElement("div");
        _this.el.style.position = "absolute";
        _this.el.addEventListener("contextmenu", function(e) {
          return _this.trigger("contextmenu", {
            e,
            node: _this.node
          });
        });
        _this._drag = new Drag(_this.el, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onSelect.bind(_assertThisInitialized(_this)), function() {
          _this.trigger("nodedraged", node);
          _this.trigger("nodedragged", node);
        });
        _this.trigger("rendernode", {
          el: _this.el,
          node,
          component: component.data,
          bindSocket: _this.bindSocket.bind(_assertThisInitialized(_this)),
          bindControl: _this.bindControl.bind(_assertThisInitialized(_this))
        });
        _this.update();
        return _this;
      }
      _createClass(NodeView2, [{
        key: "clearSockets",
        value: function clearSockets() {
          var _this2 = this;
          var ios = [].concat(_toConsumableArray(this.node.inputs.values()), _toConsumableArray(this.node.outputs.values()));
          this.sockets.forEach(function(s3) {
            if (!ios.includes(s3.io))
              _this2.sockets["delete"](s3.io);
          });
        }
      }, {
        key: "bindSocket",
        value: function bindSocket(el, type, io) {
          this.clearSockets();
          this.sockets.set(io, new SocketView(el, type, io, this.node, this));
        }
      }, {
        key: "bindControl",
        value: function bindControl(el, control) {
          this.controls.set(control, new ControlView(el, control, this));
        }
      }, {
        key: "hasSocket",
        value: function hasSocket(io) {
          return this.sockets.has(io);
        }
      }, {
        key: "getSocketPosition",
        value: function getSocketPosition(io) {
          var socket = this.sockets.get(io);
          if (!socket)
            throw new Error("Socket not found for ".concat(io.name, " with key ").concat(io.key));
          return socket.getPosition(this.node, this.el);
        }
      }, {
        key: "onSelect",
        value: function onSelect(e) {
          var payload = {
            node: this.node,
            accumulate: e.ctrlKey,
            e
          };
          this.onStart();
          this.trigger("multiselectnode", payload);
          this.trigger("selectnode", payload);
        }
      }, {
        key: "onStart",
        value: function onStart() {
          this._startPosition = _toConsumableArray(this.node.position);
        }
      }, {
        key: "onTranslate",
        value: function onTranslate(dx, dy) {
          this.trigger("translatenode", {
            node: this.node,
            dx,
            dy
          });
        }
      }, {
        key: "onDrag",
        value: function onDrag(dx, dy) {
          var x = this._startPosition[0] + dx;
          var y = this._startPosition[1] + dy;
          this.translate(x, y);
        }
      }, {
        key: "translate",
        value: function translate(x, y) {
          var node = this.node;
          var params = {
            node,
            x,
            y
          };
          if (!this.trigger("nodetranslate", params))
            return;
          var _node$position = _slicedToArray(node.position, 2), px = _node$position[0], py = _node$position[1];
          var prev = [px, py];
          node.position[0] = params.x;
          node.position[1] = params.y;
          this.update();
          this.trigger("nodetranslated", {
            node,
            prev
          });
        }
      }, {
        key: "update",
        value: function update() {
          var _this$node$position = _slicedToArray(this.node.position, 2), x = _this$node$position[0], y = _this$node$position[1];
          this.el.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
        }
      }, {
        key: "remove",
        value: function remove() {
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._drag.destroy();
        }
      }]);
      return NodeView2;
    }(Emitter);
    var EditorView = /* @__PURE__ */ function(_Emitter) {
      _inherits(EditorView2, _Emitter);
      var _super = _createSuper(EditorView2);
      function EditorView2(container, components, emitter) {
        var _this;
        _classCallCheck(this, EditorView2);
        _this = _super.call(this, emitter);
        _defineProperty(_assertThisInitialized(_this), "container", void 0);
        _defineProperty(_assertThisInitialized(_this), "components", void 0);
        _defineProperty(_assertThisInitialized(_this), "nodes", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "connections", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "area", void 0);
        _this.container = container;
        _this.components = components;
        _this.container.style.overflow = "hidden";
        _this.container.addEventListener("click", _this.click.bind(_assertThisInitialized(_this)));
        _this.container.addEventListener("contextmenu", function(e) {
          return _this.trigger("contextmenu", {
            e,
            view: _assertThisInitialized(_this)
          });
        });
        emitter.on("destroy", listenWindow("resize", _this.resize.bind(_assertThisInitialized(_this))));
        emitter.on("destroy", function() {
          return _this.nodes.forEach(function(view) {
            return view.destroy();
          });
        });
        _this.on("nodetranslated", _this.updateConnections.bind(_assertThisInitialized(_this)));
        _this.on("rendersocket", function(_ref) {
          var input = _ref.input, output = _ref.output;
          var connections = Array.from(_this.connections.entries());
          var relatedConnections = connections.filter(function(_ref2) {
            var _ref3 = _slicedToArray(_ref2, 1), connection = _ref3[0];
            return connection.input === input || connection.output === output;
          });
          relatedConnections.forEach(function(_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2);
            _ref5[0];
            var view = _ref5[1];
            return requestAnimationFrame(function() {
              return view.update();
            });
          });
        });
        _this.area = new Area(container, _assertThisInitialized(_this));
        _this.container.appendChild(_this.area.el);
        return _this;
      }
      _createClass(EditorView2, [{
        key: "addNode",
        value: function addNode(node) {
          var component = this.components.get(node.name);
          if (!component)
            throw new Error("Component ".concat(node.name, " not found"));
          var nodeView = new NodeView(node, component, this);
          this.nodes.set(node, nodeView);
          this.area.appendChild(nodeView.el);
        }
      }, {
        key: "removeNode",
        value: function removeNode(node) {
          var nodeView = this.nodes.get(node);
          this.nodes["delete"](node);
          if (nodeView) {
            this.area.removeChild(nodeView.el);
            nodeView.destroy();
          }
        }
      }, {
        key: "addConnection",
        value: function addConnection(connection) {
          if (!connection.input.node || !connection.output.node)
            throw new Error("Connection input or output not added to node");
          var viewInput = this.nodes.get(connection.input.node);
          var viewOutput = this.nodes.get(connection.output.node);
          if (!viewInput || !viewOutput)
            throw new Error("View node not found for input or output");
          var connView = new ConnectionView(connection, viewInput, viewOutput, this);
          this.connections.set(connection, connView);
          this.area.appendChild(connView.el);
        }
      }, {
        key: "removeConnection",
        value: function removeConnection(connection) {
          var connView = this.connections.get(connection);
          this.connections["delete"](connection);
          if (connView)
            this.area.removeChild(connView.el);
        }
      }, {
        key: "updateConnections",
        value: function updateConnections(_ref6) {
          var _this2 = this;
          var node = _ref6.node;
          node.getConnections().forEach(function(conn) {
            var connView = _this2.connections.get(conn);
            if (!connView)
              throw new Error("Connection view not found");
            connView.update();
          });
        }
      }, {
        key: "resize",
        value: function resize() {
          var container = this.container;
          if (!container.parentElement)
            throw new Error("Container doesn't have parent element");
          var width = container.parentElement.clientWidth;
          var height = container.parentElement.clientHeight;
          container.style.width = width + "px";
          container.style.height = height + "px";
        }
      }, {
        key: "click",
        value: function click(e) {
          var container = this.container;
          if (container !== e.target)
            return;
          if (!this.trigger("click", {
            e,
            container
          }))
            return;
        }
      }]);
      return EditorView2;
    }(Emitter);
    var Selected = /* @__PURE__ */ function() {
      function Selected2() {
        _classCallCheck(this, Selected2);
        _defineProperty(this, "list", []);
      }
      _createClass(Selected2, [{
        key: "add",
        value: function add(item) {
          var accumulate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (!accumulate)
            this.list = [item];
          else if (!this.contains(item))
            this.list.push(item);
        }
      }, {
        key: "clear",
        value: function clear() {
          this.list = [];
        }
      }, {
        key: "remove",
        value: function remove(item) {
          this.list.splice(this.list.indexOf(item), 1);
        }
      }, {
        key: "contains",
        value: function contains(item) {
          return this.list.indexOf(item) !== -1;
        }
      }, {
        key: "each",
        value: function each(callback) {
          this.list.forEach(callback);
        }
      }]);
      return Selected2;
    }();
    var Events = /* @__PURE__ */ _createClass(function Events2(handlers) {
      _classCallCheck(this, Events2);
      _defineProperty(this, "handlers", void 0);
      this.handlers = _objectSpread2({
        warn: [console.warn],
        error: [console.error],
        componentregister: [],
        destroy: []
      }, handlers);
    });
    var EditorEvents = /* @__PURE__ */ function(_Events) {
      _inherits(EditorEvents2, _Events);
      var _super = _createSuper(EditorEvents2);
      function EditorEvents2() {
        _classCallCheck(this, EditorEvents2);
        return _super.call(this, {
          nodecreate: [],
          nodecreated: [],
          noderemove: [],
          noderemoved: [],
          connectioncreate: [],
          connectioncreated: [],
          connectionremove: [],
          connectionremoved: [],
          translatenode: [],
          nodetranslate: [],
          nodetranslated: [],
          nodedraged: [],
          nodedragged: [],
          selectnode: [],
          multiselectnode: [],
          nodeselect: [],
          nodeselected: [],
          rendernode: [],
          rendersocket: [],
          rendercontrol: [],
          renderconnection: [],
          updateconnection: [],
          keydown: [],
          keyup: [],
          translate: [],
          translated: [],
          zoom: [],
          zoomed: [],
          click: [],
          mousemove: [],
          contextmenu: [],
          "import": [],
          "export": [],
          process: [],
          clear: []
        });
      }
      return _createClass(EditorEvents2);
    }(Events);
    var NodeEditor = /* @__PURE__ */ function(_Context) {
      _inherits(NodeEditor2, _Context);
      var _super = _createSuper(NodeEditor2);
      function NodeEditor2(id, container) {
        var _this;
        _classCallCheck(this, NodeEditor2);
        _this = _super.call(this, id, new EditorEvents());
        _defineProperty(_assertThisInitialized(_this), "nodes", []);
        _defineProperty(_assertThisInitialized(_this), "selected", new Selected());
        _defineProperty(_assertThisInitialized(_this), "view", void 0);
        _this.view = new EditorView(container, _this.components, _assertThisInitialized(_this));
        _this.on("destroy", listenWindow("keydown", function(e) {
          return _this.trigger("keydown", e);
        }));
        _this.on("destroy", listenWindow("keyup", function(e) {
          return _this.trigger("keyup", e);
        }));
        _this.on("selectnode", function(_ref) {
          var node = _ref.node, accumulate = _ref.accumulate;
          return _this.selectNode(node, accumulate);
        });
        _this.on("nodeselected", function() {
          return _this.selected.each(function(n) {
            var nodeView = _this.view.nodes.get(n);
            nodeView && nodeView.onStart();
          });
        });
        _this.on("translatenode", function(_ref2) {
          var dx = _ref2.dx, dy = _ref2.dy;
          return _this.selected.each(function(n) {
            var nodeView = _this.view.nodes.get(n);
            nodeView && nodeView.onDrag(dx, dy);
          });
        });
        return _this;
      }
      _createClass(NodeEditor2, [{
        key: "addNode",
        value: function addNode(node) {
          if (!this.trigger("nodecreate", node))
            return;
          this.nodes.push(node);
          this.view.addNode(node);
          this.trigger("nodecreated", node);
        }
      }, {
        key: "removeNode",
        value: function removeNode(node) {
          var _this2 = this;
          if (!this.trigger("noderemove", node))
            return;
          node.getConnections().forEach(function(c2) {
            return _this2.removeConnection(c2);
          });
          this.nodes.splice(this.nodes.indexOf(node), 1);
          this.view.removeNode(node);
          this.trigger("noderemoved", node);
        }
      }, {
        key: "connect",
        value: function connect(output, input) {
          var data = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if (!this.trigger("connectioncreate", {
            output,
            input
          }))
            return;
          try {
            var connection = output.connectTo(input);
            connection.data = data;
            this.view.addConnection(connection);
            this.trigger("connectioncreated", connection);
          } catch (e) {
            this.trigger("warn", e);
          }
        }
      }, {
        key: "removeConnection",
        value: function removeConnection(connection) {
          if (!this.trigger("connectionremove", connection))
            return;
          this.view.removeConnection(connection);
          connection.remove();
          this.trigger("connectionremoved", connection);
        }
      }, {
        key: "selectNode",
        value: function selectNode(node) {
          var accumulate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (this.nodes.indexOf(node) === -1)
            throw new Error("Node not exist in list");
          if (!this.trigger("nodeselect", node))
            return;
          this.selected.add(node, accumulate);
          this.trigger("nodeselected", node);
        }
      }, {
        key: "getComponent",
        value: function getComponent(name) {
          var component = this.components.get(name);
          if (!component)
            throw "Component ".concat(name, " not found");
          return component;
        }
      }, {
        key: "register",
        value: function register(component) {
          _get(_getPrototypeOf(NodeEditor2.prototype), "register", this).call(this, component);
          component.editor = this;
        }
      }, {
        key: "clear",
        value: function clear() {
          var _this3 = this;
          _toConsumableArray(this.nodes).forEach(function(node) {
            return _this3.removeNode(node);
          });
          this.trigger("clear");
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          var data = {
            id: this.id,
            nodes: {}
          };
          this.nodes.forEach(function(node) {
            return data.nodes[node.id] = node.toJSON();
          });
          this.trigger("export", data);
          return data;
        }
      }, {
        key: "beforeImport",
        value: function beforeImport(json) {
          var checking = Validator.validate(this.id, json);
          if (!checking.success) {
            this.trigger("warn", checking.msg);
            return false;
          }
          this.silent = true;
          this.clear();
          this.trigger("import", json);
          return true;
        }
      }, {
        key: "afterImport",
        value: function afterImport() {
          this.silent = false;
          return true;
        }
      }, {
        key: "fromJSON",
        value: function() {
          var _fromJSON = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(json) {
            var _this4 = this;
            var nodes;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (this.beforeImport(json)) {
                      _context2.next = 2;
                      break;
                    }
                    return _context2.abrupt("return", false);
                  case 2:
                    nodes = {};
                    _context2.prev = 3;
                    _context2.next = 6;
                    return Promise.all(Object.keys(json.nodes).map(/* @__PURE__ */ function() {
                      var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(id) {
                        var node, component;
                        return _regeneratorRuntime().wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                node = json.nodes[id];
                                component = _this4.getComponent(node.name);
                                _context.next = 4;
                                return component.build(Node2.fromJSON(node));
                              case 4:
                                nodes[id] = _context.sent;
                                _this4.addNode(nodes[id]);
                              case 6:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));
                      return function(_x2) {
                        return _ref3.apply(this, arguments);
                      };
                    }()));
                  case 6:
                    Object.keys(json.nodes).forEach(function(id) {
                      var jsonNode = json.nodes[id];
                      var node = nodes[id];
                      Object.keys(jsonNode.outputs).forEach(function(key) {
                        var outputJson = jsonNode.outputs[key];
                        outputJson.connections.forEach(function(jsonConnection) {
                          var nodeId = jsonConnection.node;
                          var data = jsonConnection.data;
                          var targetOutput = node.outputs.get(key);
                          var targetInput = nodes[nodeId].inputs.get(jsonConnection.input);
                          if (!targetOutput || !targetInput) {
                            return _this4.trigger("error", "IO not found for node ".concat(node.id));
                          }
                          _this4.connect(targetOutput, targetInput, data);
                        });
                      });
                    });
                    _context2.next = 13;
                    break;
                  case 9:
                    _context2.prev = 9;
                    _context2.t0 = _context2["catch"](3);
                    this.trigger("warn", _context2.t0);
                    return _context2.abrupt("return", !this.afterImport());
                  case 13:
                    return _context2.abrupt("return", this.afterImport());
                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[3, 9]]);
          }));
          function fromJSON(_x) {
            return _fromJSON.apply(this, arguments);
          }
          return fromJSON;
        }()
      }]);
      return NodeEditor2;
    }(Context);
    var Output2 = /* @__PURE__ */ function(_IO) {
      _inherits(Output3, _IO);
      var _super = _createSuper(Output3);
      function Output3(key, title, socket) {
        var multiConns = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        _classCallCheck(this, Output3);
        return _super.call(this, key, title, socket, multiConns);
      }
      _createClass(Output3, [{
        key: "hasConnection",
        value: function hasConnection() {
          return this.connections.length > 0;
        }
      }, {
        key: "connectTo",
        value: function connectTo(input) {
          if (!this.socket.compatibleWith(input.socket))
            throw new Error("Sockets not compatible");
          if (!input.multipleConnections && input.hasConnection())
            throw new Error("Input already has one connection");
          if (!this.multipleConnections && this.hasConnection())
            throw new Error("Output already has one connection");
          var connection = new Connection(this, input);
          this.connections.push(connection);
          return connection;
        }
      }, {
        key: "connectedTo",
        value: function connectedTo(input) {
          return this.connections.some(function(item) {
            return item.input === input;
          });
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return {
            "connections": this.connections.map(function(c2) {
              if (!c2.input.node)
                throw new Error("Node not added to Input");
              return {
                node: c2.input.node.id,
                input: c2.input.key,
                data: c2.data
              };
            })
          };
        }
      }]);
      return Output3;
    }(IO);
    var Socket3 = /* @__PURE__ */ function() {
      function Socket4(name) {
        var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, Socket4);
        _defineProperty(this, "name", void 0);
        _defineProperty(this, "data", void 0);
        _defineProperty(this, "compatible", []);
        this.name = name;
        this.data = data;
        this.compatible = [];
      }
      _createClass(Socket4, [{
        key: "combineWith",
        value: function combineWith(socket) {
          this.compatible.push(socket);
        }
      }, {
        key: "compatibleWith",
        value: function compatibleWith(socket) {
          return this === socket || this.compatible.includes(socket);
        }
      }]);
      return Socket4;
    }();
    function intersect(array1, array2) {
      return array1.filter(function(value) {
        return -1 !== array2.indexOf(value);
      });
    }
    var Recursion = /* @__PURE__ */ function() {
      function Recursion2(nodes) {
        _classCallCheck(this, Recursion2);
        _defineProperty(this, "nodes", void 0);
        this.nodes = nodes;
      }
      _createClass(Recursion2, [{
        key: "extractInputNodes",
        value: function extractInputNodes(node) {
          var _this = this;
          return Object.keys(node.inputs).reduce(function(acc, key) {
            var connections = node.inputs[key].connections;
            var nodesData = (connections || []).reduce(function(b2, c2) {
              return [].concat(_toConsumableArray(b2), [_this.nodes[c2.node]]);
            }, []);
            return [].concat(_toConsumableArray(acc), _toConsumableArray(nodesData));
          }, []);
        }
      }, {
        key: "findSelf",
        value: function findSelf(list, inputNodes) {
          var inters = intersect(list, inputNodes);
          if (inters.length)
            return inters[0];
          var _iterator = _createForOfIteratorHelper(inputNodes), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var node = _step.value;
              var l2 = [node].concat(_toConsumableArray(list));
              var inter = this.findSelf(l2, this.extractInputNodes(node));
              if (inter)
                return inter;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return null;
        }
      }, {
        key: "detect",
        value: function detect() {
          var _this2 = this;
          var nodesArr = Object.keys(this.nodes).map(function(id) {
            return _this2.nodes[id];
          });
          var _iterator2 = _createForOfIteratorHelper(nodesArr), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var node = _step2.value;
              var inters = this.findSelf([node], this.extractInputNodes(node));
              if (inters)
                return inters;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          return null;
        }
      }]);
      return Recursion2;
    }();
    var State = {
      AVAILABLE: 0,
      PROCESSED: 1,
      ABORT: 2
    };
    var EngineEvents = /* @__PURE__ */ function(_Events) {
      _inherits(EngineEvents2, _Events);
      var _super = _createSuper(EngineEvents2);
      function EngineEvents2() {
        _classCallCheck(this, EngineEvents2);
        return _super.call(this, {});
      }
      return _createClass(EngineEvents2);
    }(Events);
    var Engine = /* @__PURE__ */ function(_Context) {
      _inherits(Engine2, _Context);
      var _super = _createSuper(Engine2);
      function Engine2(id) {
        var _this;
        _classCallCheck(this, Engine2);
        _this = _super.call(this, id, new EngineEvents());
        _defineProperty(_assertThisInitialized(_this), "args", []);
        _defineProperty(_assertThisInitialized(_this), "data", null);
        _defineProperty(_assertThisInitialized(_this), "state", State.AVAILABLE);
        _defineProperty(_assertThisInitialized(_this), "forwarded", /* @__PURE__ */ new Set());
        _defineProperty(_assertThisInitialized(_this), "onAbort", function() {
        });
        return _this;
      }
      _createClass(Engine2, [{
        key: "clone",
        value: function clone() {
          var engine = new Engine2(this.id);
          this.components.forEach(function(c2) {
            return engine.register(c2);
          });
          return engine;
        }
      }, {
        key: "throwError",
        value: function() {
          var _throwError = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(message) {
            var data, _args = arguments;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    data = _args.length > 1 && _args[1] !== void 0 ? _args[1] : null;
                    _context.next = 3;
                    return this.abort();
                  case 3:
                    this.trigger("error", {
                      message,
                      data
                    });
                    this.processDone();
                    return _context.abrupt("return", "error");
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function throwError(_x) {
            return _throwError.apply(this, arguments);
          }
          return throwError;
        }()
      }, {
        key: "processStart",
        value: function processStart() {
          if (this.state === State.AVAILABLE) {
            this.state = State.PROCESSED;
            return true;
          }
          if (this.state === State.ABORT) {
            return false;
          }
          console.warn("The process is busy and has not been restarted.\n                Use abort() to force it to complete");
          return false;
        }
      }, {
        key: "processDone",
        value: function processDone() {
          var success = this.state !== State.ABORT;
          this.state = State.AVAILABLE;
          if (!success) {
            this.onAbort();
            this.onAbort = function() {
            };
          }
          return success;
        }
      }, {
        key: "abort",
        value: function() {
          var _abort = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", new Promise(function(ret) {
                      if (_this2.state === State.PROCESSED) {
                        _this2.state = State.ABORT;
                        _this2.onAbort = ret;
                      } else if (_this2.state === State.ABORT) {
                        _this2.onAbort();
                        _this2.onAbort = ret;
                      } else
                        ret();
                    }));
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function abort() {
            return _abort.apply(this, arguments);
          }
          return abort;
        }()
      }, {
        key: "lock",
        value: function() {
          var _lock = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(node) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", new Promise(function(res) {
                      node.unlockPool = node.unlockPool || [];
                      if (node.busy && !node.outputData)
                        node.unlockPool.push(res);
                      else
                        res();
                      node.busy = true;
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function lock(_x2) {
            return _lock.apply(this, arguments);
          }
          return lock;
        }()
      }, {
        key: "unlock",
        value: function unlock(node) {
          node.unlockPool.forEach(function(a) {
            return a();
          });
          node.unlockPool = [];
          node.busy = false;
        }
      }, {
        key: "extractInputData",
        value: function() {
          var _extractInputData = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5(node) {
            var _this3 = this;
            var obj, _i, _Object$keys, key, input, conns, connData;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    obj = {};
                    _i = 0, _Object$keys = Object.keys(node.inputs);
                  case 2:
                    if (!(_i < _Object$keys.length)) {
                      _context5.next = 13;
                      break;
                    }
                    key = _Object$keys[_i];
                    input = node.inputs[key];
                    conns = input.connections;
                    _context5.next = 8;
                    return Promise.all(conns.map(/* @__PURE__ */ function() {
                      var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(c2) {
                        var prevNode, outputs;
                        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                prevNode = _this3.data.nodes[c2.node];
                                _context4.next = 3;
                                return _this3.processNode(prevNode);
                              case 3:
                                outputs = _context4.sent;
                                if (outputs) {
                                  _context4.next = 8;
                                  break;
                                }
                                _this3.abort();
                                _context4.next = 9;
                                break;
                              case 8:
                                return _context4.abrupt("return", outputs[c2.output]);
                              case 9:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }));
                      return function(_x4) {
                        return _ref.apply(this, arguments);
                      };
                    }()));
                  case 8:
                    connData = _context5.sent;
                    obj[key] = connData;
                  case 10:
                    _i++;
                    _context5.next = 2;
                    break;
                  case 13:
                    return _context5.abrupt("return", obj);
                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));
          function extractInputData(_x3) {
            return _extractInputData.apply(this, arguments);
          }
          return extractInputData;
        }()
      }, {
        key: "processWorker",
        value: function() {
          var _processWorker = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6(node) {
            var inputData, component, outputData;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return this.extractInputData(node);
                  case 2:
                    inputData = _context6.sent;
                    component = this.components.get(node.name);
                    outputData = {};
                    _context6.prev = 5;
                    _context6.next = 8;
                    return component.worker.apply(component, [node, inputData, outputData].concat(_toConsumableArray(this.args)));
                  case 8:
                    _context6.next = 14;
                    break;
                  case 10:
                    _context6.prev = 10;
                    _context6.t0 = _context6["catch"](5);
                    this.abort();
                    this.trigger("warn", _context6.t0);
                  case 14:
                    return _context6.abrupt("return", outputData);
                  case 15:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this, [[5, 10]]);
          }));
          function processWorker(_x5) {
            return _processWorker.apply(this, arguments);
          }
          return processWorker;
        }()
      }, {
        key: "processNode",
        value: function() {
          var _processNode = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(node) {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!(this.state === State.ABORT || !node)) {
                      _context7.next = 2;
                      break;
                    }
                    return _context7.abrupt("return", null);
                  case 2:
                    _context7.next = 4;
                    return this.lock(node);
                  case 4:
                    if (node.outputData) {
                      _context7.next = 8;
                      break;
                    }
                    _context7.next = 7;
                    return this.processWorker(node);
                  case 7:
                    node.outputData = _context7.sent;
                  case 8:
                    this.unlock(node);
                    return _context7.abrupt("return", node.outputData);
                  case 10:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));
          function processNode(_x6) {
            return _processNode.apply(this, arguments);
          }
          return processNode;
        }()
      }, {
        key: "forwardProcess",
        value: function() {
          var _forwardProcess = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee10(node) {
            var _this4 = this;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    if (!(this.state === State.ABORT)) {
                      _context10.next = 2;
                      break;
                    }
                    return _context10.abrupt("return", null);
                  case 2:
                    _context10.next = 4;
                    return Promise.all(Object.keys(node.outputs).map(/* @__PURE__ */ function() {
                      var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9(key) {
                        var output;
                        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                output = node.outputs[key];
                                _context9.next = 3;
                                return Promise.all(output.connections.map(/* @__PURE__ */ function() {
                                  var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8(c2) {
                                    var nextNode;
                                    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                                      while (1) {
                                        switch (_context8.prev = _context8.next) {
                                          case 0:
                                            nextNode = _this4.data.nodes[c2.node];
                                            if (_this4.forwarded.has(nextNode)) {
                                              _context8.next = 7;
                                              break;
                                            }
                                            _this4.forwarded.add(nextNode);
                                            _context8.next = 5;
                                            return _this4.processNode(nextNode);
                                          case 5:
                                            _context8.next = 7;
                                            return _this4.forwardProcess(nextNode);
                                          case 7:
                                          case "end":
                                            return _context8.stop();
                                        }
                                      }
                                    }, _callee8);
                                  }));
                                  return function(_x9) {
                                    return _ref3.apply(this, arguments);
                                  };
                                }()));
                              case 3:
                                return _context9.abrupt("return", _context9.sent);
                              case 4:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        }, _callee9);
                      }));
                      return function(_x8) {
                        return _ref2.apply(this, arguments);
                      };
                    }()));
                  case 4:
                    return _context10.abrupt("return", _context10.sent);
                  case 5:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));
          function forwardProcess(_x7) {
            return _forwardProcess.apply(this, arguments);
          }
          return forwardProcess;
        }()
      }, {
        key: "copy",
        value: function copy(data) {
          data = Object.assign({}, data);
          data.nodes = Object.assign({}, data.nodes);
          Object.keys(data.nodes).forEach(function(key) {
            data.nodes[key] = Object.assign({}, data.nodes[key]);
          });
          return data;
        }
      }, {
        key: "validate",
        value: function() {
          var _validate = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee11(data) {
            var checking, recursion, recurrentNode;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    checking = Validator.validate(this.id, data);
                    recursion = new Recursion(data.nodes);
                    if (checking.success) {
                      _context11.next = 6;
                      break;
                    }
                    _context11.next = 5;
                    return this.throwError(checking.msg);
                  case 5:
                    return _context11.abrupt("return", _context11.sent);
                  case 6:
                    recurrentNode = recursion.detect();
                    if (!recurrentNode) {
                      _context11.next = 11;
                      break;
                    }
                    _context11.next = 10;
                    return this.throwError("Recursion detected", recurrentNode);
                  case 10:
                    return _context11.abrupt("return", _context11.sent);
                  case 11:
                    return _context11.abrupt("return", true);
                  case 12:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11, this);
          }));
          function validate(_x10) {
            return _validate.apply(this, arguments);
          }
          return validate;
        }()
      }, {
        key: "processStartNode",
        value: function() {
          var _processStartNode = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee12(id) {
            var startNode;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    if (id) {
                      _context12.next = 2;
                      break;
                    }
                    return _context12.abrupt("return");
                  case 2:
                    startNode = this.data.nodes[id];
                    if (startNode) {
                      _context12.next = 7;
                      break;
                    }
                    _context12.next = 6;
                    return this.throwError("Node with such id not found");
                  case 6:
                    return _context12.abrupt("return", _context12.sent);
                  case 7:
                    _context12.next = 9;
                    return this.processNode(startNode);
                  case 9:
                    _context12.next = 11;
                    return this.forwardProcess(startNode);
                  case 11:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12, this);
          }));
          function processStartNode(_x11) {
            return _processStartNode.apply(this, arguments);
          }
          return processStartNode;
        }()
      }, {
        key: "processUnreachable",
        value: function() {
          var _processUnreachable = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee13() {
            var data, i, node;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    data = this.data;
                    _context13.t0 = _regeneratorRuntime().keys(data.nodes);
                  case 2:
                    if ((_context13.t1 = _context13.t0()).done) {
                      _context13.next = 12;
                      break;
                    }
                    i = _context13.t1.value;
                    node = data.nodes[i];
                    if (!(typeof node.outputData === "undefined")) {
                      _context13.next = 10;
                      break;
                    }
                    _context13.next = 8;
                    return this.processNode(node);
                  case 8:
                    _context13.next = 10;
                    return this.forwardProcess(node);
                  case 10:
                    _context13.next = 2;
                    break;
                  case 12:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13, this);
          }));
          function processUnreachable() {
            return _processUnreachable.apply(this, arguments);
          }
          return processUnreachable;
        }()
      }, {
        key: "process",
        value: function() {
          var _process = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee14(data) {
            var startId, _len, args, _key, _args14 = arguments;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    startId = _args14.length > 1 && _args14[1] !== void 0 ? _args14[1] : null;
                    if (this.processStart()) {
                      _context14.next = 3;
                      break;
                    }
                    return _context14.abrupt("return");
                  case 3:
                    if (this.validate(data)) {
                      _context14.next = 5;
                      break;
                    }
                    return _context14.abrupt("return");
                  case 5:
                    this.data = this.copy(data);
                    for (_len = _args14.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                      args[_key - 2] = _args14[_key];
                    }
                    this.args = args;
                    this.forwarded = /* @__PURE__ */ new Set();
                    _context14.next = 11;
                    return this.processStartNode(startId);
                  case 11:
                    _context14.next = 13;
                    return this.processUnreachable();
                  case 13:
                    return _context14.abrupt("return", this.processDone() ? "success" : "aborted");
                  case 14:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee14, this);
          }));
          function process2(_x12) {
            return _process.apply(this, arguments);
          }
          return process2;
        }()
      }]);
      return Engine2;
    }(Context);
    var index = {
      Engine,
      Recursion,
      Component: Component2,
      Control,
      Connection,
      Emitter,
      Input: Input2,
      IO,
      Node: Node2,
      NodeEditor,
      Output: Output2,
      Socket: Socket3
    };
    exports.Component = Component2;
    exports.Connection = Connection;
    exports.Control = Control;
    exports.Emitter = Emitter;
    exports.Engine = Engine;
    exports.IO = IO;
    exports.Input = Input2;
    exports.Node = Node2;
    exports.NodeEditor = NodeEditor;
    exports.Output = Output2;
    exports.Recursion = Recursion;
    exports.Socket = Socket3;
    exports["default"] = index;
  }
});
var require_cjs = __commonJS2({
  "../../node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options2) {
      return options2.clone !== false && options2.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options2) : value;
    }
    function defaultArrayMerge(target, source, options2) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options2);
      });
    }
    function getMergeFunction(key, options2) {
      if (!options2.customMerge) {
        return deepmerge;
      }
      var customMerge = options2.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol2) {
        return Object.propertyIsEnumerable.call(target, symbol2);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_2) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options2) {
      var destination = {};
      if (options2.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options2);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options2.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options2)(target[key], source[key], options2);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options2);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options2) {
      options2 = options2 || {};
      options2.arrayMerge = options2.arrayMerge || defaultArrayMerge;
      options2.isMergeableObject = options2.isMergeableObject || isMergeableObject;
      options2.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options2);
      } else if (sourceIsArray) {
        return options2.arrayMerge(target, source, options2);
      } else {
        return mergeObject(target, source, options2);
      }
    }
    deepmerge.all = function deepmergeAll(array, options2) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options2);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p2, c2) => _defu(p2, c2, "", merger), {})
  );
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj(arg) {
  if (!isPlainObject(arg)) {
    return false;
  }
  if (!arg.message && !arg.args) {
    return false;
  }
  if (arg.stack) {
    return false;
  }
  return true;
}
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel;
  }
  if (typeof input === "number") {
    return input;
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level;
  }
  return defaultLevel;
}
function createConsola(options2 = {}) {
  return new Consola(options2);
}
var LogLevels;
var LogTypes;
var defu;
var paused;
var queue;
var Consola;
var init_core = __esm({
  "../../node_modules/consola/dist/core.mjs"() {
    "use strict";
    LogLevels = {
      silent: Number.NEGATIVE_INFINITY,
      fatal: 0,
      error: 0,
      warn: 1,
      log: 2,
      info: 3,
      success: 3,
      fail: 3,
      ready: 3,
      start: 3,
      box: 3,
      debug: 4,
      trace: 5,
      verbose: Number.POSITIVE_INFINITY
    };
    LogTypes = {
      // Silent
      silent: {
        level: -1
      },
      // Level 0
      fatal: {
        level: LogLevels.fatal
      },
      error: {
        level: LogLevels.error
      },
      // Level 1
      warn: {
        level: LogLevels.warn
      },
      // Level 2
      log: {
        level: LogLevels.log
      },
      // Level 3
      info: {
        level: LogLevels.info
      },
      success: {
        level: LogLevels.success
      },
      fail: {
        level: LogLevels.fail
      },
      ready: {
        level: LogLevels.info
      },
      start: {
        level: LogLevels.info
      },
      box: {
        level: LogLevels.info
      },
      // Level 4
      debug: {
        level: LogLevels.debug
      },
      // Level 5
      trace: {
        level: LogLevels.trace
      },
      // Verbose
      verbose: {
        level: LogLevels.verbose
      }
    };
    defu = createDefu();
    paused = false;
    queue = [];
    Consola = class _Consola {
      constructor(options2 = {}) {
        const types = options2.types || LogTypes;
        this.options = defu(
          {
            ...options2,
            defaults: { ...options2.defaults },
            level: _normalizeLogLevel(options2.level, types),
            reporters: [...options2.reporters || []]
          },
          {
            types: LogTypes,
            throttle: 1e3,
            throttleMin: 5,
            formatOptions: {
              date: true,
              colors: false,
              compact: true
            }
          }
        );
        for (const type in types) {
          const defaults = {
            type,
            ...this.options.defaults,
            ...types[type]
          };
          this[type] = this._wrapLogFn(defaults);
          this[type].raw = this._wrapLogFn(
            defaults,
            true
          );
        }
        if (this.options.mockFn) {
          this.mockTypes();
        }
        this._lastLog = {};
      }
      get level() {
        return this.options.level;
      }
      set level(level) {
        this.options.level = _normalizeLogLevel(
          level,
          this.options.types,
          this.options.level
        );
      }
      prompt(message, opts) {
        if (!this.options.prompt) {
          throw new Error("prompt is not supported!");
        }
        return this.options.prompt(message, opts);
      }
      create(options2) {
        const instance = new _Consola({
          ...this.options,
          ...options2
        });
        if (this._mockFn) {
          instance.mockTypes(this._mockFn);
        }
        return instance;
      }
      withDefaults(defaults) {
        return this.create({
          ...this.options,
          defaults: {
            ...this.options.defaults,
            ...defaults
          }
        });
      }
      withTag(tag) {
        return this.withDefaults({
          tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag
        });
      }
      addReporter(reporter) {
        this.options.reporters.push(reporter);
        return this;
      }
      removeReporter(reporter) {
        if (reporter) {
          const i = this.options.reporters.indexOf(reporter);
          if (i >= 0) {
            return this.options.reporters.splice(i, 1);
          }
        } else {
          this.options.reporters.splice(0);
        }
        return this;
      }
      setReporters(reporters) {
        this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
        return this;
      }
      wrapAll() {
        this.wrapConsole();
        this.wrapStd();
      }
      restoreAll() {
        this.restoreConsole();
        this.restoreStd();
      }
      wrapConsole() {
        for (const type in this.options.types) {
          if (!console["__" + type]) {
            console["__" + type] = console[type];
          }
          console[type] = this[type].raw;
        }
      }
      restoreConsole() {
        for (const type in this.options.types) {
          if (console["__" + type]) {
            console[type] = console["__" + type];
            delete console["__" + type];
          }
        }
      }
      wrapStd() {
        this._wrapStream(this.options.stdout, "log");
        this._wrapStream(this.options.stderr, "log");
      }
      _wrapStream(stream, type) {
        if (!stream) {
          return;
        }
        if (!stream.__write) {
          stream.__write = stream.write;
        }
        stream.write = (data) => {
          this[type].raw(String(data).trim());
        };
      }
      restoreStd() {
        this._restoreStream(this.options.stdout);
        this._restoreStream(this.options.stderr);
      }
      _restoreStream(stream) {
        if (!stream) {
          return;
        }
        if (stream.__write) {
          stream.write = stream.__write;
          delete stream.__write;
        }
      }
      pauseLogs() {
        paused = true;
      }
      resumeLogs() {
        paused = false;
        const _queue = queue.splice(0);
        for (const item of _queue) {
          item[0]._logFn(item[1], item[2]);
        }
      }
      mockTypes(mockFn) {
        const _mockFn = mockFn || this.options.mockFn;
        this._mockFn = _mockFn;
        if (typeof _mockFn !== "function") {
          return;
        }
        for (const type in this.options.types) {
          this[type] = _mockFn(type, this.options.types[type]) || this[type];
          this[type].raw = this[type];
        }
      }
      _wrapLogFn(defaults, isRaw) {
        return (...args) => {
          if (paused) {
            queue.push([this, defaults, args, isRaw]);
            return;
          }
          return this._logFn(defaults, args, isRaw);
        };
      }
      _logFn(defaults, args, isRaw) {
        if ((defaults.level || 0) > this.level) {
          return false;
        }
        const logObj = {
          date: /* @__PURE__ */ new Date(),
          args: [],
          ...defaults,
          level: _normalizeLogLevel(defaults.level, this.options.types)
        };
        if (!isRaw && args.length === 1 && isLogObj(args[0])) {
          Object.assign(logObj, args[0]);
        } else {
          logObj.args = [...args];
        }
        if (logObj.message) {
          logObj.args.unshift(logObj.message);
          delete logObj.message;
        }
        if (logObj.additional) {
          if (!Array.isArray(logObj.additional)) {
            logObj.additional = logObj.additional.split("\n");
          }
          logObj.args.push("\n" + logObj.additional.join("\n"));
          delete logObj.additional;
        }
        logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
        logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
        const resolveLog = (newLog = false) => {
          const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
          if (this._lastLog.object && repeated > 0) {
            const args2 = [...this._lastLog.object.args];
            if (repeated > 1) {
              args2.push(`(repeated ${repeated} times)`);
            }
            this._log({ ...this._lastLog.object, args: args2 });
            this._lastLog.count = 1;
          }
          if (newLog) {
            this._lastLog.object = logObj;
            this._log(logObj);
          }
        };
        clearTimeout(this._lastLog.timeout);
        const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
        this._lastLog.time = logObj.date;
        if (diffTime < this.options.throttle) {
          try {
            const serializedLog = JSON.stringify([
              logObj.type,
              logObj.tag,
              logObj.args
            ]);
            const isSameLog = this._lastLog.serialized === serializedLog;
            this._lastLog.serialized = serializedLog;
            if (isSameLog) {
              this._lastLog.count = (this._lastLog.count || 0) + 1;
              if (this._lastLog.count > this.options.throttleMin) {
                this._lastLog.timeout = setTimeout(
                  resolveLog,
                  this.options.throttle
                );
                return;
              }
            }
          } catch {
          }
        }
        resolveLog(true);
      }
      _log(logObj) {
        for (const reporter of this.options.reporters) {
          reporter.log(logObj, {
            options: this.options
          });
        }
      }
    };
    Consola.prototype.add = Consola.prototype.addReporter;
    Consola.prototype.remove = Consola.prototype.removeReporter;
    Consola.prototype.clear = Consola.prototype.removeReporter;
    Consola.prototype.withScope = Consola.prototype.withTag;
    Consola.prototype.mock = Consola.prototype.mockTypes;
    Consola.prototype.pause = Consola.prototype.pauseLogs;
    Consola.prototype.resume = Consola.prototype.resumeLogs;
  }
});
function parseStack(stack) {
  const cwd = process.cwd() + sep;
  const lines = stack.split("\n").splice(1).map((l2) => l2.trim().replace("file://", "").replace(cwd, ""));
  return lines;
}
function writeStream(data, stream) {
  const write = stream.__write || stream.write;
  return write.call(stream, data);
}
var bracket;
var BasicReporter;
var init_consola_06ad8a64 = __esm({
  "../../node_modules/consola/dist/shared/consola.06ad8a64.mjs"() {
    "use strict";
    bracket = (x) => x ? `[${x}]` : "";
    BasicReporter = class {
      formatStack(stack, opts) {
        return "  " + parseStack(stack).join("\n  ");
      }
      formatArgs(args, opts) {
        const _args = args.map((arg) => {
          if (arg && typeof arg.stack === "string") {
            return arg.message + "\n" + this.formatStack(arg.stack, opts);
          }
          return arg;
        });
        return formatWithOptions(opts, ..._args);
      }
      formatDate(date, opts) {
        return opts.date ? date.toLocaleTimeString() : "";
      }
      filterAndJoin(arr) {
        return arr.filter(Boolean).join(" ");
      }
      formatLogObj(logObj, opts) {
        const message = this.formatArgs(logObj.args, opts);
        if (logObj.type === "box") {
          return "\n" + [
            bracket(logObj.tag),
            logObj.title && logObj.title,
            ...message.split("\n")
          ].filter(Boolean).map((l2) => " > " + l2).join("\n") + "\n";
        }
        return this.filterAndJoin([
          bracket(logObj.type),
          bracket(logObj.tag),
          message
        ]);
      }
      log(logObj, ctx) {
        const line = this.formatLogObj(logObj, {
          columns: ctx.options.stdout.columns || 0,
          ...ctx.options.formatOptions
        });
        return writeStream(
          line + "\n",
          logObj.level < 2 ? ctx.options.stderr || process.stderr : ctx.options.stdout || process.stdout
        );
      }
    };
  }
});
function replaceClose(index, string, close, replace, head = string.slice(0, Math.max(0, index)) + replace, tail = string.slice(Math.max(0, index + close.length)), next = tail.indexOf(close)) {
  return head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
}
function clearBleed(index, string, open, close, replace) {
  return index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
}
function filterEmpty(open, close, replace = open, at = open.length + 1) {
  return (string) => string || !(string === "" || string === void 0) ? clearBleed(
    ("" + string).indexOf(close, at),
    string,
    open,
    close,
    replace
  ) : "";
}
function init(open, close, replace) {
  return filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
}
function createColors(useColor = isColorSupported) {
  return useColor ? colorDefs : Object.fromEntries(Object.keys(colorDefs).map((key) => [key, String]));
}
function getColor(color, fallback = "reset") {
  return colors[color] || colors[fallback];
}
function stripAnsi(text2) {
  return text2.replace(new RegExp(ansiRegex, "g"), "");
}
function box(text2, _opts = {}) {
  const opts = {
    ..._opts,
    style: {
      ...defaultStyle,
      ..._opts.style
    }
  };
  const textLines = text2.split("\n");
  const boxLines = [];
  const _color = getColor(opts.style.borderColor);
  const borderStyle = {
    ...typeof opts.style.borderStyle === "string" ? boxStylePresets[opts.style.borderStyle] || boxStylePresets.solid : opts.style.borderStyle
  };
  if (_color) {
    for (const key in borderStyle) {
      borderStyle[key] = _color(
        borderStyle[key]
      );
    }
  }
  const paddingOffset = opts.style.padding % 2 === 0 ? opts.style.padding : opts.style.padding + 1;
  const height = textLines.length + paddingOffset;
  const width = Math.max(...textLines.map((line) => line.length)) + paddingOffset;
  const widthOffset = width + paddingOffset;
  const leftSpace = opts.style.marginLeft > 0 ? " ".repeat(opts.style.marginLeft) : "";
  if (opts.style.marginTop > 0) {
    boxLines.push("".repeat(opts.style.marginTop));
  }
  if (opts.title) {
    const left = borderStyle.h.repeat(
      Math.floor((width - stripAnsi(opts.title).length) / 2)
    );
    const right = borderStyle.h.repeat(
      width - stripAnsi(opts.title).length - stripAnsi(left).length + paddingOffset
    );
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${left}${opts.title}${right}${borderStyle.tr}`
    );
  } else {
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${borderStyle.h.repeat(widthOffset)}${borderStyle.tr}`
    );
  }
  const valignOffset = opts.style.valign === "center" ? Math.floor((height - textLines.length) / 2) : opts.style.valign === "top" ? height - textLines.length - paddingOffset : height - textLines.length;
  for (let i = 0; i < height; i++) {
    if (i < valignOffset || i >= valignOffset + textLines.length) {
      boxLines.push(
        `${leftSpace}${borderStyle.v}${" ".repeat(widthOffset)}${borderStyle.v}`
      );
    } else {
      const line = textLines[i - valignOffset];
      const left = " ".repeat(paddingOffset);
      const right = " ".repeat(width - stripAnsi(line).length);
      boxLines.push(
        `${leftSpace}${borderStyle.v}${left}${line}${right}${borderStyle.v}`
      );
    }
  }
  boxLines.push(
    `${leftSpace}${borderStyle.bl}${borderStyle.h.repeat(widthOffset)}${borderStyle.br}`
  );
  if (opts.style.marginBottom > 0) {
    boxLines.push("".repeat(opts.style.marginBottom));
  }
  return boxLines.join("\n");
}
var env;
var argv;
var platform;
var isDisabled;
var isForced;
var isWindows;
var isDumbTerminal;
var isCompatibleTerminal;
var isCI;
var isColorSupported;
var colorDefs;
var colors;
var ansiRegex;
var boxStylePresets;
var defaultStyle;
var init_utils = __esm({
  "../../node_modules/consola/dist/utils.mjs"() {
    "use strict";
    ({
      env = {},
      argv = [],
      platform = ""
    } = typeof process === "undefined" ? {} : process);
    isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
    isForced = "FORCE_COLOR" in env || argv.includes("--color");
    isWindows = platform === "win32";
    isDumbTerminal = env.TERM === "dumb";
    isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
    isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
    isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
    colorDefs = {
      reset: init(0, 0),
      bold: init(1, 22, "\x1B[22m\x1B[1m"),
      dim: init(2, 22, "\x1B[22m\x1B[2m"),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49),
      blackBright: init(90, 39),
      redBright: init(91, 39),
      greenBright: init(92, 39),
      yellowBright: init(93, 39),
      blueBright: init(94, 39),
      magentaBright: init(95, 39),
      cyanBright: init(96, 39),
      whiteBright: init(97, 39),
      bgBlackBright: init(100, 49),
      bgRedBright: init(101, 49),
      bgGreenBright: init(102, 49),
      bgYellowBright: init(103, 49),
      bgBlueBright: init(104, 49),
      bgMagentaBright: init(105, 49),
      bgCyanBright: init(106, 49),
      bgWhiteBright: init(107, 49)
    };
    colors = createColors();
    ansiRegex = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    boxStylePresets = {
      solid: {
        tl: "\u250C",
        tr: "\u2510",
        bl: "\u2514",
        br: "\u2518",
        h: "\u2500",
        v: "\u2502"
      },
      double: {
        tl: "\u2554",
        tr: "\u2557",
        bl: "\u255A",
        br: "\u255D",
        h: "\u2550",
        v: "\u2551"
      },
      doubleSingle: {
        tl: "\u2553",
        tr: "\u2556",
        bl: "\u2559",
        br: "\u255C",
        h: "\u2500",
        v: "\u2551"
      },
      doubleSingleRounded: {
        tl: "\u256D",
        tr: "\u256E",
        bl: "\u2570",
        br: "\u256F",
        h: "\u2500",
        v: "\u2551"
      },
      singleThick: {
        tl: "\u250F",
        tr: "\u2513",
        bl: "\u2517",
        br: "\u251B",
        h: "\u2501",
        v: "\u2503"
      },
      singleDouble: {
        tl: "\u2552",
        tr: "\u2555",
        bl: "\u2558",
        br: "\u255B",
        h: "\u2550",
        v: "\u2502"
      },
      singleDoubleRounded: {
        tl: "\u256D",
        tr: "\u256E",
        bl: "\u2570",
        br: "\u256F",
        h: "\u2550",
        v: "\u2502"
      },
      rounded: {
        tl: "\u256D",
        tr: "\u256E",
        bl: "\u2570",
        br: "\u256F",
        h: "\u2500",
        v: "\u2502"
      }
    };
    defaultStyle = {
      borderColor: "white",
      borderStyle: "rounded",
      valign: "center",
      padding: 2,
      marginLeft: 1,
      marginTop: 1,
      marginBottom: 1
    };
  }
});
var prompt_exports = {};
__export(prompt_exports, {
  prompt: () => prompt
});
function z({ onlyFirst: t = false } = {}) {
  const u = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
  return new RegExp(u, t ? void 0 : "g");
}
function $(t) {
  if (typeof t != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
  return t.replace(z(), "");
}
function c(t, u = {}) {
  if (typeof t != "string" || t.length === 0 || (u = { ambiguousIsNarrow: true, ...u }, t = $(t), t.length === 0))
    return 0;
  t = t.replace(Y(), "  ");
  const F = u.ambiguousIsNarrow ? 1 : 2;
  let e = 0;
  for (const s3 of t) {
    const C = s3.codePointAt(0);
    if (C <= 31 || C >= 127 && C <= 159 || C >= 768 && C <= 879)
      continue;
    switch (K.eastAsianWidth(s3)) {
      case "F":
      case "W":
        e += 2;
        break;
      case "A":
        e += F;
        break;
      default:
        e += 1;
    }
  }
  return e;
}
function U() {
  const t = /* @__PURE__ */ new Map();
  for (const [u, F] of Object.entries(r)) {
    for (const [e, s3] of Object.entries(F))
      r[e] = { open: `\x1B[${s3[0]}m`, close: `\x1B[${s3[1]}m` }, F[e] = r[e], t.set(s3[0], s3[1]);
    Object.defineProperty(r, u, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: t, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = L(), r.color.ansi256 = M(), r.color.ansi16m = T(), r.bgColor.ansi = L(v), r.bgColor.ansi256 = M(v), r.bgColor.ansi16m = T(v), Object.defineProperties(r, { rgbToAnsi256: { value: (u, F, e) => u === F && F === e ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(e / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
    if (!F)
      return [0, 0, 0];
    let [e] = F;
    e.length === 3 && (e = [...e].map((C) => C + C).join(""));
    const s3 = Number.parseInt(e, 16);
    return [s3 >> 16 & 255, s3 >> 8 & 255, s3 & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
    if (u < 8)
      return 30 + u;
    if (u < 16)
      return 90 + (u - 8);
    let F, e, s3;
    if (u >= 232)
      F = ((u - 232) * 10 + 8) / 255, e = F, s3 = F;
    else {
      u -= 16;
      const i = u % 36;
      F = Math.floor(u / 36) / 5, e = Math.floor(i / 6) / 5, s3 = i % 6 / 5;
    }
    const C = Math.max(F, e, s3) * 2;
    if (C === 0)
      return 30;
    let D = 30 + (Math.round(s3) << 2 | Math.round(e) << 1 | Math.round(F));
    return C === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u, F, e) => r.ansi256ToAnsi(r.rgbToAnsi256(u, F, e)), enumerable: false }, hexToAnsi: { value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)), enumerable: false } }), r;
}
function P(t, u, F) {
  return String(t).normalize().replace(/\r\n/g, `
`).split(`
`).map((e) => uD(e, u, F)).join(`
`);
}
function FD(t, u) {
  if (t === u)
    return;
  const F = t.split(`
`), e = u.split(`
`), s3 = [];
  for (let C = 0; C < Math.max(F.length, e.length); C++)
    F[C] !== e[C] && s3.push(C);
  return s3;
}
function g(t, u) {
  t.isTTY && t.setRawMode(u);
}
async function prompt(message, opts = {}) {
  if (!opts.type || opts.type === "text") {
    return await text({
      message,
      defaultValue: opts.default,
      placeholder: opts.placeholder,
      initialValue: opts.initial
    });
  }
  if (opts.type === "confirm") {
    return await confirm({
      message,
      initialValue: opts.initial
    });
  }
  if (opts.type === "select") {
    return await select({
      message,
      options: opts.options.map(
        (o) => typeof o === "string" ? { value: o, label: o } : o
      )
    });
  }
  if (opts.type === "multiselect") {
    return await multiselect({
      message,
      options: opts.options.map(
        (o) => typeof o === "string" ? { value: o, label: o } : o
      ),
      required: opts.required
    });
  }
  throw new Error(`Unknown prompt type: ${opts.type}`);
}
var ESC;
var CSI;
var beep;
var cursor;
var scroll;
var erase;
var src;
var picocolors;
var tty2;
var isColorSupported2;
var formatter;
var replaceClose2;
var createColors2;
var picocolorsExports;
var l;
var m;
var G;
var K;
var Y;
var v;
var L;
var M;
var T;
var r;
var Z;
var H;
var q;
var p;
var J;
var b;
var W;
var Q;
var I;
var w;
var N;
var j;
var X;
var _;
var DD;
var uD;
var R;
var V;
var tD;
var h;
var sD;
var iD;
var ED;
var oD;
var unicode;
var s;
var S_STEP_ACTIVE;
var S_STEP_CANCEL;
var S_STEP_ERROR;
var S_STEP_SUBMIT;
var S_BAR;
var S_BAR_END;
var S_RADIO_ACTIVE;
var S_RADIO_INACTIVE;
var S_CHECKBOX_ACTIVE;
var S_CHECKBOX_SELECTED;
var S_CHECKBOX_INACTIVE;
var symbol;
var text;
var confirm;
var select;
var multiselect;
var init_prompt = __esm({
  "../../node_modules/consola/dist/chunks/prompt.mjs"() {
    "use strict";
    init_consola_36c0034f();
    init_utils();
    init_core();
    init_consola_06ad8a64();
    ESC = "\x1B";
    CSI = `${ESC}[`;
    beep = "\x07";
    cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    src = { cursor, scroll, erase, beep };
    picocolors = { exports: {} };
    tty2 = require$$0;
    isColorSupported2 = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || process.platform === "win32" || tty2.isatty(1) && process.env.TERM !== "dumb" || "CI" in process.env);
    formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose2(string, close, replace, index) + close : open + string + close;
    };
    replaceClose2 = (string, close, replace, index) => {
      let start = string.substring(0, index) + replace;
      let end = string.substring(index + close.length);
      let nextIndex = end.indexOf(close);
      return ~nextIndex ? start + replaceClose2(end, close, replace, nextIndex) : start + end;
    };
    createColors2 = (enabled = isColorSupported2) => ({
      isColorSupported: enabled,
      reset: enabled ? (s3) => `\x1B[0m${s3}\x1B[0m` : String,
      bold: enabled ? formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m") : String,
      dim: enabled ? formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m") : String,
      italic: enabled ? formatter("\x1B[3m", "\x1B[23m") : String,
      underline: enabled ? formatter("\x1B[4m", "\x1B[24m") : String,
      inverse: enabled ? formatter("\x1B[7m", "\x1B[27m") : String,
      hidden: enabled ? formatter("\x1B[8m", "\x1B[28m") : String,
      strikethrough: enabled ? formatter("\x1B[9m", "\x1B[29m") : String,
      black: enabled ? formatter("\x1B[30m", "\x1B[39m") : String,
      red: enabled ? formatter("\x1B[31m", "\x1B[39m") : String,
      green: enabled ? formatter("\x1B[32m", "\x1B[39m") : String,
      yellow: enabled ? formatter("\x1B[33m", "\x1B[39m") : String,
      blue: enabled ? formatter("\x1B[34m", "\x1B[39m") : String,
      magenta: enabled ? formatter("\x1B[35m", "\x1B[39m") : String,
      cyan: enabled ? formatter("\x1B[36m", "\x1B[39m") : String,
      white: enabled ? formatter("\x1B[37m", "\x1B[39m") : String,
      gray: enabled ? formatter("\x1B[90m", "\x1B[39m") : String,
      bgBlack: enabled ? formatter("\x1B[40m", "\x1B[49m") : String,
      bgRed: enabled ? formatter("\x1B[41m", "\x1B[49m") : String,
      bgGreen: enabled ? formatter("\x1B[42m", "\x1B[49m") : String,
      bgYellow: enabled ? formatter("\x1B[43m", "\x1B[49m") : String,
      bgBlue: enabled ? formatter("\x1B[44m", "\x1B[49m") : String,
      bgMagenta: enabled ? formatter("\x1B[45m", "\x1B[49m") : String,
      bgCyan: enabled ? formatter("\x1B[46m", "\x1B[49m") : String,
      bgWhite: enabled ? formatter("\x1B[47m", "\x1B[49m") : String
    });
    picocolors.exports = createColors2();
    picocolors.exports.createColors = createColors2;
    picocolorsExports = picocolors.exports;
    l = /* @__PURE__ */ getDefaultExportFromCjs(picocolorsExports);
    m = {};
    G = { get exports() {
      return m;
    }, set exports(t) {
      m = t;
    } };
    (function(t) {
      var u = {};
      t.exports = u, u.eastAsianWidth = function(e) {
        var s3 = e.charCodeAt(0), C = e.length == 2 ? e.charCodeAt(1) : 0, D = s3;
        return 55296 <= s3 && s3 <= 56319 && 56320 <= C && C <= 57343 && (s3 &= 1023, C &= 1023, D = s3 << 10 | C, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
      }, u.characterLength = function(e) {
        var s3 = this.eastAsianWidth(e);
        return s3 == "F" || s3 == "W" || s3 == "A" ? 2 : 1;
      };
      function F(e) {
        return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      u.length = function(e) {
        for (var s3 = F(e), C = 0, D = 0; D < s3.length; D++)
          C = C + this.characterLength(s3[D]);
        return C;
      }, u.slice = function(e, s3, C) {
        textLen = u.length(e), s3 = s3 || 0, C = C || 1, s3 < 0 && (s3 = textLen + s3), C < 0 && (C = textLen + C);
        for (var D = "", i = 0, o = F(e), E = 0; E < o.length; E++) {
          var a = o[E], n = u.length(a);
          if (i >= s3 - (n == 2 ? 1 : 0))
            if (i + n <= C)
              D += a;
            else
              break;
          i += n;
        }
        return D;
      };
    })(G);
    K = m;
    Y = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
    v = 10;
    L = (t = 0) => (u) => `\x1B[${u + t}m`;
    M = (t = 0) => (u) => `\x1B[${38 + t};5;${u}m`;
    T = (t = 0) => (u, F, e) => `\x1B[${38 + t};2;${u};${F};${e}m`;
    r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    Object.keys(r.modifier);
    Z = Object.keys(r.color);
    H = Object.keys(r.bgColor);
    [...Z, ...H];
    q = U();
    p = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
    J = 39;
    b = "\x07";
    W = "[";
    Q = "]";
    I = "m";
    w = `${Q}8;;`;
    N = (t) => `${p.values().next().value}${W}${t}${I}`;
    j = (t) => `${p.values().next().value}${w}${t}${b}`;
    X = (t) => t.split(" ").map((u) => c(u));
    _ = (t, u, F) => {
      const e = [...u];
      let s3 = false, C = false, D = c($(t[t.length - 1]));
      for (const [i, o] of e.entries()) {
        const E = c(o);
        if (D + E <= F ? t[t.length - 1] += o : (t.push(o), D = 0), p.has(o) && (s3 = true, C = e.slice(i + 1).join("").startsWith(w)), s3) {
          C ? o === b && (s3 = false, C = false) : o === I && (s3 = false);
          continue;
        }
        D += E, D === F && i < e.length - 1 && (t.push(""), D = 0);
      }
      !D && t[t.length - 1].length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
    };
    DD = (t) => {
      const u = t.split(" ");
      let F = u.length;
      for (; F > 0 && !(c(u[F - 1]) > 0); )
        F--;
      return F === u.length ? t : u.slice(0, F).join(" ") + u.slice(F).join("");
    };
    uD = (t, u, F = {}) => {
      if (F.trim !== false && t.trim() === "")
        return "";
      let e = "", s3, C;
      const D = X(t);
      let i = [""];
      for (const [E, a] of t.split(" ").entries()) {
        F.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
        let n = c(i[i.length - 1]);
        if (E !== 0 && (n >= u && (F.wordWrap === false || F.trim === false) && (i.push(""), n = 0), (n > 0 || F.trim === false) && (i[i.length - 1] += " ", n++)), F.hard && D[E] > u) {
          const B = u - n, A = 1 + Math.floor((D[E] - B - 1) / u);
          Math.floor((D[E] - 1) / u) < A && i.push(""), _(i, a, u);
          continue;
        }
        if (n + D[E] > u && n > 0 && D[E] > 0) {
          if (F.wordWrap === false && n < u) {
            _(i, a, u);
            continue;
          }
          i.push("");
        }
        if (n + D[E] > u && F.wordWrap === false) {
          _(i, a, u);
          continue;
        }
        i[i.length - 1] += a;
      }
      F.trim !== false && (i = i.map((E) => DD(E)));
      const o = [...i.join(`
`)];
      for (const [E, a] of o.entries()) {
        if (e += a, p.has(a)) {
          const { groups: B } = new RegExp(`(?:\\${W}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(o.slice(E).join("")) || { groups: {} };
          if (B.code !== void 0) {
            const A = Number.parseFloat(B.code);
            s3 = A === J ? void 0 : A;
          } else
            B.uri !== void 0 && (C = B.uri.length === 0 ? void 0 : B.uri);
        }
        const n = q.codes.get(Number(s3));
        o[E + 1] === `
` ? (C && (e += j("")), s3 && n && (e += N(n))) : a === `
` && (s3 && n && (e += N(s3)), C && (e += j(C)));
      }
      return e;
    };
    R = Symbol("clack:cancel");
    V = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
    tD = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
    h = class {
      constructor({ render: u, input: F = stdin, output: e = stdout, ...s3 }, C = true) {
        this._track = false, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = /* @__PURE__ */ new Map(), this._prevFrame = "", this.opts = s3, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C, this.input = F, this.output = e;
      }
      prompt() {
        const u = new WriteStream(0);
        return u._write = (F, e, s3) => {
          this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s3();
        }, this.input.pipe(u), this.rl = f.createInterface({ input: this.input, output: u, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), f.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), g(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, e) => {
          this.once("submit", () => {
            this.output.write(src.cursor.show), this.output.off("resize", this.render), g(this.input, false), F(this.value);
          }), this.once("cancel", () => {
            this.output.write(src.cursor.show), this.output.off("resize", this.render), g(this.input, false), F(R);
          });
        });
      }
      on(u, F) {
        const e = this.subscribers.get(u) ?? [];
        e.push({ cb: F }), this.subscribers.set(u, e);
      }
      once(u, F) {
        const e = this.subscribers.get(u) ?? [];
        e.push({ cb: F, once: true }), this.subscribers.set(u, e);
      }
      emit(u, ...F) {
        const e = this.subscribers.get(u) ?? [], s3 = [];
        for (const C of e)
          C.cb(...F), C.once && s3.push(() => e.splice(e.indexOf(C), 1));
        for (const C of s3)
          C();
      }
      unsubscribe() {
        this.subscribers.clear();
      }
      onKeypress(u, F) {
        if (this.state === "error" && (this.state = "active"), F?.name && !this._track && V.has(F.name) && this.emit("cursor", V.get(F.name)), F?.name && tD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
          if (this.opts.validate) {
            const e = this.opts.validate(this.value);
            e && (this.error = e, this.state = "error", this.rl.write(this.value));
          }
          this.state !== "error" && (this.state = "submit");
        }
        u === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
      }
      close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), g(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
      }
      restoreCursor() {
        const u = P(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
        this.output.write(src.cursor.move(-999, u * -1));
      }
      render() {
        const u = P(this._render(this) ?? "", process.stdout.columns, { hard: true });
        if (u !== this._prevFrame) {
          if (this.state === "initial")
            this.output.write(src.cursor.hide);
          else {
            const F = FD(this._prevFrame, u);
            if (this.restoreCursor(), F && F?.length === 1) {
              const e = F[0];
              this.output.write(src.cursor.move(0, e)), this.output.write(src.erase.lines(1));
              const s3 = u.split(`
`);
              this.output.write(s3[e]), this._prevFrame = u, this.output.write(src.cursor.move(0, s3.length - e - 1));
              return;
            } else if (F && F?.length > 1) {
              const e = F[0];
              this.output.write(src.cursor.move(0, e)), this.output.write(src.erase.down());
              const C = u.split(`
`).slice(e);
              this.output.write(C.join(`
`)), this._prevFrame = u;
              return;
            }
            this.output.write(src.erase.down());
          }
          this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
        }
      }
    };
    sD = class extends h {
      get cursor() {
        return this.value ? 0 : 1;
      }
      get _value() {
        return this.cursor === 0;
      }
      constructor(u) {
        super(u, false), this.value = !!u.initialValue, this.on("value", () => {
          this.value = this._value;
        }), this.on("confirm", (F) => {
          this.output.write(src.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
        }), this.on("cursor", () => {
          this.value = !this.value;
        });
      }
    };
    iD = class extends h {
      constructor(u) {
        super(u, false), this.cursor = 0, this.options = u.options, this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F }) => F === u.cursorAt), 0), this.on("key", (F) => {
          F === "a" && this.toggleAll();
        }), this.on("cursor", (F) => {
          switch (F) {
            case "left":
            case "up":
              this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
              break;
            case "down":
            case "right":
              this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
              break;
            case "space":
              this.toggleValue();
              break;
          }
        });
      }
      get _value() {
        return this.options[this.cursor].value;
      }
      toggleAll() {
        const u = this.value.length === this.options.length;
        this.value = u ? [] : this.options.map((F) => F.value);
      }
      toggleValue() {
        const u = this.value.includes(this._value);
        this.value = u ? this.value.filter((F) => F !== this._value) : [...this.value, this._value];
      }
    };
    ED = class extends h {
      constructor(u) {
        super(u, false), this.cursor = 0, this.options = u.options, this.cursor = this.options.findIndex(({ value: F }) => F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
          switch (F) {
            case "left":
            case "up":
              this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
              break;
            case "down":
            case "right":
              this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
              break;
          }
          this.changeValue();
        });
      }
      get _value() {
        return this.options[this.cursor];
      }
      changeValue() {
        this.value = this._value.value;
      }
    };
    oD = class extends h {
      constructor(u) {
        super(u), this.valueWithCursor = "", this.on("finalize", () => {
          this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
        }), this.on("value", () => {
          if (this.cursor >= this.value.length)
            this.valueWithCursor = `${this.value}${l.inverse(l.hidden("_"))}`;
          else {
            const F = this.value.slice(0, this.cursor), e = this.value.slice(this.cursor);
            this.valueWithCursor = `${F}${l.inverse(e[0])}${e.slice(1)}`;
          }
        });
      }
      get cursor() {
        return this._cursor;
      }
    };
    unicode = isUnicodeSupported();
    s = (c2, fallback) => unicode ? c2 : fallback;
    S_STEP_ACTIVE = s("\u276F", ">");
    S_STEP_CANCEL = s("\u25A0", "x");
    S_STEP_ERROR = s("\u25B2", "x");
    S_STEP_SUBMIT = s("\u2714", "\u221A");
    S_BAR = "";
    S_BAR_END = "";
    S_RADIO_ACTIVE = s("\u25CF", ">");
    S_RADIO_INACTIVE = s("\u25CB", " ");
    S_CHECKBOX_ACTIVE = s("\u25FB", "[\u2022]");
    S_CHECKBOX_SELECTED = s("\u25FC", "[+]");
    S_CHECKBOX_INACTIVE = s("\u25FB", "[ ]");
    symbol = (state) => {
      switch (state) {
        case "initial":
        case "active": {
          return colors.cyan(S_STEP_ACTIVE);
        }
        case "cancel": {
          return colors.red(S_STEP_CANCEL);
        }
        case "error": {
          return colors.yellow(S_STEP_ERROR);
        }
        case "submit": {
          return colors.green(S_STEP_SUBMIT);
        }
      }
    };
    text = (opts) => {
      return new oD({
        validate: opts.validate,
        placeholder: opts.placeholder,
        defaultValue: opts.defaultValue,
        initialValue: opts.initialValue,
        render() {
          const title = `${colors.gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
          const placeholder = opts.placeholder ? colors.inverse(opts.placeholder[0]) + colors.dim(opts.placeholder.slice(1)) : colors.inverse(colors.hidden("_"));
          const value = this.value ? this.valueWithCursor : placeholder;
          switch (this.state) {
            case "error": {
              return `${title.trim()}
${colors.yellow(
                S_BAR
              )} ${value}
${colors.yellow(S_BAR_END)} ${colors.yellow(
                this.error
              )}
`;
            }
            case "submit": {
              return `${title}${colors.gray(S_BAR)} ${colors.dim(
                this.value || opts.placeholder
              )}`;
            }
            case "cancel": {
              return `${title}${colors.gray(S_BAR)} ${colors.strikethrough(
                colors.dim(this.value ?? "")
              )}${this.value?.trim() ? "\n" + colors.gray(S_BAR) : ""}`;
            }
            default: {
              return `${title}${colors.cyan(S_BAR)} ${value}
${colors.cyan(
                S_BAR_END
              )}
`;
            }
          }
        }
      }).prompt();
    };
    confirm = (opts) => {
      const active = opts.active ?? "Yes";
      const inactive = opts.inactive ?? "No";
      return new sD({
        active,
        inactive,
        initialValue: opts.initialValue ?? true,
        render() {
          const title = `${colors.gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
          const value = this.value ? active : inactive;
          switch (this.state) {
            case "submit": {
              return `${title}${colors.gray(S_BAR)} ${colors.dim(value)}`;
            }
            case "cancel": {
              return `${title}${colors.gray(S_BAR)} ${colors.strikethrough(
                colors.dim(value)
              )}
${colors.gray(S_BAR)}`;
            }
            default: {
              return `${title}${colors.cyan(S_BAR)} ${this.value ? `${colors.green(S_RADIO_ACTIVE)} ${active}` : `${colors.dim(S_RADIO_INACTIVE)} ${colors.dim(active)}`} ${colors.dim("/")} ${this.value ? `${colors.dim(S_RADIO_INACTIVE)} ${colors.dim(inactive)}` : `${colors.green(S_RADIO_ACTIVE)} ${inactive}`}
${colors.cyan(S_BAR_END)}
`;
            }
          }
        }
      }).prompt();
    };
    select = (opts) => {
      const opt = (option, state) => {
        const label = option.label ?? String(option.value);
        switch (state) {
          case "active": {
            return `${colors.green(S_RADIO_ACTIVE)} ${label} ${option.hint ? colors.dim(`(${option.hint})`) : ""}`;
          }
          case "selected": {
            return `${colors.dim(label)}`;
          }
          case "cancelled": {
            return `${colors.strikethrough(colors.dim(label))}`;
          }
        }
        return `${colors.dim(S_RADIO_INACTIVE)} ${colors.dim(label)}`;
      };
      return new ED({
        options: opts.options,
        initialValue: opts.initialValue,
        render() {
          const title = `${colors.gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
          switch (this.state) {
            case "submit": {
              return `${title}${colors.gray(S_BAR)} ${opt(
                this.options[this.cursor],
                "selected"
              )}`;
            }
            case "cancel": {
              return `${title}${colors.gray(S_BAR)} ${opt(
                this.options[this.cursor],
                "cancelled"
              )}
${colors.gray(S_BAR)}`;
            }
            default: {
              return `${title}${colors.cyan(S_BAR)} ${this.options.map(
                (option, i) => opt(option, i === this.cursor ? "active" : "inactive")
              ).join(`
${colors.cyan(S_BAR)}  `)}
${colors.cyan(S_BAR_END)}
`;
            }
          }
        }
      }).prompt();
    };
    multiselect = (opts) => {
      const opt = (option, state) => {
        const label = option.label ?? String(option.value);
        switch (state) {
          case "active": {
            return `${colors.cyan(S_CHECKBOX_ACTIVE)} ${label} ${option.hint ? colors.dim(`(${option.hint})`) : ""}`;
          }
          case "selected": {
            return `${colors.green(S_CHECKBOX_SELECTED)} ${colors.dim(label)}`;
          }
          case "cancelled": {
            return `${colors.strikethrough(colors.dim(label))}`;
          }
          case "active-selected": {
            return `${colors.green(S_CHECKBOX_SELECTED)} ${label} ${option.hint ? colors.dim(`(${option.hint})`) : ""}`;
          }
          case "submitted": {
            return `${colors.dim(label)}`;
          }
        }
        return `${colors.dim(S_CHECKBOX_INACTIVE)} ${colors.dim(label)}`;
      };
      return new iD({
        options: opts.options,
        initialValues: opts.initialValues,
        required: opts.required ?? true,
        cursorAt: opts.cursorAt,
        validate(selected) {
          if (this.required && selected.length === 0) {
            return `Please select at least one option.
${colors.reset(
              colors.dim(
                `Press ${colors.gray(
                  colors.bgWhite(colors.inverse(" space "))
                )} to select, ${colors.gray(
                  colors.bgWhite(colors.inverse(" enter "))
                )} to submit`
              )
            )}`;
          }
        },
        render() {
          const title = `${colors.gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
          switch (this.state) {
            case "submit": {
              return `${title}${colors.gray(S_BAR)} ${this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "submitted")).join(colors.dim(", ")) || colors.dim("none")}`;
            }
            case "cancel": {
              const label = this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "cancelled")).join(colors.dim(", "));
              return `${title}${colors.gray(S_BAR)} ${label.trim() ? `${label}
${colors.gray(S_BAR)}` : ""}`;
            }
            case "error": {
              const footer = this.error.split("\n").map(
                (ln, i) => i === 0 ? `${colors.yellow(S_BAR_END)} ${colors.yellow(ln)}` : `   ${ln}`
              ).join("\n");
              return title + colors.yellow(S_BAR) + "  " + this.options.map((option, i) => {
                const selected = this.value.includes(option.value);
                const active = i === this.cursor;
                if (active && selected) {
                  return opt(option, "active-selected");
                }
                if (selected) {
                  return opt(option, "selected");
                }
                return opt(option, active ? "active" : "inactive");
              }).join(`
${colors.yellow(S_BAR)}  `) + "\n" + footer + "\n";
            }
            default: {
              return `${title}${colors.cyan(S_BAR)} ${this.options.map((option, i) => {
                const selected = this.value.includes(option.value);
                const active = i === this.cursor;
                if (active && selected) {
                  return opt(option, "active-selected");
                }
                if (selected) {
                  return opt(option, "selected");
                }
                return opt(option, active ? "active" : "inactive");
              }).join(`
${colors.cyan(S_BAR)}  `)}
${colors.cyan(S_BAR_END)}
`;
            }
          }
        }
      }).prompt();
    };
  }
});
function detectProvider(env3) {
  for (const provider of providers) {
    const envName = provider[1] || provider[0];
    if (env3[envName]) {
      return {
        name: provider[0].toLowerCase(),
        ...provider[2]
      };
    }
  }
  if (env3.SHELL && env3.SHELL === "/bin/jsh") {
    return {
      name: "stackblitz",
      ci: false
    };
  }
  return {
    name: "",
    ci: false
  };
}
function toBoolean(val) {
  return val ? val !== "false" : false;
}
function ansiRegex2({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}
function stripAnsi2(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function stringWidth$1(string, options2) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  options2 = {
    ambiguousIsNarrow: true,
    countAnsiEscapeCodes: false,
    ...options2
  };
  if (!options2.countAnsiEscapeCodes) {
    string = stripAnsi2(string);
  }
  if (string.length === 0) {
    return 0;
  }
  const ambiguousCharacterWidth = options2.ambiguousIsNarrow ? 1 : 2;
  let width = 0;
  for (const { segment: character } of new Intl.Segmenter().segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879) {
      continue;
    }
    if (emojiRegex().test(character)) {
      width += 2;
      continue;
    }
    const code = eastAsianWidth.eastAsianWidth(character);
    switch (code) {
      case "F":
      case "W": {
        width += 2;
        break;
      }
      case "A": {
        width += ambiguousCharacterWidth;
        break;
      }
      default: {
        width += 1;
      }
    }
  }
  return width;
}
function isUnicodeSupported() {
  if (process$1.platform !== "win32") {
    return process$1.env.TERM !== "linux";
  }
  return Boolean(process$1.env.CI) || Boolean(process$1.env.WT_SESSION) || Boolean(process$1.env.TERMINUS_SUBLIME) || process$1.env.ConEmuTask === "{cmd::Cmder}" || process$1.env.TERM_PROGRAM === "Terminus-Sublime" || process$1.env.TERM_PROGRAM === "vscode" || process$1.env.TERM === "xterm-256color" || process$1.env.TERM === "alacritty" || process$1.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
function stringWidth(str) {
  if (!Intl.Segmenter) {
    return stripAnsi(str).length;
  }
  return stringWidth$1(str);
}
function characterFormat(str) {
  return str.replace(/`([^`]+)`/gm, (_2, m2) => colors.cyan(m2)).replace(/\s+_([^_]+)_\s+/gm, (_2, m2) => ` ${colors.underline(m2)} `);
}
function getColor2(color = "white") {
  return colors[color] || colors.white;
}
function getBgColor(color = "bgWhite") {
  return colors[`bg${color[0].toUpperCase()}${color.slice(1)}`] || colors.bgWhite;
}
function createConsola2(options2 = {}) {
  let level = _getDefaultLogLevel();
  if (process.env.CONSOLA_LEVEL) {
    level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
  }
  const consola2 = createConsola({
    level,
    defaults: { level },
    stdout: process.stdout,
    stderr: process.stderr,
    prompt: (...args) => Promise.resolve().then(() => (init_prompt(), prompt_exports)).then((m2) => m2.prompt(...args)),
    reporters: options2.reporters || [
      options2.fancy ?? !(isCI2 || isTest) ? new FancyReporter() : new BasicReporter()
    ],
    ...options2
  });
  return consola2;
}
function _getDefaultLogLevel() {
  if (isDebug) {
    return LogLevels.debug;
  }
  if (isTest) {
    return LogLevels.warn;
  }
  return LogLevels.info;
}
var providers;
var processShim;
var envShim;
var providerInfo;
var nodeENV;
var isCI2;
var hasTTY;
var isDebug;
var isTest;
var regex;
var eastasianwidth;
var eastasianwidthExports;
var eastAsianWidth;
var emojiRegex;
var TYPE_COLOR_MAP;
var LEVEL_COLOR_MAP;
var unicode2;
var s2;
var TYPE_ICONS;
var FancyReporter;
var consola;
var init_consola_36c0034f = __esm({
  "../../node_modules/consola/dist/shared/consola.36c0034f.mjs"() {
    "use strict";
    init_core();
    init_consola_06ad8a64();
    init_utils();
    providers = [
      ["APPVEYOR"],
      ["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],
      ["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],
      ["APPCIRCLE", "AC_APPCIRCLE"],
      ["BAMBOO", "bamboo_planKey"],
      ["BITBUCKET", "BITBUCKET_COMMIT"],
      ["BITRISE", "BITRISE_IO"],
      ["BUDDY", "BUDDY_WORKSPACE_ID"],
      ["BUILDKITE"],
      ["CIRCLE", "CIRCLECI"],
      ["CIRRUS", "CIRRUS_CI"],
      ["CLOUDFLARE_PAGES", "CF_PAGES", { ci: true }],
      ["CODEBUILD", "CODEBUILD_BUILD_ARN"],
      ["CODEFRESH", "CF_BUILD_ID"],
      ["DRONE"],
      ["DRONE", "DRONE_BUILD_EVENT"],
      ["DSARI"],
      ["GITHUB_ACTIONS"],
      ["GITLAB", "GITLAB_CI"],
      ["GITLAB", "CI_MERGE_REQUEST_ID"],
      ["GOCD", "GO_PIPELINE_LABEL"],
      ["LAYERCI"],
      ["HUDSON", "HUDSON_URL"],
      ["JENKINS", "JENKINS_URL"],
      ["MAGNUM"],
      ["NETLIFY"],
      ["NETLIFY", "NETLIFY_LOCAL", { ci: false }],
      ["NEVERCODE"],
      ["RENDER"],
      ["SAIL", "SAILCI"],
      ["SEMAPHORE"],
      ["SCREWDRIVER"],
      ["SHIPPABLE"],
      ["SOLANO", "TDDIUM"],
      ["STRIDER"],
      ["TEAMCITY", "TEAMCITY_VERSION"],
      ["TRAVIS"],
      ["VERCEL", "NOW_BUILDER"],
      ["APPCENTER", "APPCENTER_BUILD_ID"],
      ["CODESANDBOX", "CODESANDBOX_SSE", { ci: false }],
      ["STACKBLITZ"],
      ["STORMKIT"],
      ["CLEAVR"]
    ];
    processShim = typeof process !== "undefined" ? process : {};
    envShim = processShim.env || {};
    providerInfo = detectProvider(envShim);
    nodeENV = typeof process !== "undefined" && process.env && process.env.NODE_ENV || "";
    processShim.platform;
    providerInfo.name;
    isCI2 = toBoolean(envShim.CI) || providerInfo.ci !== false;
    hasTTY = toBoolean(processShim.stdout && processShim.stdout.isTTY);
    isDebug = toBoolean(envShim.DEBUG);
    isTest = nodeENV === "test" || toBoolean(envShim.TEST);
    toBoolean(envShim.MINIMAL) || isCI2 || isTest || !hasTTY;
    regex = ansiRegex2();
    eastasianwidth = { exports: {} };
    (function(module) {
      var eaw = {};
      {
        module.exports = eaw;
      }
      eaw.eastAsianWidth = function(character) {
        var x = character.charCodeAt(0);
        var y = character.length == 2 ? character.charCodeAt(1) : 0;
        var codePoint = x;
        if (55296 <= x && x <= 56319 && (56320 <= y && y <= 57343)) {
          x &= 1023;
          y &= 1023;
          codePoint = x << 10 | y;
          codePoint += 65536;
        }
        if (12288 == codePoint || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510) {
          return "F";
        }
        if (8361 == codePoint || 65377 <= codePoint && codePoint <= 65470 || 65474 <= codePoint && codePoint <= 65479 || 65482 <= codePoint && codePoint <= 65487 || 65490 <= codePoint && codePoint <= 65495 || 65498 <= codePoint && codePoint <= 65500 || 65512 <= codePoint && codePoint <= 65518) {
          return "H";
        }
        if (4352 <= codePoint && codePoint <= 4447 || 4515 <= codePoint && codePoint <= 4519 || 4602 <= codePoint && codePoint <= 4607 || 9001 <= codePoint && codePoint <= 9002 || 11904 <= codePoint && codePoint <= 11929 || 11931 <= codePoint && codePoint <= 12019 || 12032 <= codePoint && codePoint <= 12245 || 12272 <= codePoint && codePoint <= 12283 || 12289 <= codePoint && codePoint <= 12350 || 12353 <= codePoint && codePoint <= 12438 || 12441 <= codePoint && codePoint <= 12543 || 12549 <= codePoint && codePoint <= 12589 || 12593 <= codePoint && codePoint <= 12686 || 12688 <= codePoint && codePoint <= 12730 || 12736 <= codePoint && codePoint <= 12771 || 12784 <= codePoint && codePoint <= 12830 || 12832 <= codePoint && codePoint <= 12871 || 12880 <= codePoint && codePoint <= 13054 || 13056 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42124 || 42128 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 55216 <= codePoint && codePoint <= 55238 || 55243 <= codePoint && codePoint <= 55291 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65106 || 65108 <= codePoint && codePoint <= 65126 || 65128 <= codePoint && codePoint <= 65131 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127490 || 127504 <= codePoint && codePoint <= 127546 || 127552 <= codePoint && codePoint <= 127560 || 127568 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 194367 || 177984 <= codePoint && codePoint <= 196605 || 196608 <= codePoint && codePoint <= 262141) {
          return "W";
        }
        if (32 <= codePoint && codePoint <= 126 || 162 <= codePoint && codePoint <= 163 || 165 <= codePoint && codePoint <= 166 || 172 == codePoint || 175 == codePoint || 10214 <= codePoint && codePoint <= 10221 || 10629 <= codePoint && codePoint <= 10630) {
          return "Na";
        }
        if (161 == codePoint || 164 == codePoint || 167 <= codePoint && codePoint <= 168 || 170 == codePoint || 173 <= codePoint && codePoint <= 174 || 176 <= codePoint && codePoint <= 180 || 182 <= codePoint && codePoint <= 186 || 188 <= codePoint && codePoint <= 191 || 198 == codePoint || 208 == codePoint || 215 <= codePoint && codePoint <= 216 || 222 <= codePoint && codePoint <= 225 || 230 == codePoint || 232 <= codePoint && codePoint <= 234 || 236 <= codePoint && codePoint <= 237 || 240 == codePoint || 242 <= codePoint && codePoint <= 243 || 247 <= codePoint && codePoint <= 250 || 252 == codePoint || 254 == codePoint || 257 == codePoint || 273 == codePoint || 275 == codePoint || 283 == codePoint || 294 <= codePoint && codePoint <= 295 || 299 == codePoint || 305 <= codePoint && codePoint <= 307 || 312 == codePoint || 319 <= codePoint && codePoint <= 322 || 324 == codePoint || 328 <= codePoint && codePoint <= 331 || 333 == codePoint || 338 <= codePoint && codePoint <= 339 || 358 <= codePoint && codePoint <= 359 || 363 == codePoint || 462 == codePoint || 464 == codePoint || 466 == codePoint || 468 == codePoint || 470 == codePoint || 472 == codePoint || 474 == codePoint || 476 == codePoint || 593 == codePoint || 609 == codePoint || 708 == codePoint || 711 == codePoint || 713 <= codePoint && codePoint <= 715 || 717 == codePoint || 720 == codePoint || 728 <= codePoint && codePoint <= 731 || 733 == codePoint || 735 == codePoint || 768 <= codePoint && codePoint <= 879 || 913 <= codePoint && codePoint <= 929 || 931 <= codePoint && codePoint <= 937 || 945 <= codePoint && codePoint <= 961 || 963 <= codePoint && codePoint <= 969 || 1025 == codePoint || 1040 <= codePoint && codePoint <= 1103 || 1105 == codePoint || 8208 == codePoint || 8211 <= codePoint && codePoint <= 8214 || 8216 <= codePoint && codePoint <= 8217 || 8220 <= codePoint && codePoint <= 8221 || 8224 <= codePoint && codePoint <= 8226 || 8228 <= codePoint && codePoint <= 8231 || 8240 == codePoint || 8242 <= codePoint && codePoint <= 8243 || 8245 == codePoint || 8251 == codePoint || 8254 == codePoint || 8308 == codePoint || 8319 == codePoint || 8321 <= codePoint && codePoint <= 8324 || 8364 == codePoint || 8451 == codePoint || 8453 == codePoint || 8457 == codePoint || 8467 == codePoint || 8470 == codePoint || 8481 <= codePoint && codePoint <= 8482 || 8486 == codePoint || 8491 == codePoint || 8531 <= codePoint && codePoint <= 8532 || 8539 <= codePoint && codePoint <= 8542 || 8544 <= codePoint && codePoint <= 8555 || 8560 <= codePoint && codePoint <= 8569 || 8585 == codePoint || 8592 <= codePoint && codePoint <= 8601 || 8632 <= codePoint && codePoint <= 8633 || 8658 == codePoint || 8660 == codePoint || 8679 == codePoint || 8704 == codePoint || 8706 <= codePoint && codePoint <= 8707 || 8711 <= codePoint && codePoint <= 8712 || 8715 == codePoint || 8719 == codePoint || 8721 == codePoint || 8725 == codePoint || 8730 == codePoint || 8733 <= codePoint && codePoint <= 8736 || 8739 == codePoint || 8741 == codePoint || 8743 <= codePoint && codePoint <= 8748 || 8750 == codePoint || 8756 <= codePoint && codePoint <= 8759 || 8764 <= codePoint && codePoint <= 8765 || 8776 == codePoint || 8780 == codePoint || 8786 == codePoint || 8800 <= codePoint && codePoint <= 8801 || 8804 <= codePoint && codePoint <= 8807 || 8810 <= codePoint && codePoint <= 8811 || 8814 <= codePoint && codePoint <= 8815 || 8834 <= codePoint && codePoint <= 8835 || 8838 <= codePoint && codePoint <= 8839 || 8853 == codePoint || 8857 == codePoint || 8869 == codePoint || 8895 == codePoint || 8978 == codePoint || 9312 <= codePoint && codePoint <= 9449 || 9451 <= codePoint && codePoint <= 9547 || 9552 <= codePoint && codePoint <= 9587 || 9600 <= codePoint && codePoint <= 9615 || 9618 <= codePoint && codePoint <= 9621 || 9632 <= codePoint && codePoint <= 9633 || 9635 <= codePoint && codePoint <= 9641 || 9650 <= codePoint && codePoint <= 9651 || 9654 <= codePoint && codePoint <= 9655 || 9660 <= codePoint && codePoint <= 9661 || 9664 <= codePoint && codePoint <= 9665 || 9670 <= codePoint && codePoint <= 9672 || 9675 == codePoint || 9678 <= codePoint && codePoint <= 9681 || 9698 <= codePoint && codePoint <= 9701 || 9711 == codePoint || 9733 <= codePoint && codePoint <= 9734 || 9737 == codePoint || 9742 <= codePoint && codePoint <= 9743 || 9748 <= codePoint && codePoint <= 9749 || 9756 == codePoint || 9758 == codePoint || 9792 == codePoint || 9794 == codePoint || 9824 <= codePoint && codePoint <= 9825 || 9827 <= codePoint && codePoint <= 9829 || 9831 <= codePoint && codePoint <= 9834 || 9836 <= codePoint && codePoint <= 9837 || 9839 == codePoint || 9886 <= codePoint && codePoint <= 9887 || 9918 <= codePoint && codePoint <= 9919 || 9924 <= codePoint && codePoint <= 9933 || 9935 <= codePoint && codePoint <= 9953 || 9955 == codePoint || 9960 <= codePoint && codePoint <= 9983 || 10045 == codePoint || 10071 == codePoint || 10102 <= codePoint && codePoint <= 10111 || 11093 <= codePoint && codePoint <= 11097 || 12872 <= codePoint && codePoint <= 12879 || 57344 <= codePoint && codePoint <= 63743 || 65024 <= codePoint && codePoint <= 65039 || 65533 == codePoint || 127232 <= codePoint && codePoint <= 127242 || 127248 <= codePoint && codePoint <= 127277 || 127280 <= codePoint && codePoint <= 127337 || 127344 <= codePoint && codePoint <= 127386 || 917760 <= codePoint && codePoint <= 917999 || 983040 <= codePoint && codePoint <= 1048573 || 1048576 <= codePoint && codePoint <= 1114109) {
          return "A";
        }
        return "N";
      };
      eaw.characterLength = function(character) {
        var code = this.eastAsianWidth(character);
        if (code == "F" || code == "W" || code == "A") {
          return 2;
        } else {
          return 1;
        }
      };
      function stringToArray(string) {
        return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      eaw.length = function(string) {
        var characters = stringToArray(string);
        var len = 0;
        for (var i = 0; i < characters.length; i++) {
          len = len + this.characterLength(characters[i]);
        }
        return len;
      };
      eaw.slice = function(text2, start, end) {
        textLen = eaw.length(text2);
        start = start ? start : 0;
        end = end ? end : 1;
        if (start < 0) {
          start = textLen + start;
        }
        if (end < 0) {
          end = textLen + end;
        }
        var result = "";
        var eawLen = 0;
        var chars = stringToArray(text2);
        for (var i = 0; i < chars.length; i++) {
          var char = chars[i];
          var charLen = eaw.length(char);
          if (eawLen >= start - (charLen == 2 ? 1 : 0)) {
            if (eawLen + charLen <= end) {
              result += char;
            } else {
              break;
            }
          }
          eawLen += charLen;
        }
        return result;
      };
    })(eastasianwidth);
    eastasianwidthExports = eastasianwidth.exports;
    eastAsianWidth = /* @__PURE__ */ getDefaultExportFromCjs(eastasianwidthExports);
    emojiRegex = () => {
      return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
    TYPE_COLOR_MAP = {
      info: "cyan",
      fail: "red",
      success: "green",
      ready: "green",
      start: "magenta"
    };
    LEVEL_COLOR_MAP = {
      0: "red",
      1: "yellow"
    };
    unicode2 = isUnicodeSupported();
    s2 = (c2, fallback) => unicode2 ? c2 : fallback;
    TYPE_ICONS = {
      error: s2("\u2716", "\xD7"),
      fatal: s2("\u2716", "\xD7"),
      ready: s2("\u2714", "\u221A"),
      warn: s2("\u26A0", "\u203C"),
      info: s2("\u2139", "i"),
      success: s2("\u2714", "\u221A"),
      debug: s2("\u2699", "D"),
      trace: s2("\u2192", "\u2192"),
      fail: s2("\u2716", "\xD7"),
      start: s2("\u25D0", "o"),
      log: ""
    };
    FancyReporter = class extends BasicReporter {
      formatStack(stack) {
        return "\n" + parseStack(stack).map(
          (line) => "  " + line.replace(/^at +/, (m2) => colors.gray(m2)).replace(/\((.+)\)/, (_2, m2) => `(${colors.cyan(m2)})`)
        ).join("\n");
      }
      formatType(logObj, isBadge, opts) {
        const typeColor = TYPE_COLOR_MAP[logObj.type] || LEVEL_COLOR_MAP[logObj.level] || "gray";
        if (isBadge) {
          return getBgColor(typeColor)(
            colors.black(` ${logObj.type.toUpperCase()} `)
          );
        }
        const _type = typeof TYPE_ICONS[logObj.type] === "string" ? TYPE_ICONS[logObj.type] : logObj.icon || logObj.type;
        return _type ? getColor2(typeColor)(_type) : "";
      }
      formatLogObj(logObj, opts) {
        const [message, ...additional] = this.formatArgs(logObj.args, opts).split(
          "\n"
        );
        if (logObj.type === "box") {
          return box(
            characterFormat(
              message + (additional.length > 0 ? "\n" + additional.join("\n") : "")
            ),
            {
              title: logObj.title ? characterFormat(logObj.title) : void 0,
              style: logObj.style
            }
          );
        }
        const date = this.formatDate(logObj.date, opts);
        const coloredDate = date && colors.gray(date);
        const isBadge = logObj.badge ?? logObj.level < 2;
        const type = this.formatType(logObj, isBadge, opts);
        const tag = logObj.tag ? colors.gray(logObj.tag) : "";
        let line;
        const left = this.filterAndJoin([type, characterFormat(message)]);
        const right = this.filterAndJoin(opts.columns ? [tag, coloredDate] : [tag]);
        const space = (opts.columns || 0) - stringWidth(left) - stringWidth(right) - 2;
        line = space > 0 && (opts.columns || 0) >= 80 ? left + " ".repeat(space) + right : (right ? `${colors.gray(`[${right}]`)} ` : "") + left;
        line += characterFormat(
          additional.length > 0 ? "\n" + additional.join("\n") : ""
        );
        if (logObj.type === "trace") {
          const _err = new Error("Trace: " + logObj.message);
          line += this.formatStack(_err.stack || "");
        }
        return isBadge ? "\n" + line + "\n" : line;
      }
    };
    consola = createConsola2();
  }
});
var Sockets_exports = {};
__export(Sockets_exports, {
  JSONArraySocket: () => JSONArraySocket,
  JSONSocket: () => JSONSocket,
  audioArraySocket: () => audioArraySocket,
  booleanSocket: () => booleanSocket,
  createSocket: () => createSocket,
  getSocketFromString: () => getSocketFromString,
  imageArraySocket: () => imageArraySocket,
  imageSocket: () => imageSocket,
  isValidSocket: () => isValidSocket,
  markdownSocket: () => markdownSocket,
  numSocket: () => numSocket,
  promptSocket: () => promptSocket,
  textArraySocket: () => textArraySocket,
  textSocket: () => textSocket,
  toolArraySocket: () => toolArraySocket,
  urlSocket: () => urlSocket
});
var import_rete = __toESM2(require_rete_common(), 1);
var numSocket = new import_rete.Socket("Number value");
var promptSocket = new import_rete.Socket("Prompt value");
var textSocket = new import_rete.Socket("String value");
var textArraySocket = new import_rete.Socket("String Array value");
var imageArraySocket = new import_rete.Socket("Image Array value");
var imageSocket = new import_rete.Socket("Image Socket");
var JSONSocket = new import_rete.Socket("Object Socket");
var JSONArraySocket = new import_rete.Socket("Object Array Socket");
var audioArraySocket = new import_rete.Socket("Audio Array value");
var urlSocket = new import_rete.Socket("Url value");
var booleanSocket = new import_rete.Socket("Boolean value");
var markdownSocket = new import_rete.Socket("Markdown value");
var toolArraySocket = new import_rete.Socket("Tool Array Socket");
var isValidSocket = (socket) => {
  return socket === numSocket || socket === promptSocket || socket === audioArraySocket || socket === textSocket || socket === imageArraySocket || socket === imageSocket || socket === JSONSocket || socket === JSONArraySocket || socket === urlSocket || socket === booleanSocket || socket === textArraySocket || socket === markdownSocket || socket === toolArraySocket;
};
var createSocket = (name) => new import_rete.Socket(name);
var getSocketFromString = (socketType) => {
  switch (socketType) {
    case "number":
    case "float":
    case "integer":
      return numSocket;
    case "bool":
    case "boolean":
      return booleanSocket;
    case "prompt":
      return promptSocket;
    case "string":
      return textSocket;
    case "string[]":
      return textArraySocket;
    case "image[]":
      return imageArraySocket;
    case "image":
      return imageSocket;
    case "object":
      return JSONSocket;
    case "object[]":
      return JSONArraySocket;
    case "audio[]":
      return audioArraySocket;
    case "url":
      return urlSocket;
    case "markdown":
      return markdownSocket;
    case "tool[]":
      return toolArraySocket;
    default:
      throw new Error(`Invalid socket type: ${socketType}`);
  }
};
var WorkflowClientControlManager = class _WorkflowClientControlManager {
  constructor() {
    this.controls = /* @__PURE__ */ new Map();
  }
  add(key, clientControlType) {
    this.controls.set(key, clientControlType);
  }
  get(id) {
    return this.controls.get(id);
  }
  has(id) {
    return this.controls.has(id);
  }
  static getInstance() {
    if (_WorkflowClientControlManager.instance == null) {
      _WorkflowClientControlManager.instance = new _WorkflowClientControlManager();
    }
    return _WorkflowClientControlManager.instance;
  }
};
var import_deepmerge = __toESM2(require_cjs(), 1);
init_consola_36c0034f();
init_core();
init_consola_06ad8a64();
init_utils();
var anyMap = /* @__PURE__ */ new WeakMap();
var eventsMap = /* @__PURE__ */ new WeakMap();
var producersMap = /* @__PURE__ */ new WeakMap();
var anyProducer = Symbol("anyProducer");
var resolvedPromise = Promise.resolve();
var listenerAdded = Symbol("listenerAdded");
var listenerRemoved = Symbol("listenerRemoved");
var canEmitMetaEvents = false;
var isGlobalDebugEnabled = false;
function assertEventName(eventName) {
  if (typeof eventName !== "string" && typeof eventName !== "symbol" && typeof eventName !== "number") {
    throw new TypeError("`eventName` must be a string, symbol, or number");
  }
}
function assertListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError("listener must be a function");
  }
}
function getListeners(instance, eventName) {
  const events = eventsMap.get(instance);
  if (!events.has(eventName)) {
    return;
  }
  return events.get(eventName);
}
function getEventProducers(instance, eventName) {
  const key = typeof eventName === "string" || typeof eventName === "symbol" || typeof eventName === "number" ? eventName : anyProducer;
  const producers = producersMap.get(instance);
  if (!producers.has(key)) {
    return;
  }
  return producers.get(key);
}
function enqueueProducers(instance, eventName, eventData) {
  const producers = producersMap.get(instance);
  if (producers.has(eventName)) {
    for (const producer of producers.get(eventName)) {
      producer.enqueue(eventData);
    }
  }
  if (producers.has(anyProducer)) {
    const item = Promise.all([eventName, eventData]);
    for (const producer of producers.get(anyProducer)) {
      producer.enqueue(item);
    }
  }
}
function iterator(instance, eventNames) {
  eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
  let isFinished = false;
  let flush = () => {
  };
  let queue2 = [];
  const producer = {
    enqueue(item) {
      queue2.push(item);
      flush();
    },
    finish() {
      isFinished = true;
      flush();
    }
  };
  for (const eventName of eventNames) {
    let set = getEventProducers(instance, eventName);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      const producers = producersMap.get(instance);
      producers.set(eventName, set);
    }
    set.add(producer);
  }
  return {
    async next() {
      if (!queue2) {
        return { done: true };
      }
      if (queue2.length === 0) {
        if (isFinished) {
          queue2 = void 0;
          return this.next();
        }
        await new Promise((resolve) => {
          flush = resolve;
        });
        return this.next();
      }
      return {
        done: false,
        value: await queue2.shift()
      };
    },
    async return(value) {
      queue2 = void 0;
      for (const eventName of eventNames) {
        const set = getEventProducers(instance, eventName);
        if (set) {
          set.delete(producer);
          if (set.size === 0) {
            const producers = producersMap.get(instance);
            producers.delete(eventName);
          }
        }
      }
      flush();
      return arguments.length > 0 ? { done: true, value: await value } : { done: true };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function defaultMethodNamesOrAssert(methodNames) {
  if (methodNames === void 0) {
    return allEmitteryMethods;
  }
  if (!Array.isArray(methodNames)) {
    throw new TypeError("`methodNames` must be an array of strings");
  }
  for (const methodName of methodNames) {
    if (!allEmitteryMethods.includes(methodName)) {
      if (typeof methodName !== "string") {
        throw new TypeError("`methodNames` element must be a string");
      }
      throw new Error(`${methodName} is not Emittery method`);
    }
  }
  return methodNames;
}
var isMetaEvent = (eventName) => eventName === listenerAdded || eventName === listenerRemoved;
function emitMetaEvent(emitter, eventName, eventData) {
  if (isMetaEvent(eventName)) {
    try {
      canEmitMetaEvents = true;
      emitter.emit(eventName, eventData);
    } finally {
      canEmitMetaEvents = false;
    }
  }
}
var Emittery = class _Emittery {
  static mixin(emitteryPropertyName, methodNames) {
    methodNames = defaultMethodNamesOrAssert(methodNames);
    return (target) => {
      if (typeof target !== "function") {
        throw new TypeError("`target` must be function");
      }
      for (const methodName of methodNames) {
        if (target.prototype[methodName] !== void 0) {
          throw new Error(`The property \`${methodName}\` already exists on \`target\``);
        }
      }
      function getEmitteryProperty() {
        Object.defineProperty(this, emitteryPropertyName, {
          enumerable: false,
          value: new _Emittery()
        });
        return this[emitteryPropertyName];
      }
      Object.defineProperty(target.prototype, emitteryPropertyName, {
        enumerable: false,
        get: getEmitteryProperty
      });
      const emitteryMethodCaller = (methodName) => function(...args) {
        return this[emitteryPropertyName][methodName](...args);
      };
      for (const methodName of methodNames) {
        Object.defineProperty(target.prototype, methodName, {
          enumerable: false,
          value: emitteryMethodCaller(methodName)
        });
      }
      return target;
    };
  }
  static get isDebugEnabled() {
    if (typeof globalThis.process?.env !== "object") {
      return isGlobalDebugEnabled;
    }
    const { env: env22 } = globalThis.process ?? { env: {} };
    return env22.DEBUG === "emittery" || env22.DEBUG === "*" || isGlobalDebugEnabled;
  }
  static set isDebugEnabled(newValue) {
    isGlobalDebugEnabled = newValue;
  }
  constructor(options2 = {}) {
    anyMap.set(this, /* @__PURE__ */ new Set());
    eventsMap.set(this, /* @__PURE__ */ new Map());
    producersMap.set(this, /* @__PURE__ */ new Map());
    producersMap.get(this).set(anyProducer, /* @__PURE__ */ new Set());
    this.debug = options2.debug ?? {};
    if (this.debug.enabled === void 0) {
      this.debug.enabled = false;
    }
    if (!this.debug.logger) {
      this.debug.logger = (type, debugName, eventName, eventData) => {
        try {
          eventData = JSON.stringify(eventData);
        } catch {
          eventData = `Object with the following keys failed to stringify: ${Object.keys(eventData).join(",")}`;
        }
        if (typeof eventName === "symbol" || typeof eventName === "number") {
          eventName = eventName.toString();
        }
        const currentTime = /* @__PURE__ */ new Date();
        const logTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}.${currentTime.getMilliseconds()}`;
        console.log(`[${logTime}][emittery:${type}][${debugName}] Event Name: ${eventName}
	data: ${eventData}`);
      };
    }
  }
  logIfDebugEnabled(type, eventName, eventData) {
    if (_Emittery.isDebugEnabled || this.debug.enabled) {
      this.debug.logger(type, this.debug.name, eventName, eventData);
    }
  }
  on(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      let set = getListeners(this, eventName);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        const events = eventsMap.get(this);
        events.set(eventName, set);
      }
      set.add(listener);
      this.logIfDebugEnabled("subscribe", eventName, void 0);
      if (!isMetaEvent(eventName)) {
        emitMetaEvent(this, listenerAdded, { eventName, listener });
      }
    }
    return this.off.bind(this, eventNames, listener);
  }
  off(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      const set = getListeners(this, eventName);
      if (set) {
        set.delete(listener);
        if (set.size === 0) {
          const events = eventsMap.get(this);
          events.delete(eventName);
        }
      }
      this.logIfDebugEnabled("unsubscribe", eventName, void 0);
      if (!isMetaEvent(eventName)) {
        emitMetaEvent(this, listenerRemoved, { eventName, listener });
      }
    }
  }
  once(eventNames) {
    let off_;
    const promise = new Promise((resolve) => {
      off_ = this.on(eventNames, (data) => {
        off_();
        resolve(data);
      });
    });
    promise.off = off_;
    return promise;
  }
  events(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
    }
    return iterator(this, eventNames);
  }
  async emit(eventName, eventData) {
    assertEventName(eventName);
    if (isMetaEvent(eventName) && !canEmitMetaEvents) {
      throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
    }
    this.logIfDebugEnabled("emit", eventName, eventData);
    enqueueProducers(this, eventName, eventData);
    const listeners = getListeners(this, eventName) ?? /* @__PURE__ */ new Set();
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = isMetaEvent(eventName) ? [] : [...anyListeners];
    await resolvedPromise;
    await Promise.all([
      ...staticListeners.map(async (listener) => {
        if (listeners.has(listener)) {
          return listener(eventData);
        }
      }),
      ...staticAnyListeners.map(async (listener) => {
        if (anyListeners.has(listener)) {
          return listener(eventName, eventData);
        }
      })
    ]);
  }
  async emitSerial(eventName, eventData) {
    assertEventName(eventName);
    if (isMetaEvent(eventName) && !canEmitMetaEvents) {
      throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
    }
    this.logIfDebugEnabled("emitSerial", eventName, eventData);
    const listeners = getListeners(this, eventName) ?? /* @__PURE__ */ new Set();
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];
    await resolvedPromise;
    for (const listener of staticListeners) {
      if (listeners.has(listener)) {
        await listener(eventData);
      }
    }
    for (const listener of staticAnyListeners) {
      if (anyListeners.has(listener)) {
        await listener(eventName, eventData);
      }
    }
  }
  onAny(listener) {
    assertListener(listener);
    this.logIfDebugEnabled("subscribeAny", void 0, void 0);
    anyMap.get(this).add(listener);
    emitMetaEvent(this, listenerAdded, { listener });
    return this.offAny.bind(this, listener);
  }
  anyEvent() {
    return iterator(this);
  }
  offAny(listener) {
    assertListener(listener);
    this.logIfDebugEnabled("unsubscribeAny", void 0, void 0);
    emitMetaEvent(this, listenerRemoved, { listener });
    anyMap.get(this).delete(listener);
  }
  clearListeners(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      this.logIfDebugEnabled("clear", eventName, void 0);
      if (typeof eventName === "string" || typeof eventName === "symbol" || typeof eventName === "number") {
        const set = getListeners(this, eventName);
        if (set) {
          set.clear();
        }
        const producers = getEventProducers(this, eventName);
        if (producers) {
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
        }
      } else {
        anyMap.get(this).clear();
        for (const [eventName2, listeners] of eventsMap.get(this).entries()) {
          listeners.clear();
          eventsMap.get(this).delete(eventName2);
        }
        for (const [eventName2, producers] of producersMap.get(this).entries()) {
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
          producersMap.get(this).delete(eventName2);
        }
      }
    }
  }
  listenerCount(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    let count = 0;
    for (const eventName of eventNames) {
      if (typeof eventName === "string") {
        count += anyMap.get(this).size + (getListeners(this, eventName)?.size ?? 0) + (getEventProducers(this, eventName)?.size ?? 0) + (getEventProducers(this)?.size ?? 0);
        continue;
      }
      if (typeof eventName !== "undefined") {
        assertEventName(eventName);
      }
      count += anyMap.get(this).size;
      for (const value of eventsMap.get(this).values()) {
        count += value.size;
      }
      for (const value of producersMap.get(this).values()) {
        count += value.size;
      }
    }
    return count;
  }
  bindMethods(target, methodNames) {
    if (typeof target !== "object" || target === null) {
      throw new TypeError("`target` must be an object");
    }
    methodNames = defaultMethodNamesOrAssert(methodNames);
    for (const methodName of methodNames) {
      if (target[methodName] !== void 0) {
        throw new Error(`The property \`${methodName}\` already exists on \`target\``);
      }
      Object.defineProperty(target, methodName, {
        enumerable: false,
        value: this[methodName].bind(this)
      });
    }
  }
};
var allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v2) => v2 !== "constructor");
Object.defineProperty(Emittery, "listenerAdded", {
  value: listenerAdded,
  writable: false,
  enumerable: true,
  configurable: false
});
Object.defineProperty(Emittery, "listenerRemoved", {
  value: listenerRemoved,
  writable: false,
  enumerable: true,
  configurable: false
});
var DEFAULT_LOG_LEVEL = 2;
var OmniLogLevels = ((OmniLogLevels2) => {
  OmniLogLevels2[OmniLogLevels2["silent"] = Number.NEGATIVE_INFINITY] = "silent";
  OmniLogLevels2[OmniLogLevels2["fatal"] = 0] = "fatal";
  OmniLogLevels2[OmniLogLevels2["warning"] = 1] = "warning";
  OmniLogLevels2[OmniLogLevels2["normal"] = 2] = "normal";
  OmniLogLevels2[OmniLogLevels2["info"] = 3] = "info";
  OmniLogLevels2[OmniLogLevels2["debug"] = 4] = "debug";
  OmniLogLevels2[OmniLogLevels2["trace"] = 5] = "trace";
  OmniLogLevels2[OmniLogLevels2["verbose"] = Number.POSITIVE_INFINITY] = "verbose";
  return OmniLogLevels2;
})(OmniLogLevels || {});
var _OmniLog = class _OmniLog2 {
  constructor() {
    this._status_priority = consola.create({ level: OmniLogLevels.verbose });
    this._void = (_msg) => {
    };
    this.__log = (msg) => consola.log(msg);
    this._log = DEFAULT_LOG_LEVEL >= 3 ? this.__log : this._void;
    if (_OmniLog2._instance !== void 0) {
      throw new Error("Log instance duplicate error");
    }
    consola.level = DEFAULT_LOG_LEVEL;
    _OmniLog2._instance = this;
  }
  get level() {
    return consola.level;
  }
  set level(value) {
    this._status_priority.level = value < 0 ? value : OmniLogLevels.verbose;
    this._log = value >= 3 ? this.__log : this._void;
    consola.level = value;
  }
  get warn() {
    return consola.warn;
  }
  get error() {
    return consola.error;
  }
  get info() {
    return consola.info;
  }
  get debug() {
    return consola.debug;
  }
  get verbose() {
    return consola.verbose;
  }
  get ready() {
    return consola.ready;
  }
  get success() {
    return consola.success;
  }
  get trace() {
    return consola.trace;
  }
  get log() {
    return this._log;
  }
  status_start(msg) {
    this._status_priority.start(msg);
  }
  status_success(msg) {
    this._status_priority.success(msg);
  }
  status_fail(msg) {
    this._status_priority.fail(msg);
  }
  createWithTag(id) {
    return consola.withTag(id);
  }
  wrapConsoleLogger() {
    consola.wrapConsole();
  }
  restoreConsoleLogger() {
    consola.restoreConsole();
  }
};
_OmniLog._instance = new _OmniLog();
var OmniLog = _OmniLog;
var omnilog = OmniLog._instance;
var Manager = class {
  constructor(app) {
    this.app = app;
    this.children = /* @__PURE__ */ new Map();
    const logInstance = omnilog.createWithTag("Services");
    this.info = logInstance.info;
    this.success = logInstance.success;
    this.debug = logInstance.debug;
    this.verbose = logInstance.verbose;
    this.warn = logInstance.warn;
    this.error = logInstance.error;
  }
  register(Ctor, config, wrapper) {
    throw new Error("Manager register method not implemented");
  }
  async load() {
    const success = true;
    for (const [id, child] of this.children) {
      this.verbose(`${id} load`);
      await child.load?.();
    }
    return success;
  }
  async start() {
    for (const [id, child] of this.children) {
      omnilog.log(`child ${id} start`);
      try {
        await child.start?.();
      } catch (e) {
        omnilog.warn(`child ${id} failed to start with error: ${e}`);
      }
    }
    omnilog.log("All children started");
    return true;
  }
  async stop() {
    this.debug("stopping children...");
    for (const child of Array.from(this.children.values()).reverse()) {
      this.verbose(`${child.id} stop`);
      await child.stop?.();
    }
    this.success("children stopped");
    return true;
  }
  get(id) {
    return this.children.get(id);
  }
  has(id) {
    return this.children.has(id);
  }
};
var IntegrationsManager = class extends Manager {
  constructor(app) {
    super(app);
    Object.defineProperty(this, "integrations", { get: () => this.children });
    this._integrations = [];
  }
  // Unlike services, we want to delay the creation until all the services have loaded, so we
  // just store an array here which we process for the actual registration step in load()
  register(Ctor, config) {
    this.verbose(`pre-registering ${config.id} integration`);
    this._integrations.push([Ctor, config]);
  }
  async load() {
    for (const [Ctor, config] of this._integrations) {
      this.verbose(`registering integration ${config.id}...`);
      const integration = new Ctor(config.id, this, config);
      this.children.set(config.id, integration);
      integration.create?.();
    }
    this.debug("loading integrations...");
    const result = await super.load();
    this.success("integrations loaded");
    return result;
  }
  async start() {
    this.debug("starting integrations...");
    await super.start();
    this.success("integrations started");
    return true;
  }
};
var ServiceManager = class extends Manager {
  constructor(app) {
    super(app);
    Object.defineProperty(this, "services", { get: () => this.children });
  }
  register(Ctor, config, wrapper) {
    this.debug(`registering ${config.id} service`);
    let service = new Ctor(config.id, this, config);
    if (wrapper && typeof wrapper === "function") {
      service = wrapper(service);
    }
    this.children.set(config.id, service);
    service.create?.();
    return service;
  }
  async load() {
    this.debug("loading services...");
    const success = await super.load();
    if (!success) {
      this.error("failed to load services");
      return false;
    }
    this.success("services loaded");
    return true;
  }
  async start() {
    this.debug("starting services...");
    await super.start();
    this.success("services started");
    return true;
  }
};
var VOID = -1;
var PRIMITIVE = 0;
var ARRAY = 1;
var OBJECT = 2;
var DATE = 3;
var REGEXP = 4;
var MAP = 5;
var SET = 6;
var ERROR = 7;
var BIGINT = 8;
var env2 = typeof self === "object" ? self : globalThis;
var deserializer = ($2, _2) => {
  const as = (out, index) => {
    $2.set(index, out);
    return out;
  };
  const unpair = (index) => {
    if ($2.has(index))
      return $2.get(index);
    const [type, value] = _2[index];
    switch (type) {
      case PRIMITIVE:
      case VOID:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index2 of value)
          arr.push(unpair(index2));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index2] of value)
          object[unpair(key)] = unpair(index2);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const { source, flags } = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(/* @__PURE__ */ new Map(), index);
        for (const [key, index2] of value)
          map.set(unpair(key), unpair(index2));
        return map;
      }
      case SET: {
        const set = as(/* @__PURE__ */ new Set(), index);
        for (const index2 of value)
          set.add(unpair(index2));
        return set;
      }
      case ERROR: {
        const { name, message } = value;
        return as(new env2[name](message), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case "BigInt":
        return as(Object(BigInt(value)), index);
    }
    return as(new env2[type](value), index);
  };
  return unpair;
};
var deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
var EMPTY = "";
var { toString } = {};
var { keys } = Object;
var typeOf = (value) => {
  const type = typeof value;
  if (type !== "object" || !value)
    return [PRIMITIVE, type];
  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case "Array":
      return [ARRAY, EMPTY];
    case "Object":
      return [OBJECT, EMPTY];
    case "Date":
      return [DATE, EMPTY];
    case "RegExp":
      return [REGEXP, EMPTY];
    case "Map":
      return [MAP, EMPTY];
    case "Set":
      return [SET, EMPTY];
  }
  if (asString.includes("Array"))
    return [ARRAY, asString];
  if (asString.includes("Error"))
    return [ERROR, asString];
  return [OBJECT, asString];
};
var shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
var serializer = (strict, json, $2, _2) => {
  const as = (out, value) => {
    const index = _2.push(out) - 1;
    $2.set(value, index);
    return index;
  };
  const pair = (value) => {
    if ($2.has(value))
      return $2.get(value);
    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case "bigint":
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case "function":
          case "symbol":
            if (strict)
              throw new TypeError("unable to serialize " + type);
            entry = null;
            break;
          case "undefined":
            return as([VOID], value);
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type)
          return as([type, [...value]], value);
        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value)
          arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case "BigInt":
              return as([type, value.toString()], value);
            case "Boolean":
            case "Number":
            case "String":
              return as([type, value.valueOf()], value);
          }
        }
        if (json && "toJSON" in value)
          return pair(value.toJSON());
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const { source, flags } = value;
        return as([TYPE, { source, flags }], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry)))
            entries.push(pair(entry));
        }
        return index;
      }
    }
    const { message } = value;
    return as([TYPE, { name: type, message }], value);
  };
  return pair;
};
var serialize = (value, { json, lossy } = {}) => {
  const _2 = [];
  return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _2)(value), _2;
};
var { parse: $parse, stringify: $stringify } = JSON;
var options = { json: true, lossy: true };
var parse = (str) => deserialize($parse(str));
var stringify = (any) => $stringify(serialize(any, options));
var STATE = /* @__PURE__ */ ((STATE2) => {
  STATE2[STATE2["CREATED"] = 0] = "CREATED";
  STATE2[STATE2["CONFIGURED"] = 1] = "CONFIGURED";
  STATE2[STATE2["LOADED"] = 2] = "LOADED";
  STATE2[STATE2["STARTED"] = 3] = "STARTED";
  STATE2[STATE2["STOPPED"] = 4] = "STOPPED";
  return STATE2;
})(STATE || {});
var App = class {
  constructor(id, config, opts) {
    this.state = 0;
    this.id = id;
    opts ?? (opts = {
      integrationsManagerType: IntegrationsManager
    });
    this.config = config;
    this.logger = omnilog;
    this.services = new ServiceManager(this);
    this.integrations = new (opts.integrationsManagerType || IntegrationsManager)(this);
    const loginstance = this.logger.createWithTag(id);
    this.info = loginstance.info;
    this.success = loginstance.success;
    this.debug = loginstance.debug;
    this.error = loginstance.error;
    this.verbose = loginstance.verbose;
    this.warn = loginstance.warn;
    this.events = new Emittery(
      omnilog.level >= 4 ? { debug: { name: "app.events", enabled: true } } : void 0
    );
  }
  // registers a service or integration
  use(middleware, config, middlewareType, wrapper) {
    this.verbose("[APP.USE] use", middleware.name);
    if (middlewareType === "service" || middleware.name.endsWith("Service")) {
      const service = middleware;
      this.services.register(service, config, wrapper);
    } else if (middlewareType === "integration" || middleware.name.endsWith("Integration")) {
      const integration = middleware;
      this.integrations.register(integration, config);
    } else {
      this.warn(`[APP.USE] Unknown middleware type ${middleware.name}`);
    }
    return this;
  }
  // ----- messaging
  async emit(event, data) {
    this.debug("[APP.EMIT Global] emit", event);
    await this.events.emit(event, data);
  }
  // ----- app state control
  async load() {
    if (this.state >= 2) {
      omnilog.warn("Cannot load more than once, ignoring call");
      return true;
    }
    const owner = this;
    if (owner.onConfigure != null) {
      await owner.onConfigure();
    }
    this.state = 1;
    if (!await this.services.load()) {
      throw new Error("Failed to load services, see console for details");
    }
    await this.integrations.load();
    if (owner.onLoad != null) {
      await owner.onLoad();
    }
    await this.emit("loaded", {});
    this.success("app loaded");
    this.state = 2;
    return true;
  }
  async start() {
    if (this.state === 3) {
      omnilog.warn("Cannot start more than once, ignoring call");
      return true;
    }
    const owner = this;
    await this.services.start();
    await this.integrations.start();
    if (owner.onStart != null) {
      await owner.onStart();
    }
    this.success("app started");
    this.state = 3;
    await this.emit("started", {});
    omnilog.status_success("Server has started and is ready to accept connections.");
    return true;
  }
  async stop() {
    this.info("app stopping");
    await this.integrations.stop();
    await this.services.stop();
    await this.emit("stopped", {});
    this.success("app stopped");
    this.state = 4;
    return true;
  }
  subscribeToGlobalEvent(event, handler) {
    this.info(`[APP.SUB Global] ${this.id} subscribed to GlobalEvent ${event}`);
    this.events.on(event, handler);
  }
  subscribeToServiceEvent(serviceOrId, event, handler) {
    const id = serviceOrId.id ?? serviceOrId;
    if (!this.services.has(id)) {
      this.warn(`[SERVICE.SUB Service] ${this.id} subscribed to unknown service '${id}'. This can be ok in some cases, but usually indicates a bug.`);
    }
    this.info(`[SERVICE.SUB App] ${this.id} subscribed to service event '${event}' on ${id}`);
    this.events.on(`${id}.${event}`, handler);
  }
  stringify(obj) {
    return stringify(obj, null, 2);
  }
  parse(str) {
    return parse(str);
  }
};
App.STATES = STATE;
var BaseWorkflow = class _BaseWorkflow {
  constructor(id, version, meta) {
    this.id = id;
    this.version = version;
    this.setMeta(meta || null);
    this.setRete(null);
    this.setAPI(null);
    this.langchain = null;
  }
  setMeta(meta) {
    var _a, _b;
    this.meta = meta ?? { name: "New Workflow", description: "No description.", pictureUrl: "omni.png" };
    this.meta.updated = Date.now();
    (_a = this.meta).created ?? (_a.created = Date.now());
    (_b = this.meta).tags ?? (_b.tags = []);
    this.meta.updated = Date.now();
    return this;
  }
  setRete(rete) {
    this.rete = rete;
    this.meta.updated = Date.now();
    return this;
  }
  setAPI(api) {
    this.api = api ?? { fields: {} };
    this.meta.updated = Date.now();
    return this;
  }
  toJSON() {
    return {
      id: this.id,
      version: this.version,
      meta: this.meta,
      rete: this.rete,
      api: this.api,
      langchain: this.langchain
    };
  }
  static fromJSON(json) {
    const result = new _BaseWorkflow(json.id, json.version);
    result.langchain = json.langchain;
    result.setMeta(json.meta);
    result.setRete(json.rete);
    result.setAPI(json.api);
    return result;
  }
};
var _Workflow = class _Workflow2 extends BaseWorkflow {
  // Either 'public', organisation IDs, group IDs, or user IDs
  constructor(id, version, data, meta) {
    super(id, version, meta);
    this._id = version == "draft" ? `wf:${id}` : `wf:${id}:${version}`;
    this.owner = data.owner;
    this.org = data.org;
    this.publishedTo = [];
  }
  toJSON() {
    return { ...super.toJSON(), _id: this._id, _rev: this._rev, owner: this.owner, org: this.org, publishedTo: this.publishedTo };
  }
  static fromJSON(json) {
    let id = json._id?.replace("wf:", "") || json.id;
    if (json.id && json.id.length > 16 && id.startsWith(json.id)) {
      id = json.id;
    }
    const result = new _Workflow2(id, json.version ?? "draft", { owner: json.owner || json.meta.owner, org: json.org });
    result.langchain = json.langchain;
    result.publishedTo = json.publishedTo;
    result.setMeta(json.meta);
    result.setRete(json.rete);
    result.setAPI(json.api);
    if (json._rev) {
      result._rev = json._rev;
    }
    return result;
  }
};
_Workflow.modelName = "Workflow";
var DBObject = class {
  constructor(id) {
    this._rev = void 0;
    this.id = id;
    this._id = `${Object.getPrototypeOf(this).constructor.name}:${this.id}`;
    this.createdAt = Date.now();
    this.lastUpdated = Date.now();
  }
  processAPIResponse(response) {
    if (response.ok) {
      this._id = response.id;
      this._rev = response.rev;
    }
  }
};
var Group = class extends DBObject {
  constructor(id, name) {
    super(id);
    this.name = name;
    this.credit = 0;
    this.organisation = null;
    this.members = [];
    this.permission = [];
  }
};
Group.modelName = "Group";
var Organisation = class extends DBObject {
  constructor(id, name) {
    super(id);
    this.name = name;
    this.members = [];
    this.groups = [];
  }
};
Organisation.modelName = "Organisation";
var _User = class _User2 extends DBObject {
  constructor(id, username) {
    super(id);
    this._id = `user:${this.id}`;
    this.email = null;
    this.username = username;
    this.status = "active";
    this.credit = 0;
    this.organisation = null;
    this.tier = null;
    this.password = null;
    this.salt = null;
    this.token = null;
    this.tags = [];
  }
  isAdmin() {
    return this.tags.some((tag) => tag === "admin");
  }
  static fromJSON(json) {
    const result = new _User2(json.id, json.username);
    result._id = json._id;
    result._rev = json._rev;
    result.id = json.id;
    result.createdAt = json.createdAt;
    result.lastUpdated = json.lastUpdated;
    result.email = json.email;
    result.username = json.username;
    result.status = json.status;
    result.externalId = json.externalId;
    result.authType = json.authType;
    result.credit = json.credit;
    result.organisation = json.organisation;
    result.tier = json.tier;
    result.password = json.password;
    result.salt = json.salt;
    result.token = json.token;
    result.tags = json.tags;
    return result;
  }
};
_User.modelName = "User";
var Tier = class extends DBObject {
  constructor(id, name) {
    super(id);
    this.name = name;
    this.limits = [];
  }
};
Tier.modelName = "Tier";
var APIKey = class extends DBObject {
  // _id of the owner
  constructor(id) {
    super(id);
    this.meta = {
      name: "",
      description: "",
      owner: {
        id: "",
        type: "",
        name: ""
      },
      revoked: false
    };
    this.key = "";
    this.vaultType = "local";
    this.owner = "";
    this.apiNamespace = "";
    this.variableName = "";
  }
};
APIKey.modelName = "APIKey";
var rnds8 = new Uint8Array(16);
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var Rete2 = __toESM2(require_rete_common(), 1);
var import_rete2 = __toESM2(require_rete_common(), 1);
var CustomSocket = class extends import_rete2.Socket {
  constructor(name, data) {
    super(name, data);
    this.array = false;
    this.array = data?.array === true;
  }
  isValidUrl(str) {
    let url;
    if (!(typeof str === "string" && str.length > 0)) {
      return false;
    }
    try {
      url = new URL(str);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  // #v-endif
};
var OmniComponentMacroTypes = /* @__PURE__ */ ((OmniComponentMacroTypes3) => {
  OmniComponentMacroTypes3["EXEC"] = "exec";
  OmniComponentMacroTypes3["BUILDER"] = "builder";
  return OmniComponentMacroTypes3;
})(OmniComponentMacroTypes || {});
var IOComposer = class {
  constructor() {
    this.data = {};
  }
  create(name, ioType, type, customSocket) {
    this.data.name = name;
    this.data.type = type;
    this.data.customSocket = customSocket;
    this.data.dataTypes = [type];
    this.data.title = name;
    this.data.source = { sourceType: ioType === "input" ? "requestBody" : "responseBody" };
    return this;
  }
  setRequired(required) {
    this.data.required = required;
    return this;
  }
  setHidden(hidden) {
    this.data.hidden = hidden;
    return this;
  }
  set(key, value) {
    this.data[key] = value;
    return this;
  }
  setDefault(defaultValue) {
    this.data.default = defaultValue;
    return this;
  }
  setControl(ctl) {
    ctl.dataType = this.data.type;
    this.data.control = ctl;
    return this;
  }
  setConstraints(minimum, maximum, step) {
    this.data.minimum = minimum;
    this.data.maximum = maximum;
    this.data.step = step;
    return this;
  }
  setChoices(choices, defaultValue) {
    this.data.choices = choices;
    this.data.default = defaultValue;
    return this;
  }
  toOmniIO() {
    var _a;
    (_a = this.data).title ?? (_a.title = this.data.name);
    return this.data;
  }
};
var ControlComposer = class {
  constructor(name) {
    this.data = { name };
  }
  create(name) {
    this.data.name = name;
    return this;
  }
  setRequired(required) {
    this.data.required = required;
    return this;
  }
  setHidden(hidden) {
    this.data.hidden = hidden;
    return this;
  }
  setControlType(controlType) {
    this.data.controlType = controlType;
    return this;
  }
  set(key, value) {
    this.data[key] = value;
    return this;
  }
  setChoices(choices, defaultValue) {
    if (Array.isArray(choices)) {
      if (choices.length > 0) {
        if (typeof choices[0] === "string") {
          choices = choices.map((v2) => ({ title: v2, value: v2 }));
        }
        this.data.choices = choices;
      } else {
        this.data.choices = [{ title: "(default)", value: defaultValue ?? "" }];
      }
    } else if (typeof choices === "object") {
      if (choices.hasOwnProperty("block")) {
        this.data.choices = choices;
      }
    }
    this.data.default = defaultValue;
    return this;
  }
  setReadonly(readonly) {
    this.data.readonly = readonly;
    return this;
  }
  setConstraints(minimum, maximum, step) {
    this.data.minimum = minimum;
    this.data.maximum = maximum;
    this.data.step = step;
    return this;
  }
  toOmniControl() {
    var _a;
    (_a = this.data).title ?? (_a.title = this.data.name);
    return this.data;
  }
};
var BaseComposer = class {
  constructor() {
    this.data = {};
  }
  fromJSON(config) {
    this.data = JSON.parse(JSON.stringify(config));
    return this;
  }
};
var ComponentComposer = class extends BaseComposer {
  constructor() {
    super();
    this.data.type = "OAIComponent31";
    this.data.flags = 0;
    this.data.macros = {};
    this.data.origin = "omnitool:Composer";
  }
  fromScratch() {
    this.data.apiNamespace = this.data.displayNamespace;
    this.data.apiOperationId = this.data.displayOperationId;
    this.data.responseContentType = "application/json";
    this.data.category = "Utilities";
    this.data.tags = ["default"];
    return this;
  }
  createInput(name, type, customSocket) {
    let ret = new IOComposer().create(name, "input", type, customSocket);
    return ret;
  }
  addInput(input) {
    this.data.inputs = this.data.inputs ?? {};
    this.data.inputs[input.name] = input;
    return this;
  }
  createOutput(name, type, customSocket) {
    let ret = new IOComposer().create(name, "output", type, customSocket);
    return ret;
  }
  addOutput(output) {
    this.data.outputs = this.data.outputs ?? {};
    this.data.outputs[output.name] = output;
    return this;
  }
  setTags(tags) {
    this.data.tags = tags;
    return this;
  }
  create(displayNamespace, displayOperationId) {
    this.data.displayNamespace = displayNamespace;
    this.data.displayOperationId = displayOperationId;
    return this;
  }
  set(key, value) {
    this.data[key] = value;
    return this;
  }
  setMethod(method) {
    this.data.method = method;
    return this;
  }
  useAPI(apiNamespace, apiOperationId) {
    this.data.apiNamespace = apiNamespace;
    this.data.apiOperationId = apiOperationId;
    return this;
  }
  setMeta(meta) {
    this.data.meta = meta;
    return this;
  }
  setFlags(flags) {
    this.data.flags = flags;
    return this;
  }
  setFlag(flag, value = true) {
    const mask = 1 << flag;
    if (value) {
      return this.data.flags | mask;
    } else {
      return this.data.flags & ~mask;
    }
  }
  setMacro(macro, fn) {
    this.data.macros[macro] = fn;
    if (fn instanceof Function) {
      this.setFlag(
        2
        /* HAS_NATIVE_CODE */
      );
    }
    return this;
  }
  createControl(name) {
    let ret = new ControlComposer(name).create(name);
    return ret;
  }
  addControl(control) {
    this.data.controls = this.data.controls ?? {};
    this.data.controls[control.name] = control;
    return this;
  }
  toJSON() {
    return this.data;
  }
};
var PatchComposer = class extends BaseComposer {
  constructor() {
    super();
    this.data.macros = {};
    this.data.origin = "omnitool:Composer";
  }
  fromComponent(apiNamespace, apiOperationId) {
    this.data.apiNamespace = apiNamespace;
    this.data.apiOperationId = apiOperationId;
    return this;
  }
  createInput(name, type, customSocket) {
    let ret = new IOComposer().create(name, "input", type, customSocket);
    return ret;
  }
  addInput(input) {
    this.data.inputs = this.data.inputs ?? {};
    this.data.inputs[input.name] = input;
    return this;
  }
  createOutput(name, type, customSocket) {
    let ret = new IOComposer().create(name, "output", type, customSocket);
    return ret;
  }
  addOutput(output) {
    this.data.outputs = this.data.outputs ?? {};
    this.data.outputs[output.name] = output;
    return this;
  }
  create(displayNamespace, displayOperationId) {
    this.data.displayNamespace = displayNamespace;
    this.data.displayOperationId = displayOperationId;
    return this;
  }
  set(key, value) {
    this.data[key] = value;
    return this;
  }
  useAPI(apiNamespace, apiOperationId) {
    this.data.apiNamespace = apiNamespace;
    this.data.apiOperationId = apiOperationId;
    return this;
  }
  setMeta(meta) {
    this.data.meta = meta;
    return this;
  }
  createControl(name) {
    let ret = new ControlComposer(name).create(name);
    return ret;
  }
  addControl(control) {
    this.data.controls = this.data.controls ?? {};
    this.data.controls[control.name] = control;
    return this;
  }
  hideExcept(input, output) {
    if (input?.length > 0) {
      this.data.scripts = this.data.scripts ?? {};
      this.data.scripts["hideExcept:inputs"] = input;
    }
    if (output?.length > 0) {
      this.data.scripts = this.data.scripts ?? {};
      this.data.scripts["hideExcept:outputs"] = output;
    }
  }
  toJSON() {
    return this.data;
  }
};
var import_rete3 = __toESM2(require_rete_common(), 1);
var OAIControl31 = class _OAIControl31 extends import_rete3.default.Control {
  constructor(config, control, emitter) {
    super(config.name);
    this.data = JSON.parse(JSON.stringify(config));
    this.emitter = emitter;
    this.props = { ikey: config.name };
    this.component = control;
  }
  async initChoices() {
    if (this.data.choices != null) {
      let choices = this.data.choices;
      if (Array.isArray(choices)) {
        this.data.choices = choices.map(function(v2) {
          if (typeof v2 === "object") {
            return v2;
          } else {
            return { value: v2, title: v2 };
          }
        });
      }
      if (typeof this.data.choices === "object") {
        choices = this.data.choices;
        if (choices.block) {
          let list;
          try {
            list = await globalThis.client.runBlock({
              block: choices.block,
              args: {},
              cache: choices.cache
            });
          } catch (ex) {
            console.error("Could not load choices for " + this.data.name + ": " + ex.message);
            list = ["ERROR: " + ex.message, this.data.default];
          }
          if (list.error) {
            console.error("Could not load choices for " + this.data.name + ": " + list.error.message);
            list = ["ERROR: " + list.error, this.data.default];
          }
          const root = choices.map?.root;
          if (root && list[root] != null && Array.isArray(list[root])) {
            list = list[root];
          }
          if (!Array.isArray(list)) {
            list = Array.from(Object.values(list));
          }
          this.data.choices = list.map((v2) => {
            return {
              value: v2[choices.map.value],
              title: v2[choices.map.title],
              description: v2[choices.map.description] || ""
            };
          }).filter((e) => e.value);
        }
      }
    }
  }
  get dataType() {
    return this.data.dataType ?? "string";
  }
  get controlType() {
    console.log("Access to field controlType on control");
    return this.data.controlType;
  }
  get type() {
    console.trace();
    console.log("Access to deprecated field type on control");
    return this.data.dataType;
  }
  get opts() {
    return this.data;
  }
  get displays() {
    return this.data.displays ?? null;
  }
  get minimum() {
    return this.data.minimum;
  }
  get description() {
    return this.data.description;
  }
  get title() {
    return this.data.title ?? this.data.name;
  }
  get maximum() {
    return this.data.maximum;
  }
  get choices() {
    return this.data.choices ?? ["(default)"];
  }
  get readonly() {
    return this.data.readonly ?? false;
  }
  _formatValue(val) {
    if (val) {
      if ((this.dataType === "number" || this.dataType == "float") && typeof val === "string") {
        val = parseFloat(val);
      } else if (this.dataType === "integer" && typeof val === "string") {
        val = parseFloat(val);
      } else if (this.dataType === "boolean" && typeof val === "number") {
        val = val != 0;
      } else if (this.dataType === "boolean" && typeof val === "string") {
        val = [true, "true", "1", "on", "active"].includes(val.toLowerCase());
      }
    }
    return val;
  }
  setValue(val) {
    if (this.displays || this.readonly) {
      return;
    }
    val = this._formatValue(val);
    this.putData(this.props.ikey, val);
    this.update();
  }
  static async fromControl(ctl, emitter) {
    const control = WorkflowClientControlManager.getInstance().get(ctl.controlType);
    const ret = new _OAIControl31(ctl, control, emitter);
    await ret.initChoices();
    return ret;
  }
  static async fromIO(ctlType, io, emitter) {
    let control = {
      dataType: io.type,
      controlType: ctlType,
      name: io.name,
      title: io.title,
      choices: io.choices,
      description: io.description,
      step: io.step,
      default: io.default,
      minimum: io.minimum,
      maximum: io.maximum,
      required: io.required,
      ...io.control || {}
    };
    const ctl = WorkflowClientControlManager.getInstance().get(ctlType);
    const ret = new _OAIControl31(control, ctl, emitter);
    await ret.initChoices();
    return ret;
  }
};
var deserializeValidator = function(jsString) {
  const eval2 = eval;
  return eval2("(" + jsString + ")");
};
var OAIBaseComponent = class extends Rete2.Component {
  // #v-endif
  constructor(config, patch) {
    var _a, _b, _c, _d;
    const data = (0, import_deepmerge.default)(config, patch ?? {});
    super(`${data.displayNamespace}.${data.displayOperationId}`);
    this.data = data;
    (_a = this.data).macros ?? (_a.macros = {});
    (_b = this.data).flags ?? (_b.flags = 0);
    for (const key in this.data.inputs) {
      if (!key.startsWith("$")) {
        (_c = this.data.inputs[key]).source ?? (_c.source = { sourceType: "requestBody" });
      }
    }
    for (const key in this.data.outputs) {
      if (!key.startsWith("$")) {
        (_d = this.data.outputs[key]).source ?? (_d.source = { sourceType: "responseBody" });
      }
    }
    this._validator = config.validator != null ? deserializeValidator(config.validator) : void 0;
  }
  static create(displayNamespace, displayOperationId) {
    let composer = new ComponentComposer();
    return composer.create(displayNamespace, displayOperationId);
  }
  static createPatch(displayNamespace, displayOperationId) {
    let composer = new PatchComposer();
    return composer.create(displayNamespace, displayOperationId);
  }
  get validator() {
    return this._validator ?? null;
  }
  get title() {
    return this.data.title;
  }
  get description() {
    return this.data.description;
  }
  get scripts() {
    return this.data.scripts;
  }
  get flags() {
    return this.data.flags ?? 0;
  }
  get summary() {
    return this.data.description ?? this.meta.source?.summary;
  }
  get category() {
    return this.data.category ?? "Base API";
  }
  get tags() {
    return this.data.tags;
  }
  get apiKey() {
    return `${this.data.apiNamespace}.${this.data.apiOperationId}`;
  }
  get renderTemplate() {
    return this.data.renderTemplate || "default";
  }
  get type() {
    return this.data.type ?? "OAIComponent31";
  }
  get method() {
    return this.data.method;
  }
  get inputs() {
    return this.data.inputs;
  }
  get meta() {
    return this.data.meta ?? {};
  }
  get outputs() {
    return this.data.outputs;
  }
  get macros() {
    return this.data.macros;
  }
  get controls() {
    return this.data.controls;
  }
  setType(type) {
    this.data.type = type;
    return this;
  }
  setApiOperationId(apiOperationId) {
    this.data.apiOperationId = apiOperationId;
    return this;
  }
  setApiNamespace(apiNamespace) {
    this.data.apiNamespace = apiNamespace;
    return this;
  }
  setDisplayNamespace(displayNamespace) {
    this.data.displayNamespace = displayNamespace;
    return this;
  }
  setDisplayOperationId(displayOperationId) {
    this.data.displayOperationId = displayOperationId;
    return this;
  }
  setTitle(title) {
    this.data.title = title;
    return this;
  }
  setMethod(method) {
    this.data.method = method;
    return this;
  }
  setDescription(description) {
    this.data.description = description;
    return this;
  }
  setUrlPath(urlPath) {
    this.data.urlPath = urlPath;
    return this;
  }
  setMeta(meta) {
    this.data.meta = meta;
    return this;
  }
  addInput(name, input) {
    this.data.inputs[name] = input;
    return this;
  }
  addControl(name, control) {
    this.data.controls[name] = control;
    return this;
  }
  addOutput(name, output) {
    this.data.outputs[name] = output;
    return this;
  }
  addTag(tag) {
    this.data.tags.push(tag);
    return this;
  }
  setCategory(category) {
    this.data.category = category;
    return this;
  }
  setRequestContentType(requestContentType) {
    this.data.requestContentType = requestContentType;
    return this;
  }
  setResponseContentType(responseContentType) {
    this.data.responseContentType = responseContentType;
    return this;
  }
  setCredentials(credentials) {
    this.data.credentials = credentials;
    return this;
  }
  setValidator(validator) {
    this.data.validator = validator;
    return this;
  }
  addSecurity(spec) {
    this.data.security = this.data.security ?? [];
    this.data.security.push(spec);
    return this;
  }
  setMacro(macro, fn) {
    this.data.macros[macro] = fn;
    return this;
  }
  pickDefaultControl(obj) {
    if (obj.control?.controlType != null) {
      return obj.control?.controlType;
    }
    if (obj.controlType != null) {
      return obj.controlType;
    }
    if (obj.choices != null) {
      return "AlpineSelectComponent";
    }
    if (obj.step != null || obj.minimum != null && obj.maximum != null && Math.abs(obj.maximum - obj.minimum) <= 100) {
      return "AlpineNumWithSliderComponent";
    }
    const objType = obj.type;
    const customSocket = obj.customSocket;
    if (customSocket && ["imageArray", "image", "document", "documentArray", "audio", "audioArray", "mediaObject", "mediaObjectArray"].includes(customSocket)) {
      return "AlpineLabelComponent";
    }
    if (objType === "number" || objType === "integer" || objType === "float") {
      return "AlpineNumComponent";
    } else if (objType === "boolean") {
      return "AlpineToggleComponent";
    } else if (objType === "error") {
      return "AlpineTextComponent";
    } else if (objType === "object") {
      return "AlpineCodeMirrorComponent";
    }
    if (objType === "string" || customSocket === "text") {
      return "AlpineTextComponent";
    }
    return "AlpineLabelComponent";
  }
  async builder(node) {
    node.title = this.title;
    node.description = this.description;
    await this._builder?.(node);
  }
  async workerStart(inputData, ctx) {
    try {
      await this._workerStart?.(inputData, ctx);
    } catch (error) {
      omnilog.error("Error in component worker", error);
      const payload = { type: "error", node_id: ctx.node.id, error: error?.message || "Error", componentKey: this.name, sessionId: ctx.sessionId };
      await ctx.app.emit("sse_message", payload);
      ctx.outputs.error = error;
      return ctx.outputs;
    }
    return ctx.outputs;
  }
  async setControlValue(controlId, value, ctx) {
    if (this.data.controls[controlId] == null) {
      omnilog.warn(this.name, "tried to update non existing control", controlId, " - suppressed.\nPlease check your component for a setComponentValue call that passes in a non existing control key.");
      return;
    }
    if (this.editor != null) {
      const ctl = this.editor?.nodes.find((n) => n.id === ctx.node.id).controls.get(controlId) ?? null;
      if (ctl != null) {
        ctl.setValue(value);
      }
    } else {
      if (ctx?.app && ctx.node && ctx.sessionId) {
        const payload = { type: "control:setvalue", node_id: ctx.node.id, controlId, value, componentKey: this.name, sessionId: ctx.sessionId };
        await ctx.app.emit("sse_message", payload);
      }
    }
  }
};

// extension.ts
import sharp2 from "sharp";

// util/updateMetaData.ts
import sharp from "sharp";
var updateMetaData = async (image) => {
  if (image.data) {
    let img = sharp(image.data);
    let metadata = await img.metadata();
    image.meta = { height: metadata.height, width: metadata.width, format: metadata.format, size: metadata.size, channels: metadata.channels };
  }
  return image;
};
var updateMetaData_default = updateMetaData;

// util/writeToCdn.ts
var writeToCdn = async (ctx, images, meta) => {
  console.log("writeToCdn");
  return Promise.all(images.map(async (image) => {
    if (image.data != null) {
      await updateMetaData_default(image);
      return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType, userId: ctx.userId }, Object.assign({}, image.meta, meta || {}, { user: ctx.user.id }));
    } else {
      return image;
    }
  }));
};
var writeToCdn_default = writeToCdn;

// extension.ts
var NS_OMNI = "sharp";
var resizeComponent = OAIBaseComponent.create(NS_OMNI, "resize").fromScratch().setMethod("X-CUSTOM");
resizeComponent.set("title", "Resize Image").set("description", "Resize the image to given width and height using various options.").addInput(
  resizeComponent.createInput("images", "object", "imageArray").set("title", "Input Images").set("description", "Images to resize.").setRequired(true).toOmniIO()
).addOutput(
  resizeComponent.createOutput("images", "object", "imageArray").set("title", "Output Images").set("description", "The resized images.").toOmniIO()
).setMeta({
  source: {
    summary: "Resize the image to the given dimensions with various options for scaling, fitting, and cropping.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-resize",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
}).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let width = payload.width;
      let height = payload.height;
      let fit = payload.fit;
      let position = payload.position;
      let background = payload.background;
      let kernel = payload.kernel;
      let withoutEnlargement = payload.withoutEnlargement;
      let fastShrinkOnLoad = payload.fastShrinkOnLoad;
      image.data = await sharp2(image.data).resize(
        width,
        height,
        {
          fit,
          position,
          background,
          kernel,
          withoutEnlargement,
          fastShrinkOnLoad
        }
      ).toBuffer();
      return image;
    }));
    results = await writeToCdn_default(ctx, results);
    return { images: results };
  }
  return {};
});
var SharpResizeComponent = resizeComponent.toJSON();
var compositeComponent = OAIBaseComponent.create(NS_OMNI, "composite").fromScratch().set("title", "Composite Image (Sharp)").set("category", "Image Manipulation").set("description", "Composite image(s) over the processed image using various options.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Composite image(s) over the processed image with options for blending, placement, tiling, and more.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-composite",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
compositeComponent.addInput(
  compositeComponent.createInput("images", "array", "imageArray").set("description", "Images to be processed").setRequired(true).toOmniIO()
).addInput(
  compositeComponent.createInput("compositeImages", "array", "imageArray").set("description", "Images to be composited").setRequired(true).toOmniIO()
).addInput(
  compositeComponent.createInput("blend", "string").set("description", "How to blend this image with the image below.").setDefault("clear").toOmniIO()
).addInput(
  compositeComponent.createInput("gravity", "string").set("description", "Gravity at which to place the overlay.").setDefault("northeast").toOmniIO()
).addInput(
  compositeComponent.createInput("top", "number").set("description", "The pixel offset from the top edge.").toOmniIO()
).addInput(
  compositeComponent.createInput("left", "number").set("description", "The pixel offset from the left edge.").toOmniIO()
).addInput(
  compositeComponent.createInput("tile", "boolean").set("description", "Set to true to repeat the overlay image across the entire image with the given gravity.").toOmniIO()
).addInput(
  compositeComponent.createInput("premultiplied", "boolean").set("description", "Set to true to avoid premultiplying the image below.").toOmniIO()
).addInput(
  compositeComponent.createInput("density", "number").set("description", "Number representing the DPI for vector overlay image.").setDefault(72).setConstraints(1, 600, 1).toOmniIO()
).addOutput(
  compositeComponent.createOutput("images", "array", "imageArray").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images && payload.compositeImages) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let compositeImages = await Promise.all(payload.compositeImages.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image, index) => {
      image.data = await sharp3(image.data).composite(compositeImages.map((compositeImage) => ({
        input: compositeImage.data,
        blend: payload.blend,
        gravity: payload.gravity,
        top: payload.top,
        left: payload.left,
        tile: payload.tile,
        premultiplied: payload.premultiplied,
        density: payload.density
      }))).toBuffer();
      return image;
    }));
    results = await writeToCdn_default(ctx, results);
    return { images: results };
  }
  return {};
});
var SharpCompositeComponent = compositeComponent.toJSON();
var rotateComponent = OAIBaseComponent.create(NS_OMNI, "rotate").fromScratch().set("title", "Rotate Image (Sharp)").set("category", "Image Manipulation").set("description", "Rotates an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Rotate an image using the high speed impage manipulation library Sharp for nodejs",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#rotate",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
rotateComponent.addInput(
  rotateComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to rotate").setRequired(true).toOmniIO()
).addInput(
  rotateComponent.createInput("angle", "number").set("title", "Angle").set("description", "The angle of rotation. (optional, default 0)").setDefault(0).setConstraints(-360, 360, 1).toOmniIO()
).addInput(
  rotateComponent.createInput("background", "string", "text").set("title", "Background").set("description", "Background colour when using a non-zero angle. (optional, default black)").setDefault("black").toOmniIO()
).addOutput(
  rotateComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The rotated images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let background = payload.background || "black";
    let angle = payload.angle || 0;
    let results = await Promise.all(images.map(async (image) => {
      let buffer = image.data;
      let sharpImage = sharp4(buffer);
      sharpImage.rotate(angle, { background });
      let result = await sharpImage.toBuffer();
      image.data = result;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpRotationComponent = rotateComponent.toJSON();
var blurComponent = OAIBaseComponent.create(NS_OMNI, "blur").fromScratch().set("title", "Blur Image (Sharp)").set("category", "Image Manipulation").set("description", "Blurs an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Blurs an image, optionally using a sigmal value via Gaussian Blur",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#blur",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
blurComponent.addInput(
  blurComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to blur").setRequired(true).toOmniIO()
).addInput(
  blurComponent.createInput("sigma", "number").set("description", "The sigma value for Gaussian BLur, 0 for fast blur, 0.3-1000 for Gaussian Blur Sigma").setDefault(0).setConstraints(0, 3e3).toOmniIO()
).addOutput(
  blurComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The blurred images").toOmniIO()
);
blurComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let buffer = image.data;
      let sharpImage = sharp4(buffer);
      if (payload.sigma === 0) {
        sharpImage.blur();
      }
      if (payload.sigma > 0) {
        let sigma = Math.max(0.3, Math.min(1e3, payload.sigma));
        sharpImage.blur(sigma);
      }
      let result = await sharpImage.toBuffer();
      image.data = result;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpBlurComponent = blurComponent.toJSON();
var tintComponent = OAIBaseComponent.create(NS_OMNI, "tint").fromScratch().set("title", "Tint Image (Sharp)").set("category", "Image Manipulation").set("description", "Tints an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Tints an image via provided RGB values",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#tint",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
tintComponent.addInput(
  tintComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to blur").setRequired(true).toOmniIO()
).addInput(
  tintComponent.createInput("red", "number").set("description", "Tint the red channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addInput(
  tintComponent.createInput("green", "number").set("description", "Tint the green channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addInput(
  tintComponent.createInput("blue", "number").set("description", "Tint the blue channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addOutput(
  tintComponent.createOutput("images", "object", "imageArray").set("description", "The tinted images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    const tint = {
      r: parseInt(payload.red),
      g: parseInt(payload.green),
      b: parseInt(payload.blue)
    };
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp4(image.data).tint(tint).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results, { tint });
  }
  return { images: payload.images };
});
var SharpTintComponent = tintComponent.toJSON();
var grayScaleComponent = OAIBaseComponent.create(NS_OMNI, "grayscale").fromScratch().set("title", "Grayscale Image (Sharp)").set("category", "Image Manipulation").set("description", "Convert an image to 8-bit, 256 color grayscale").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels. This may be overridden by other sharp operations such as toColourspace('b-w'), which will produce an output image containing one color channel. An alpha channel may be present, and will be unchanged by the operation.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#grayscale",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
grayScaleComponent.addInput(
  grayScaleComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to grayscale").setRequired(true).toOmniIO()
).addInput(
  grayScaleComponent.createInput("grayscale", "boolean").set("title", "Grayscale").set("description", "Grayscale the Image").setDefault(true).toOmniIO()
).addOutput(
  grayScaleComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The grayscaled images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      if (payload.grayscale) {
        image.data = await sharp4(image.data).grayscale(true).toBuffer();
      }
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results, { grayscale: payload.grayscale });
  }
  return payload;
});
var SharpGrayscaleComponent = grayScaleComponent.toJSON();
var extractComponent = OAIBaseComponent.create(NS_OMNI, "extract").fromScratch().set("title", "Extract Image Region (Sharp)").set("category", "Image Manipulation").set("description", "Extracts/Crops an image region").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Extract/crop a region of the image. Use extract before resize for pre-resize extraction. Use extract after resize for post-resize extraction. Use extract before and after for both.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#extract",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
extractComponent.addInput(
  extractComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to extract from").setRequired(true).toOmniIO()
).addInput(
  extractComponent.createInput("left", "number").set("title", "Left").setDefault(0).set("minimum", 0).toOmniIO()
).addInput(
  extractComponent.createInput("top", "number").set("title", "Top").setDefault(0).set("minimum", 0).toOmniIO()
).addInput(
  extractComponent.createInput("width", "number").set("title", "Width").setDefault(512).set("minimum", 0).toOmniIO()
).addInput(
  extractComponent.createInput("height", "number").set("title", "Height").setDefault(512).set("minimum", 0).toOmniIO()
).addOutput(
  extractComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const { left, top, width, height } = payload;
      image.data = await sharp2(image.data).extract({ left, top, width, height }).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return payload;
});
var SharpExtractComponent = extractComponent.toJSON();
var trimComponent = OAIBaseComponent.create(NS_OMNI, "trim").fromScratch().set("title", "Trim Image (Sharp)").set("description", "Trim pixels from all edges that contain values similar to the given background colour.").set("category", "Image Manipulation").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Trim pixels from all edges that contain values similar to the given background colour, which defaults to that of the top-left pixel. Images with an alpha channel will use the combined bounding box of alpha and non-alpha channels.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#trim",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
trimComponent.addInput(
  trimComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to operate on").setRequired(true).toOmniIO()
).addInput(
  trimComponent.createInput("trimMode", "string").set("title", "Trim Mode").setDefault("Top left Pixel").set("description", "Specify the mode for trimming: Top left pixel or Background color.").toOmniIO()
).addInput(
  trimComponent.createInput("background", "string").set("title", "Background").setDefault("#000000").set("description", "Background colour to trim, used when trim mode is 'Background color'.").toOmniIO()
).addInput(
  trimComponent.createInput("threshold", "number").set("title", "Threshold").setDefault(10).set("description", "The allowed difference from the above colour, a positive number.").toOmniIO()
).addOutput(
  trimComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      if (payload.trimMode === "Background color") {
        image.data = await sharp4(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer();
      } else {
        image.data = await sharp4(image.data).trim(payload.threshold).toBuffer();
      }
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpTrimComponent = trimComponent.toJSON();
var extendComponent = OAIBaseComponent.create(NS_OMNI, "extend").fromScratch().set("title", "Extend Image").set("category", "Image Manipulation").set("description", "Extend / pad / extrude one or more edges of the image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Extend / pad / extrude one or more edges of the image with either the provided background colour or pixels derived from the image. This operation will always occur after resizing and extraction, if any.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-resize#extend",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
extendComponent.addInput(
  extendComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to extend").setRequired(true).toOmniIO()
).addInput(
  extendComponent.createInput("extendWith", "string").set("title", "Method").set("description", "How to determine the color of the new pixels.").setChoices(["background", "copy", "repeat", "mirror"], "background").toOmniIO()
).addInput(
  extendComponent.createInput("background", "string", "text").set("title", "Background").set("description", 'The color of the new pixels if method "background" was chosen.').setDefault("#000000").toOmniIO()
).addOutput(
  extendComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
);
extendComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const { left, right, top, bottom, extendWith, background } = payload;
      image.data = await sharp4(image.data).extend({ left, right, top, bottom, extendWith, background }).toBuffer();
      image.meta.width += left + right;
      image.meta.height += top + bottom;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return payload;
});
var SharpExtendComponent = extendComponent.toJSON();
var modulateComponent = OAIBaseComponent.create(NS_OMNI, "modulate").fromScratch().set("title", "Modulate Image (Sharp)").set("category", "Image Manipulation").set("description", "Transforms the image using brightness, saturation, hue rotation, and lightness").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#modulate",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
modulateComponent.addInput(
  modulateComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to extend").setRequired(true).toOmniIO()
).addInput(
  modulateComponent.createInput("brightness", "float").set("title", "Brightness").set("description", "The brightness multiplier.").setDefault(1).setConstraints(0).toOmniIO()
).addInput(
  modulateComponent.createInput("saturation", "float").set("title", "Saturation").set("description", "The saturation multiplier.").setDefault(1).setConstraints(0).toOmniIO()
).addInput(
  modulateComponent.createInput("hue", "float").set("title", "Hue Rotation").set("description", "The hue rotation in degrees.").setDefault(0).setConstraints(-360, 360, 1).toOmniIO()
).addInput(
  modulateComponent.createInput("lightness", "float").set("title", "Lightness").set("description", "The lightness addend.").setDefault(0).setConstraints(0).toOmniIO()
).addOutput(
  modulateComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const args = { ...payload };
      if (args.hue == 0) {
        delete args.hue;
      }
      image.data = await sharp4(image.data).modulate(args).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpModulateComponent = modulateComponent.toJSON();
var extractChannelComponent = OAIBaseComponent.create(NS_OMNI, "extractChannel").fromScratch().set("title", "Extract Channel (Sharp)").set("category", "Image Manipulation").set("description", "Extract channels from a multi-channel image.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Extract channel from a multi-channel image.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-channel#extractchannel",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
extractChannelComponent.addInput(
  extractChannelComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to operate on").setRequired(true).toOmniIO()
).addInput(
  extractChannelComponent.createInput("channel", "string").set("title", "Channel").set("description", "The channel to extract.").setDefault("red").setChoices(["red", "green", "blue", "alpha"]).toOmniIO()
).addOutput(
  extractChannelComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp4(image.data).extractChannel(payload.channel).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpExtractChannelComponent = extractChannelComponent.toJSON();
var metadataComponent = OAIBaseComponent.create(NS_OMNI, "metadata").fromScratch().set("title", "Get Image Metadata (Sharp)").set("category", "Image Manipulation").set("description", "Returns the metadata of an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Fast access to (uncached) image metadata without decoding any compressed pixel data. This is read from the header of the input image. It does not take into consideration any operations to be applied to the output image, such as resize or rotate.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-input#metadata",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
metadataComponent.addInput(
  metadataComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to inspect").setRequired(true).toOmniIO()
).addOutput(
  metadataComponent.createOutput("metadata", "object", "objectArray").set("title", "Metadata").set("description", "Metadata of the image(s)").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let md = await sharp4(image.data).metadata();
      return Object.assign({}, image.meta, md || {});
    }));
    payload.metadata = results;
  }
  return { metadata: payload.metadata };
});
var SharpMetaDataComponent = metadataComponent.toJSON();
var statsComponent = OAIBaseComponent.create(NS_OMNI, "stats").fromScratch().set("title", "Get Image Stats (Sharp)").set("category", "Image Manipulation").set("description", "Access to pixel-derived image statistics for every channel in the image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Access to pixel-derived image statistics for every channel in the image",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-input#stats",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
statsComponent.addInput(
  statsComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to inspect").setRequired(true).toOmniIO()
).addOutput(
  statsComponent.createOutput("stats", "object", "objectArray").set("title", "Stats").set("description", "Pixel-derived image statistics for every channel in the image").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let md = await sharp4(image.data).stats();
      return md;
    }));
    payload.stats = results;
  }
  return { stats: payload.stats };
});
var SharpStatsComponent = statsComponent.toJSON();
var removeAlphaComponent = OAIBaseComponent.create(NS_OMNI, "removeAlpha").fromScratch().set("title", "Remove Alpha (Sharp)").set("category", "Image Manipulation").set("description", "Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-channel#removeAlpha",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
removeAlphaComponent.addInput(
  removeAlphaComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to operate on").setRequired(true).toOmniIO()
);
removeAlphaComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp4(image.data).removeAlpha().toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpRemoveAlphaComponent = removeAlphaComponent.toJSON();
var ensureAlphaComponent = OAIBaseComponent.create(NS_OMNI, "ensureAlpha").fromScratch().set("title", "Ensure Alpha (Sharp)").set("category", "Image Manipulation").set("description", "Ensure the output image has an alpha transparency channel.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Ensure the output image has an alpha transparency channel. If missing, the added alpha channel will have the specified transparency level, defaulting to fully-opaque (1). This is a no-op if the image already has an alpha channel.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-channel#ensureAlpha",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
ensureAlphaComponent.addInput(
  ensureAlphaComponent.createInput("images", "object", "imageArray").set("title", "Image").set("description", "The image(s) to operate on").setRequired(true).toOmniIO()
).addInput(
  ensureAlphaComponent.createInput("alpha", "number").set("title", "Alpha").set("description", "Alpha transparency level (0=fully-transparent, 1=fully-opaque).").setDefault(1).setConstraints(0, 1, 0.1).toOmniIO()
).addOutput(
  ensureAlphaComponent.createOutput("images", "object", "imageArray").set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp4(image.data).ensureAlpha(payload.alpha).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpEnsureAlphaComponent = ensureAlphaComponent.toJSON();
var allComponents = [SharpRotationComponent, SharpTrimComponent, SharpBlurComponent, SharpTintComponent, SharpGrayscaleComponent, SharpExtractComponent, SharpMetaDataComponent, SharpStatsComponent, SharpExtendComponent, SharpModulateComponent, SharpExtractChannelComponent, SharpRemoveAlphaComponent, SharpEnsureAlphaComponent, SharpResizeComponent, SharpCompositeComponent];
var extension_default = {
  createComponents: () => ({
    blocks: allComponents,
    patches: []
  })
};
export {
  extension_default as default
};
/*! Bundled license information:

@ungap/structured-clone/esm/json.js:
  (*! (c) Andrea Giammarchi - ISC *)
*/
/*! Bundled license information:

rete/build/rete.common.js:
  (*!
  * rete v1.5.2 
  * (c) 2023 Vitaliy Stoliarov 
  * Released under the MIT license.
  *)
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)
*/
