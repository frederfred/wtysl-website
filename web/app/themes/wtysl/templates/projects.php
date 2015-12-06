<?php
$query = new WP_Query(
  array(
    'post_type' => 'project',
    'posts_per_page' => -1
  )
);
?>

<div class="Wrapper">
  <?php if ($query->have_posts()): ?>
    <ul class="Grid Grid--12-6-4 u-listPlain">
      <?php while ($query->have_posts()): ?>
        <?php $query->the_post(); ?>
        <?php $image_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'small')[0]; ?>

        <li class="Grid-item">
          <a href="<?php the_permalink(); ?>" class="ProjectItem">
            <?php if ($image_src): ?>
              <div class="FlexEmbed FlexEmbed--6by4 u-trailer-xs ProjectItem-media">
                <img src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>" class="FlexEmbed-item">
              </div>
            <?php endif; ?>

            <h2 class="Headline Headline--3"><?php the_title(); ?></h2>
          </a>
        </li>
      <?php endwhile; ?>
    </ul>
  <?php endif; ?>

  <?php wp_reset_postdata(); ?>
</div>
