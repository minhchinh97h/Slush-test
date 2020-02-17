import { PipeTransform, Pipe } from "@angular/core";
import { DateObj } from "./task.model";

@Pipe({
  name: "customDate"
})
export class CustomDatePipe implements PipeTransform {
  weekDayTexts = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  transform(value: DateObj) {
    const date = new Date(value.year, value.month, value.day);

    return (
      this.weekDayTexts[date.getDay()] +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  }
}
