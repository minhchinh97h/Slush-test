interface DateObj {
  day: number;
  month: number;
  year: number;
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public dateObj: DateObj,
    public tags: string[]
  ) {}
}
