import type { PropertiesToSource } from "../../../../types/helperTypes.js";
import type { DocumentModificationOptions } from "../../../common/abstract/document.mjs.js";
import "./utils/primitives.mjs";

declare global {
  /**
   * The client-side JournalEntryPage document which extends the common BaseJournalEntryPage document model.
   *
   * @see {@link JournalEntry} The JournalEntry document type which contains JournalEntryPage embedded documents.
   *
   * @param data - Initial data provided to construct the JournalEntry document
   */
  class JournalEntryPage extends ClientDocumentMixin(foundry.documents.BaseJournalEntryPage) {
    /**
     * The cached table of contents for this JournalEntryPage.
     */
    protected _toc: Record<string, JournalEntryPage.Heading>;

    /**
     * The table of contents for this JournalEntryPage.
     */
    get toc(): Record<string, JournalEntryPage.Heading>;

    // FIXME: This should become ValueOf<DOCUMENT_OWNERSHIP_LEVELS>, once ClientDocumentMixin is updated.
    get permission(): 0 | 1 | -1 | 2 | 3;

    /**
     * Return a reference to the Note instance for this Journal Entry Page in the current Scene, if any.
     * If multiple notes are placed for this Journal Entry, only the first will be returned.
     */
    get sceneNote(): Note | null;

    /**
     * Convert a heading into slug suitable for use as an identifier.
     * @param heading - The heading element or some text content.
     */
    static slugifyHeading(heading: HTMLHeadingElement | string): string;

    /**
     * Build a table of contents for the given HTML content.
     * @param html - The HTML content to generate a ToC outline for.
     * @param options - Additional options to configure ToC generation.
     */
    static buildTOC(
      html: HTMLElement[],
      {
        includeElement
      }?:
        | {
            includeElement?: boolean | undefined;
          }
        | undefined
    ): Record<string, JournalEntryPage.Heading>;

    /**
     * Flatten the tree structure into a single object with each node's slug as the key.
     * @param nodes - The root ToC nodes.
     */
    static _flattenTOC(nodes: JournalEntryPage.Heading[]): Record<string, JournalEntryPage.Heading>;

    /**
     * Construct a table of contents node from a heading element.
     * @param heading - The heading element.
     * @param options - Additional options to configure the returned node.
     */
    static _makeHeadingNode(
      heading: HTMLHeadingElement,
      {
        includeElement
      }?:
        | {
            includeElement?: boolean | undefined;
          }
        | undefined
    ): JournalEntryPage.Heading;

    // FIXME: '_createDocumentLink' should be inherited from ClientDocument once it's updated

    // FIXME: '_onClickDocumentLink' should be inherited from ClientDocument once it's updated

    protected _onUpdate(
      changed: DeepPartial<PropertiesToSource<JournalEntryPageDataProperties>>,
      options: DocumentModificationOptions,
      userId: string
    ): void;
  }

  namespace JournalEntryPage {
    interface Heading {
      /**
       * The heading level, 1-6.
       */
      level: number;

      /**
       * The raw heading text with any internal tags omitted.
       */
      text: string;

      /**
       * The generated slug for this heading.
       */
      slug: string;

      /**
       * The currently rendered element for this heading, if it exists.
       */
      element?: HTMLHeadingElement | undefined;

      /**
       * Any child headings of this one.
       */
      children: string[];
    }
  }
}

export {};