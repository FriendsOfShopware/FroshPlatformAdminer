<?php

use Shopware\Core\DevOps\Environment\EnvironmentHelper;

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
        new AdminerLoginSsl(adminer_ssl_configuration()),
    ]);
}

function adminer_ssl_configuration()
{
    $ssl = [
        'ca' => EnvironmentHelper::getVariable('DATABASE_SSL_CA'),
        'cert' => EnvironmentHelper::getVariable('DATABASE_SSL_CERT'),
        'key' => EnvironmentHelper::getVariable('DATABASE_SSL_KEY'),
    ];

    return 0 < count(array_filter($ssl)) ? $ssl : null;
}

error_reporting(0);
@ini_set('display_errors', 0);

include __DIR__ . '/Adminer.php';
