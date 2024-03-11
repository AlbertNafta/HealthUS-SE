import moment from "moment";

const date = moment(apt.date);
const formattedDate = date.format("YYYY-MM-DD");

console.log(formattedDate);