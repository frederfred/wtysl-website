<?php get_header(); ?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>

    <?php $featured_image_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'large')[0]; ?>
    <?php $headline_color = dashes_to_camel_case(get_field('headline_color')); ?>

    <?php if ($featured_image_src): ?>
      <div class="FeaturedImage" style="background-image: url(<?php echo $featured_image_src; ?>);">
        <h1 class="FeaturedImage-headline FeaturedImage-headline--<?php echo $headline_color; ?> Headline Headline--1"><?php the_title(); ?></h1>
      </div>
    <?php endif; ?>

    <div class="Wrapper u-trailer-xl">
      <article class="Grid Grid--center-12-8">
        <div class="Grid-item">
          <h1 class="Headline Headline--1 u-visuallyhidden"><?php the_title(); ?></h1>

          <div class="Text">
            <?php the_content(); ?>
          </div>
        </div>
      </article>
    </div>
  <?php endwhile; ?>
<?php endif; ?>

<div class="Wrapper">
  <h2 class="Headline Headline--2 u-textCenter">Our team</h2>

  <div class="u-trailer-xl">
    <?php get_template_part('templates/co-workers'); ?>
  </div>

  <?php get_template_part('templates/newsletter_form'); ?>
</div>

<?php get_footer(); ?>
