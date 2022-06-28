var RecurrenceRule = (function () {
  var read = false;

  var recurrenceRule = "";

  var getRecurrenceRule = function () {
    return recurrenceRule;
  };

  var setRecurrenceRule = function (value) {
    recurrenceRule = value;
  };

  var getRead = function () {
    return read;
  };

  var setRead = function (value) {
    read = value;
  };

  return {
    getRecurrenceRule: getRecurrenceRule,
    setRecurrenceRule: setRecurrenceRule,
    getRead: getRead,
    setRead: setRead,
  };
})();

export default RecurrenceRule;
