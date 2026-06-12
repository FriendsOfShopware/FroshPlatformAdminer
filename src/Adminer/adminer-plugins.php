<?php

use Shopware\Core\DevOps\Environment\EnvironmentHelper;

$ssl = [
    'ca' => EnvironmentHelper::getVariable('DATABASE_SSL_CA'),
    'cert' => EnvironmentHelper::getVariable('DATABASE_SSL_CERT'),
    'key' => EnvironmentHelper::getVariable('DATABASE_SSL_KEY'),
    'verify' => EnvironmentHelper::hasVariable('DATABASE_SSL_DONT_VERIFY_SERVER_CERT')
        ? !EnvironmentHelper::getVariable('DATABASE_SSL_DONT_VERIFY_SERVER_CERT')
        : null,
];

$sslConfig =  0 < count(array_filter($ssl)) ? $ssl : null;

return array_filter([
      new AdminerLoginSsl($sslConfig)
]);
