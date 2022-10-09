import type { ConfiguredDocumentClass } from "../../../../types/helperTypes";
import type { JOURNAL_ENTRY_PAGE_FORMATS } from "../../../common/constants.mjs.js";

declare global {
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} document.
   */
  class JournalPageSheet<Options extends JournalPageSheet.Options = JournalPageSheet.Options> extends DocumentSheet<
    Options,
    ConcreteJournalPage
  > {
    /**
     * @param object - The JournalEntryPage instance which is being edited.
     * @param options - Application options
     */
    constructor(object: ConcreteJournalPage, options?: Partial<Options>);

    /**
     * @default
     * ```typescript
     * foundry.utils.mergeObject(super.defaultOptions, {
     *   classes: ["sheet", "journal-sheet", "journal-entry-page"],
     *   width: 600,
     *   height: 680,
     *   resizable: true,
     *   closeOnSubmit: false,
     *   submitOnClose: true,
     *   viewPermission: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER
     * });
     * ```
     */
    static override get defaultOptions(): JournalPageSheet.Options;
  }

  namespace JournalPageSheet {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Options extends DocumentSheetOptions {}
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} text document.
   */
  class JournalTextPageSheet extends JournalPageSheet {
    /**
     * Bi-directional HTML <-> Markdown converter.
     */
    static get _converter(): showdown.Converter;
    /**
     * Declare the format that we edit text content in for this sheet so we can perform conversions as necessary.
     */
    static get format(): typeof JOURNAL_ENTRY_PAGE_FORMATS.HTML;
    /**
     * @defaultValue
     * ```typescript
     * const options = super.defaultOptions;
     * options.classes.push("text");
     * options.secrets.push({parentSelector: "section"});
     * ```
     */
    static get defaultOptions(): JournalPageSheet.Options;

    // TODO: remaining type declarations for this class
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} image document.
   */
  class JournalImagePageSheet extends JournalPageSheet {
    // TODO: type declarations for this class
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} video document.
   */
  class JournalVideoPageSheet extends JournalPageSheet {
    // TODO: type declarations for this class
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} PDF document.
   */
  class JournalPDFPageSheet extends JournalPageSheet {
    // TODO: type declarations for this class
  }
  /**
   * A subclass of {@link JournalTextPageSheet} that implements a TinyMCE editor.
   */
  class JournalTextTinyMCESheet extends JournalTextPageSheet {
    // TODO: type declarations for this class
  }
  /**
   * A subclass of {@link JournalTextPageSheet} that implements a markdown editor for editing the text content.
   */
  class MarkdownJournalPageSheet extends JournalTextPageSheet {
    // TODO: type declarations for this class
  }
}

type ConcreteJournalPage = InstanceType<ConfiguredDocumentClass<typeof JournalEntryPage>>;
