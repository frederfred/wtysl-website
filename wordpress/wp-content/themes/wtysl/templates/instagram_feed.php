<?php if (!instagram_is_last_in_post()): ?>
      </div>
    </div>
  </article>
<?php endif; ?>

<div class="u-leader-l<?php echo instagram_is_last_in_post() ? '' : ' u-trailer-l'; ?>">
  <div class="Grid Grid--6-3-2">
    <?php foreach ($data->data as $media): ?>
      <div class="Grid-item">
        <a href="<?php echo $media->link; ?>" class="FlexEmbed FlexEmbed--1by1 u-trailer-s" target="_blank">
          <img src="<?php echo $media->images->standard_resolution->url; ?>" class="FlexEmbed-item">
        </a>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<?php if (!instagram_is_last_in_post()): ?>
  <article class="Grid Grid--center-12-8">
    <div class="Grid-item">
      <div class="Text">
<?php endif; ?>
