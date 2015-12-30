<?php

add_action("init", "register_co_worker_post_type");

function register_co_worker_post_type() {
  register_post_type("co-worker",
    array(
      "labels" => array(
        "name" => __("Co-workers"),
        "singular_name" => __("Co-worker"),
        "plural_name" => __("Co-workers")
      ),
      "public" => false,
      "has_archive" => false,
      "show_ui" => true,

      "supports" => array("title", "editor")
    )
  );
}
