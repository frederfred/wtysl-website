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
          <div class="FlexEmbed FlexEmbed--3by2">
            <img src="<?php echo $image_src ? $image_src : 'https://placeholdit.imgix.net/~text?w=660&amp;h=440' ?>" alt="<?php the_title(); ?>" class="FlexEmbed-item">
          </div>
        </div>

        <div class="u-trailer-s">
          <h3 class="Headline Headline--3"><?php the_title(); ?></h3>
        </div>

        <p class="Meta">
          <?php echo $title ?>
          <br>
          <a href="mailto:<?php echo $email ?>"><?php echo $email ?></a>
        </p>
      </li>
    <?php endwhile; ?>
  </ul>
<?php endif; ?>

<?php wp_reset_postdata(); ?>
