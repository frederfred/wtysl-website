<?php

class custom_setting {
  function __construct($id, $label) {
    $this->id = $id;
    $this->label = $label;

    add_filter('admin_init', array(&$this, 'register_fields'));
  }
  function register_fields() {
    register_setting('general', $this->id, 'esc_attr');
    add_settings_field($this->id, '<label for="' . $this->id . '">' . __($this->label, $this->id ) . '</label>', array(&$this, 'fields_html') , 'general');
  }
  function fields_html() {
    $value = get_option($this->id, '');

    echo '<input type="text" id="' . $this->id . '" name="' . $this->id . '" value="' . $value . '">';
  }
}

new custom_setting('footer-text-1', 'Footer text 1');
new custom_setting('footer-text-2', 'Footer text 2');
