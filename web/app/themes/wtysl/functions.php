<?php

# Nav menus
register_nav_menu("main", "Main navigation");

# Libs
require "includes/libs/instagram/instagram_feed.php";

# Walkers
require "includes/walkers/main_nav.php";

# Custom post types
require "includes/post_types/co_worker.php";
require "includes/post_types/project.php";

# Helpers
require "includes/helpers/view_helpers.php";

# Admin
require "includes/admin/remove_menu_items.php";
require "includes/admin/advanced_custom_fields.php";

# Featured images
add_theme_support("post-thumbnails");

# Remove unwanted WordPress clutter
remove_action("wp_head", "wp_generator");
remove_action("wp_head", "print_emoji_detection_script", 7);
remove_action("wp_print_styles", "print_emoji_styles");
add_filter("show_admin_bar", "__return_false");
