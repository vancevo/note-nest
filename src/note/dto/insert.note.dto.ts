import { IsNotEmpty, IsString } from 'class-validator';
export class InsertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  url: string;
}
// id Int @id @default(autoincrement())
//   title String
//   description String
//   url String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//    //relationship
//    userId Int //like "foreign key"
