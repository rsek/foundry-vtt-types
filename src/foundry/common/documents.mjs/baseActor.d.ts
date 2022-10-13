import { ConfiguredDocumentClass, DocumentSubTypes } from "../../../types/helperTypes";
import { DocumentMetadata, DocumentModificationOptions } from "../abstract/document.mjs";
import { Document } from "../abstract/module.mjs";
import type { DEFAULT_TOKEN } from "../constants.mjs.js";
import * as data from "../data/data.mjs";
import type { ActorDataConstructorData, ActorDataSource } from "../data/data.mjs/actorData";
import { BaseActiveEffect } from "./baseActiveEffect";
import { BaseItem } from "./baseItem";
import { BaseToken } from "./baseToken";
import { BaseUser } from "./baseUser";

type ActorMetadata = Merge<
  DocumentMetadata,
  {
    name: "Actor";
    collection: "actors";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "img", "type", "sort"];
    embedded: {
      ActiveEffect: typeof BaseActiveEffect;
      Item: typeof BaseItem;
    };
    label: "DOCUMENT.Actor";
    labelPlural: "DOCUMENT.Actors";
    isPrimary: true;
    hasSystemData: true;
    permissions: {
      create: "ACTOR_CREATE";
      update: "ACTOR_UPDATE";
    };
  }
>;

/**
 * The base Actor model definition which defines common behavior of an Actor document between both client and server.
 */
export declare class BaseActor extends Document<
  data.ActorData,
  InstanceType<ConfiguredDocumentClass<typeof BaseToken>>,
  ActorMetadata
> {
  /**
   * @param data    - Initial data provided to construct the Actor document (default: `{}`)
   * @param context - The document context, see {@link foundry.abstract.Document} (default: `{}`)
   */
  constructor(data?: DeepPartial<data.ActorData>, context?: DocumentConstructionContext);

  static get schema(): ConstructorOf<data.ActorData>;

  static override get metadata(): ActorMetadata;

  get effects(): data.ActorData["effects"];

  get items(): data.ActorData["items"];

  get type(): data.ActorData["type"];

  // FIXME: this should be an override once the Document class is updated for v10.
  static defineSchema(): typeof data.ActorData;

  /**
   * The default icon used for newly created Actor documents.
   */
  static DEFAULT_ICON: typeof DEFAULT_TOKEN;

  /**
   * The allowed set of Actor types which may exist.
   */
  static get TYPES(): DocumentSubTypes<"Actor">[];

  // FIXME: inherit _initializeSource from Document once it's updated for v10
  protected _initializeSource(data: ActorDataConstructorData): ActorDataSource;

  // FIXME: inherit canUserCreate from Document once it's updated for v10
  static canUserCreate(user: BaseUser): boolean;

  // FIXME: inherit migrateData from Document once it's updated for v10

  // FIXME: inherit shimData from Document once it's updated for v10

  // FIXME: inherit _preCreate from Document once it's updated for v10
  protected override _preCreate(
    data: ActorDataConstructorData,
    options: DocumentModificationOptions,
    user: BaseUser
  ): Promise<void>;

  // FIXME: inherit _preUpdate from Document once it's updated for v10
  protected override _preUpdate(
    changed: DeepPartial<ActorDataConstructorData>,
    options: DocumentModificationOptions,
    user: BaseUser
  ): Promise<void>;
}
