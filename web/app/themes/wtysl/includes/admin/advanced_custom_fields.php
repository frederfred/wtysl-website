<?php

if(function_exists("register_field_group"))
{
  register_field_group(array (
    'id' => 'acf_project-meta',
    'title' => 'Project meta',
    'fields' => array (
      array (
        'key' => 'field_557aca0da6f4a',
        'label' => 'Year',
        'name' => 'year',
        'type' => 'number',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'min' => '',
        'max' => '',
        'step' => '',
      ),
      array (
        'key' => 'field_557aca75a6f4b',
        'label' => 'Location',
        'name' => 'location',
        'type' => 'text',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'html',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_557acaa0a6f4c',
        'label' => 'Client',
        'name' => 'client',
        'type' => 'text',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'html',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_557acad9a6f4d',
        'label' => 'Team',
        'name' => 'team',
        'type' => 'textarea',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'rows' => '',
        'formatting' => 'none',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'projects',
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
}
