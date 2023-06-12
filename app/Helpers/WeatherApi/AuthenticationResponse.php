<?php
namespace App\Helpers\WeatherApi;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;

class AuthenticationResponse
{
    protected array $json = [];

    public function __construct(protected Response $apiResponse)
    {
        $this->json = $this->apiResponse->json();
    }

    public function isSuccessful(): bool
    {
        return $this->apiResponse->ok() && ! empty($this->getToken());
    }

    public function getName(): string
    {
        return $this->json['name'];
    }

    public function getEmail(): string
    {
        return $this->json['email'];
    }

    public function getAbilities(): Collection
    {
        return collect($this->json['abilities']);
    }

    public function getToken(): string
    {
        return $this->json['token'];
    }
}
