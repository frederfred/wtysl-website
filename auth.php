<?php

$authed = false;

if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
  $username = $_SERVER['PHP_AUTH_USER'];
  $password = $_SERVER['PHP_AUTH_PW'];

  if ($username == ENV_AUTH_USER && $password == ENV_AUTH_PASSWORD) {
    $authed = true;
  }
}

if (!$authed) {
  header('WWW-Authenticate: Basic realm="Authentication required"');
  header('HTTP/1.0 401 Unauthorized');

  die('Login failed');
}
