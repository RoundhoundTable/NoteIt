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
import { IContext } from "../../application/interfaces/IContext";
import { GraphQLError } from "graphql";

@Resolver(() => Entities.Note)
export class NoteResolver {
  @FieldResolver(() => Number)
  @UseMiddleware(isAuth)
  async likedByUser(
    @Root() note: Entities.Note,
    @Ctx() context: IContext
  ): Promise<number> {
    return context.payload
      ? await Services.Vote.checkUserLike(context.payload.username, note.id)
      : 0;
  }

  @FieldResolver(() => Number)
  async score(@Root() note: Entities.Note): Promise<number> {
    const score = await Services.Vote.getScore(note.id);
    return score ? score : 0;
  }

  @Query(() => [Entities.Note])
  async notes(
    @Arg("source") source: string,
    @Arg("type") from: EFromOptions,
    @Arg("offset", { nullable: true }) offset: number = 0
  ): Promise<Entities.Note[]> {
    const notes = await Services.Note.get(from, source, offset);

    return notes;
  }

  @Query(() => Entities.Note)
  async note(@Arg("id") id: string): Promise<Entities.Note> {
    const note = await Services.Note.getOne(id);

    return note;
  }

  @Query(() => [Entities.Note])
  @UseMiddleware(isAuth)
  async feed(
    @Arg("offset", { nullable: true }) offset: number = 0,
    @Ctx() context: IContext
  ): Promise<Entities.Note[]> {
    const notes = await Services.Note.getFeed(context.payload.username, offset);

    return notes;
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

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async deleteNote(@Arg("noteId") noteId: string, @Ctx() context: IContext) {
    const note = await Services.Note.getOne(noteId);

    if (note.username !== context.payload.username)
      throw new GraphQLError("Only the owner can delete a note");

    await Services.Note.delete(noteId);
    return null;
  }
}
