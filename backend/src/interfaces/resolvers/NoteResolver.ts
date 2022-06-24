import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Services } from "../../application/services";
import { NoteInput, NoteOutput } from "../../application/types/Note";
import { Entities } from "../../domain/entities";
import { EFromOptions } from "../../domain/enumerators/EFromOptions";

@Resolver(() => Entities.Note)
export class NoteResolver {
  @FieldResolver(() => Boolean)
  async likedByUser(@Root() note: Entities.Note): Promise<boolean> {
    return false
      ? await Services.Vote.checkUserLike("context.user.username", note.id)
      : false;
  }

  @FieldResolver(() => Number)
  async score(@Root() note: Entities.Note): Promise<number> {
    return await Services.Vote.count(note.id);
  }

  @Query(() => [Entities.Note])
  async notes(
    @Arg("source") source: string,
    @Arg("type", { nullable: true }) from: EFromOptions = EFromOptions.FEED,
    @Arg("skip", { nullable: true }) skip: number = 0
  ): Promise<NoteOutput[]> {
    const notes = await Services.Note.get(from, source, skip);

    return notes;
  }

  @Query(() => Entities.Note)
  async note(@Arg("id") id: string): Promise<NoteOutput> {
    const note = await Services.Note.getOne(id);

    return note;
  }

  @Mutation(() => String)
  async createNote(@Arg("payload") payload: NoteInput): Promise<string> {
    const note = await Services.Note.create(payload);
    return note.id;
  }

  @Mutation(() => String)
  async deleteNote(@Arg("noteId") noteId: string) {
    await Services.Note.delete(noteId);
    return null;
  }
}
