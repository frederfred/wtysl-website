<?php get_header(); ?>

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
  <?php echo get_instagram_feed(); ?>
</div>

<?php get_footer(); ?>
