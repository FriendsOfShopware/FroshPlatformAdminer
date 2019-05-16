<?php


namespace Frosh\Adminer\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Shopware\Core\Framework\Util\Random;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class Adminer extends AbstractController
{
    /**
     * @Route(path="/api/v1/frosh_adminer/login")
     */
    public function index(Request $request)
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

    private function getDatabaseCredentials()
    {
        $db = parse_url(getenv('DATABASE_URL'));
        $db = array_map('rawurldecode', $db);
        $db['path'] = substr($db['path'], 1);
        if (!isset($db['pass'])) {
            $db['pass'] = '';
        }

        return $db;
    }

    private function encrypt_string($str, $key) {
        if ($str == "") {
            return "";
        }
        $key = array_values(unpack("V*", pack("H*", md5($key))));
        $v = $this->str2long($str, true);
        $n = count($v) - 1;
        $z = $v[$n];
        $y = $v[0];
        $q = floor(6 + 52 / ($n + 1));
        $sum = 0;
        while ($q-- > 0) {
            $sum = $this->int32($sum + 0x9E3779B9);
            $e = $sum >> 2 & 3;
            for ($p=0; $p < $n; $p++) {
                $y = $v[$p + 1];
                $mx = $this->xxtea_mx($z, $y, $sum, $key[$p & 3 ^ $e]);
                $z = $this->int32($v[$p] + $mx);
                $v[$p] = $z;
            }
            $y = $v[0];
            $mx = $this->xxtea_mx($z, $y, $sum, $key[$p & 3 ^ $e]);
            $z = $this->int32($v[$n] + $mx);
            $v[$n] = $z;
        }
        return $this->str2long($v, false);
    }

    function str2long($s, $w) {
        $v = array_values(unpack('V*', str_pad($s, 4 * ceil(strlen($s) / 4), "\0")));
        if ($w) {
            $v[] = strlen($s);
        }
        return $v;
    }


    function int32($n) {
        while ($n >= 2147483648) {
            $n -= 4294967296;
        }
        while ($n <= -2147483649) {
            $n += 4294967296;
        }
        return (int) $n;
    }

    function xxtea_mx($z, $y, $sum, $k) {
        return $this->int32((($z >> 5 & 0x7FFFFFF) ^ $y << 2) + (($y >> 3 & 0x1FFFFFFF) ^ $z << 4)) ^ $this->int32(($sum ^ $y) + ($k ^ $z));
    }

}