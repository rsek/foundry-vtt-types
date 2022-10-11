import type { EditorView } from "prosemirror-view";
import type Showdown from "showdown";
import type { Editor } from "tinymce";
import type { JOURNAL_ENTRY_PAGE_FORMATS } from "../../../common/constants.mjs.js";
import type { CONST } from "../../../common/module.mjs.js";

declare global {
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} document.
   *
   * @typeParam TOptions - The type of the options object
   */
  class JournalPageSheet<TOptions extends JournalPageSheet.Options = JournalPageSheet.Options> extends DocumentSheet<
    TOptions,
    JournalEntryPage
  > {
    /**
     * @param object - The JournalEntryPage instance which is being edited.
     * @param options - Application options
     */
    constructor(object: JournalEntryPage, options?: Partial<TOptions>);

    /**
     * {@inheritdoc}
     * @defaultValue
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
    static get defaultOptions(): JournalPageSheet.Options;

    get template(): string;

    get title(): string;

    // FIXME: this should be async, but the parent classes would need to be updated first
    activateEditor(
      name: string,
      options?: TextEditor.Options | undefined,
      initialContent?: string | undefined
    ): Promise<Editor | EditorView>;

    // FIXME: this should be async, but the parent classes would need to be updated first
    override getData(options?: Partial<TOptions> | undefined): JournalPageSheet.SheetData<TOptions>;

    // FIXME: this should be private async, but the parent classes would need to be updated first
    protected _renderInner(data: object): Promise<JQuery<HTMLElement>>;
  }
  namespace JournalPageSheet {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Options extends DocumentSheetOptions {}
    interface SheetData<T extends JournalPageSheet.Options | undefined = JournalPageSheet.Options | undefined> {
      cssClass: string;
      editable: boolean;
      document: JournalEntryPage;
      data: ReturnType<JournalEntryPage["toObject"]>;
      limited: JournalEntryPage["limited"];
      options?: Partial<T>;
      owner: JournalEntryPage["isOwner"];
      title: string;
    }
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} text document.
   */
  class JournalTextPageSheet<
    TOptions extends JournalTextPageSheet.Options = JournalTextPageSheet.Options
  > extends JournalPageSheet<TOptions> {
    /**
     * Bi-directional HTML \<-\> Markdown converter.
     */
    static get _converter(): Showdown.Converter;

    /**
     * Declare the format that we edit text content in for this sheet so we can perform conversions as necessary.
     */
    static get format(): JOURNAL_ENTRY_PAGE_FORMATS;

    /**
     * @defaultValue
     * ```typescript
     * const options = super.defaultOptions;
     * options.classes.push("text");
     * options.secrets.push({parentSelector: "section"});
     * ```
     */
    static get defaultOptions(): JournalTextPageSheet.Options;

    /**
     * The table of contents for this JournalTextPageSheet.
     */
    toc: ReturnType<typeof JournalEntryPage["buildTOC"]>;

    // FIXME: this should be async once the parent classes are updated
    override getData(options?: Partial<TOptions> | undefined): JournalPageSheet.SheetData<TOptions>;

    // FIXME: this should be async once the parent classes are updated
    close(options?: FormApplication.CloseOptions | undefined): Promise<void>;

    // FIXME: this should be async once the parent classes are updated
    protected _render(
      force?: boolean | undefined,
      options?: Application.RenderOptions<TOptions> | undefined
    ): Promise<void>;

    /**
     * Determine if any editors are dirty.
     */
    isEditorDirty(): boolean;

    // FIXME: this should be async once the parent classes are updated
    activateEditor(
      name: string,
      options?: TextEditor.Options | undefined,
      initialContent?: string | undefined
    ): Promise<Editor | EditorView>;

    // FIXME: this should be async once the parent classes are updated
    protected _renderInner(data: object): Promise<JQuery<HTMLElement>>;

    _getSecretContent(secret: HTMLElement): string;

    // FIXME: revisit this when it's added to its ancestor classes
    _updateSecret(secret: HTMLElement, content: string): Promise<typeof this>;

    // FIXME: this should be async once the parent classes are updated
    protected _updateObject(event: Event, formData: object): Promise<unknown>;

    /**
     * Lazily convert text formats if we detect the document being saved in a different format.
     * @param renderData - Render data.
     */
    protected _convertFormats(renderData: ReturnType<typeof this["getData"]>): void;

    /* -------------------------------------------- */
    /*  HTML Editing                                */
    /* -------------------------------------------- */

    /**
     * Update the UI appropriately when receiving new steps from another client.
     */
    onNewSteps(): void;
  }
  namespace JournalTextPageSheet {
    interface Options extends JournalPageSheet.Options {
      editor: {
        engine: Required<TextEditor.Options>["engine"];
        collaborate: boolean;
        content: ReturnType<typeof TextEditor.enrichHTML>;
      };
    }
  }

  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} image document.
   */
  class JournalImagePageSheet extends JournalPageSheet<JournalImagePageSheet.Options> {
    /**
     * @defaultValue
     * ```typescript
     * const options = super.defaultOptions;
     * options.classes.push("image");
     * options.height = "auto";
     * ```
     */
    static override get defaultOptions(): JournalImagePageSheet.Options;
  }
  namespace JournalImagePageSheet {
    type Options = JournalPageSheet.Options;
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} video document.
   */
  class JournalVideoPageSheet extends JournalPageSheet<JournalVideoPageSheet.Options> {
    activateListeners(html: JQuery<HTMLElement>): void;

    /**
     * Get the YouTube player parameters depending on whether the sheet is being viewed or edited.
     */
    protected _getYouTubeVars(): JournalVideoPageSheet.YouTubeVars;

    protected _getSubmitData(updateData?: object | null | undefined): Record<string, unknown>;

    /**
     * Convert time components to a timestamp in seconds.
     * @param param0 - The time components.
     * @returns The timestamp, in seconds.
     */
    protected _timeComponentsToTimestamp({ h, m, s }: Partial<JournalVideoPageSheet.TimeComponents>): number;

    /**
     * Convert a timestamp in seconds into separate time components.
     * @param timestamp - The timestamp, in seconds.
     * @returns The individual time components
     */
    protected _timestampToTimeComponents(timestamp: number): JournalVideoPageSheet.TimeComponents;
  }
  namespace JournalVideoPageSheet {
    type Options = JournalPageSheet.Options;
    interface SheetData extends JournalPageSheet.SheetData {
      flexRatio: boolean;
      isYoutube: boolean;
      timestamp: TimeComponents;
      yt: YouTube;
    }
    interface YouTubeVars {
      playsinline: 1;
      modestbranding: 1;
      controls: 0 | 1;
      autoplay: 0 | 1;
      loop: 0 | 1;
      start: TimeComponents;
    }
    interface TimeComponents {
      h: number;
      m: number;
      s: number;
    }
    interface YouTube {
      id: string;
      url: string;
    }
  }
  /**
   * The Application responsible for displaying and editing a single {@link JournalEntryPage} PDF document.
   */
  class JournalPDFPageSheet extends JournalPageSheet<JournalPDFPageSheet.Options> {
    /**
     * Maintain a cache of PDF sizes to avoid making HEAD requests every render.
     */
    protected static _sizes: Record<string, number>;

    activateListeners(html: JQuery<HTMLElement>): void;
  }
  namespace JournalPDFPageSheet {
    type Options = JournalPageSheet.Options;
  }
  /**
   * A subclass of {@link JournalTextPageSheet} that implements a TinyMCE editor.
   */
  class JournalTextTinyMCESheet extends JournalTextPageSheet<JournalTextTinyMCESheet.Options> {
    // FIXME: should be async
    close(options?: FormApplication.CloseOptions | undefined): Promise<void>;

    static get format(): typeof CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML;

    // FIXME: should be async
    protected _render(
      force?: boolean | undefined,
      options?: Application.RenderOptions<JournalTextTinyMCESheet.Options> | undefined
    ): Promise<void>;
  }

  namespace JournalTextTinyMCESheet {
    interface Options extends JournalTextPageSheet.Options {
      editor: JournalTextPageSheet.Options["editor"] & {
        engine: "tinymce";
      };
    }
  }
  /**
   * A subclass of {@link JournalTextPageSheet} that implements a markdown editor for editing the text content.
   */
  class MarkdownJournalPageSheet extends JournalTextPageSheet<MarkdownJournalPageSheet.Options> {
    /**
     * Store the dirty flag for this editor.
     */
    protected _isDirty: boolean;

    static get format(): typeof CONST.JOURNAL_ENTRY_PAGE_FORMATS.MARKDOWN;

    /**
     * {@inheritDoc}
     * @defaultValue
     * ```typescript
     * const options = super.defaultOptions;
     * options.dragDrop = [{dropSelector: "textarea"}];
     * options.classes.push("markdown");
     * ```
     */
    static get defaultOptions(): JournalTextPageSheet.Options;

    get template(): string;

    // FIXME: should be async once ancestor types updated
    getData(
      options?: Partial<MarkdownJournalPageSheet.Options> | undefined
    ): JournalPageSheet.SheetData<MarkdownJournalPageSheet.Options>;

    activateListeners(html: JQuery<HTMLElement>): void;

    isEditorDirty(): boolean;

    // FIXME: should be async once ancestor types updated
    protected _updateObject(event: Event, formData: object): Promise<unknown>;

    protected _onDrop(event: DragEvent): void;

    /**
     * Handle dropping a content link onto the editor.
     * @param eventData - The parsed event data.
     */
    protected _onDropContentLink(eventData: DragEvent): void;
  }
  namespace MarkdownJournalPageSheet {
    interface Options extends JournalTextPageSheet.Options {
      editor: JournalTextPageSheet.Options["editor"] & {
        engine: "prosemirror";
      };
    }
  }
}
