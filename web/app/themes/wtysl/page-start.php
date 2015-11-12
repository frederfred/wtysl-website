<?php get_header(); ?>

<div class="Wrapper Wrapper--bleed">
  <div class="MediaIntro">
    <div class="MediaIntro-inner">
      <div class="FlexEmbed FlexEmbed--16by9">
        <div class="FlexEmbed-item MediaIntro-imageWrapper">
          <img src="<?php echo wp_get_attachment_image_src(get_post_thumbnail_id(), 'large')[0]; ?>" class="MediaIntro-image">
        </div>

        <div class="MediaIntro-textWrapper">
          <div class="MediaIntro-text">
            <div class="MediaIntro-textInner">
              <h1 class="MediaIntro-headline">We tell stories.</h1>

              <div class="MediaIntro-body">
                <p>
                  Guerrilla filmmaking takes us to the most remote areas of the world.
                  <br>
                  We look for untold stories and unsung heroes. Care to join?
                </p>
              </div>

              <button class="Button">Play our showreel</button>
            </div>
          </div>
        </div>

        <!-- <iframe src="https://player.vimeo.com/video/<?php echo get_post_meta(get_the_ID(), 'vimeo_id', true); ?>?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="FlexEmbed-item"></iframe> -->
      </div>
    </div>

  </div>
</div>

<?php get_footer(); ?>
