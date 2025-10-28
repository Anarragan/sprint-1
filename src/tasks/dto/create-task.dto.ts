export class CreateTaskDto {
  title: string;
  description: string;
  date_start: Date;
  id_status: number;
  id_priority: number;
  id_created_by: number;
}
