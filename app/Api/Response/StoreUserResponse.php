<?php

namespace App\Api\Response;

class StoreUserResponse extends ApiResponse
{
    public function getGeneratedPassword(): string
    {
        return $this->json['generated_password'];
    }
}
