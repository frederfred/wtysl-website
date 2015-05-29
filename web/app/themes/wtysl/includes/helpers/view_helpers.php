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

/**
 * Get HTML for Instagram feed
 * @return string
 */
function get_instagram_feed() {
  $user_id = getenv("INSTAGRAM_USER_ID");
  $access_token = getenv("INSTAGRAM_ACCESS_TOKEN");
  $count = 6;
  $template = get_template_directory() . "/templates/instagram_feed.php";

  $instagram_feed = new InstagramFeed($user_id, $access_token, $count, $template);

  return $instagram_feed->render();
}

/**
 * Render a partial with data
 * @param string $name Template name
 * @param array data $data Data that gets passed to partial
 * @return string
 */
function include_partial($name, $data) {
  $file = locate_template(sprintf('%s.php', $name));
  $data = json_decode(json_encode($data), false); # Convert array to object

  if (!file_exists($file)) {
    return null;
  }

  ob_start();

  include $file;

  $content = ob_get_contents();

  ob_end_clean();

  return $content;
}
