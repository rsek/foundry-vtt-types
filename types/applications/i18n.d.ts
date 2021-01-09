/**
 * A helper class which assists with localization and string translation
 */
declare class Localization {
  /**
   * The target language for localization
   */
  lang: string

  /**
   * The translation dictionary for the target language
   */
  translations: object

  constructor ()

  /**
   * Localize a string including variable formatting for input arguments.
   * Provide a string ID which defines the localized template.
   * Variables can be included in the template enclosed in braces and will be substituted using those named keys.
   *
   * @param stringId - The string ID to translate
   * @param data - Provided input data
   * @returns The translated and formatted string
   *
   * @example
   * ```javascript
   * const stringId = "MY_TEST_STRING" // "Your name is {name}"
   * game.i18n.format("MY_TEST_STRING", {name: "Andrew"}) // Produces "Your name is Andrew"
   * ```
   */
  format (stringId: string, replacements: object): string

  /**
   * Initialize the Localization module
   * Discover available language translations and apply the current language setting
   */
  initialize (): Promise<any>

  /**
   * Localize a string by drawing a translation from the available translations dictionary, if available
   * If a translation is not available, the original string is returned
   * @param stringId - The string ID to translate
   * @returns The translated string
   */
  localize (stringId: string): string

  /**
   * Set a language as the active translation source for the session
   * @param lang - A language string in CONFIG.supportedLanguages
   * @returns A Promise which resolves once the translations for the requested language are ready
   */
  setLanguage (lang: string): Promise<any>

  /**
   * Discover the available supported languages from the set of packages which are provided
   */
  protected _discoverLanguages (): void

  /**
   * Prepare the dictionary of translation strings for the requested language
   * @param lang - The language for which to load translations
   */
  protected _getTranslations (lang: string): Promise<any>

  /**
   * Load a single translation file and return its contents as processed JSON
   * @param src - The translation file path to load
   */
  protected _loadTranslationFile (src: string): Promise<any>
}