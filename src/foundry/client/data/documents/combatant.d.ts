import { ConfiguredDocumentClass } from '../../../../types/helperTypes';

declare global {
  /**
   * The client-side Combatant document which extends the common BaseCombatant model.
   * Each Combatant belongs to the effects collection of its parent Document.
   * Each Combatant contains a CombatantData object which provides its source data.
   *
   * @see {@link data.CombatantData}                  The Combatant data schema
   * @see {@link documents.Combat}                    The Combat document which contains Combatant embedded documents
   * @see {@link applications.CombatantConfig}        The Combatant configuration application
   */
  class Combatant extends ClientDocumentMixin(foundry.documents.BaseCombatant) {
    /**
     * @param data    - Initial data provided to construct the Combatant document
     * @param context - The document context, see {@link foundry.abstract.Document}
     */
    constructor(
      data: ConstructorParameters<typeof foundry.documents.BaseCombatant>[0],
      context: ConstructorParameters<typeof foundry.documents.BaseCombatant>[1]
    );

    /** The current value of the special tracked resource which pertains to this Combatant */
    resource: `${number}` | number | boolean | null;

    /**
     * A convenience alias of Combatant#parent which is more semantically intuitive
     */
    get combat(): InstanceType<ConfiguredDocumentClass<typeof Combat>> | null;

    /** This is treated as a non-player combatant if it has no associated actor and no player users who can control it */
    get isNPC(): boolean;

    override get isOwner(): boolean;

    override get visible(): boolean;

    /** The displayed name for the Combatant is based off its own configured data, or the data of its represented Token. */
    get name(): string;

    /** A reference to the Actor document which this Combatant represents, if any */
    get actor(): InstanceType<ConfiguredDocumentClass<typeof Actor>> | null;

    /** A reference to the Token document which this Combatant represents, if any */
    get token(): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>> | null;

    /** An array of User documents who have ownership of this Document */
    get players(): InstanceType<ConfiguredDocumentClass<typeof User>>[];

    /**
     * Has this combatant been marked as defeated?
     */
    get isDefeated(): boolean;

    override testUserPermission(
      user: foundry.documents.BaseUser,
      permission: keyof typeof foundry.CONST.DOCUMENT_PERMISSION_LEVELS | foundry.CONST.DOCUMENT_PERMISSION_LEVELS,
      { exact }?: { exact?: boolean }
    ): boolean;

    /**
     * Get a Roll object which represents the initiative roll for this Combatant.
     * @param formula -  An explicit Roll formula to use for the combatant.
     * @returns The Roll instance to use for the combatant.
     */
    getInitiativeRoll(formula?: string): Roll;

    /**
     * Roll initiative for this particular combatant.
     * @param formula - A dice formula which overrides the default for this Combatant.
     * @returns The updated Combatant.
     */
    rollInitiative(formula: string): Promise<this | undefined>;

    override prepareDerivedData(): void;

    /**
     * Update the value of the tracked resource for this Combatant.
     */
    updateResource(): this['resource'];

    /**
     * Acquire the default dice formula which should be used to roll initiative for this combatant.
     * Modules or systems could choose to override or extend this to accommodate special situations.
     * @returns  The initiative formula to use for this combatant.
     */
    protected _getInitiativeFormula(): string;

    /**
     * @deprecated since v9
     */
    get isVisible(): boolean;
  }
}