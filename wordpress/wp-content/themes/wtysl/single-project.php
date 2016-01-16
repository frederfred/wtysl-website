<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <?php
      $video_id = get_post_meta(get_the_ID(), 'vimeo_id', true);
      ?>

      <div class="Wrapper u-trailer-xl">
        <article>
          <?php if ($video_id): ?>
            <div class="FlexEmbed FlexEmbed--16by9 u-trailer-xl">
              <iframe src="https://player.vimeo.com/video/<?php echo $video_id; ?>?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="FlexEmbed-item"></iframe>
            </div>
          <?php endif; ?>

          <div class="Grid Grid--center-12-8">
            <div class="Grid-item">
              <h1 class="Headline Headline--1"><?php the_title(); ?></h1>

              <div class="Text">
                <?php the_content(); ?>
              </div>
            </div>
          </div>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<div class="Block">
  <div class="Wrapper u-trailer-l">
    <h2 class="Headline Headline--2 Headline--bordered u-textCenter">More projects</h2>
  </div>

  <?php get_template_part('templates/projects'); ?>
</div>

<?php get_footer(); ?>
