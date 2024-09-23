import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent automatic CSS injection
config.autoAddCss = false;

// Add specific icons to the library
library.add(fas);
