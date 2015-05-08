<?php

/**
 * Return ".min" unless environment is development
 * @return string
 */
function minified_extension() {
  return getenv("WP_ENV") === "development" ? "" : ".min";
}

/**
 * Get asset version
 * @return int
 */
function get_asset_version() {
  return getenv("ASSET_VERSION");
}
