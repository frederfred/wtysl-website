<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <div class="Wrapper u-trailer-xl">
        <article class="Grid Grid--center-12-8">
          <div class="Grid-item">
            <h1 class="Headline Headline--1 u-visuallyhidden"><?php the_title(); ?></h1>

            <div class="Text">
              <?php the_content(); ?>
              <?php get_template_part("templates/newsletter_form"); ?>
            </div>
          </div>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<div class="Wrapper u-trailer-xl">
  <h2 class="Headline Headline--2">Our team</h2>

  <?php get_template_part('templates/co-workers'); ?>
</div>

<?php get_footer(); ?>
