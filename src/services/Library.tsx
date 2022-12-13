export const Rupiah = (number:number) => {
  return new Intl.NumberFormat("id-ID", {
    // style: "currency",
    currency: "IDR"
  }).format(Math.round(number));
};

export const getNameDate = (value:string = '') =>{
  let date
  if (value) {
    date = new Date(value);
  }else{
    date = new Date();
  }
  let day = date.toLocaleString('id-ID', {weekday: 'long'});
  var d = date.getDate();
  var m =  date.getMonth()+1;
  var y = date.getFullYear();
  return day+', ' + d + '-' + m + '-' + y
}

export const groupBy = (array:any, key:string) => {
  return array.reduce((result:any, currentValue:any) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

