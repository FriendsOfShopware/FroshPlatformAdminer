<?php

/** Enable login without password
 * @link https://www.adminer.org/plugins/#use
 * @author Jakub Vrana, https://www.vrana.cz/
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 * @license https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2 (one or other)
 */
class AdminerLoginPasswordLess extends Adminer\Plugin {
    function login($login, $password) {
        return true;
    }

    protected $translations = array(
        'cs' => array('' => 'Povolí přihlášení bez hesla'),
        'de' => array('' => 'Ermöglicht die Anmeldung ohne Passwort'),
        'pl' => array('' => 'Włącz logowanie bez hasła'),
        'ro' => array('' => 'Activați autentificarea fără parolă'),
        'ja' => array('' => 'パスワードなしのログインを許可'),
    );
}
