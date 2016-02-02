<?php

# Add class to wrapping paragraph that contains an image
add_filter('the_content', 'add_class_to_paragraphs_with_image', 10);

function add_class_to_paragraphs_with_image($content) {
  $content = preg_replace('/(<p)(>[^<]*<img[^>]+>[^<]*)(<\/p>)/i', "\$1 class=\"Text-image\"\$2\$3", $content);

  return $content;
}

# Image compression
add_filter('jpeg_quality', create_function('', 'return 50;'));

