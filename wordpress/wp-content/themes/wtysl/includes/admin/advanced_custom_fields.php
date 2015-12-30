<?php

if(function_exists("register_field_group"))
{
  register_field_group(array (
    'id' => 'acf_startpage',
    'title' => 'Startpage meta',
    'fields' => array (
      array (
        'key' => 'field_56313808216f8',
        'label' => 'Vimeo id',
        'name' => 'vimeo_id',
        'type' => 'number',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => '',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'page',
          'operator' => '==',
          'value' => '6',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));

  register_field_group(array (
    'id' => 'acf_project-meta',
    'title' => 'Project meta',
    'fields' => array (
      array (
        'key' => 'field_56640943d32d0',
        'label' => 'Vimeo ID',
        'name' => 'vimeo_id',
        'type' => 'number',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'min' => '',
        'max' => '',
        'step' => '',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'project',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));

  register_field_group(array (
    'id' => 'acf_co-worker-meta',
    'title' => 'Co-worker meta',
    'fields' => array (
      array (
        'key' => 'field_566445c61f016',
        'label' => 'E-mail',
        'name' => 'e-mail',
        'type' => 'email',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
      ),
      array (
        'key' => 'field_566445da1f017',
        'label' => 'Title',
        'name' => 'title',
        'type' => 'text',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'html',
        'maxlength' => '',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'co-worker',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'no_box',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));
}
