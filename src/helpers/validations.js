export default class Validations {
  isNumber(input) {
    var regEx = new RegExp("^[0-9]+$");
    return regEx.test(input);
  }
}
