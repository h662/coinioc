export const getKoreanCurrency = (number: number): string => {
  const koreanUnits = ["경", "조", "억", "만", ""];
  const unit = 10000;
  let result = "";

  const decimalPart = (number % 1).toFixed(2).substring(1);
  number = Math.floor(number);

  while (number > 0) {
    const mod = number % unit;
    const modToString = mod.toString().replace(/(\d)(\d{3})/, "$1,$2");
    number = Math.floor(number / unit);

    if (mod !== 0) {
      result = `${modToString}${koreanUnits.pop()}${result}`;
    } else {
      koreanUnits.pop();
    }
  }

  if (decimalPart === ".00") {
    return result;
  }

  return result + decimalPart;
};
