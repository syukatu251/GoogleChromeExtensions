///////////////////////////////////////////////////////////
/// Global defenitions
///////////////////////////////////////////////////////////

// Components
var EXTENSION_BODY_DIV_ID = 'divExtensionBody';
var DOWNLOAD_LIST_DIV_ID = 'divDownlaodList';
var DOWNLOAD_FILTER_DIV_ID = 'divDownlaodFilter';
var EXT_FILTERS_DIV_ID = 'divExtFilters';
var CUSTOM_FILTER_INPUT_ID = 'customFilterInputId';
var FOOTER_DIV_ID = 'divFooter';
var NO_LINKS_MESSAGE_DIV_ID = 'divNoLinkMessage';
var DELIM_DIVS_NAME = 'delim';
var LINK_ROW_ELEM_ID_PREFIX = 'row';
var LINKS_TABLE_ID = 'linksTable';
var BLOG_LINK_IMAGE = "images/blogger_icon.png";

// Page style
var PAGE_DEFAULT_WIDTH = "420";
var PAGE_DEFAULT_HEIGHT = "118"
var PAGE_MINIMUM_WIDTH = "470";
var PAGE_DEFAULT_SCROLL_STYLE = "hidden";
var FOOTER_DIV_HEIGHT = "39px";
var BLOG_LINK_HEIGHT = "20";
var BLOG_LINK_WIDTH = "102";
var SCROLLER_WIDTH = 20;
var POP_UP_EXT_HEIGHT_MAX = Math.min(600, screen.height / 2); // chrome extension height limit = 600
var POP_UP_EXT_WIDTH_MAX = Math.min(800, screen.width / 2); // chrome extension width limit = 800

// Colors
var UNSELECTED_LINK_COLOR = "white";
var SELECTED_LINK_COLOR = "lavender";

// Font 
var TEXT_FONT_TYPE = "tahoma";
var TEXT_FONT_SIZE = "14px";

// Messages
var PENDING_LOAD_MSG = "Pending for page to finish loading ...";
var NO_LINKS_MSG = "Too bad, there are no downloadable files on this page.";
var NON_WEBSITE_PAGE = "This is not a website!"
var CHROME_WEBSTORE_SITE = "Chrome webstore page rejected a link scan.";

// Global vars
var gContentConnectionPort;
var gLinksStorage = new LinksStorage;

// Definitions
var DOWNLOAD_CONFIRM_MIN_LIMIT = 6;
