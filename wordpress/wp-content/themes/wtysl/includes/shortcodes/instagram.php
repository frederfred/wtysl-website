<?php

function instagram_shortcode() {
  $output = '';

  if (!instagram_is_last_in_post()) {
    $output = get_instagram_feed();
  }

  return $output;
}

add_shortcode('instagram', 'instagram_shortcode');
