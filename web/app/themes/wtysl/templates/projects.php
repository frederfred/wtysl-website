<?php
$query = new WP_Query(
  array(
    'post_type' => 'project',
    'posts_per_page' => -1
  )
);
?>

<div class="Wrapper Wrapper--tight">
  <?php if ($query->have_posts()): ?>
    <ul class="Grid Grid--12-6-4 u-listPlain">
      <?php while ($query->have_posts()): ?>
        <?php $query->the_post(); ?>
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

              <p class="ProjectItem-category">
                <?php echo empty($categories) ? '' : $categories[0]->name; ?>
              </p>
            </div>
          </a>
        </li>
      <?php endwhile; ?>
    </ul>
  <?php endif; ?>

  <?php wp_reset_postdata(); ?>
</div>
