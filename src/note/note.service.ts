import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable() //this is "Dependency injection"
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  getNotes(userId: number) {
    return this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
  }

  getNoteById(noteId: number) {
    return this.prismaService.note.findUnique({
      where: {
        id: Number(noteId),
      },
    });
  }

  insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    return this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId,
      },
    });
  }

  updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: Number(noteId),
      },
    });
    if (!note) {
      throw new ForbiddenException('cannot not find note');
    }
    return this.prismaService.note.update({
      where: {
        id: Number(noteId),
      },
      data: { ...updateNoteDTO },
    });
  }

  deleteNoteById(noteId: number) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: Number(noteId),
      },
    });
    if (!note) {
      throw new ForbiddenException('cannot not find note');
    }
    return this.prismaService.note.delete({
      where: {
        id: Number(noteId),
      },
    });
  }
}
