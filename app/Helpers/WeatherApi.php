<?php

namespace App\Helpers;

use App\Exceptions\WeatherApiException;
use App\Helpers\WeatherApi\AuthenticationResponse;
use Illuminate\Support\Facades\Http;

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

    public function authenticate(string $email, string $password): AuthenticationResponse
    {
        return new AuthenticationResponse(
            Http::post($this->apiUrl . '/login', [
                'email' => $email,
                'password' => $password,
            ])
        );
    }
}
