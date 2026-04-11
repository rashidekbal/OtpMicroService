export  function generateOtp6digit(){
    return  Math.floor(100000 + Math.random() * 900000);
}
export function generateOtp4digit(){
    return Math.floor(1000+Math.random()*9000);
}