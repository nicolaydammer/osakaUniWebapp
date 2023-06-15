<?php
namespace App\Api\Response;

use Illuminate\Support\Collection;

class AuthenticationResponse extends ApiResponse
{
    public function isSuccessful(): bool
    {
        return $this->response->ok() && ! empty($this->getToken());
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

    public function getToken(): ?string
    {
        return $this->json['token'] ?? null;
    }
}
