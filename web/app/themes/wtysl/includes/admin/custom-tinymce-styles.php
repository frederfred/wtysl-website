<?php

add_filter('mce_buttons', 'add_tiny_mce_styleselect');
add_filter('tiny_mce_before_init', 'add_custom_tinymce_styles');
add_action('admin_init', 'add_custom_tinymce_styles_css');

function add_custom_tinymce_styles($settings) {
  $style_formats = array(
    array(
      'title' => 'Preamble',
      'selector' => 'p',
      'classes' => 'Text-preamble'
    )
  );

  $settings['style_formats'] = json_encode($style_formats);

  return $settings;
}

function add_custom_tinymce_styles_css() {
  add_editor_style('includes/admin/custom-tinymce-styles.css');
}

function add_tiny_mce_styleselect($buttons) {
  array_unshift($buttons, 'styleselect');

  return $buttons;
}

