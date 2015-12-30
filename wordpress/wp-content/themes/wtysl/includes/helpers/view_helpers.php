<?php

/**
 * Return ".min" unless environment is development
 * @return string
 */
function minified_extension() {
  return ENV_ENV === "development" ? "" : ".min";
}

/**
 * Get asset version
 * @return int
 */
function get_asset_version() {
  return ENV_ASSET_VERSION;
}

/**
 * Get HTML for Instagram feed
 * @return string
 */
function get_instagram_feed() {
  $user_id = ENV_INSTAGRAM_USER_ID;
  $access_token = ENV_INSTAGRAM_ACCESS_TOKEN;
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

/**
 * Get a new instance of WP_Query from any post type.
 * @param string $post_type
 * @param int $per_page
 * @param string $order
 * @return object
 */
function get_archive_posts($post_type, $per_page = 5, $order = "DESC") {
  return new WP_Query(
    array(
      "post_type" => $post_type,
      "posts_per_page" => $per_page,
      "order" => $order,
    )
  );
}

/**
 * Convert dash-case to camelCase
 * @param string $str
 * @return string
 */
function dashesToCamelCase($str) {
  $camel_cased_str = str_replace(' ', '', ucwords(str_replace('-', ' ', $str)));
  $camel_cased_str[0] = strtolower($camel_cased_str[0]);

  return $camel_cased_str;
}
