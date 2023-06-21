<?php

namespace App\Api;

use App\Api\Response\ApiResponse;
use App\Api\Response\AuthenticationResponse;
use App\Api\Response\StoreUserResponse;
use App\Api\Response\TemperatureAndDownfallResponse;
use App\Api\Response\TopWindSpeedsResponse;
use App\Exceptions\WeatherApiException;
use Auth;
use Illuminate\Http\Client\PendingRequest;
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

    public function storeUser(string $email, string $name): StoreUserResponse
    {
        return new StoreUserResponse(
            Http::post($this->apiUrl . '/register', [
                'email' => $email,
                'name' => $name,
            ])
        );
    }

    public function fetchTempAndDownfall(): TemperatureAndDownfallResponse
    {
        return new TemperatureAndDownfallResponse(
            $this->getAuthenticatedRequest()->get(
                $this->apiUrl . '/contracten/query/1'
            )
        );
    }

    public function fetchTopWindSpeeds(): TopWindSpeedsResponse
    {
        return new TopWindSpeedsResponse(
            $this->getAuthenticatedRequest()->get(
                $this->apiUrl . '/contracten/query/2'
            )
        );
    }

    private function getAuthenticatedRequest(): PendingRequest
    {
        if (! Auth::check()) {
            throw new WeatherApiException(
                'Trying to use authenticated endpoint while no user is authenticated.'
            );
        }

        return Http::withToken(
            Auth::user()->api_token,
        );
    }
}
