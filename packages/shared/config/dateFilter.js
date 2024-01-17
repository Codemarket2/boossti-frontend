let oneDayBack = new Date();
oneDayBack = new Date(oneDayBack.setHours(oneDayBack.getHours() - 24));
let oneWeekBack = new Date();
oneWeekBack = new Date(oneWeekBack.setDate(oneWeekBack.getDate() - 7));
let oneMonthBack = new Date();
oneMonthBack = new Date(oneMonthBack.setMonth(oneMonthBack.getMonth() - 1));

export default {
  oneDayBack,
  oneWeekBack,
  oneMonthBack,
};
