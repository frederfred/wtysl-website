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

<div class="MediaIntro">
  <div class="MediaIntro-imageWrapper">
    <div class="MediaIntro-image" style="background-image: url(<?php echo wp_get_attachment_image_src(get_post_thumbnail_id(), 'large')[0]; ?>);"></div>

    <!-- <iframe src="https://player.vimeo.com/video/<?php echo get_post_meta(get_the_ID(), 'vimeo_id', true); ?>?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="MediaIntro-video"></iframe> -->
  </div>

  <div class="MediaIntro-textWrapper">
    <div class="MediaIntro-text">
      <div class="MediaIntro-textInner">
        <h1 class="Headline Headline--1 MediaIntro-headline">We tell <br>stories.</h1>

        <div class="MediaIntro-body">
          <p>
            Guerrilla filmmaking takes us to the most remote areas of the world.
            <br>
            We look for untold stories and unsung heroes. Care to join?
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="Wrapper">
  <?php if ($featured_projects->have_posts()): ?>
    <h2 class="Headline Headline--2 u-textCenter">Projects</h2>

    <ul class="Grid Grid--12-4 u-listPlain u-trailer-xl">
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
  <?php endif; ?>

  <?php wp_reset_postdata(); ?>

  <h2 class="Headline Headline--2 u-textCenter">Subscribe to our newsletter</h2>

  <?php get_template_part("templates/newsletter_form"); ?>
</div>

<?php get_footer(); ?>
