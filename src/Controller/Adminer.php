<?php

namespace Frosh\Adminer\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Adminer extends AbstractController
{
    /**
     * @RouteScope(scopes={"api"})
     * @Route("/api/v{version}/frosh_adminer/login", name="api.frosh_adminer", methods={"GET"})

     */
    public function login(Request $request): JsonResponse
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
            'url' => $this->generateUrl('administration.frosh_adminer', [
                'server' => $credentials['host'],
                'username' => $credentials['user'],
                'db' => $credentials['path'],
            ]),
        ]);

        $response->headers->set('Set-Cookie', sprintf('adminer_sid=%s; path=/; HttpOnly; SameSite=lax', session_id()));
        $response->headers->set('Set-Cookie', sprintf('adminer_version=4.7.5; path=/; HttpOnly; SameSite=lax'), false);
        $response->headers->set('Set-Cookie', 'adminer_key=; Expires=-1; path=/; HttpOnly; SameSite=lax', false);

        return $response;
    }

    /**
     * @RouteScope(scopes={"administration"})
     * @Route("/admin/adminer", defaults={"auth_required"=false}, name="administration.frosh_adminer", methods={"GET", "POST"})
     */
    public function index()
    {
        unset($_POST['auth']);
        require __DIR__ . '/../Adminer/index.php';
        return new Response('');
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
