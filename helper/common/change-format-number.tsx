export const ChangeFormatNumber = {
  from: function(number: string | number): string {
    // var numberArray = number.toString().split('');
    // var indexTitik = numberArray.indexOf('.');

    // if (indexTitik != -1) {
    //   numberArray.splice(indexTitik, 1);
    //   if (numberArray[4] == ".") {
    //     numberArray.splice(4, 1);
    //   }
    //   if (indexTitik == 2) {
    //     if (numberArray[5] == ".") {
    //       numberArray.splice(5, 1);
    //     }
    //   }
    // }
    
    var numberString = '';

    // if (numberArray.length == 4) {
    //   numberArray.splice(1, 0, ".");
    // } else if (numberArray.length == 5) {
    //   numberArray.splice(2, 0, ".");
    // } else if (numberArray.length == 6) {
    //   numberArray.splice(3, 0, ".");
    // } else if (numberArray.length == 7) {
    //   numberArray.splice(1, 0, ".");
    //   numberArray.splice(5, 0, ".");
    // } else if (numberArray.length == 8) {
    //   numberArray.splice(2, 0, ".");
    //   numberArray.splice(6, 0, ".");
    // } else if (numberArray.length == 9) {
    //   numberArray.splice(3, 0, ".");
    //   numberArray.splice(7, 0, ".");
    // }
    
    // for (var i = 0; i < numberArray.length; i++) {
    //   numberString = numberString + numberArray[i]
    // }

    var formatter = new Intl.NumberFormat('id-ID', {
      // style: 'currency',
      // currency: 'IDR',
      // maximumSignificantDigits: 1
    });
    
    numberString = formatter.format(number as number);
    // numberString = numberString.replace("Rp", "")
    // numberString = numberString.replace(" ", "")

    return numberString
  }
}
