<?php
$query = new WP_Query(
  array(
    'post_type' => 'co-worker',
    'orderby' => 'title',
    'order' => 'ASC',
    'posts_per_page' => -1
  )
);
?>

<?php if ($query->have_posts()): ?>
  <ul class="Grid Grid--6-4-3 u-listPlain">
    <?php while ($query->have_posts()): ?>
      <?php $query->the_post(); ?>
      <?php
      $title = get_post_meta(get_the_ID(), 'title', true);
      $email = get_post_meta(get_the_ID(), 'e-mail', true);
      $image_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'small')[0];
      ?>

      <li class="Grid-item u-trailer-l">
        <div class="u-trailer-s">
          <?php if ($image_src): ?>
            <img src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>">
          <?php else: ?>
            <img src="https://placeholdit.imgix.net/~text?w=580&amp;h=870" alt="<?php the_title(); ?>">
          <?php endif; ?>
        </div>

        <h3 class="u-trailer-s"><?php the_title(); ?></h3>

        <p>
          <?php echo $title ?>
          <br>
          <a href="mailto:<?php echo $email ?>"><?php echo $email ?></a>
        </p>
      </li>
    <?php endwhile; ?>
  </ul>
<?php endif; ?>

<?php wp_reset_postdata(); ?>
