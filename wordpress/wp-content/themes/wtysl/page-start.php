<?php get_header(); ?>

<?php
$featured_projects = new WP_Query(
  array(
    'post_type' => 'project',
    'posts_per_page' => 3,
    'tag' => 'startpage'
  )
);
?>

<?php if (have_posts()): ?>
  <?php while (have_posts()): ?>
    <?php the_post(); ?>

    <div class="MediaIntro">
      <div class="MediaIntro-imageWrapper">
        <div class="MediaIntro-image" style="background-image: url(<?php echo wp_get_attachment_image_src(get_post_thumbnail_id(), 'large')[0]; ?>);"></div>
      </div>

      <div class="MediaIntro-textWrapper">
        <div class="MediaIntro-text">
          <div class="MediaIntro-textInner">
            <h1 class="Headline Headline--1 MediaIntro-headline"><?php the_field('headline'); ?></h1>

            <div class="MediaIntro-body">
              <?php the_content(); ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  <?php endwhile; ?>
<?php endif; ?>

<div class="Wrapper">
  <?php if ($featured_projects->have_posts()): ?>
    <div class="u-trailer-xl">
      <h2 class="Headline Headline--2 u-textCenter">Projects</h2>

      <ul class="Grid Grid--12-4 u-listPlain">
        <?php while ($featured_projects->have_posts()): ?>
          <?php $featured_projects->the_post(); ?>
          <?php $image_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'small')[0]; ?>
          <?php $categories = get_the_category(); ?>

          <li class="Grid-item">
            <a href="<?php the_permalink(); ?>" class="ProjectItem">
              <?php if ($image_src): ?>
                <div class="FlexEmbed FlexEmbed--16by9 ProjectItem-media">
                  <img src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>" class="FlexEmbed-item">
                </div>
              <?php endif; ?>

              <div class="ProjectItem-text">
                <h2 class="ProjectItem-title Headline Headline--3"><?php the_title(); ?></h2>

                <?php if (!empty($categories)): ?>
                  <p class="ProjectItem-category">
                    <?php echo $categories[0]->name; ?>
                  </p>
                <?php endif; ?>
              </div>
            </a>
          </li>
        <?php endwhile; ?>
      </ul>

      <div class="u-textCenter Meta">
        <a href="<?php echo get_post_type_archive_link('project'); ?>">See all projects</a>
      </div>
    </div>
  <?php endif; ?>

  <?php wp_reset_postdata(); ?>

  <h2 class="Headline Headline--2 u-textCenter">Subscribe to our newsletter</h2>

  <?php get_template_part("templates/newsletter_form"); ?>
</div>

<?php get_footer(); ?>
