<?php

function adminer_object()
{
    include_once  __DIR__ . '/plugin.php';

    foreach (glob(__DIR__ . '/plugins/*.php') as $filename) {
        include_once $filename;
    }

    return new AdminerPlugin([
        new AdminerFrames(true),
        new AdminerTablesFilter(),
        new AdminerLoginPasswordLess(),
    ]);
}

error_reporting(0);
@ini_set('display_errors', 0);

include __DIR__ . '/Adminer.php';
