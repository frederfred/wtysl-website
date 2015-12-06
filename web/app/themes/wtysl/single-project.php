<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <?php
      $video_id = get_post_meta(get_the_ID(), 'vimeo_id', true);
      ?>

      <div class="Wrapper u-trailer-xl">
        <article>
          <h1 class="Headline Headline--1"><?php the_title(); ?></h1>

          <?php if ($video_id): ?>
            <div class="FlexEmbed FlexEmbed--16by9 u-trailer-m">
              <iframe src="https://player.vimeo.com/video/<?php echo $video_id; ?>?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="FlexEmbed-item"></iframe>
            </div>
          <?php endif; ?>

          <?php the_content(); ?>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<?php
# Project grid
$headline_level = 2;

include(locate_template('templates/projects.php'));
?>

<?php get_footer(); ?>
