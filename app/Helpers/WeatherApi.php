<?php

namespace App\Helpers;

use App\Exceptions\WeatherApiException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class WeatherApi
{
    public static self $instance;

    protected string $apiUrl;

    protected function __construct()
    {
        $apiUrl = config('api.url');

        if (empty($apiUrl)) {
            throw new WeatherApiException('Api url is not set (config/api.php)');
        }

        $this->apiUrl = $apiUrl;
    }

    public static function getInstance(): self
    {
        if (isset(self::$instance)) {
            return self::$instance;
        }

        return new self();
    }

    public function hasToken(): bool
    {
        return Session::has('token');
    }

    public function getToken(): string
    {
        $token = Session::get('token');

        if (empty($token)) {
            throw new WeatherApiException('Authentication token is not set.');
        }

        return $token;
    }

    public function authenticate(string $email, string $password): bool | array
    {
        $response = Http::post($this->apiUrl . '/login', [
            'email' => $email,
            'password' => $password,
        ]);

        if ($response->status() !== 200) {
            return false;
        }

        return $response->json();
    }
}
