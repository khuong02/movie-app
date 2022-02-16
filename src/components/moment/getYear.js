import moment from "moment";

const getYear = (date) => {
  return moment(date).year();
};

export default getYear;
