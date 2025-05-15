import { PartialType } from "@nestjs/mapped-types"
import { CreateEventDTo } from "./create-event.dto";
export class UpdateEventDto extends PartialType(CreateEventDTo) {}