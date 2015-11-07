<?php
$query = new WP_Query(
  array(
    'post_type' => 'project',
    'posts_per_page' => -1
  )
);
?>

<?php get_header(); ?>
  <div class="Wrapper">
    <h1 class="u-visuallyhidden">Projects</h1>

    <?php if ($query->have_posts()): ?>
      <ul class="Grid Grid--12-6-4 u-listPlain">
        <?php while ($query->have_posts()): ?>
          <?php $query->the_post(); ?>

          <li class="Grid-item">
            <a href="<?php the_permalink(); ?>" class="ProjectItem">
              <img src="https://placeholdit.imgix.net/~text?w=660&amp;h=370" alt="<?php the_title(); ?>" class="ProjectItem-media">

              <h2 class="ProjectItem-title"><?php the_title(); ?></h2>
            </a>
          </li>
        <?php endwhile; ?>
      </ul>
    <?php endif; ?>

    <?php wp_reset_postdata(); ?>

  </div>
<?php get_footer(); ?>
