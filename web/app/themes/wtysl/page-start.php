<?php get_header(); ?>

<div class="Wrapper Wrapper--bleed">
  <div class="MediaIntro">
    <div class="MediaIntro-media">
      <div class="FlexEmbed FlexEmbed--16by9">
        <iframe src="https://player.vimeo.com/video/<?php echo get_post_meta(get_the_ID(), 'vimeo_id', true); ?>?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="FlexEmbed-item"></iframe>
      </div>
    </div>

  </div>
</div>

<?php get_footer(); ?>
