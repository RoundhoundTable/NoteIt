import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Services } from "../../application/services";
import { NoteInput } from "../../application/types/Note";
import { Entities } from "../../domain/entities";
import { EFromOptions } from "../../application/enumerators/EFromOptions";
import { isAuth } from "../../application/middlewares/isAuth";
import { ContextPayload } from "../../application/decorators/ContextPayload";
import { IPayload } from "../../application/interfaces/IPayload";
import { IContext } from "../../application/interfaces/IContext";

@Resolver(() => Entities.Note)
export class NoteResolver {
  @FieldResolver(() => Boolean)
  @UseMiddleware(isAuth)
  async likedByUser(
    @Root() note: Entities.Note,
    @Ctx() context: IContext
  ): Promise<boolean> {
    return await Services.Vote.checkUserLike(context.payload.username, note.id);
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
  ): Promise<Entities.Note[]> {
    const notes = await Services.Note.get(from, source, skip);

    return notes;
  }

  @Query(() => Entities.Note)
  async note(@Arg("id") id: string): Promise<Entities.Note> {
    const note = await Services.Note.getOne(id);

    return note;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("content") content: NoteInput,
    @Ctx() context: IContext
  ): Promise<string> {
    const note = await Services.Note.create({
      ...content,
      username: context.payload.username,
    });
    return note.id;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteNote(@Arg("noteId") noteId: string, @Ctx() context: IContext) {
    const note = await Services.Note.getOne(noteId);

    if (note.username !== context.payload.username) console.error("err");

    await Services.Note.delete(noteId);
    return null;
  }
}
