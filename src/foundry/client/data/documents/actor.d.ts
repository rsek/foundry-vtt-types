import { ConfiguredData, ConfiguredDocumentClass, ConfiguredObjectClassForName } from "../../../../types/helperTypes";
import { DocumentDataType, DocumentModificationOptions } from "../../../common/abstract/document.mjs";
import type { ActorDataConstructorData } from "../../../common/data/data.mjs/actorData.js";

declare global {
  /**
   * The client-side Actor document which extends the common BaseActor model.
   * Each Actor document contains ActorData which defines its data schema.
   *
   * @see {@link data.ActorData} The Actor data schema
   * @see {@link documents.Actors} The world-level collection of Actor documents
   * @see {@link applications.ActorSheet} The Actor configuration application
   *
   * @example <caption>Create a new Actor</caption>
   * ```typescript
   * let actor = await Actor.create({
   *   name: "New Test Actor",
   *   type: "character",
   *   img: "artwork/character-profile.jpg"
   * });
   * ```
   *
   * @example <caption>Retrieve an existing Actor</caption>
   * ```typescript
   * let actor = game.actors.get(actorId);
   * ```
   */
  class Actor extends ClientDocumentMixin(foundry.documents.BaseActor) {
    /**
     * @param data    - Initial data provided to construct the Actor document
     * @param context - The document context, see {@link foundry.abstract.Document}
     */
    constructor(
      data: ConstructorParameters<typeof foundry.documents.BaseActor>[0],
      context?: ConstructorParameters<typeof foundry.documents.BaseActor>[1]
    );

    /**
     * An object that tracks which tracks the changes to the data model which were applied by active effects
     * @defaultValue `{}`
     */
    overrides: Record<string, unknown>;

    /**
     * A cached array of image paths which can be used for this Actor's token.
     * Null if the list has not yet been populated.
     * @defaultValue `null`
     */
    protected _tokenImages: string[] | null;

    /**
     * Cache the last drawn wildcard token to avoid repeat draws
     * @defaultValue `null`
     */
    protected _lastWildcard: string | null;

    /**
     * Provide a thumbnail image path used to represent this document.
     */
    get thumbnail(): this["data"]["img"];

    /**
     * Provide an object which organizes all embedded Item instances by their type
     */
    get itemTypes(): Record<
      foundry.documents.BaseItem["data"]["type"],
      Array<InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseItem>>>
    >;

    /**
     * Test whether an Actor document is a synthetic representation of a Token (if true) or a full Document (if false)
     */
    get isToken(): boolean;

    /**
     * An array of {@link ActiveEffect} instances which are present on the Actor which have a limited duration.
     */
    // FIXME: once the data models are updated, this type should be: ReturnType<this["effects"]["filter"]>
    get temporaryEffects(): (ActiveEffect & { isTemporary: true; disabled?: false | undefined })[];

    /**
     * Return a reference to the TokenDocument which owns this Actor as a synthetic override
     */
    get token(): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>> | null;

    override get uuid(): string;

    /**
     * Request wildcard token images from the server and return them.
     * @param actorId - The actor whose prototype token contains the wildcard image path.
     * @returns The list of filenames to token images that match the wildcard search.
     */
    protected static _requestTokenImages(
      actorId: string,
      options: Actor.RequestTokenImagesOptions | undefined
    ): Promise<string[]>;

    /**
     * Apply any transformations to the Actor data which are caused by ActiveEffects.
     */
    applyActiveEffects(): void;

    /**
     * Retrieve an Array of active tokens which represent this Actor in the current canvas Scene.
     * If the canvas is not currently active, or there are no linked actors, the returned Array will be empty.
     * If the Actor is a synthetic token actor, only the exact Token which it represents will be returned.
     *
     * @param linked   - Limit results to Tokens which are linked to the Actor. Otherwise return all Tokens even those which are not linked. (default: `false`)
     * @param document - Return the Document instance rather than the PlaceableObject (default: `false`)
     * @returns An array of Token instances in the current Scene which reference this Actor.
     */
    getActiveTokens(
      linked: boolean,
      document: true
    ): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>>[];

    getActiveTokens(linked?: boolean, document?: false): InstanceType<ConfiguredObjectClassForName<"Token">>[];

    getActiveTokens(
      linked: boolean,
      document: boolean
    ):
      | InstanceType<ConfiguredObjectClassForName<"Token">>[]
      | InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>>[];

    /**
     * Prepare a data object which defines the data schema used by dice roll commands against this Actor
     */
    // FIXME this should be typed as: typeof this["system"]
    getRollData(): DocumentDataType<this>;

    /**
     * Create a new Token document, not yet saved to the database, which represents the Actor.
     * @param data - Additional data, such as x, y, rotation, etc. for the created token data (default: `{}`)
     * @returns The created TokenDocument instances
     */
    getTokenDocument(data?: DeepPartial<DocumentDataType<TokenDocument>> | undefined): Promise<TokenDocument>;

    /**
     * Get an Array of Token images which could represent this Actor
     */
    getTokenImages(): Promise<string[]>;

    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     * This allows for game systems to override this behavior and deploy special logic.
     * @param attribute - The attribute path
     * @param value     - The target attribute value
     * @param isDelta   - Whether the number represents a relative change (true) or an absolute change (false) (default: `false`)
     * @param isBar     - Whether the new value is part of an attribute bar, or just a direct value (default: `true`)
     * @returns The updated Actor document
     */
    modifyTokenAttribute(attribute: string, value: number, isDelta: boolean, isBar: boolean): Promise<this | undefined>;

    override prepareEmbeddedDocuments(): void;

    /**
     * Roll initiative for all Combatants in the currently active Combat encounter which are associated with this Actor.
     * If viewing a full Actor document, all Tokens which map to that actor will be targeted for initiative rolls.
     * If viewing a synthetic Token actor, only that particular Token will be targeted for an initiative roll.
     *
     * @param options - Configuration for how initiative for this Actor is rolled.
     * @returns A promise which resolves to the Combat document once rolls are complete.
     */
    rollInitiative(options?: Actor.RollInitiativeOptions): Promise<Combat | null>;

    protected override _preCreate(
      data: ActorDataConstructorData,
      options: DocumentModificationOptions,
      user: foundry.documents.BaseUser
    ): Promise<void>;

    /**
     * When an Actor is being created, apply default token configuration settings to its prototype token.
     * @param data - Data explicitly provided to the creation workflow
     * @param options - Options which configure creation
     */
    protected _applyDefaultTokenSettings(data: object, options: Actor.ApplyDefaultTokenSettingsOptions): void;

    protected override _onUpdate(
      changed: DeepPartial<foundry.data.ActorData["_source"]>,
      options: DocumentModificationOptions,
      userId: string
    ): void;

    protected override _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: foundry.abstract.Document<any, any>[],
      result: Record<string, unknown>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;

    protected override _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: foundry.abstract.Document<any, any>[],
      result: Record<string, unknown>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;

    protected override _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: foundry.abstract.Document<any, any>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /**
     * Perform various actions on active tokens if embedded documents were changed.
     * @param embeddedName - The type of embedded document that was modified.
     * @internal
     */
    protected _onEmbeddedDocumentChange(embeddedName: string): void;

    /**
     * @deprecated since v10
     * @see {@link Actor.getTokenDocument}
     */
    getTokenData(data?: DeepPartial<ConfiguredData<"Token">> | undefined): Promise<TokenDocument>;
  }

  namespace Actor {
    interface RequestTokenImagesOptions {
      /**
       * The name of the compendium the actor is in.
       */
      pack: string;
    }
    interface RollInitiativeOptions {
      /**
       * Create new Combatant entries for Tokens associated with this actor.
       * @defaultValue `false`
       */
      createCombatants?: boolean;

      /**
       * Re-roll the initiative for this Actor if it has already been rolled.
       * @defaultValue `false`
       */
      rerollInitiative?: boolean;

      /**
       * Additional options passed to the Combat#rollInitiative method.
       * @defaultValue `{}`
       * TODO: Solve once Combat is more fleshed out. @see Combat#rollInitiative
       */
      initiativeOptions?: object;
    }

    interface ApplyDefaultTokenSettingsOptions {
      /**
       * Does this creation workflow originate via compendium import?
       * @defaultValue `false`
       */
      fromCompendium?: boolean;
    }
  }
}
