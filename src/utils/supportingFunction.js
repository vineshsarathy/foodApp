import moment from "moment";
import dayjs from "dayjs";

export const generateRandomDate =(a,b)=>{
    console.log(dayjs('12/31/2022').format('DD/MM/YYYY'),
    dayjs().subtract(30, 'day').format('DD/MM/YYYY'))
    const start = dayjs(a).$d;
    const end = dayjs(b).$d;
    return dayjs(Math.floor(Math.random()* start - end) + end).format('DD/MM/YYYY')

}