<?php $projects = get_archive_posts("projects", 4); ?>

<?php get_header(); ?>

<div class="Wrapper Wrapper--bleed">
  <div class="u-trailer-l">
    start/media_intro
  </div>
</div>

<div class="Wrapper">
  <div class="u-trailer-l">
    <h2>
      Selected projects

      <div class="Meta u-displayInlineBlock">
        <a href="<?php echo get_post_type_archive_link("projects"); ?>">See all</a>
      </div>
    </h2>

    <div class="Grid Grid--12-6-3">
      <?php while ($projects->have_posts()): ?>
        <?php $projects->the_post(); ?>

        <a href="<?php the_permalink(); ?>">
          <div class="Grid-item">
            <div class="FlexEmbed FlexEmbed--16by9">
              <img src="https://placehold.it/660x371?todo" class="FlexEmbed-item" alt="Project">
            </div>

            <h3><?php the_title(); ?></h3>
          </div>
        </a>
      <?php endwhile; ?>
    </div>
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

<?php get_footer(); ?>
