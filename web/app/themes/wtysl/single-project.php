<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <div class="Wrapper">
        <article>
          <h1 class="Headline Headline--1"><?php the_title(); ?></h1>

          <div class="FlexEmbed FlexEmbed--16by9 u-trailer-m">
            <iframe src="https://player.vimeo.com/video/95968697?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="FlexEmbed-item"></iframe>
          </div>

          <?php the_content(); ?>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
