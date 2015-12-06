<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <div class="Wrapper">
        <article>
          <h1 class="Headline Headline--1"><?php the_title(); ?></h1>

          <?php the_content(); ?>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
