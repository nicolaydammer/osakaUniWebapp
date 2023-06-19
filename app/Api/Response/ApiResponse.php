<?php

namespace App\Api\Response;

use Illuminate\Http\Client\Response;

class ApiResponse
{
    protected array $json = [];

    public function __construct(protected Response $response)
    {
        $this->json = $this->response->json() ?? [];
    }

    public function isSuccessful(): bool
    {
        return $this->response->ok();
    }
}
