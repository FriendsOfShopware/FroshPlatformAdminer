<?php

namespace Frosh\Adminer\Controller;

use Shopware\Core\DevOps\Environment\EnvironmentHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AdminerController extends AbstractController
{
    #[Route(path: '/api/frosh_adminer/login', name: 'api.frosh_adminer', defaults: ['_acl' => ['system.frosh_adminer'], '_routeScope' => ['api']], methods: ['GET'])]
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
        $_SESSION['frosh_adminer_authenticated'] = true;

        $_SESSION["dbs"]['server'][$credentials['host']][$credentials['user']] = [
            $credentials['path']
        ];

        $_SESSION["db"]['server'][$credentials['host']][$credentials['user']][$credentials['path']] = true;
        $_SESSION["pwds"]['server'][$credentials['host']][$credentials['user']] = $credentials['pass'];

        $host = $credentials['host'];
        if (!empty($credentials['port']) && $credentials['port'] !== 3306) {
            $host .= ':' . $credentials['port'];
        }

        $response = new JsonResponse([
            'url' => $this->generateUrl('administration.frosh_adminer', [
                'server' => $host,
                'username' => $credentials['user'],
                'db' => $credentials['path'],
            ]),
        ]);

        $response->headers->set('Set-Cookie', sprintf('adminer_sid=%s; path=/; HttpOnly; SameSite=lax', session_id()));
        $response->headers->set('Set-Cookie', sprintf('adminer_version=4.7.5; path=/; HttpOnly; SameSite=lax'), false);
        $response->headers->set('Set-Cookie', 'adminer_key=; Expires=-1; path=/; HttpOnly; SameSite=lax', false);

        return $response;
    }

    #[Route(path: '/%shopware_administration.path_name%/adminer', name: 'administration.frosh_adminer', defaults: ['auth_required' => false, '_routeScope' => ['administration']], methods: ['GET', 'POST'])]
    public function index(): Response
    {
        session_cache_limiter('');
        session_name('adminer_sid');
        session_start();

        if (empty($_SESSION['frosh_adminer_authenticated'])) {
            return new Response('Forbidden', Response::HTTP_FORBIDDEN);
        }

        chdir(__DIR__ . '/../Adminer');
        unset($_POST['auth']);
        require __DIR__ . '/../Adminer/Adminer.php';
        return new Response('');
    }

    private function getDatabaseCredentials(): array
    {
        $db = parse_url(EnvironmentHelper::getVariable('DATABASE_URL'));
        $db = array_map('rawurldecode', $db);
        $db['path'] = substr($db['path'], 1);
        if (!isset($db['pass'])) {
            $db['pass'] = '';
        }

        return $db;
    }
}
