<?php get_header(); ?>
  <?php if (have_posts()): ?>
    <?php while (have_posts()): ?>
      <?php the_post(); ?>
        <div class="Wrapper Wrapper--bleed">
          <div class="u-trailer-l">
            start/media_intro
          </div>
        </div>

        <div class="Wrapper">
          <div class="u-trailer-l">
            start/projects
          </div>

          <div class="u-trailer-l">
            start/who_we_are
          </div>

          <div class="u-trailer-l">
            start/how_we_work
          </div>

          <div class="u-trailer-l">
            <h2>Latest from our Instagram feed</h2>

            <?php echo get_instagram_feed(); ?>
          </div>
        </div>
    <?php endwhile; ?>
  <?php endif; ?>
<?php get_footer(); ?>
