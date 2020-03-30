export default class DateUtil {
    static nextMonth(year: number, month: number) {
        let now = new Date(year + "-" + month + "-1");
        if (month == 12) {
            year += 1;
            month = 1;
        } else {
            month += 1;
        }
        return {
            "now": now,
            "next": new Date(year + "-" + month + "-1")
        };
    }


}