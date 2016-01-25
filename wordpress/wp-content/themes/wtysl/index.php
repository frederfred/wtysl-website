<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>
      <?php $featured_image_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'large')[0]; ?>
      <?php $headline_color = dashes_to_camel_case(get_post_meta(get_the_ID(), 'headline_color', true)); ?>

      <?php if ($featured_image_src): ?>
        <div class="FeaturedImage" style="background-image: url(<?php echo $featured_image_src; ?>);">
          <h1 class="FeaturedImage-headline FeaturedImage-headline--<?php echo $headline_color; ?> Headline Headline--1"><?php the_title(); ?></h1>
        </div>
      <?php endif; ?>

      <div class="Wrapper">
        <article class="Grid Grid--center-12-8">
          <div class="Grid-item">
            <div class="Text">
              <?php the_content(); ?>
            </div>
          </div>
        </article>
      </div>
  <?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
