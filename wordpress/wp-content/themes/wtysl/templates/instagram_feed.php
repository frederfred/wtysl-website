<?php if (!instagram_is_last_in_post()): ?>
      </div>
    </div>
  </article>
<?php endif; ?>

<div class="u-leader-l<?php echo instagram_is_last_in_post() ? '' : ' u-trailer-l'; ?>">
  <div class="Grid Grid--6-3-2">
    <?php foreach ($data->data as $media): ?>
      <div class="Grid-item">
        <a href="<?php echo $media->link; ?>" class="u-trailer-s MediaItem" target="_blank">
          <div class="MediaItem-inner">
            <div class="FlexEmbed FlexEmbed--1by1">
              <img src="<?php echo $media->images->standard_resolution->url; ?>" class="FlexEmbed-item">
            </div>
          </div>
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
