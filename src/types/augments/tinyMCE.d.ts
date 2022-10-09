import _tinymce from "tinymce";
import type * as _tinymceTypes from "tinymce";

declare global {
  let tinyMCE: typeof _tinymce;
  let tinymce: typeof _tinymce;
  namespace tinyMCE {
    type AddOnManager<T> = _tinymceTypes.AddOnManager<T>;
    type Annotator = _tinymceTypes.Annotator;
    type AstNode = _tinymceTypes.AstNode;
    type Bookmark = _tinymceTypes.Bookmark;
    type BookmarkManager = _tinymceTypes.BookmarkManager;
    type ControlSelection = _tinymceTypes.ControlSelection;
    type DOMUtils = _tinymceTypes.DOMUtils;
    type Delay = _tinymceTypes.Delay;
    type DomParser = _tinymceTypes.DomParser;
    type DomParserSettings = _tinymceTypes.DomParserSettings;
    type DomSerializer = _tinymceTypes.DomSerializer;
    type DomSerializerSettings = _tinymceTypes.DomSerializerSettings;
    type DomTreeWalker = _tinymceTypes.DomTreeWalker;
    type Editor = _tinymceTypes.Editor;
    type EditorCommands = _tinymceTypes.EditorCommands;
    type EditorEvent<T> = _tinymceTypes.EditorEvent<T>;
    type EditorManager = _tinymceTypes.EditorManager;
    type EditorModeApi = _tinymceTypes.EditorModeApi;
    type EditorObservable = _tinymceTypes.EditorObservable;
    type EditorOptions = _tinymceTypes.EditorOptions;
    type EditorSelection = _tinymceTypes.EditorSelection;
    type Entities = _tinymceTypes.Entities;
    type Env = _tinymceTypes.Env;
    type EventDispatcher<T> = _tinymceTypes.EventDispatcher<T>;
    type EventUtils = _tinymceTypes.EventUtils;
    type FakeClipboard = _tinymceTypes.FakeClipboard;
    type FocusManager = _tinymceTypes.FocusManager;
    type Formatter = _tinymceTypes.Formatter;
    type GeomRect = _tinymceTypes.GeomRect;
    type HtmlSerializer = _tinymceTypes.HtmlSerializer;
    type HtmlSerializerSettings = _tinymceTypes.HtmlSerializerSettings;
    type I18n = _tinymceTypes.I18n;
    type IconManager = _tinymceTypes.IconManager;
    type Model = _tinymceTypes.Model;
    type ModelManager = _tinymceTypes.ModelManager;
    type NotificationApi = _tinymceTypes.NotificationApi;
    type NotificationManager = _tinymceTypes.NotificationManager;
    type NotificationSpec = _tinymceTypes.NotificationSpec;
    type Observable<T> = _tinymceTypes.Observable<T>;
    type Plugin = _tinymceTypes.Plugin;
    type PluginManager = _tinymceTypes.PluginManager;
    type RangeUtils = _tinymceTypes.RangeUtils;
    type RawEditorOptions = _tinymceTypes.RawEditorOptions;
    type Rect = _tinymceTypes.Rect;
    type Resource = _tinymceTypes.Resource;
    type Schema = _tinymceTypes.Schema;
    type SchemaSettings = _tinymceTypes.SchemaSettings;
    type ScriptLoader = _tinymceTypes.ScriptLoader;
    type Shortcuts = _tinymceTypes.Shortcuts;
    type StyleSheetLoader = _tinymceTypes.StyleSheetLoader;
    type Styles = _tinymceTypes.Styles;
    type TextSeeker = _tinymceTypes.TextSeeker;
    type Theme = _tinymceTypes.Theme;
    type ThemeManager = _tinymceTypes.ThemeManager;
    type TinyMCE = _tinymceTypes.TinyMCE;
    type Tools = _tinymceTypes.Tools;
    type URI = _tinymceTypes.URI;
    type UndoManager = _tinymceTypes.UndoManager;
    type VK = _tinymceTypes.VK;
    type WindowManager = _tinymceTypes.WindowManager;
    type Writer = _tinymceTypes.Writer;
    type WriterSettings = _tinymceTypes.WriterSettings;
  }
}
