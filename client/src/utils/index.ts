import moment from "moment";

export const formatter=(dbb:Date | string)=>{
  const val = moment(dbb)
  return val.format('DD/MM/YYYY')
}
export function getInitials(fullName:string):string {
    const names = fullName?.split("");
  
    const initials = names?.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials?.join("");
  
    return initialsStr;
  }