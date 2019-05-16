<?php

namespace Frosh\Adminer\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class Adminer extends AbstractController
{
    /**
     * @Route(path="/api/v1/frosh_adminer/login")
     */
    public function index(Request $request): JsonResponse
    {
        error_reporting(0);
        ini_set('display_errors', 'off');

        $credentials = $this->getDatabaseCredentials();

        session_cache_limiter('');
        session_name('adminer_sid');
        session_start();

        header_remove('Set-Cookie');
        $_SESSION["token"] = rand(1, 1e6);

        $_SESSION["dbs"]['server'][$credentials['host']][$credentials['user']] = [
            $credentials['path']
        ];

        $_SESSION["db"]['server'][$credentials['host']][$credentials['user']][$credentials['path']] = true;
        $_SESSION["pwds"]['server'][$credentials['host']][$credentials['user']] = $credentials['pass'];

        $response = new JsonResponse([
            'url' => $request->getBaseUrl() . sprintf('/bundles/adminer/Adminer/index.php?server=%s&username=%s&db=%s', rawurlencode($credentials['host']), rawurlencode($credentials['user']), rawurlencode($credentials['path']))
        ]);

        $response->headers->set('Set-Cookie', sprintf('adminer_sid=%s; path=/; HttpOnly; SameSite=lax', session_id()));
        $response->headers->set('Set-Cookie', sprintf('adminer_version=4.7.1; path=/; HttpOnly; SameSite=lax'), false);
        $response->headers->set('Set-Cookie', 'adminer_key=; Expires=-1; path=/; HttpOnly; SameSite=lax', false);

        return $response;
    }

    private function getDatabaseCredentials(): array
    {
        $db = parse_url(getenv('DATABASE_URL'));
        $db = array_map('rawurldecode', $db);
        $db['path'] = substr($db['path'], 1);
        if (!isset($db['pass'])) {
            $db['pass'] = '';
        }

        return $db;
    }
}