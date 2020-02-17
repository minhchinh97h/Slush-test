import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "shortenText"
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + "...";
    }

    return value;
  }
}
