<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">

    <title><?php wp_title("|", true, "right"); ?> <?php echo get_bloginfo("name"); ?></title>

    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/public/assets/stylesheets/application<?php echo minified_extension(); ?>.css?v=<?php echo get_asset_version(); ?>">

    <?php wp_head(); ?>
  </head>
  <body>
    <a href="#main" class="AccessibilityAid">Skip to content</a>

    <?php get_template_part("partials/browser_upgrade"); ?>

    <header class="Header" role="banner">
      <nav class="Wrapper">
        <ul class="Header-navList">
          <li class="Header-navItem">
            <a href="<?php echo site_url(); ?>" class="Logotype">
              <img src="//placehold.it/300x150&amp;text=WTYSL" alt="What Took You So Long?">
            </a>
          </li>
          <?php
            wp_nav_menu(
              array(
                "theme_location"  => "main",
                "menu"            => "main",
                "items_wrap"      => '%3$s',
                "container"       => false,
                "depth"           => 3,
                "walker"          => new Main_Nav_Walker_Nav_Menu
              )
            );
          ?>
        </ul>
      </nav>
    </header>

    <main id="main" role="main" class="Main" tabindex="-1">
