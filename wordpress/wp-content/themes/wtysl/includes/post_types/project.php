<?php

add_action('init', 'register_project_post_type');

function register_project_post_type() {
  register_post_type('project',
    array(
      'labels' => array(
        'name' => __('Projects'),
        'singular_name' => __('Project'),
        'plural_name' => __('Projects')
      ),
      'public' => true,
      'has_archive' => true,
      'supports' => array('title', 'editor', 'thumbnail'),
      'rewrite' => array(
        'slug' => 'projects'
      ),
      'taxonomies' => array('category', 'post_tag')
    )
  );
}
